// [Experiment 2] React Hooks: Countdown Timer for Slot Reservation Hold
import React from 'react';
import { Clock } from 'lucide-react';

export default function Timer({ formattedTime, isExpired }) {
  return (
    <div className={`inline-flex items-center px-3 py-1.5 rounded-xl border text-sm font-semibold transition-all ${
      isExpired
        ? 'bg-rose-50 text-rose-700 border-rose-200'
        : 'bg-amber-50 text-amber-800 border-amber-300 animate-pulse'
    }`}>
      <Clock className="w-4 h-4 mr-1.5" />
      <span>{isExpired ? 'Reservation Expired' : `Slot Hold Expires in: ${formattedTime}`}</span>
    </div>
  );
}
