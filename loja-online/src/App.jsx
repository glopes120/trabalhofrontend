import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; // Import the notification library
import Navbar from './components/Navbar';

// Import Pages
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import CheckoutSuccess from './pages/CheckoutSuccess'; // Import the new success page

/**
 * App Component
 * Main configuration of routes and global notifications.
 */
function App() {
  return (
    <div>
      {/* Toaster Configuration (VIP Notifications).
        Placed here to be available throughout the app.
        Defined a dark style to contrast with the clean design.
      */}
      <Toaster 
        position="top-center" 
        reverseOrder={false}
        toastOptions={{
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        }}
      />

      {/* The Navbar is outside Routes to appear on all pages */}
      <Navbar />

      {/* Main container with margins (defined in index.css) */}
      <div className="app-container">
        <Routes>
          {/* Route for Home Page (Product List) */}
          <Route path="/" element={<Home />} />

          {/* Route for Product Details (Dynamic ID) */}
          <Route path="/product/:id" element={<ProductDetail />} />

          {/* Route for Shopping Cart */}
          <Route path="/cart" element={<Cart />} />
          
          {/* Route for Success Page (Confetti) */}
          <Route path="/checkout-success" element={<CheckoutSuccess />} />
          
          {/* Fallback Route: If URL is invalid, go back to Home */}
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;