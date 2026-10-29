// Helper Seeding Script for SmartPark Demo Data
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const ParkingSlot = require('./models/ParkingSlot');
const Booking = require('./models/Booking');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/parking_db');
    console.log('Connected to database for seeding...');

    // Clear old data
    await User.deleteMany();
    await ParkingSlot.deleteMany();
    await Booking.deleteMany();

    // 1. Create Users
    const admin = await User.create({
      name: 'Admin Manager',
      email: 'admin@smartpark.com',
      password: 'admin123',
      role: 'admin',
      phone: '+91 9876543210'
    });

    const driver = await User.create({
      name: 'Rahul Sharma',
      email: 'driver@smartpark.com',
      password: 'driver123',
      role: 'driver',
      phone: '+91 9123456780'
    });

    console.log('✅ Users seeded: admin@smartpark.com / driver@smartpark.com');

    // 2. Create Parking Slots
    const initialSlots = [
      // Floor 1 (Car & EV)
      { slotNumber: 'A-01', floor: 1, type: '4-wheeler', status: 'available', pricePerHour: 60 },
      { slotNumber: 'A-02', floor: 1, type: '4-wheeler', status: 'available', pricePerHour: 60 },
      { slotNumber: 'A-03', floor: 1, type: 'EV', status: 'available', pricePerHour: 90 },
      { slotNumber: 'A-04', floor: 1, type: 'EV', status: 'available', pricePerHour: 90 },
      { slotNumber: 'A-05', floor: 1, type: '4-wheeler', status: 'occupied', pricePerHour: 60 },
      { slotNumber: 'A-06', floor: 1, type: '4-wheeler', status: 'available', pricePerHour: 60 },

      // Floor 2 (Bikes & Cars)
      { slotNumber: 'B-01', floor: 2, type: '2-wheeler', status: 'available', pricePerHour: 30 },
      { slotNumber: 'B-02', floor: 2, type: '2-wheeler', status: 'available', pricePerHour: 30 },
      { slotNumber: 'B-03', floor: 2, type: '2-wheeler', status: 'available', pricePerHour: 30 },
      { slotNumber: 'B-04', floor: 2, type: '4-wheeler', status: 'available', pricePerHour: 50 },
      { slotNumber: 'B-05', floor: 2, type: '4-wheeler', status: 'available', pricePerHour: 50 },
      { slotNumber: 'B-06', floor: 2, type: '4-wheeler', status: 'available', pricePerHour: 50 }
    ];

    await ParkingSlot.insertMany(initialSlots);
    console.log(`✅ ${initialSlots.length} Parking Slots seeded successfully!`);

    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
