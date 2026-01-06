import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../services/api';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';
import './ProductDetail.css'; // Importação do novo CSS

/**
 * ProductDetail Page
 * Updated version with design system (CSS classes).
 * Maintains fetch logic, error handling, and context.
 */
const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  // Local states
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Effect to fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await getProductById(id);
        setProduct(data);
        setError(null);
      } catch (err) {
        console.error("Error loading details:", err);
        setError("Could not load the product. Check your connection.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  // Handler to add to cart
const handleAddToCart = () => {
  if (product) {
    addToCart(product);
    // Instead of alert(), we use this:
    toast.success(`Added: ${product.title}`, {
      style: {
        border: '1px solid #10b981',
        padding: '16px',
        color: '#1f2937',
        fontWeight: 'bold'
      },
      iconTheme: {
        primary: '#10b981',
        secondary: '#FFFAEE',
      },
    });
  }
};

  
  // --- RENDERING: ERROR ---
  if (error || !product) {
    return (
      <div className="error-container">
        <h2 style={{ color: '#ef4444', marginBottom: '1rem' }}>
          {error || "Product not found"}
        </h2>
        <Link to="/" className="back-link">Back to Store</Link>
      </div>
    );
  }

  // --- RENDERING: MAIN ---
  return (
    <div className="detail-container">
      {/* Left Column: Image */}
      <div className="detail-image-wrapper">
        <img 
          src={product.image} 
          alt={product.title} 
          className="detail-image" 
        />
      </div>

      {/* Right Column: Information */}
      <div className="detail-info">
        <span className="detail-category">{product.category}</span>
        
        <h1 className="detail-title">{product.title}</h1>
        
        <div className="detail-price">
          {product.price.toFixed(2)} €
        </div>
        
        <p className="detail-description">
          {product.description}
        </p>
        
        <button 
          className="add-to-cart-btn" 
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;