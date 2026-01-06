import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast'; // Biblioteca de notificações
import './Cart.css'; // O CSS do layout "VIP"

/**
 * Cart Page
 * Responsável por gerir a encomenda final.
 * Inclui layout profissional, feedback visual (toasts) e redirecionamento.
 */
const Cart = () => {
  // Hook para navegação programática (redirecionar após clique)
  const navigate = useNavigate();

  // Consumimos o contexto global do carrinho
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    cartTotal,
    cartCount
  } = useCart();

  // --- RENDERIZAÇÃO: ESTADO VAZIO ---
  if (cart.length === 0) {
    return (
      <div className="cart-container">
        <div className="empty-state">
          <h2 className="empty-title">O seu carrinho está vazio 🛒</h2>
          <p style={{ marginBottom: '2rem', color: '#64748b' }}>
            Ainda não escolheu os seus produtos favoritos?
          </p>
          <Link to="/" className="back-btn">
            Voltar à Loja
          </Link>
        </div>
      </div>
    );
  }

  // --- RENDERIZAÇÃO: CARRINHO COM ITENS ---
  return (
    <div className="cart-container">
      <h1 className="cart-title">Carrinho de Compras</h1>

      <div className="cart-content">
        
        {/* --- COLUNA DA ESQUERDA: LISTA DE PRODUTOS --- */}
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              
              {/* Imagem do Produto */}
              <img src={item.image} alt={item.title} className="item-image" />
              
              {/* Título e Preço Unitário */}
              <div className="item-details">
                <h3 className="item-title">{item.title}</h3>
                <p className="item-price-unit">Unid: {item.price.toFixed(2)} €</p>
              </div>

              {/* Controlos de Quantidade e Remover */}
              <div className="item-controls">
                
                {/* Botões + e - */}
                <div className="quantity-wrapper">
                  <button 
                    className="qty-btn"
                    disabled={item.quantity <= 1} // Desativa se for 1
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

                {/* Preço Total deste Item (Qtd * Preço) */}
                <div className="item-total">
                  {(item.price * item.quantity).toFixed(2)} €
                </div>

                {/* Botão Remover com Notificação Toast */}
                <button 
                  className="remove-btn"
                  onClick={() => {
                    removeFromCart(item.id);
                    // Feedback visual
                    toast.error('Item removido', {
                      position: 'bottom-right',
                      style: { background: '#333', color: '#fff' }
                    });
                  }}
                  title="Remover do carrinho"
                >
                  Remover
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* --- COLUNA DA DIREITA: RESUMO DO PEDIDO (Sticky) --- */}
        <div className="cart-summary">
          <h2 className="summary-title">Resumo do Pedido</h2>
          
          <div className="summary-row">
            <span>Itens ({cartCount})</span>
            <span>{cartTotal.toFixed(2)} €</span>
          </div>
          
          <div className="summary-row">
            <span>Envio</span>
            <span style={{ color: '#10b981', fontWeight: 'bold' }}>Grátis</span>
          </div>

          <div className="summary-row total">
            <span>Total</span>
            <span>{cartTotal.toFixed(2)} €</span>
          </div>

          {/* Botão de Checkout -> Leva para a página de Sucesso */}
          <button 
            className="checkout-btn"
            onClick={() => {
              navigate('/checkout-success');
            }}
          >
            Finalizar Compra
          </button>

          {/* Botão de Limpar Carrinho */}
          <button 
            className="clear-cart-btn"
            onClick={() => {
              clearCart();
              toast('Carrinho esvaziado', { icon: '🗑️' });
            }}
          >
            Esvaziar Carrinho
          </button>
        </div>

      </div>
    </div>
  );
};

export default Cart;