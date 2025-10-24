/**
 * Restaurant onboarding constants and configuration
 */

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
import { getCountryByName } from "../config/countries";

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
    state: Yup.string().trim().notRequired(),
    postalCode: Yup.string()
      .trim()
      .matches(/^[0-9]{5,6}$/, "Please provide a valid postal code")
      .required("Postal code is required"),
    // Optional tax fields
    gstin: Yup.string().when("country", {
      is: "India",
      then: (schema) => {
        const countryConfig = getCountryByName("India");
        return schema.matches(
          countryConfig?.taxFieldValidation,
          countryConfig?.taxFieldValidationMessage
        );
      },
      otherwise: (schema) => schema.notRequired(),
    }),
    vat: Yup.string().when("country", {
      is: "Nepal",
      then: (schema) => {
        const countryConfig = getCountryByName("Nepal");
        return schema.matches(
          countryConfig?.taxFieldValidation,
          countryConfig?.taxFieldValidationMessage
        );
      },
      otherwise: (schema) => schema.notRequired(),
    }),
    website: Yup.string()
      .trim()
      .url("Please provide a valid website URL")
      .notRequired(),
    description: Yup.string().trim().notRequired(),
    logo: Yup.mixed().notRequired(),
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
  logo: "Restaurant Logo",
  gstin: "GSTIN",
  vat: "VAT Number",
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
  gstin: "Enter GSTIN number (optional)",
  vat: "Enter VAT number (optional)",
};
