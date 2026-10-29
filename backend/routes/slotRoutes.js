// [Experiment 4, 5, 6] RESTful Parking Slot Routes
const express = require('express');
const { body } = require('express-validator');
const {
  getSlots,
  getSlotById,
  createSlot,
  updateSlotStatus,
  deleteSlot
} = require('../controllers/slotController');
const { protect, authorize } = require('../middlewares/authMiddleware');

const router = express.Router();

// Input validation for creating a slot
const slotValidation = [
  body('slotNumber').notEmpty().withMessage('Slot number is required'),
  body('floor').isInt({ min: 1 }).withMessage('Floor must be a positive integer'),
  body('pricePerHour').isFloat({ min: 10 }).withMessage('Price per hour must be at least 10')
];

router.route('/')
  .get(getSlots)
  .post(protect, authorize('admin'), slotValidation, createSlot);

router.route('/:id')
  .get(getSlotById)
  .delete(protect, authorize('admin'), deleteSlot);

router.put('/:id/status', protect, authorize('admin'), updateSlotStatus);

module.exports = router;
