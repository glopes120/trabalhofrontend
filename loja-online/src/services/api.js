/**
 * src/services/api.js
 * This file centralizes all calls to the external API.
 * We chose the FakeStoreAPI as allowed in the statement.
 * Advantages of this approach:
 * 1. If the API URL changes, we only change it here.
 * 2. The component code stays cleaner, focused only on rendering data.
 * 3. Facilitates error handling in a single place (if necessary).
 */

const BASE_URL = "https://fakestoreapi.com";

/**
 * Fetches all products from the API.
 * @returns {Promise<Array>} Returns a promise with the array of products.
 */
export const getAllProducts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/products`);
    
    // We check if the response was successful (status 200-299)
    if (!response.ok) {
      throw new Error(`Error fetching products: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    // We rethrow the error to be handled in the component that called this function
    // This allows showing error messages to the user (e.g., "Failed to load")
    console.error("Error in getAllProducts request:", error);
    throw error;
  }
};

/**
 * Fetches the details of a single product by ID.
 * Useful for the details page.
 * @param {number|string} id - The ID of the product to fetch.
 * @returns {Promise<Object>} Returns a promise with the product object.
 */
export const getProductById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    
    if (!response.ok) {
      throw new Error(`Error fetching product ${id}: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error in getProductById request (${id}):`, error);
    throw error;
  }
};

/**
 * Fetches all available categories.
 * Useful for creating the filters.
 * @returns {Promise<Array>} Array of strings with the category names.
 */
export const getCategories = async () => {
  try {
    const response = await fetch(`${BASE_URL}/products/categories`);
    
    if (!response.ok) {
      throw new Error("Error fetching categories");
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in getCategories request:", error);
    throw error;
  }
};

/**
 * Fetches products filtered by a specific category.
 * @param {string} category - Name of the category.
 * @returns {Promise<Array>} Array of products in that category.
 */
export const getProductsByCategory = async (category) => {
  try {
    // The API requires the category to be encoded if it has spaces or special characters
    const response = await fetch(`${BASE_URL}/products/category/${encodeURIComponent(category)}`);
    
    if (!response.ok) {
      throw new Error(`Error fetching category ${category}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error in getProductsByCategory request (${category}):`, error);
    throw error;
  }
};