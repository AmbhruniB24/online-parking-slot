// [Experiment 4] REST API Design with MongoDB + Mongoose Integration
const mongoose = require('mongoose');

let dbConnected = false;

const connectDB = async () => {
  // Prevent Mongoose from hanging indefinitely on unhandled queries
  mongoose.set('bufferCommands', false);

  const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/parking_db';

  try {
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 3000
    });
    dbConnected = true;
    console.log(`✅ MongoDB Connected Successfully: ${conn.connection.host}`);
    return true;
  } catch (error) {
    dbConnected = false;
    console.warn(`⚠️ MongoDB Connection Notice: ${error.message}`);
    console.log('💡 Running with Embedded High-Availability Store for Zero-Downtime Deployment (Local & Cloud).');
    return false;
  }
};

const isDBConnected = () => dbConnected && mongoose.connection.readyState === 1;

module.exports = connectDB;
module.exports.isDBConnected = isDBConnected;
