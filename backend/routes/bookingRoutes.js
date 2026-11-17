// [Experiment 4, 5, 6] Booking REST Endpoints with JWT Protection and RBAC
const express = require('express');
const router = express.Router();

const {
  createBooking,
  getMyBookings,
  getAllBookings,
  vacateBooking
} = require('../controllers/bookingController');

const { protect, optionalProtect, authorize } = require('../middlewares/authMiddleware');

router.post('/', optionalProtect, createBooking);
router.get('/my-bookings', protect, getMyBookings);
router.get('/', protect, authorize('admin'), getAllBookings);
router.put('/:bookingId/vacate', protect, vacateBooking);

module.exports = router;
