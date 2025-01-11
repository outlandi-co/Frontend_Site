// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Products from './components/Products';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';
import OrderConfirmation from './components/OrderConfirmation'; // Import the order confirmation page
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
                </header>
                <CartWidget />
                <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
                    <Routes>
                        {/* Homepage Route */}
                        <Route path="/" element={<h2>Welcome to Outlandico</h2>} />
                        
                        {/* Products Page Route */}
                        <Route path="/products" element={<Products />} />
                        
                        {/* Cart Page Route */}
                        <Route path="/cart" element={<CartPage />} />
                        
                        {/* Checkout Page Route */}
                        <Route path="/checkout" element={<CheckoutPage />} />
                        
                        {/* Order Confirmation Route */}
                        <Route path="/order-confirmation" element={<OrderConfirmation />} />
                        
                        {/* Routes for Login, Forgot Password, and Reset Password */}
                        <Route path="/login" element={<Login />} /> {/* Login route */}
                        <Route path="/forgot-password" element={<ForgotPassword />} /> {/* Forgot Password route */}
                        <Route path="/reset-password" element={<ResetPassword />} /> {/* Reset Password route */}
                    </Routes>
                </main>
            </div>
        </CartProvider>
    );
};

export default App;
