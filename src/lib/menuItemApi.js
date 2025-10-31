import apiClient from "./apiClient";

/**
 * Menu Item API service
 * Handles all menu item-related API calls
 */

/**
 * Create new menu item
 * @param {Object} menuItemData - Menu item data
 * @returns {Promise<Object>} Created menu item
 */
export async function createMenuItem(menuItemData) {
  return apiClient.post("/menu-items", menuItemData);
}

/**
 * Get all menu items
 * @returns {Promise<Array>} List of menu items
 */
export async function getAllMenuItems() {
  return apiClient.get("/menu-items");
}

/**
 * Get menu item by ID
 * @param {string} id - Menu item ID
 * @returns {Promise<Object>} Menu item data
 */
export async function getMenuItemById(id) {
  return apiClient.get(`/menu-items/${id}`);
}

/**
 * Update menu item
 * @param {string} id - Menu item ID
 * @param {Object} menuItemData - Updated menu item data
 * @returns {Promise<Object>} Updated menu item
 */
export async function updateMenuItem(id, menuItemData) {
  return apiClient.patch(`/menu-items/${id}`, menuItemData);
}

/**
 * Delete menu item
 * @param {string} id - Menu item ID
 * @returns {Promise<Object>} Deleted menu item
 */
export async function deleteMenuItem(id) {
  return apiClient.delete(`/menu-items/${id}`);
}

// Export as default object
const menuItemApi = {
  createMenuItem,
  getAllMenuItems,
  getMenuItemById,
  updateMenuItem,
  deleteMenuItem,
};

export default menuItemApi;
