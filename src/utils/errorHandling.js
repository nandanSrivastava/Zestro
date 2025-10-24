/**
 * Error handling utilities for consistent error management across the application
 */

/**
 * Custom error class for API errors
 */
export class ApiError extends Error {
  constructor(message, status, statusText, data) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.statusText = statusText;
    this.data = data;
  }
}

/**
 * Custom error class for validation errors
 */
export class ValidationError extends Error {
  constructor(message, field, value) {
    super(message);
    this.name = "ValidationError";
    this.field = field;
    this.value = value;
  }
}

/**
 * Error types enum
 */
export const ERROR_TYPES = {
  NETWORK: "NETWORK_ERROR",
  VALIDATION: "VALIDATION_ERROR",
  API: "API_ERROR",
  ABORT: "ABORT_ERROR",
  UNKNOWN: "UNKNOWN_ERROR",
};

/**
 * Get user-friendly error message based on error type and status
 * @param {Error} error - The error object
 * @returns {string} User-friendly error message
 */
export function getErrorMessage(error) {
  if (!error) {
    return "An unexpected error occurred";
  }

  // Handle abort errors (user cancelled)
  if (error.name === "AbortError") {
    return "Request was cancelled";
  }

  // Handle API errors
  if (error instanceof ApiError || error.status) {
    const status = error.status;

    switch (status) {
      case 400:
        return (
          error.data?.message ||
          "Invalid request. Please check your input and try again."
        );
      case 401:
        return "You are not authorized to perform this action.";
      case 403:
        return "Access denied. You do not have permission to perform this action.";
      case 404:
        return "The requested resource was not found.";
      case 409:
        return (
          error.data?.message ||
          "A conflict occurred. The resource may already exist."
        );
      case 422:
        return (
          error.data?.message || "Validation failed. Please check your input."
        );
      case 429:
        return "Too many requests. Please wait a moment and try again.";
      case 500:
        return "A server error occurred. Please try again later.";
      case 502:
      case 503:
      case 504:
        return "Service temporarily unavailable. Please try again later.";
      default:
        return (
          error.data?.message ||
          error.message ||
          "An error occurred. Please try again."
        );
    }
  }

  // Handle validation errors
  if (error instanceof ValidationError) {
    return error.message;
  }

  // Handle network errors
  if (error.name === "TypeError" && error.message.includes("fetch")) {
    return "Network error. Please check your internet connection and try again.";
  }

  // Handle generic errors
  return error.message || "An unexpected error occurred. Please try again.";
}

/**
 * Get error type based on error object
 * @param {Error} error - The error object
 * @returns {string} Error type from ERROR_TYPES enum
 */
export function getErrorType(error) {
  if (!error) {
    return ERROR_TYPES.UNKNOWN;
  }

  if (error.name === "AbortError") {
    return ERROR_TYPES.ABORT;
  }

  if (error instanceof ApiError || error.status) {
    return ERROR_TYPES.API;
  }

  if (error instanceof ValidationError) {
    return ERROR_TYPES.VALIDATION;
  }

  if (error.name === "TypeError" && error.message.includes("fetch")) {
    return ERROR_TYPES.NETWORK;
  }

  return ERROR_TYPES.UNKNOWN;
}

/**
 * Check if error is retryable
 * @param {Error} error - The error object
 * @returns {boolean} True if error is retryable, false otherwise
 */
export function isRetryableError(error) {
  if (!error) {
    return false;
  }

  // Network errors are retryable
  if (getErrorType(error) === ERROR_TYPES.NETWORK) {
    return true;
  }

  // Some API errors are retryable
  if (error.status) {
    const retryableStatuses = [408, 429, 500, 502, 503, 504];
    return retryableStatuses.includes(error.status);
  }

  return false;
}

/**
 * Log error with appropriate level and context
 * @param {Error} error - The error object
 * @param {Object} context - Additional context for logging
 */
export function logError(error, context = {}) {
  const errorType = getErrorType(error);
  const errorMessage = getErrorMessage(error);

  const logData = {
    error: {
      name: error?.name,
      message: error?.message,
      status: error?.status,
      type: errorType,
    },
    context,
    timestamp: new Date().toISOString(),
  };

  // Only log to console in development
  if (process.env.NODE_ENV === "development") {
    switch (errorType) {
      case ERROR_TYPES.NETWORK:
      case ERROR_TYPES.API:
        console.error("API Error:", logData);
        break;
      case ERROR_TYPES.VALIDATION:
        console.warn("Validation Error:", logData);
        break;
      case ERROR_TYPES.ABORT:
        console.info("Request Aborted:", logData);
        break;
      default:
        console.error("Unknown Error:", logData);
    }
  }

  // In production, you would send this to your logging service
  // e.g., Sentry, LogRocket, etc.
}

/**
 * Create a standardized error response object
 * @param {Error} error - The error object
 * @param {Object} context - Additional context
 * @returns {Object} Standardized error response
 */
export function createErrorResponse(error, context = {}) {
  return {
    success: false,
    error: {
      message: getErrorMessage(error),
      type: getErrorType(error),
      retryable: isRetryableError(error),
    },
    context,
  };
}
