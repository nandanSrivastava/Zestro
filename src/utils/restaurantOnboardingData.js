/**
 * Restaurant onboarding constants and configuration
 */

export const CUISINE_TYPES = [
  "Italian",
  "Chinese",
  "Indian",
  "Mexican",
  "Japanese",
  "Thai",
  "French",
  "Mediterranean",
  "American",
  "Korean",
  "Vietnamese",
  "Greek",
  "Spanish",
  "Lebanese",
  "Turkish",
  "Ethiopian",
  "Moroccan",
  "Brazilian",
  "Fusion",
  "Other",
];

export const SEATING_CAPACITY_LIMITS = {
  min: 1,
  max: 1000,
};

export const FORM_SECTIONS = {
  RESTAURANT_INFO: {
    title: "Restaurant Information",
    fields: [
      "restaurantName",
      "cuisineType",
      "seatingCapacity",
      "website",
      "description",
    ],
  },
  OWNER_INFO: {
    title: "Owner Information",
    fields: ["ownerName", "email", "phone"],
  },
  LOCATION_DETAILS: {
    title: "Location Details",
    fields: ["address", "city", "state", "postalCode", "country"],
  },
};

export const INITIAL_FORM_STATE = {
  restaurantName: "",
  ownerName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  postalCode: "",
  country: "India",
  cuisineType: "",
  seatingCapacity: "",
  website: "",
  description: "",
  specialDishes: "",
  deliveryAvailable: false,
  takeoutAvailable: false,
  operatingHours: { from: "", to: "" },
  logo: null, // File or URL (handled before submission)
};

// Formik-friendly alias for initial values
export const FORMIK_INITIAL_VALUES = { ...INITIAL_FORM_STATE };

// Prepare API payload from form values (centralized)
export function toApiPayload(values) {
  return {
    restaurantName: String(values.restaurantName || "").trim(),
    ownerName: String(values.ownerName || "").trim(),
    email: String(values.email || "")
      .trim()
      .toLowerCase(),
    phone: String(values.phone || "").trim(),
    address: String(values.address || "").trim(),
    city: String(values.city || "").trim(),
    state: String(values.state || "").trim(),
    postalCode: String(values.postalCode || "").trim(),
    country: String(values.country || "India").trim(),
    cuisineType: String(values.cuisineType || "").trim(),
    seatingCapacity: parseInt(values.seatingCapacity) || 0,
    operatingHours: {
      from: String(values.operatingHours?.from || "").trim(),
      to: String(values.operatingHours?.to || "").trim(),
    },
    website: String(values.website || "").trim(),
    description: String(values.description || "").trim(),
    logo: values.logo || null,
    specialDishes: String(values.specialDishes || "").trim(),
    deliveryAvailable: Boolean(values.deliveryAvailable),
    takeoutAvailable: Boolean(values.takeoutAvailable),
    submittedAt: new Date().toISOString(),
  };
}

// Validation schema using Yup (requires `yup` installed)
import * as Yup from "yup";

export function getValidationSchema() {
  return Yup.object().shape({
    restaurantName: Yup.string().trim().required("Restaurant name is required"),
    ownerName: Yup.string().trim().required("Owner name is required"),
    email: Yup.string()
      .trim()
      .email("Please provide a valid email address")
      .required("Email is required"),
    phone: Yup.string().trim().required("Phone number is required"),
    address: Yup.string().trim().required("Address is required"),
    city: Yup.string().trim().required("City is required"),
    postalCode: Yup.string()
      .trim()
      .matches(/^[0-9]{5,6}$/, "Please provide a valid postal code")
      .required("Postal code is required"),
    cuisineType: Yup.string().required("Please select cuisine type"),
    seatingCapacity: Yup.number()
      .typeError("Seating capacity must be a number")
      .min(
        SEATING_CAPACITY_LIMITS.min,
        `Seating capacity must be at least ${SEATING_CAPACITY_LIMITS.min}`
      )
      .max(
        SEATING_CAPACITY_LIMITS.max,
        `Seating capacity must be at most ${SEATING_CAPACITY_LIMITS.max}`
      )
      .required("Seating capacity is required"),
    operatingHours: Yup.object().shape({
      from: Yup.string()
        .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time")
        .required("Opening time is required"),
      to: Yup.string()
        .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time")
        .required("Closing time is required"),
    }),
    website: Yup.string()
      .trim()
      .url("Please provide a valid website URL")
      .notRequired(),
    description: Yup.string().trim().notRequired(),
    specialDishes: Yup.string().trim().notRequired(),
    deliveryAvailable: Yup.boolean(),
    takeoutAvailable: Yup.boolean(),
  });
}

export const VALIDATION_MESSAGES = {
  REQUIRED_FIELD: (field) => `${field} is required`,
  INVALID_EMAIL: "Please provide a valid email address",
  INVALID_PHONE: "Please provide a valid phone number",
  INVALID_URL: "Please provide a valid website URL",
  INVALID_POSTAL_CODE: "Please provide a valid postal code",
  INVALID_SEATING_CAPACITY: `Seating capacity must be between ${SEATING_CAPACITY_LIMITS.min} and ${SEATING_CAPACITY_LIMITS.max}`,
  INVALID_OPERATING_HOURS: "Please provide valid operating hours",
  SELECT_CUISINE: "Please select cuisine type",
};

export const API_ENDPOINTS = {
  RESTAURANT_ONBOARDING: "/api/restaurant-onboarding",
};

export const FORM_LABELS = {
  restaurantName: "Restaurant Name",
  ownerName: "Owner/Manager Name",
  email: "Email Address",
  phone: "Phone Number",
  address: "Complete Address",
  city: "City",
  state: "State/Province",
  postalCode: "Postal Code",
  country: "Country",
  cuisineType: "Cuisine Type",
  seatingCapacity: "Seating Capacity",
  website: "Website",
  description: "Restaurant Description",
  specialDishes: "Special Dishes & Signature Items",
  operatingHoursFrom: "Opening Time",
  operatingHoursTo: "Closing Time",
  deliveryAvailable: "Delivery service available",
  takeoutAvailable: "Takeout service available",
};

export const FORM_PLACEHOLDERS = {
  restaurantName: "The Golden Spoon",
  ownerName: "John Doe",
  email: "owner@restaurant.com",
  phone: "+91 9876543210",
  address: "123 Main Street, Ground Floor",
  city: "Mumbai",
  state: "Maharashtra",
  postalCode: "400001",
  country: "India",
  website: "https://your-restaurant.com",
  description: "Tell us about your restaurant, ambiance, and specialties...",
  specialDishes: "List your most popular and signature dishes...",
};
