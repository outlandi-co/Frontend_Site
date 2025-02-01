// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Products from './components/Products';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';
import OrderConfirmation from './components/OrderConfirmation';
import CartWidget from './components/CartWidget';
import CartProvider from './components/context/cartContext';
import AuthProvider from './components/context/AuthContextProvider'; // ✅ Correct import
import { useAuth } from './hooks/useAuth'; // ✅ Ensure correct import
import Register from './components/Register';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import Profile from './components/Profile';
import './css/Products.css';

const App = () => {
    return (
        <AuthProvider>
            <CartProvider>
                <MainContent />
            </CartProvider>
        </AuthProvider>
    );
};

// ✅ Extracted for cleaner component structure
const MainContent = () => {
    const { user, setUser } = useAuth(); // ✅ Extract `setUser`

    // ✅ Define the logout function
    const logout = () => {
        setUser(null); // ✅ Clears user state
        window.location.reload(); // ✅ Ensure logout takes effect
    };

    return (
        <div>
            <header style={{ textAlign: 'center', padding: '20px', background: '#1a1a1a', color: 'white' }}>
                <h1>Welcome to Outlandico</h1>
                <nav>
                    <Link to="/" style={navLinkStyle}>Home</Link>
                    <Link to="/products" style={navLinkStyle}>Products</Link>
                    <Link to="/cart" style={navLinkStyle}>Cart</Link>
                    {user ? (
                        <>
                            <Link to="/profile" style={navLinkStyle}>Profile</Link>
                            <button onClick={logout} style={logoutBtnStyle}>Logout</button> {/* ✅ Now defined */}
                        </>
                    ) : (
                        <>
                            <Link to="/login" style={navLinkStyle}>Login</Link>
                            <Link to="/register" style={navLinkStyle}>Register</Link>
                        </>
                    )}
                    <Link to="/forgot-password" style={navLinkStyle}>Forgot Password</Link>
                </nav>
            </header>

            <CartWidget />

            <main style={mainContentStyle}>
                <Routes>
                    <Route path="/" element={<h2>Welcome to Outlandico</h2>} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/order-confirmation" element={<OrderConfirmation />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </main>
        </div>
    );
};

// ✅ Styles for links & buttons
const navLinkStyle = { margin: '0 10px', color: '#fff', textDecoration: 'none' };
const logoutBtnStyle = { margin: '0 10px', color: '#fff', background: 'transparent', border: 'none', cursor: 'pointer' };
const mainContentStyle = { maxWidth: '1200px', margin: '0 auto', padding: '20px' };

export default App;
