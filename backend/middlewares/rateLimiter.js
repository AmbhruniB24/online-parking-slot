// [Experiment 5] Create secure, production-ready RESTful APIs: Anti-Hoarding Rate Limiter
const rateLimit = require('express-rate-limit');

// General API limiter: 100 requests per 15 minutes
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again after 15 minutes'
  }
});

// Slot booking limiter: max 15 booking attempts per 10 minutes to prevent bot slot-hoarding
const bookingLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 15,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Booking request limit reached. Please wait before attempting another reservation.'
  }
});

module.exports = { apiLimiter, bookingLimiter };
