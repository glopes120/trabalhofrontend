import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast'; // Biblioteca de notificações
import './Cart.css'; // O CSS do layout "VIP"

/**
 * Cart Page
 * Responsible for managing the final order.
 * Includes professional layout, visual feedback (toasts), and redirection.
 */
const Cart = () => {
  // Hook for programmatic navigation (redirect after click)
  const navigate = useNavigate();

  // We consume the global cart context
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    cartTotal,
    cartCount
  } = useCart();

  // --- RENDERING: EMPTY STATE ---
  if (cart.length === 0) {
    return (
      <div className="cart-container">
        <div className="empty-state">
          <h2 className="empty-title">Your cart is empty 🛒</h2>
          <p style={{ marginBottom: '2rem', color: '#64748b' }}>
            Haven't chosen your favorite products yet?
          </p>
          <Link to="/" className="back-btn">
            Back to Store
          </Link>
        </div>
      </div>
    );
  }

  // --- RENDERING: CART WITH ITEMS ---
  return (
    <div className="cart-container">
      <h1 className="cart-title">Shopping Cart</h1>

      <div className="cart-content">
        
        {/* --- LEFT COLUMN: PRODUCT LIST --- */}
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              
              {/* Product Image */}
              <img src={item.image} alt={item.title} className="item-image" />
              
              {/* Title and Unit Price */}
              <div className="item-details">
                <h3 className="item-title">{item.title}</h3>
                <p className="item-price-unit">Unit: {item.price.toFixed(2)} €</p>
              </div>

              {/* Quantity Controls and Remove */}
              <div className="item-controls">
                
                {/* + and - Buttons */}
                <div className="quantity-wrapper">
                  <button 
                    className="qty-btn"
                    disabled={item.quantity <= 1} // Disables if it's 1
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </button>
                  
                  <span className="qty-value">{item.quantity}</span>
                  
                  <button 
                    className="qty-btn"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>

                {/* Total Price for this Item (Qty * Price) */}
                <div className="item-total">
                  {(item.price * item.quantity).toFixed(2)} €
                </div>

                {/* Remove Button with Toast Notification */}
                <button 
                  className="remove-btn"
                  onClick={() => {
                    removeFromCart(item.id);
                    // Visual feedback
                    toast.error('Item removed', {
                      position: 'bottom-right',
                      style: { background: '#333', color: '#fff' }
                    });
                  }}
                  title="Remove from cart"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* --- RIGHT COLUMN: ORDER SUMMARY (Sticky) --- */}
        <div className="cart-summary">
          <h2 className="summary-title">Order Summary</h2>
          
          <div className="summary-row">
            <span>Items ({cartCount})</span>
            <span>{cartTotal.toFixed(2)} €</span>
          </div>
          
          <div className="summary-row">
            <span>Shipping</span>
            <span style={{ color: '#10b981', fontWeight: 'bold' }}>Free</span>
          </div>

          <div className="summary-row total">
            <span>Total</span>
            <span>{cartTotal.toFixed(2)} €</span>
          </div>

          {/* Checkout Button -> Takes to Success Page */}
          <button 
            className="checkout-btn"
            onClick={() => {
              navigate('/checkout-success');
            }}
          >
            Complete Purchase
          </button>

          {/* Clear Cart Button */}
          <button 
            className="clear-cart-btn"
            onClick={() => {
              clearCart();
              toast('Cart emptied', { icon: '🗑️' });
            }}
          >
            Empty Cart
          </button>
        </div>

      </div>
    </div>
  );
};

export default Cart;