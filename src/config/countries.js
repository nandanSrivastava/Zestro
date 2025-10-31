/**
 * Supported countries configuration
 */

export const SUPPORTED_COUNTRIES = [
  {
    code: "IN",
    name: "India",
    flag: "/images/india.png",
    taxField: "gstin",
    taxFieldLabel: "GSTIN",
    taxFieldPlaceholder: "Enter GSTIN number (optional)",
    taxFieldValidation:
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
    taxFieldValidationMessage: "Please provide a valid GSTIN format",
  },
  {
    code: "NP",
    name: "Nepal",
    flag: "/images/nepal.png",
    taxField: "vat",
    taxFieldLabel: "VAT Number",
    taxFieldPlaceholder: "Enter VAT number (optional)",
    taxFieldValidation: /^[0-9]{9}$/,
    taxFieldValidationMessage: "Please provide a valid VAT number",
  },
];

/**
 * Get country configuration by country name
 * @param {string} countryName - The name of the country
 * @returns {Object|null} Country configuration object or null if not found
 */
export function getCountryByName(countryName) {
  return (
    SUPPORTED_COUNTRIES.find((country) => country.name === countryName) || null
  );
}

/**
 * Get country configuration by country code
 * @param {string} countryCode - The ISO code of the country
 * @returns {Object|null} Country configuration object or null if not found
 */
export function getCountryByCode(countryCode) {
  return (
    SUPPORTED_COUNTRIES.find((country) => country.code === countryCode) || null
  );
}

/**
 * Get all supported country names
 * @returns {string[]} Array of country names
 */
export function getSupportedCountryNames() {
  return SUPPORTED_COUNTRIES.map((country) => country.name);
}

/**
 * Check if a country is supported
 * @param {string} countryName - The name of the country to check
 * @returns {boolean} True if country is supported, false otherwise
 */
export function isCountrySupported(countryName) {
  return SUPPORTED_COUNTRIES.some((country) => country.name === countryName);
}
