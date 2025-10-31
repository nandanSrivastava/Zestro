/**
 * Main API exports
 * Centralizes all API service imports
 */

// Base API client
export { default as apiClient } from "./apiClient";

// Specific API services
export { default as restaurantApi } from "./restaurantApi";
export { default as userApi } from "./userApi";
export { default as menuItemApi } from "./menuItemApi";
export { default as orderApi } from "./orderApi";

// Legacy/specific clients
export { default as waitlistClient } from "./waitlistClient";
export * from "./restaurantOnboardingClient";

// Named exports for convenience
export {
  createRestaurantWithOwner,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
} from "./restaurantApi";

export {
  createUser,
  getAllUsers,
  getUserByEmail,
  updateUser,
  deleteUser,
} from "./userApi";

export {
  createMenuItem,
  getAllMenuItems,
  getMenuItemById,
  updateMenuItem,
  deleteMenuItem,
} from "./menuItemApi";

export {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} from "./orderApi";

// Default export as unified API
export default {
  restaurant: () => import("./restaurantApi"),
  user: () => import("./userApi"),
  menuItem: () => import("./menuItemApi"),
  order: () => import("./orderApi"),
};
