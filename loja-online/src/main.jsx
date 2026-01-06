import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { CartProvider } from './context/CartContext'
import './index.css' // The global CSS that comes with Vite

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* We wrap the App in BrowserRouter to activate the routing system.
      We wrap in CartProvider so that the cart state is global.
    */}
    <BrowserRouter>
      <CartProvider>
        <App />
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>,
)