// [Experiment 3] Manage complex state with Redux Store configuration
import { configureStore } from '@reduxjs/toolkit';
import bookingReducer from './bookingSlice';

export const store = configureStore({
  reducer: {
    booking: bookingReducer
  }
});
