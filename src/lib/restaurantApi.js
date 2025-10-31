import apiClient from "./apiClient";

/**
 * Restaurant API service
 * Handles all restaurant-related API calls
 */

/**
 * Create restaurant with owner
 * @param {Object} data - Restaurant and owner data
 * @returns {Promise<Object>} Created restaurant and user
 */
export async function createRestaurantWithOwner(data) {
  return apiClient.post("/restaurants", data);
}

/**
 * Get all restaurants
 * @returns {Promise<Array>} List of restaurants
 */
export async function getAllRestaurants() {
  return apiClient.get("/restaurants");
}

/**
 * Get restaurant by ID
 * @param {string} id - Restaurant ID
 * @returns {Promise<Object>} Restaurant data
 */
export async function getRestaurantById(id) {
  return apiClient.get(`/restaurants/${id}`);
}

/**
 * Update restaurant
 * @param {string} id - Restaurant ID
 * @param {Object} data - Updated restaurant data
 * @returns {Promise<Object>} Updated restaurant
 */
export async function updateRestaurant(id, data) {
  return apiClient.patch(`/restaurants/${id}`, data);
}

/**
 * Delete restaurant
 * @param {string} id - Restaurant ID
 * @returns {Promise<Object>} Deleted restaurant
 */
export async function deleteRestaurant(id) {
  return apiClient.delete(`/restaurants/${id}`);
}

// Export as default object
const restaurantApi = {
  createRestaurantWithOwner,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
};

export default restaurantApi;
