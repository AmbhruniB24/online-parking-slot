// [Experiment 4 & 8] Parking Slot Controller with Location Filtering & Real-time WebSocket Broadcast
const ParkingSlot = require('../models/ParkingSlot');
const { getIO } = require('../sockets/socketHandler');
const { isDBConnected } = require('../config/db');
const { memorySlots } = require('../config/store');

// @desc    Get all parking slots (with optional locationId/floor/type/status filter)
// @route   GET /api/slots
// @access  Public
const getSlots = async (req, res, next) => {
  try {
    const { locationId, floor, type, status } = req.query;

    if (isDBConnected()) {
      try {
        const filter = {};
        if (locationId) filter.locationId = locationId;
        if (floor) filter.floor = Number(floor);
        if (type) filter.type = type;
        if (status) filter.status = status;

        const slots = await ParkingSlot.find(filter).sort({ floor: 1, slotNumber: 1 });
        if (slots && slots.length > 0) {
          return res.json({ success: true, count: slots.length, data: slots, slots });
        }
      } catch (err) {
        console.warn('MongoDB slot query failed, using resilient fallback:', err.message);
      }
    }

    // High-Availability Memory Fallback
    let result = [...memorySlots];
    if (floor) result = result.filter(s => s.floor === Number(floor));
    if (type && type !== 'all') result = result.filter(s => s.type === type);
    if (status) result = result.filter(s => s.status === status);

    return res.json({
      success: true,
      count: result.length,
      data: result,
      slots: result
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single slot details
// @route   GET /api/slots/:id
// @access  Public
const getSlotById = async (req, res, next) => {
  try {
    if (isDBConnected()) {
      try {
        const slot = await ParkingSlot.findById(req.params.id);
        if (slot) {
          return res.json({ success: true, data: slot });
        }
      } catch (err) {
        // fallback
      }
    }

    const slot = memorySlots.find(s => s._id === req.params.id || s.slotNumber === req.params.id);
    if (!slot) {
      return res.status(404).json({ success: false, message: 'Parking slot not found' });
    }

    return res.json({ success: true, data: slot });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new parking slot (Admin only)
// @route   POST /api/slots
// @access  Private/Admin
const createSlot = async (req, res, next) => {
  try {
    let createdSlot = null;

    if (isDBConnected()) {
      try {
        createdSlot = await ParkingSlot.create(req.body);
      } catch (err) {
        console.warn('MongoDB slot creation fallback:', err.message);
      }
    }

    if (!createdSlot) {
      createdSlot = {
        _id: `slot_${Date.now()}`,
        status: 'available',
        ...req.body
      };
      memorySlots.push(createdSlot);
    }

    const io = getIO();
    if (io) {
      io.emit('slot_created', createdSlot);
    }

    return res.status(201).json({ success: true, data: createdSlot });
  } catch (error) {
    next(error);
  }
};

// @desc    Update parking slot status manually (Admin or Barrier Sensor)
// @route   PUT /api/slots/:id/status
// @access  Private/Admin
const updateSlotStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!['available', 'reserved', 'occupied'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid slot status' });
    }

    let updatedSlot = null;

    if (isDBConnected()) {
      try {
        updatedSlot = await ParkingSlot.findByIdAndUpdate(
          req.params.id,
          { status },
          { new: true, runValidators: true }
        );
      } catch (err) {
        // fallback
      }
    }

    // Also update in memory
    const memSlot = memorySlots.find(s => s._id === req.params.id || s.slotNumber === req.params.id);
    if (memSlot) {
      memSlot.status = status;
      if (!updatedSlot) updatedSlot = memSlot;
    }

    if (!updatedSlot) {
      return res.status(404).json({ success: false, message: 'Parking slot not found' });
    }

    const io = getIO();
    if (io) {
      io.emit('slot_status_updated', {
        slotId: updatedSlot._id,
        status: updatedSlot.status,
        slotNumber: updatedSlot.slotNumber,
        locationId: updatedSlot.locationId
      });
    }

    return res.json({ success: true, data: updatedSlot });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a parking slot (Admin only)
// @route   DELETE /api/slots/:id
// @access  Private/Admin
const deleteSlot = async (req, res, next) => {
  try {
    let deleted = false;

    if (isDBConnected()) {
      try {
        const slot = await ParkingSlot.findByIdAndDelete(req.params.id);
        if (slot) deleted = true;
      } catch (err) {
        // fallback
      }
    }

    const idx = memorySlots.findIndex(s => s._id === req.params.id || s.slotNumber === req.params.id);
    if (idx !== -1) {
      memorySlots.splice(idx, 1);
      deleted = true;
    }

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Parking slot not found' });
    }

    const io = getIO();
    if (io) {
      io.emit('slot_deleted', { slotId: req.params.id });
    }

    return res.json({ success: true, message: 'Slot deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getSlots, getSlotById, createSlot, updateSlotStatus, deleteSlot };
