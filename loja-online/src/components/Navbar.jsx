import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Navbar.css'; // Import the specific CSS

const Navbar = () => {
  const { cartCount } = useCart();

  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">
        Lojinha do Vasco
      </Link>

      <div className="nav-links">
        <Link to="/" className="nav-link">Products</Link>
        
        <Link to="/cart" className="nav-link cart-icon-container">
          Cart 🛒
          {cartCount > 0 && (
            <span className="cart-badge">{cartCount}</span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;