
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

app.set('trust proxy', 1);

const allowedOrigins = (
    process.env.CLIENT_URL || 'http://localhost:5173'
)
    .split(',')
    .map(origin => origin.trim().replace(/\/$/, ''))
    .filter(Boolean);

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        console.error('[CORS] Blocked origin:', origin);
        return callback(new Error('Origin not allowed by CORS'));
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true
};

app.use(helmet());
app.use(cors(corsOptions));

app.use(express.json());

app.use('/api', apiLimiter);

initSocket(server, allowedOrigins);

app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'healthy',
        project: 'SmartPark - Online Parking Slot Booking System',
        database: 'connected',
        timestamp: new Date().toISOString()
    });
});

app.use('/api/auth', authRoutes);
app.use('/api/slots', slotRoutes);
app.use('/api/bookings', bookingRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

async function startServer() {
    try {
        await connectDB();

        server.listen(PORT, () => {
            console.log('======================================');
            console.log('SmartPark Backend Started');
            console.log('Port:', PORT);
            console.log('MongoDB connection initialized');
            console.log('Socket.IO initialized');
            console.log('Allowed origins:', allowedOrigins);
            console.log('======================================');
        });
    } catch (error) {
        console.error('Server startup failed:', error.message);
        process.exit(1);
    }
}

startServer();
