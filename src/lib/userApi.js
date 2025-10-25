import apiClient from "./apiClient";

/**
 * User API service
 * Handles all user-related API calls
 */

/**
 * Create new user
 * @param {Object} userData - User data
 * @returns {Promise<Object>} Created user
 */
export async function createUser(userData) {
  return apiClient.post("/users", userData);
}

/**
 * Get all users
 * @returns {Promise<Array>} List of users
 */
export async function getAllUsers() {
  return apiClient.get("/users");
}

/**
 * Get user by email
 * @param {string} email - User email
 * @returns {Promise<Object>} User data
 */
export async function getUserByEmail(email) {
  return apiClient.get(`/users/${email}`);
}

/**
 * Update user
 * @param {string} id - User ID
 * @param {Object} userData - Updated user data
 * @returns {Promise<Object>} Updated user
 */
export async function updateUser(id, userData) {
  return apiClient.patch(`/users/${id}`, userData);
}

/**
 * Delete user
 * @param {string} id - User ID
 * @returns {Promise<Object>} Deleted user
 */
export async function deleteUser(id) {
  return apiClient.delete(`/users/${id}`);
}

// Export as default object
const userApi = {
  createUser,
  getAllUsers,
  getUserByEmail,
  updateUser,
  deleteUser,
};

export default userApi;
