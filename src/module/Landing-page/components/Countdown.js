"use client";

import React, { memo, useEffect, useState } from "react";
import { useCountdown } from "../hooks/useCountdown";

/**
 * Individual time unit display component
 * @param {Object} props - Component props
 * @param {number} props.value - Time value to display
 * @param {string} props.label - Label for the time unit
 */
import styles from "../styles/Countdown.module.css";

const TimeUnit = memo(({ value, label }) => (
  <div
    className={`${styles.timeUnit} bg-[color:var(--zestro-orange-700)]/90 px-3 py-2 sm:px-4 sm:py-3 rounded-lg shadow-lg`}
  >
    <div className="text-lg sm:text-2xl font-bold text-white">
      {String(value).padStart(2, "0")}
    </div>
    <div className="text-xs sm:text-sm opacity-80 text-white capitalize">
      {label}
    </div>
  </div>
));

TimeUnit.displayName = "TimeUnit";

/**
 * Countdown component displaying time until launch
 * @param {Object} props - Component props
 * @param {Date|string} props.target - Target date for countdown
 * @param {Function} props.onComplete - Callback when countdown reaches zero
 * @param {string} props.className - Additional CSS classes
 */
const Countdown = memo(({ target, onComplete, className = "" }) => {
  const { days, hours, minutes, seconds, isComplete } = useCountdown(target, {
    onComplete,
  });

  // Show completion message if countdown is finished
  if (isComplete) {
    return (
      <div
        className={`text-center text-xl font-semibold text-white ${className}`}
      >
        🎉 Launched! 🎉
      </div>
    );
  }

  const timeUnits = [
    ["Days", days],
    ["Hours", hours],
    ["Minutes", minutes],
    ["Seconds", seconds],
  ];

  return (
    <div
      className={`flex gap-3 justify-center items-center text-center text-white flex-wrap ${className}`}
      role="timer"
      aria-label={`Countdown: ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds remaining`}
    >
      {timeUnits.map(([label, value]) => (
        <TimeUnit key={label} value={value} label={label} />
      ))}
    </div>
  );
});

Countdown.displayName = "Countdown";

export default Countdown;
