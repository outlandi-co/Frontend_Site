// cartContext.jsx
// eslint-disable-next-line no-unused-vars
import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';  // Import PropTypes for validation
import { updateCartItemQuantity } from '../../cartUtils';  // Import the utility function

// Create Cart Context
const CartContext = createContext();

// Custom hook to use the Cart Context
// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);

const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    // Load cart from localStorage on initial render
    useEffect(() => {
        const guestCart = JSON.parse(localStorage.getItem('guestCart')) || [];
        setCartItems(guestCart);
    }, []);

    const addToCart = (product) => {
        // Using the utility function to update cart item quantity
        updateCartItemQuantity(cartItems, product.productId, 1, setCartItems);
        localStorage.setItem('guestCart', JSON.stringify(cartItems));
    };

    const removeFromCart = (productId) => {
        // Using the utility function to remove the product (or decrease quantity)
        updateCartItemQuantity(cartItems, productId, -1, setCartItems);
        localStorage.setItem('guestCart', JSON.stringify(cartItems));
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};

// PropTypes for CartProvider component
CartProvider.propTypes = {
    children: PropTypes.node.isRequired,  // Validate 'children' prop
};

export default CartProvider;
