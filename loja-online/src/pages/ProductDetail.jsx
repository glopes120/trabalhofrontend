import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../services/api';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';
import './ProductDetail.css'; // Importação do novo CSS

/**
 * ProductDetail Page
 * Versão atualizada com design system (CSS classes).
 * Mantém a lógica de fetch, tratamento de erros e contexto.
 */
const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  // Estados locais
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Efeito para buscar dados do produto
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await getProductById(id);
        setProduct(data);
        setError(null);
      } catch (err) {
        console.error("Erro ao carregar detalhes:", err);
        setError("Não foi possível carregar o produto. Verifique a sua conexão.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  // Handler para adicionar ao carrinho
const handleAddToCart = () => {
  if (product) {
    addToCart(product);
    // Em vez de alert(), usamos isto:
    toast.success(`Adicionado: ${product.title}`, {
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

  
  // --- RENDERIZAÇÃO: ERRO ---
  if (error || !product) {
    return (
      <div className="error-container">
        <h2 style={{ color: '#ef4444', marginBottom: '1rem' }}>
          {error || "Produto não encontrado"}
        </h2>
        <Link to="/" className="back-link">Voltar à Loja</Link>
      </div>
    );
  }

  // --- RENDERIZAÇÃO: PRINCIPAL ---
  return (
    <div className="detail-container">
      {/* Coluna da Esquerda: Imagem */}
      <div className="detail-image-wrapper">
        <img 
          src={product.image} 
          alt={product.title} 
          className="detail-image" 
        />
      </div>

      {/* Coluna da Direita: Informações */}
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
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;