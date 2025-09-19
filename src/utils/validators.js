/**
 * Email validation function
 * @param {string} email - Email address to validate
 * @returns {boolean} True if email is valid, false otherwise
 */
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Phone number validation function
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if phone is valid, false otherwise
 */
export function isValidPhone(phone) {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ""));
}

/**
 * URL validation function
 * @param {string} url - URL to validate
 * @returns {boolean} True if URL is valid, false otherwise
 */
export function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Name validation function
 * @param {string} name - Name to validate
 * @param {Object} options - Validation options
 * @param {number} options.minLength - Minimum length (default: 2)
 * @param {number} options.maxLength - Maximum length (default: 50)
 * @returns {boolean} True if name is valid, false otherwise
 */
export function isValidName(name, options = {}) {
  const { minLength = 2, maxLength = 50 } = options;

  if (!name || typeof name !== "string") {
    return false;
  }

  const trimmedName = name.trim();
  const nameRegex = /^[a-zA-Z\s\-'\.]+$/;

  return (
    trimmedName.length >= minLength &&
    trimmedName.length <= maxLength &&
    nameRegex.test(trimmedName)
  );
}

/**
 * Generic form field validation
 * @param {Object} fields - Object containing field values
 * @param {Object} rules - Validation rules for each field
 * @returns {Object} Validation result with errors
 */
export function validateForm(fields, rules) {
  const errors = {};

  Object.keys(rules).forEach((fieldName) => {
    const value = fields[fieldName];
    const fieldRules = rules[fieldName];

    if (fieldRules.required && (!value || value.toString().trim() === "")) {
      errors[fieldName] =
        fieldRules.requiredMessage || `${fieldName} is required`;
      return;
    }

    if (value && fieldRules.validator && !fieldRules.validator(value)) {
      errors[fieldName] = fieldRules.message || `${fieldName} is invalid`;
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Sanitize HTML string to prevent XSS
 * @param {string} str - String to sanitize
 * @returns {string} Sanitized string
 */
export function sanitizeHtml(str) {
  if (!str) return "";

  const htmlEntities = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "/": "&#x2F;",
  };

  return str.replace(/[&<>"'/]/g, (char) => htmlEntities[char]);
}

/**
 * Debounce function to limit how often a function can fire
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export function debounce(func, wait) {
  let timeout;

  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
