import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; // Importar a biblioteca de notificações
import Navbar from './components/Navbar';

// Importação das Páginas
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import CheckoutSuccess from './pages/CheckoutSuccess'; // Importar a nova página de sucesso

/**
 * App Component
 * Configuração principal das rotas e das notificações globais.
 */
function App() {
  return (
    <div>
      {/* Configuração do Toaster (Notificações VIP).
        Colocamos aqui para que esteja disponível em toda a app.
        Definimos um estilo escuro para contrastar com o design clean.
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

      {/* A Navbar fica fora das Routes para aparecer em todas as páginas */}
      <Navbar />

      {/* Contentor principal com margens (definido no index.css) */}
      <div className="app-container">
        <Routes>
          {/* Rota para a Página Inicial (Lista de Produtos) */}
          <Route path="/" element={<Home />} />

          {/* Rota para Detalhes do Produto (ID dinâmico) */}
          <Route path="/product/:id" element={<ProductDetail />} />

          {/* Rota para o Carrinho de Compras */}
          <Route path="/cart" element={<Cart />} />
          
          {/* Rota para a Página de Sucesso (Confetis) */}
          <Route path="/checkout-success" element={<CheckoutSuccess />} />
          
          {/* Rota de Fallback: Se o URL for inválido, volta à Home */}
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;