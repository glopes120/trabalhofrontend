import React, { createContext, useState, useEffect, useContext } from 'react';

// Context Creation
const CartContext = createContext();

/**
 * CartProvider
 * This component wraps the application (in main.jsx or App.jsx) and provides
 * the cart state to all child components.
 */
export const CartProvider = ({ children }) => {
  // State initialization:
  // Try to read from localStorage first. If it doesn't exist, start with empty array [].
  // This fulfills the persistence requirement when refreshing the page.
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('shoppingCart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // useEffect to save to localStorage whenever the 'cart' state changes.
  // Ensures that localStorage is always synchronized with the app state.
  useEffect(() => {
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
  }, [cart]);

  /**
   * Adds a product to the cart.
   * If the product already exists, increments the quantity.
   * If not, adds with quantity 1.
   * @param {Object} product - Product object from the API.
   */
  const addToCart = (product) => {
    setCart((prevCart) => {
      // Check if the item is already in the cart
      const itemExists = prevCart.find((item) => item.id === product.id);

      if (itemExists) {
        // If it exists, map the old array and update only the quantity of that item
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // If it doesn't exist, add the new item with quantity initialized to 1
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  /**
   * Removes a product from the cart by ID.
   * @param {number} id - ID of the product to remove.
   */
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  /**
   * Updates the quantity of a specific item.
   * Prevents the quantity from being less than 1.
   * @param {number} id - ID of the product.
   * @param {number} newQuantity - New quantity.
   */
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return; // Safety: does not allow quantity 0 or negative

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  /**
   * Clears the entire cart.
   */
  const clearCart = () => {
    setCart([]);
  };

  /**
   * Derived calculations (Computed values):
   * We don't need to store the total in state, we can calculate on-the-fly.
   * Fulfills the requirement to calculate subtotal and total.
   */
  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

/**
 * Custom hook to use the cart easily in any component.
 * Usage example: const { addToCart } = useCart();
 */
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};