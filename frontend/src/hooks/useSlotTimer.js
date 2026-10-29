// [Experiment 2] Custom React Hook for Countdown Timer with useEffect
import { useState, useEffect } from 'react';

/**
 * Custom hook to manage reservation hold countdown
 * @param {number} initialSeconds - Total hold duration in seconds
 * @param {Function} onExpire - Callback executed when timer reaches 0
 */
export function useSlotTimer(initialSeconds = 600, onExpire) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(false);

  const startTimer = (seconds = initialSeconds) => {
    setSecondsLeft(seconds);
    setIsActive(true);
  };

  const stopTimer = () => {
    setIsActive(false);
  };

  useEffect(() => {
    let interval = null;

    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft <= 0 && isActive) {
      setIsActive(false);
      if (onExpire) onExpire();
    }

    // Cleanup interval on unmount or pause
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, secondsLeft, onExpire]);

  const minutes = Math.floor(secondsLeft / 60);
  const remainingSeconds = secondsLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;

  return {
    secondsLeft,
    formattedTime,
    isActive,
    isExpired: secondsLeft <= 0,
    startTimer,
    stopTimer
  };
}
