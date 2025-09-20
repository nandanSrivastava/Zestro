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

  // Initialize to 0 for SSR to avoid hydratation mismatches; compute actual value on client
  const [timeLeft, setTimeLeft] = useState(() => 0);

  const [isActive, setIsActive] = useState(autoStart);
  const [isComplete, setIsComplete] = useState(false);

  // compute initial timeLeft on client mount or when targetDate changes
  useEffect(() => {
    const targetInit = new Date(targetDate).getTime();
    const nowInit = Date.now();
    setTimeLeft(Math.max(0, targetInit - nowInit));
  }, [targetDate]);

  // interval to update timeLeft when active
  useEffect(() => {
    if (!isActive) return;

    const intervalId = setInterval(() => {
      const target = new Date(targetDate).getTime();
      const now = Date.now();
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
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isActive, targetDate, onComplete]);

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
