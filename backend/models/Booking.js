
// [Experiment 4] Mongoose Schema for Parking Slot Bookings with Payment & Notification tracking
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
      index: true
    },
    slotId: {
      type: String,
      required: true
    },
    slotNumber: {
      type: String,
      default: ''
    },
    floor: {
      type: String,
      default: ''
    },
    vehicleType: {
      type: String,
      enum: ['4-wheeler', '2-wheeler', 'EV', 'heavy'],
      default: '4-wheeler'
    },
    vehicleNumber: {
      type: String,
      required: true,
      trim: true,
      uppercase: true
    },
    durationHours: {
      type: Number,
      required: true,
      min: 1
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0
    },
    locationName: {
      type: String,
      default: 'SmartPark Cyber City'
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: ''
    },
    phoneNumber: {
      type: String,
      trim: true,
      default: ''
    },
    paymentMethod: {
      type: String,
      enum: ['upi', 'credit_card', 'debit_card', 'card', 'net_banking', 'cash'],
      default: 'upi'
    },
    paymentStatus: {
      type: String,
      enum: ['paid', 'pending', 'refunded'],
      default: 'paid'
    },
    transactionId: {
      type: String,
      default: () => `TXN-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`
    },
    ticketCode: {
      type: String,
      required: true,
      unique: true
    },
    status: {
      type: String,
      enum: ['confirmed', 'vacated', 'cancelled'],
      default: 'confirmed'
    },
    notificationsDispatched: {
      email: { type: Boolean, default: false }
    },
    vacatedAt: {
      type: Date,
      default: null
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Booking', bookingSchema);
