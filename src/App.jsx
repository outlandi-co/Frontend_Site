// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Products from './components/Products';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';
import OrderConfirmation from './components/OrderConfirmation';
import CartWidget from './components/CartWidget';
import CartProvider from './components/context/cartContext'; // Import CartProvider
import Register from './components/Register'; // Import the Register component
import Login from './components/Login'; // Import the Login page
import ForgotPassword from './components/ForgotPassword'; // Import the Forgot Password page
import ResetPassword from './components/ResetPassword'; // Import the Reset Password page
import './css/Products.css';

const App = () => {
    return (
        <CartProvider>
            <Router>
                <div>
                    {/* Header Section */}
                    <header
                        style={{
                            textAlign: 'center',
                            padding: '20px',
                            background: '#1a1a1a',
                            color: '#fff',
                        }}
                    >
                        <h1>Welcome to Outlandico</h1>
                        <nav>
                            <Link to="/" style={{ margin: '0 10px', color: '#fff', textDecoration: 'none' }}>Home</Link>
                            <Link to="/products" style={{ margin: '0 10px', color: '#fff', textDecoration: 'none' }}>Products</Link>
                            <Link to="/cart" style={{ margin: '0 10px', color: '#fff', textDecoration: 'none' }}>Cart</Link>
                            <Link to="/login" style={{ margin: '0 10px', color: '#fff', textDecoration: 'none' }}>Login</Link>
                            <Link to="/register" style={{ margin: '0 10px', color: '#fff', textDecoration: 'none' }}>Register</Link>
                            <Link to="/forgot-password" style={{ margin: '0 10px', color: '#fff', textDecoration: 'none' }}>Forgot Password</Link>
                        </nav>
                    </header>

                    {/* Cart Widget */}
                    <CartWidget />

                    {/* Main Content */}
                    <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
                        <Routes>
                            {/* Default Home Page */}
                            <Route path="/" element={<h2>Welcome to Outlandico</h2>} />

                            {/* Application Routes */}
                            <Route path="/products" element={<Products />} />
                            <Route path="/cart" element={<CartPage />} />
                            <Route path="/checkout" element={<CheckoutPage />} />
                            <Route path="/order-confirmation" element={<OrderConfirmation />} />

                            {/* Authentication Routes */}
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/forgot-password" element={<ForgotPassword />} />

                            {/* Password Reset Route */}
                            <Route path="/reset-password" element={<ResetPassword />} />
                        </Routes>
                    </main>
                </div>
            </Router>
        </CartProvider>
    );
};

export default App;
