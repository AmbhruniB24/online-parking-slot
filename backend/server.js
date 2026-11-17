
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

const corsOptions = {
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps, curl, postman)
        if (!origin) return callback(null, true);
        
        // Always allow localhost and 127.0.0.1 on any port
        if (/^https?:\/\/localhost(:\d+)?$/.test(origin) || /^https?:\/\/127\.0\.0\.1(:\d+)?$/.test(origin)) {
            return callback(null, true);
        }

        // Always allow all Vercel domains (both production and preview deployments)
        if (/^https:\/\/.*\.vercel\.app$/.test(origin)) {
            return callback(null, true);
        }

        // Always allow Render domains
        if (/^https:\/\/.*\.onrender\.com$/.test(origin)) {
            return callback(null, true);
        }

        // Fallback: allow the requesting origin to prevent any CORS block
        return callback(null, true);
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(helmet({
    crossOriginResourcePolicy: false,
    crossOriginEmbedderPolicy: false
}));
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(express.json());

app.use('/api', apiLimiter);

initSocket(server);

app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'healthy',
        project: 'SmartPark - Online Parking Slot Booking System',
        database: 'connected',
        timestamp: new Date().toISOString()
    });
});

app.get('/api/test-email', async (req, res) => {
    const { sendEmail } = require('./services/notificationService');
    const targetEmail = req.query.email || 'ambhrunibhakte1@gmail.com';
    try {
        const result = await sendEmail(targetEmail, {
            ticketCode: `SP-${new Date().getFullYear()}-DEMO`,
            slotNumber: 'A-01',
            floor: 1,
            locationName: 'SmartPark Central Parking Facility',
            vehicleNumber: 'MH 01 AB 1234',
            vehicleType: '4-wheeler',
            durationHours: 1,
            totalAmount: 60,
            paymentMethod: 'UPI',
            transactionId: `TXN-${Date.now().toString().slice(-6)}`
        });
        return res.json({ success: true, targetEmail, result });
    } catch (err) {
        return res.status(500).json({ success: false, targetEmail, error: err.message });
    }
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
            console.log('CORS: Enabled for Vercel, Localhost & Cloud Terminals');
            console.log('======================================');
        });
    } catch (error) {
        console.error('Server startup failed:', error.message);
        process.exit(1);
    }
}

startServer();
