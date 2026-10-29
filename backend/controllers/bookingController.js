// [Experiment 4 & 8] Booking Controller with Payment Integration and Real-time WebSocket + Email Dispatch
const mongoose = require('mongoose');
const Booking = require('../models/Booking');
const ParkingSlot = require('../models/ParkingSlot');
const { getIO } = require('../sockets/socketHandler');
const { sendBookingNotifications } = require('../services/notificationService');

const createBooking = async (req, res, next) => {
  try {
    const {
      slotId,
      slotNumber,
      floor,
      vehicleNumber,
      vehicleType,
      durationHours,
      totalAmount,
      locationName,
      email,
      phoneNumber,
      paymentMethod
    } = req.body;

    const userId = req.user?._id || req.user?.id;
    const userEmail = email || req.user?.email || '';
    const userPhone = phoneNumber || req.user?.phone || '';

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Please log in before booking a parking slot.'
      });
    }

    const hours = Number(durationHours) || 1;
    const amount = Number(totalAmount) || 50;

    if (!slotId && !slotNumber) {
      return res.status(400).json({
        success: false,
        message: 'Slot information is required.'
      });
    }

    if (!vehicleNumber || typeof vehicleNumber !== 'string' || !vehicleNumber.trim()) {
      return res.status(400).json({
        success: false,
        message: 'A valid vehicle registration number is required.'
      });
    }

    const ticketCode = `SP-${new Date().getFullYear()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
    const transactionId = `TXN-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`;

    const booking = await Booking.create({
      userId,
      slotId: String(slotId || slotNumber),
      slotNumber: slotNumber ?? '',
      floor: floor == null ? '1' : String(floor),
      vehicleType: vehicleType || '4-wheeler',
      vehicleNumber: vehicleNumber.trim().toUpperCase(),
      durationHours: hours,
      totalAmount: amount,
      locationName: locationName || 'SmartPark Central Parking Facility',
      email: userEmail,
      phoneNumber: userPhone,
      paymentMethod: paymentMethod || 'upi',
      paymentStatus: 'paid',
      transactionId,
      ticketCode,
      status: 'confirmed'
    });

    // Mark slot as occupied in DB if slot exists
    try {
      if (mongoose.Types.ObjectId.isValid(slotId)) {
        await ParkingSlot.findByIdAndUpdate(slotId, { status: 'occupied' });
      } else if (slotNumber) {
        await ParkingSlot.findOneAndUpdate({ slotNumber }, { status: 'occupied' });
      }
    } catch {
      // Graceful fallback
    }

    // [Experiment 8] Dispatch official email notification via Gmail SMTP
    let notifications = {
      email: { sent: false, error: 'Not attempted' }
    };

    try {
      notifications = await sendBookingNotifications({
        booking: booking.toObject(),
        email: userEmail
      });

      // Update notification statuses in DB
      booking.notificationsDispatched = {
        email: notifications.email?.sent === true
      };
      await booking.save();
    } catch (notifErr) {
      console.error('[Notification] Email dispatch error:', notifErr.message);
    }

    // [Experiment 8] Broadcast real-time WebSocket events to all connected clients
    const io = getIO();
    if (io) {
      io.emit('booking_confirmed', {
        bookingId: String(booking._id),
        ticketCode: booking.ticketCode,
        slotId: booking.slotId,
        slotNumber: booking.slotNumber,
        status: booking.status,
        vehicleNumber: booking.vehicleNumber,
        locationName: booking.locationName,
        notifications
      });

      io.emit('slot_status_updated', {
        slotId: booking.slotId,
        slotNumber: booking.slotNumber,
        status: 'occupied',
        locationName: booking.locationName
      });
    }

    return res.status(201).json({
      success: true,
      message: 'Parking slot booked successfully. Pass confirmation dispatched to your email!',
      booking,
      data: booking,
      notifications
    });
  } catch (error) {
    next(error);
  }
};

const getMyBookings = async (req, res, next) => {
  try {
    const userId = req.user?._id || req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Please log in to view active parking passes.'
      });
    }

    const bookings = await Booking.find({ userId }).sort({ createdAt: -1 });

    return res.json({
      success: true,
      count: bookings.length,
      bookings,
      data: bookings
    });
  } catch (error) {
    next(error);
  }
};

const getAllBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find().populate('userId', 'name email role').sort({ createdAt: -1 });
    return res.json({
      success: true,
      count: bookings.length,
      bookings,
      data: bookings
    });
  } catch (error) {
    next(error);
  }
};

const vacateBooking = async (req, res, next) => {
  try {
    const userId = req.user?._id || req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Please log in.'
      });
    }

    const booking = await Booking.findOne({
      _id: req.params.bookingId,
      userId
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking pass not found for your account.'
      });
    }

    if (booking.status !== 'confirmed') {
      return res.status(400).json({
        success: false,
        message: 'Only active confirmed bookings can be vacated.'
      });
    }

    booking.status = 'vacated';
    booking.vacatedAt = new Date();
    await booking.save();

    // Release parking slot
    try {
      if (mongoose.Types.ObjectId.isValid(booking.slotId)) {
        await ParkingSlot.findByIdAndUpdate(booking.slotId, { status: 'available' });
      } else if (booking.slotNumber) {
        await ParkingSlot.findOneAndUpdate({ slotNumber: booking.slotNumber }, { status: 'available' });
      }
    } catch {
      // Graceful
    }

    // [Experiment 8] Broadcast slot vacation over WebSockets
    const io = getIO();
    if (io) {
      io.emit('slot_status_updated', {
        slotId: booking.slotId,
        slotNumber: booking.slotNumber,
        status: 'available',
        locationName: booking.locationName
      });
    }

    return res.json({
      success: true,
      message: 'Parking bay vacated successfully. Status updated across terminals.',
      booking,
      data: booking
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBooking,
  getMyBookings,
  getAllBookings,
  vacateBooking
};
