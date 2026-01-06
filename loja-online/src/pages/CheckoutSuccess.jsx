import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Confetti from 'react-confetti';
import { useCart } from '../context/CartContext';
import './CheckoutSuccess.css'; // Já vamos criar este CSS

const CheckoutSuccess = () => {
  const { clearCart } = useCart();

  // useEffect executa assim que a página abre
  useEffect(() => {
    // Limpar o carrinho porque a compra foi "realizada"
    clearCart();
  }, []); // [] garante que só corre uma vez

  // Gera um número de encomenda aleatório para parecer real
  const orderNumber = Math.floor(Math.random() * 1000000);

  return (
    <div className="success-container">
      {/* Animação de confetis a cair */}
      <Confetti 
        width={window.innerWidth} 
        height={window.innerHeight} 
        recycle={false} // Pára de cair após alguns segundos
        numberOfPieces={500}
      />

      <div className="success-card">
        {/* Ícone de Visto Verde (SVG) */}
        <div className="checkmark-wrapper">
          <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
            <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
            <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
          </svg>
        </div>

        <h1 className="success-title">Pagamento Confirmado!</h1>
        
        <p className="success-message">
          Obrigado pela sua compra. O seu pedido está a ser processado.
        </p>

        <div className="order-info">
          <span>Nº do Pedido:</span>
          <span className="order-id">#{orderNumber}</span>
        </div>

        <Link to="/" className="back-home-btn">
          Continuar a Comprar
        </Link>
      </div>
    </div>
  );
};

export default CheckoutSuccess;