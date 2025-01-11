// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Products from './components/Products';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';
import OrderConfirmation from './components/OrderConfirmation';
import CartWidget from './components/CartWidget';
import CartProvider from './components/context/cartContext'; // Import CartProvider
import Login from './components/Login'; // Import the Login page
import ForgotPassword from './components/ForgotPassword'; // Import the Forgot Password page
import ResetPassword from './components/ResetPassword'; // Import the Reset Password page
import './css/Products.css';

const App = () => {
    return (
        <CartProvider>
            <div>
                <header
                    style={{
                        textAlign: 'center',
                        padding: '20px',
                        background: '#1a1a1a',
                        color: 'white',
                    }}
                >
                    <h1>Welcome to Outlandico</h1>
                    <nav>
                        <Link to="/login" style={{ margin: '0 10px' }}>Login</Link>
                        <Link to="/register" style={{ margin: '0 10px' }}>Register</Link>
                        <Link to="/forgot-password" style={{ margin: '0 10px' }}>Forgot Password</Link>
                    </nav>
                </header>
                <CartWidget />
                <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
                    <Routes>
                        <Route path="/" element={<h2>Welcome to Outlandico</h2>} />
                        <Route path="/products" element={<Products />} />
                        <Route path="/cart" element={<CartPage />} />
                        <Route path="/checkout" element={<CheckoutPage />} />
                        <Route path="/order-confirmation" element={<OrderConfirmation />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<div>Register</div>} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                        <Route path="/reset-password" element={<ResetPassword />} />
                    </Routes>
                </main>
            </div>
        </CartProvider>
    );
};

export default App;
