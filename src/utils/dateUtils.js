/**
 * Date utility functions for the Hero section
 */

/**
 * Calculate the target date for the next month's 21st day
 * @returns {Date} Target date for countdown
 */
export function getNextMonth21() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const targetMonth = month === 11 ? 0 : month + 1;
  const targetYear = month === 11 ? year + 1 : year;
  return new Date(Date.UTC(targetYear, targetMonth, 21, 0, 0, 0));
}

/**
 * Format a date for display
 * @param {Date} date - Date to format
 * @returns {string} Formatted date string
 */
export function formatLaunchDate(date) {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Check if a date is in the past
 * @param {Date} date - Date to check
 * @returns {boolean} True if date is in the past
 */
export function isPastDate(date) {
  return new Date() > date;
}
