// Import necessary components
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Products from './components/Products';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';
import OrderConfirmation from './components/OrderConfirmation';
import CartWidget from './components/CartWidget';
import CartProvider from './components/context/cartContext';
import Register from './components/Register';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword'; // Import ResetPassword

const App = () => {
  return (
    <CartProvider>
      <div>
        {/* Header Section */}
        <header>
          <h1>Welcome to Outlandico</h1>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/forgot-password">Forgot Password</Link>
          </nav>
        </header>

        {/* Cart Widget */}
        <CartWidget />

        {/* Main Content */}
        <main>
          <Routes>
            {/* Application Routes */}
            <Route path="/" element={<h2>Welcome to Outlandico</h2>} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />

            {/* Authentication Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Password Reset Route */}
            <Route path="/reset-password" element={<ResetPassword />} /> {/* Handle reset-password */}
          </Routes>
        </main>
      </div>
    </CartProvider>
  );
};

export default App;
