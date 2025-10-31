import { API_ENDPOINTS } from "../utils/restaurantOnboardingData";
import apiClient from "./apiClient";

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
 * Transform frontend form data to backend API format
 * @param {Object} data - Frontend form data
 * @returns {Object} Backend API compatible data
 */
function transformToBackendFormat(data) {
  console.log("🔄 Transforming form data:", data);

  const transformed = {
    // Restaurant details
    restaurantName: data.restaurantName,
    gstNumber: data.gstin || data.vat || "DEFAULT-GST-001", // Use tax number or default
    website: data.website || undefined,
    restaurantLogo: data.logo || undefined,
    description: data.description || undefined,

    // Address Details
    address: data.address,
    city: data.city,
    state: data.state || "N/A", // Backend requires state, provide default if empty
    postalCode: data.postalCode,
    country: data.country,

    // User details (owner)
    userName: data.ownerName,
    email: data.email,
    password: "ZestroOwner@123", // Default password - should be handled properly in production
    role: "owner",
    phone: data.phone || undefined,
    addressLine: data.address || undefined, // Duplicate for user address
    profilePicture: undefined, // Handle file upload separately if needed
  };

  console.log("✅ Transformed data:", transformed);
  return transformed;
}

/**
 * Submit restaurant onboarding application to backend API
 * @param {Object} data - Restaurant onboarding data
 * @param {Object} options - Request options (signal, etc.)
 * @returns {Promise<Object>} Response data
 * @throws {RestaurantOnboardingError} When submission fails
 */
export async function submitRestaurantOnboarding(data, options = {}) {
  console.log("🚀 Starting restaurant onboarding submission...");
  console.log("📝 Original form data:", data);

  try {
    // Transform data to backend format
    const backendData = transformToBackendFormat(data);

    // Try backend API first
    try {
      console.log("📡 Attempting backend API call...");
      const response = await apiClient.post(
        API_ENDPOINTS.BACKEND_RESTAURANTS,
        backendData,
        {
          signal: options.signal,
        }
      );

      console.log("✅ Backend API success:", response);
      return {
        success: true,
        message: "Restaurant application submitted successfully",
        data: response,
      };
    } catch (backendError) {
      console.warn(
        "❌ Backend API failed, falling back to frontend API:",
        backendError
      );

      // Fallback to frontend API route
      console.log("🔄 Trying frontend API fallback...");
      const response = await fetch(API_ENDPOINTS.RESTAURANT_ONBOARDING, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        signal: options.signal,
      });

      const responseData = await response.json();
      console.log("📦 Frontend API response:", responseData);

      if (!response.ok) {
        throw new RestaurantOnboardingError(
          responseData.message || "Failed to submit restaurant application",
          response.status,
          responseData.errors || []
        );
      }

      return responseData;
    }
  } catch (error) {
    console.error("💥 Submission error:", error);

    // Re-throw abort errors as-is
    if (error.name === "AbortError") {
      throw error;
    }

    // Re-throw our custom errors as-is
    if (error instanceof RestaurantOnboardingError) {
      throw error;
    }

    // Handle API client errors
    if (error.status && error.data) {
      throw new RestaurantOnboardingError(
        error.data.message || "Failed to submit restaurant application",
        error.status,
        error.data.errors || []
      );
    }

    // Handle network errors and other unexpected errors
    throw new RestaurantOnboardingError(
      "Network error. Please check your connection and try again.",
      0,
      []
    );
  }
}
