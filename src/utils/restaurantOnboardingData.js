/**
 * Restaurant onboarding constants and configuration
 */

export const FORM_SECTIONS = {
  RESTAURANT_INFO: {
    title: "Restaurant Information",
    fields: ["restaurantName", "website", "description"],
  },
  OWNER_INFO: {
    title: "Owner Information",
    fields: ["ownerName", "email", "phone", "password"],
  },
  LOCATION_DETAILS: {
    title: "Location Details",
    fields: ["address", "city", "state", "postalCode", "country"],
  },
};

export const INITIAL_FORM_STATE = {
  country: "", // This will be set in the first step
  restaurantName: "",
  ownerName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  postalCode: "",
  website: "",
  description: "",
  specialDishes: "",
  deliveryAvailable: false,
  takeoutAvailable: false,
  logo: null, // File or URL (handled before submission)
  gstin: "", // For India
  vat: "", // For Nepal
};

// Formik-friendly alias for initial values
export const FORMIK_INITIAL_VALUES = { ...INITIAL_FORM_STATE };

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
    country: String(values.country || "").trim(),
    website: String(values.website || "").trim(),
    description: String(values.description || "").trim(),
    logo: values.logo || null,
    specialDishes: String(values.specialDishes || "").trim(),
    deliveryAvailable: Boolean(values.deliveryAvailable),
    takeoutAvailable: Boolean(values.takeoutAvailable),
    // Tax fields based on country
    gstin:
      values.country === "India"
        ? String(values.gstin || "").trim()
        : undefined,
    vat:
      values.country === "Nepal" ? String(values.vat || "").trim() : undefined,
    submittedAt: new Date().toISOString(),
  };
}

// Validation schema using Yup (requires `yup` installed)
import * as Yup from "yup";

export function getValidationSchema() {
  return Yup.object().shape({
    country: Yup.string().trim().required("Please select a country"),
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
    // Optional tax fields
    gstin: Yup.string().when("country", {
      is: "India",
      then: (schema) =>
        schema.matches(
          /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
          "Please provide a valid GSTIN format"
        ),
      otherwise: (schema) => schema.notRequired(),
    }),
    vat: Yup.string().when("country", {
      is: "Nepal",
      then: (schema) =>
        schema.matches(/^[0-9]{9}$/, "Please provide a valid VAT number"),
      otherwise: (schema) => schema.notRequired(),
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
};

export const API_ENDPOINTS = {
  RESTAURANT_ONBOARDING: "/api/restaurant-onboarding", // Keep for local fallback
  BACKEND_RESTAURANTS: "/restaurants", // NestJS backend endpoint
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
  website: "Website",
  description: "Restaurant Description",
  specialDishes: "Special Dishes & Signature Items",
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
