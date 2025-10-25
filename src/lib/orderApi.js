import apiClient from "./apiClient";

/**
 * Order API service
 * Handles all order-related API calls
 */

/**
 * Create new order
 * @param {Object} orderData - Order data
 * @returns {Promise<Object>} Created order
 */
export async function createOrder(orderData) {
  return apiClient.post("/orders", orderData);
}

/**
 * Get all orders
 * @returns {Promise<Array>} List of orders
 */
export async function getAllOrders() {
  return apiClient.get("/orders");
}

/**
 * Get order by ID
 * @param {string} id - Order ID
 * @returns {Promise<Object>} Order data
 */
export async function getOrderById(id) {
  return apiClient.get(`/orders/${id}`);
}

/**
 * Update order
 * @param {string} id - Order ID
 * @param {Object} orderData - Updated order data
 * @returns {Promise<Object>} Updated order
 */
export async function updateOrder(id, orderData) {
  return apiClient.patch(`/orders/${id}`, orderData);
}

/**
 * Delete order
 * @param {string} id - Order ID
 * @returns {Promise<Object>} Deleted order
 */
export async function deleteOrder(id) {
  return apiClient.delete(`/orders/${id}`);
}

// Export as default object
const orderApi = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
};

export default orderApi;
