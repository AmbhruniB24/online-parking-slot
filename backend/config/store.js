// [Experiment 4] Resilient Data Store - Synchronizes with MongoDB when connected,
// and provides zero-downtime persistence when running on serverless/cloud environments (Render/Vercel) without a local mongod.
const bcrypt = require('bcryptjs');

let memoryUsers = [
  {
    _id: 'user_admin_001',
    name: 'Admin Manager',
    email: 'admin@smartpark.com',
    password: '', // will hash on init
    plainPassword: 'admin123',
    role: 'admin',
    phone: '+91 9876543210'
  },
  {
    _id: 'user_driver_001',
    name: 'Rahul Sharma',
    email: 'driver@smartpark.com',
    password: '',
    plainPassword: 'driver123',
    role: 'driver',
    phone: '+91 9123456780'
  },
  {
    _id: 'user_ambhruni_001',
    name: 'Ambhruni Bhakte',
    email: 'ambhrunibhakte1@gmail.com',
    password: '',
    plainPassword: 'password123',
    role: 'admin',
    phone: '+91 9876543210'
  }
];

let memorySlots = [
  { _id: 'slot_1', slotNumber: 'A-01', locationId: 'mumbai-phoenix', locationName: 'Phoenix Marketcity Mall', floor: 1, type: '4-wheeler', status: 'available', pricePerHour: 60 },
  { _id: 'slot_2', slotNumber: 'A-02', locationId: 'mumbai-phoenix', locationName: 'Phoenix Marketcity Mall', floor: 1, type: '4-wheeler', status: 'available', pricePerHour: 60 },
  { _id: 'slot_3', slotNumber: 'A-03', locationId: 'mumbai-phoenix', locationName: 'Phoenix Marketcity Mall', floor: 1, type: 'EV', status: 'available', pricePerHour: 90 },
  { _id: 'slot_4', slotNumber: 'A-04', locationId: 'mumbai-phoenix', locationName: 'Phoenix Marketcity Mall', floor: 1, type: 'EV', status: 'available', pricePerHour: 90 },
  { _id: 'slot_5', slotNumber: 'A-05', locationId: 'mumbai-phoenix', locationName: 'Phoenix Marketcity Mall', floor: 1, type: '4-wheeler', status: 'occupied', pricePerHour: 60 },
  { _id: 'slot_6', slotNumber: 'A-06', locationId: 'mumbai-phoenix', locationName: 'Phoenix Marketcity Mall', floor: 1, type: '4-wheeler', status: 'available', pricePerHour: 60 },
  { _id: 'slot_7', slotNumber: 'B-01', locationId: 'mumbai-phoenix', locationName: 'Phoenix Marketcity Mall', floor: 2, type: '2-wheeler', status: 'available', pricePerHour: 30 },
  { _id: 'slot_8', slotNumber: 'B-02', locationId: 'mumbai-phoenix', locationName: 'Phoenix Marketcity Mall', floor: 2, type: '2-wheeler', status: 'available', pricePerHour: 30 },
  { _id: 'slot_9', slotNumber: 'B-03', locationId: 'mumbai-phoenix', locationName: 'Phoenix Marketcity Mall', floor: 2, type: '2-wheeler', status: 'available', pricePerHour: 30 },
  { _id: 'slot_10', slotNumber: 'B-04', locationId: 'mumbai-phoenix', locationName: 'Phoenix Marketcity Mall', floor: 2, type: '4-wheeler', status: 'available', pricePerHour: 50 },
  { _id: 'slot_11', slotNumber: 'B-05', locationId: 'mumbai-phoenix', locationName: 'Phoenix Marketcity Mall', floor: 2, type: '4-wheeler', status: 'available', pricePerHour: 50 },
  { _id: 'slot_12', slotNumber: 'B-06', locationId: 'mumbai-phoenix', locationName: 'Phoenix Marketcity Mall', floor: 2, type: '4-wheeler', status: 'available', pricePerHour: 50 }
];

let memoryBookings = [];

// Initialize hashed passwords
(async () => {
  for (const u of memoryUsers) {
    if (u.plainPassword && !u.password) {
      u.password = await bcrypt.hash(u.plainPassword, 10);
    }
  }
})();

module.exports = {
  memoryUsers,
  memorySlots,
  memoryBookings
};
