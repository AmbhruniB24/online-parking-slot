
// SmartPark - Production Express Server
// Experiments 5 & 8: Security, Rate Limiting and Socket.IO

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

// Trust Render reverse proxy
app.set('trust proxy', 1);

// Allowed frontend origins
// Render CLIENT_URL can contain comma-separated URLs
const allowedOrigins = (
  process.env.CLIENT_URL || 'http://localhost:5173'
)
  .split(',')
  .map(origin => origin.trim())
  .filter(Boolean);

// Security headers
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error('CORS: Origin not allowed'));
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: true
}));

// Parse JSON requests
app.use(express.json());

// Rate limiter for API routes
app.use('/api', apiLimiter);

// Initialize Socket.IO
initSocket(server);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    project: 'SmartPark - Online Parking Slot Booking System',
    timestamp: new Date().toISOString()
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/slots', slotRoutes);
app.use('/api/bookings', bookingRoutes);

// Central error handler
app.use(errorHandler);

// Render provides PORT automatically
const PORT = process.env.PORT || 5000;

// Start server after database connection
async function startServer() {
  try {
    await connectDB();

    server.listen(PORT, () => {
      console.log('==============================================');
      console.log('SmartPark Backend Server Started');
      console.log(`Server running on port ${PORT}`);
      console.log('MongoDB connection initialized');
      console.log('Socket.IO initialized');
      console.log(
        `Gmail SMTP: ${
          process.env.GMAIL_USER || process.env.SMTP_USER
            ? 'Configured'
            : 'Not configured'
        }`
      );
      console.log('Allowed frontend origins:', allowedOrigins);
      console.log('==============================================');
    });
  } catch (error) {
    console.error('SmartPark server startup failed:', error);
    process.exit(1);
  }
}

startServer();
