/**
 * Generic API client for making HTTP requests
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

/**
 * Default fetch configuration
 */
const defaultConfig = {
  headers: {
    "Content-Type": "application/json",
  },
};

/**
 * Handle API response
 * @param {Response} response - Fetch response object
 * @returns {Promise} Parsed response data
 */
async function handleResponse(response) {
  if (!response.ok) {
    const error = new Error(`HTTP error! status: ${response.status}`);
    error.status = response.status;
    error.statusText = response.statusText;

    try {
      const errorData = await response.json();
      error.data = errorData;
    } catch {
      // If response is not JSON, just use status text
    }

    throw error;
  }

  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  }

  return response.text();
}

/**
 * Make API request
 * @param {string} endpoint - API endpoint
 * @param {Object} options - Request options
 * @returns {Promise} API response
 */
async function makeRequest(endpoint, options = {}) {
  const url = endpoint.startsWith("http")
    ? endpoint
    : `${API_BASE_URL}${endpoint}`;

  const config = {
    ...defaultConfig,
    ...options,
    headers: {
      ...defaultConfig.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    return await handleResponse(response);
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
}

/**
 * GET request
 * @param {string} endpoint - API endpoint
 * @param {Object} options - Request options
 * @returns {Promise} API response
 */
export function get(endpoint, options = {}) {
  return makeRequest(endpoint, {
    ...options,
    method: "GET",
  });
}

/**
 * POST request
 * @param {string} endpoint - API endpoint
 * @param {Object} data - Request data
 * @param {Object} options - Request options
 * @returns {Promise} API response
 */
export function post(endpoint, data = null, options = {}) {
  return makeRequest(endpoint, {
    ...options,
    method: "POST",
    body: data ? JSON.stringify(data) : null,
  });
}

/**
 * PUT request
 * @param {string} endpoint - API endpoint
 * @param {Object} data - Request data
 * @param {Object} options - Request options
 * @returns {Promise} API response
 */
export function put(endpoint, data = null, options = {}) {
  return makeRequest(endpoint, {
    ...options,
    method: "PUT",
    body: data ? JSON.stringify(data) : null,
  });
}

/**
 * PATCH request
 * @param {string} endpoint - API endpoint
 * @param {Object} data - Request data
 * @param {Object} options - Request options
 * @returns {Promise} API response
 */
export function patch(endpoint, data = null, options = {}) {
  return makeRequest(endpoint, {
    ...options,
    method: "PATCH",
    body: data ? JSON.stringify(data) : null,
  });
}

/**
 * DELETE request
 * @param {string} endpoint - API endpoint
 * @param {Object} options - Request options
 * @returns {Promise} API response
 */
export function del(endpoint, options = {}) {
  return makeRequest(endpoint, {
    ...options,
    method: "DELETE",
  });
}

/**
 * Upload file
 * @param {string} endpoint - API endpoint
 * @param {FormData} formData - Form data with file
 * @param {Object} options - Request options
 * @returns {Promise} API response
 */
export function upload(endpoint, formData, options = {}) {
  const uploadOptions = {
    ...options,
    method: "POST",
    body: formData,
  };

  // Remove Content-Type header to let browser set it for FormData
  delete uploadOptions.headers?.["Content-Type"];

  return makeRequest(endpoint, uploadOptions);
}

/**
 * API client object with all methods
 */
const apiClient = {
  get,
  post,
  put,
  patch,
  delete: del,
  upload,
};

export default apiClient;
