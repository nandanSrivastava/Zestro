import { useState, useEffect } from "react";

/**
 * Custom hook for countdown functionality
 * @param {Date|string} targetDate - The target date to countdown to
 * @param {Object} options - Configuration options
 * @param {boolean} options.autoStart - Whether to start the countdown automatically
 * @param {Function} options.onComplete - Callback function when countdown reaches zero
 * @returns {Object} Countdown state and controls
 */
export function useCountdown(targetDate, options = {}) {
  const { autoStart = true, onComplete } = options;

  const [timeLeft, setTimeLeft] = useState(() => {
    const target = new Date(targetDate).getTime();
    const now = new Date().getTime();
    return Math.max(0, target - now);
  });

  const [isActive, setIsActive] = useState(autoStart);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let intervalId = null;

    if (isActive && timeLeft > 0) {
      intervalId = setInterval(() => {
        const target = new Date(targetDate).getTime();
        const now = new Date().getTime();
        const difference = target - now;

        if (difference > 0) {
          setTimeLeft(difference);
        } else {
          setTimeLeft(0);
          setIsActive(false);
          setIsComplete(true);
          if (onComplete) {
            onComplete();
          }
        }
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isActive, targetDate, timeLeft, onComplete]);

  // Calculate time units
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  const start = () => setIsActive(true);
  const pause = () => setIsActive(false);
  const reset = () => {
    const target = new Date(targetDate).getTime();
    const now = new Date().getTime();
    setTimeLeft(Math.max(0, target - now));
    setIsComplete(false);
    setIsActive(autoStart);
  };

  return {
    timeLeft,
    days,
    hours,
    minutes,
    seconds,
    isActive,
    isComplete,
    start,
    pause,
    reset,
  };
}
