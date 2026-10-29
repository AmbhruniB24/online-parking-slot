// [Experiment 4] REST API Design with MongoDB + Mongoose Integration
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/parking_db';
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 4000
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}:${conn.connection.port || 27017}`);
    return true;
  } catch (error) {
    console.warn(`⚠️ MongoDB Connection Warning: ${error.message}`);
    console.log('💡 Note: Start MongoDB (mongod.exe) or configure MONGO_URI in backend/.env.');
    return false;
  }
};

module.exports = connectDB;
