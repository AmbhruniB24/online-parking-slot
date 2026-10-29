// [Experiment 4 & 8] Parking Slot Controller with Location Filtering & Real-time WebSocket Broadcast
const ParkingSlot = require('../models/ParkingSlot');
const { getIO } = require('../sockets/socketHandler');

// @desc    Get all parking slots (with optional locationId/floor/type/status filter)
// @route   GET /api/slots
// @access  Public
const getSlots = async (req, res, next) => {
  try {
    const { locationId, floor, type, status } = req.query;
    const filter = {};
    if (locationId) filter.locationId = locationId;
    if (floor) filter.floor = Number(floor);
    if (type) filter.type = type;
    if (status) filter.status = status;

    const slots = await ParkingSlot.find(filter).sort({ floor: 1, slotNumber: 1 });
    res.json({ success: true, count: slots.length, data: slots });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single slot details
// @route   GET /api/slots/:id
// @access  Public
const getSlotById = async (req, res, next) => {
  try {
    const slot = await ParkingSlot.findById(req.params.id);
    if (!slot) {
      return res.status(404).json({ success: false, message: 'Parking slot not found' });
    }
    res.json({ success: true, data: slot });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new parking slot (Admin only)
// @route   POST /api/slots
// @access  Private/Admin
const createSlot = async (req, res, next) => {
  try {
    const slot = await ParkingSlot.create(req.body);

    const io = getIO();
    if (io) {
      io.emit('slot_created', slot);
    }

    res.status(201).json({ success: true, data: slot });
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

    const slot = await ParkingSlot.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!slot) {
      return res.status(404).json({ success: false, message: 'Parking slot not found' });
    }

    const io = getIO();
    if (io) {
      io.emit('slot_status_updated', {
        slotId: slot._id,
        status: slot.status,
        slotNumber: slot.slotNumber,
        locationId: slot.locationId
      });
    }

    res.json({ success: true, data: slot });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a parking slot (Admin only)
// @route   DELETE /api/slots/:id
// @access  Private/Admin
const deleteSlot = async (req, res, next) => {
  try {
    const slot = await ParkingSlot.findByIdAndDelete(req.params.id);
    if (!slot) {
      return res.status(404).json({ success: false, message: 'Parking slot not found' });
    }

    const io = getIO();
    if (io) {
      io.emit('slot_deleted', { slotId: slot._id });
    }

    res.json({ success: true, message: `Slot ${slot.slotNumber} deleted successfully` });
  } catch (error) {
    next(error);
  }
};

module.exports = { getSlots, getSlotById, createSlot, updateSlotStatus, deleteSlot };
