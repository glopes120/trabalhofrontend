import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css'; // Import the CSS

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <div className="card-image-container">
        <img src={product.image} alt={product.title} className="card-image" />
      </div>
      
      <div className="card-info">
        <h3>{product.title}</h3>
        <p className="card-price">{product.price.toFixed(2)} €</p>
      </div>

      <Link to={`/product/${product.id}`} className="card-button">
        View Details
      </Link>
    </div>
  );
};

export default ProductCard;