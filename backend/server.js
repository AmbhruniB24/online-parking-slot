// [Experiment 5 & 8] Production-Ready Express Server with Helmet, Rate Limiter, and Socket.IO
require('dotenv').config();

const http = require('http');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const connectDB = require('./config/db');
const { initSocket } = require('./sockets/socketHandler');
const { apiLimiter } = require('./middlewares/rateLimiter');
const errorHandler = require('./middlewares/errorMiddleware');

const authRoutes = require('./routes/authRoutes');
const slotRoutes = require('./routes/slotRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();
const server = http.createServer(app);

// Security Headers
app.use(helmet());

// CORS configuration for local React Vite & deployment
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true
}));

app.use(express.json());

// Apply rate limiter to /api
app.use('/api', apiLimiter);

// [Experiment 8] Initialize Socket.IO
initSocket(server);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    project: 'SmartPark - Online Parking Slot Booking System',
    timestamp: new Date().toISOString()
  });
});

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/slots', slotRoutes);
app.use('/api/bookings', bookingRoutes);

// Central Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

async function startServer() {
  await connectDB();

  server.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(`🚀 SmartPark Backend Server listening on port ${PORT}`);
    console.log(`⚡ WebSocket Engine (Socket.IO) ready for live slot sync`);
    console.log(`📧 Official Email Notification Engine: Active (Gmail SMTP: ${process.env.SMTP_USER})`);
    console.log(`=======================================================`);
  });
}

startServer();
