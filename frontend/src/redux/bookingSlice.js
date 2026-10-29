// [Experiment 3] Manage complex state with Redux Toolkit (Multi-step Booking & Payment Flow)
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedSlot: null,
  vehicleNumber: '',
  vehicleType: '4-wheeler',
  durationHours: 1,
  totalAmount: 50,
  paymentMethod: 'upi', // 'upi' | 'card' | 'netbanking'
  upiApp: 'gpay', // 'gpay' | 'phonepe' | 'paytm' | 'bhim'
  upiId: '',
  phoneNumber: '',
  email: '',
  cardNumber: '',
  cardExpiry: '',
  cardCvv: '',
  cardName: '',
  step: 1, // 1: Vehicle & Duration -> 2: Payment Method -> 3: Processing -> 4: Confirmed Pass
  confirmedBooking: null,
  notifications: null
};

export const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    selectSlot: (state, action) => {
      state.selectedSlot = action.payload;
      state.vehicleType = action.payload.type || '4-wheeler';
      state.totalAmount = (action.payload.pricePerHour || 50) * state.durationHours;
      state.step = 1;
    },
    setVehicleDetails: (state, action) => {
      const { vehicleNumber, vehicleType, phoneNumber, email } = action.payload;
      if (vehicleNumber !== undefined) state.vehicleNumber = vehicleNumber.toUpperCase();
      if (vehicleType !== undefined) state.vehicleType = vehicleType;
      if (phoneNumber !== undefined) state.phoneNumber = phoneNumber;
      if (email !== undefined) state.email = email;
    },
    setDurationHours: (state, action) => {
      const hours = Math.max(1, Number(action.payload) || 1);
      state.durationHours = hours;
      if (state.selectedSlot) {
        state.totalAmount = (state.selectedSlot.pricePerHour || 50) * hours;
      }
    },
    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
    setUpiDetails: (state, action) => {
      const { upiApp, upiId } = action.payload;
      if (upiApp !== undefined) state.upiApp = upiApp;
      if (upiId !== undefined) state.upiId = upiId;
    },
    setCardDetails: (state, action) => {
      const { cardNumber, cardExpiry, cardCvv, cardName } = action.payload;
      if (cardNumber !== undefined) state.cardNumber = cardNumber;
      if (cardExpiry !== undefined) state.cardExpiry = cardExpiry;
      if (cardCvv !== undefined) state.cardCvv = cardCvv;
      if (cardName !== undefined) state.cardName = cardName;
    },
    setStep: (state, action) => {
      state.step = action.payload;
    },
    setConfirmedBooking: (state, action) => {
      state.confirmedBooking = action.payload.booking || action.payload;
      state.notifications = action.payload.notifications || null;
      state.step = 4;
    },
    resetBookingFlow: (state) => {
      state.selectedSlot = null;
      state.vehicleNumber = '';
      state.durationHours = 1;
      state.totalAmount = 50;
      state.paymentMethod = 'upi';
      state.upiId = '';
      state.cardNumber = '';
      state.cardExpiry = '';
      state.cardCvv = '';
      state.cardName = '';
      state.step = 1;
      state.confirmedBooking = null;
      state.notifications = null;
    }
  }
});

export const {
  selectSlot,
  setVehicleDetails,
  setDurationHours,
  setPaymentMethod,
  setUpiDetails,
  setCardDetails,
  setStep,
  setConfirmedBooking,
  resetBookingFlow
} = bookingSlice.actions;

export default bookingSlice.reducer;
