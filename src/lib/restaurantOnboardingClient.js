import { API_ENDPOINTS } from "../utils/restaurantOnboardingData";

/**
 * Custom error class for restaurant onboarding API errors
 */
export class RestaurantOnboardingError extends Error {
  constructor(message, status, errors = []) {
    super(message);
    this.name = "RestaurantOnboardingError";
    this.status = status;
    this.errors = errors;
  }
}

/**
 * Submit restaurant onboarding application
 * @param {Object} data - Restaurant onboarding data
 * @param {Object} options - Request options (signal, etc.)
 * @returns {Promise<Object>} Response data
 * @throws {RestaurantOnboardingError} When submission fails
 */
export async function submitRestaurantOnboarding(data, options = {}) {
  try {
    const response = await fetch(API_ENDPOINTS.RESTAURANT_ONBOARDING, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      signal: options.signal,
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new RestaurantOnboardingError(
        responseData.message || "Failed to submit restaurant application",
        response.status,
        responseData.errors || []
      );
    }

    return responseData;
  } catch (error) {
    // Re-throw abort errors as-is
    if (error.name === "AbortError") {
      throw error;
    }

    // Re-throw our custom errors as-is
    if (error instanceof RestaurantOnboardingError) {
      throw error;
    }

    // Handle network errors and other unexpected errors
    throw new RestaurantOnboardingError(
      "Network error. Please check your connection and try again.",
      0,
      []
    );
  }
}
