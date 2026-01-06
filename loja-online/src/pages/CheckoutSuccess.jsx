import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Confetti from 'react-confetti';
import { useCart } from '../context/CartContext';
import './CheckoutSuccess.css'; // Já vamos criar este CSS

const CheckoutSuccess = () => {
  const { clearCart } = useCart();

  // useEffect executes as soon as the page opens
  useEffect(() => {
    // Clear the cart because the purchase was "completed"
    clearCart();
  }, []); // [] ensures it only runs once

  // Generates a random order number to seem real
  const orderNumber = Math.floor(Math.random() * 1000000);

  return (
    <div className="success-container">
      {/* Falling confetti animation */}
      <Confetti 
        width={window.innerWidth} 
        height={window.innerHeight} 
        recycle={false} // Stops falling after a few seconds
        numberOfPieces={500}
      />

      <div className="success-card">
        {/* Green Checkmark SVG */}
        <div className="checkmark-wrapper">
          <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
            <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
            <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
          </svg>
        </div>

        <h1 className="success-title">Payment Confirmed!</h1>
        
        <p className="success-message">
          Thank you for your purchase. Your order is being processed.
        </p>

        <div className="order-info">
          <span>Order No.:</span>
          <span className="order-id">#{orderNumber}</span>
        </div>

        <Link to="/" className="back-home-btn">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default CheckoutSuccess;