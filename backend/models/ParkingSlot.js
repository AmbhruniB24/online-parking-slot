// [Experiment 4] Parking Slot Schema with Location and Real-Time Status
const mongoose = require('mongoose');

const parkingSlotSchema = new mongoose.Schema(
  {
    slotNumber: {
      type: String,
      required: [true, 'Slot number is required (e.g. A-01)'],
      uppercase: true,
      trim: true
    },
    locationId: {
      type: String,
      required: true,
      default: 'mumbai-phoenix'
    },
    locationName: {
      type: String,
      default: 'Phoenix Marketcity Mall'
    },
    floor: {
      type: Number,
      required: [true, 'Floor number is required'],
      default: 1
    },
    type: {
      type: String,
      enum: ['2-wheeler', '4-wheeler', 'EV'],
      default: '4-wheeler'
    },
    status: {
      type: String,
      enum: ['available', 'reserved', 'occupied'],
      default: 'available'
    },
    pricePerHour: {
      type: Number,
      required: [true, 'Price per hour is required'],
      default: 50
    },
    currentBooking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking',
      default: null
    }
  },
  { timestamps: true }
);

// Compound index so slotNumber is unique per facility/location
parkingSlotSchema.index({ slotNumber: 1, locationId: 1 }, { unique: true });

module.exports = mongoose.model('ParkingSlot', parkingSlotSchema);
