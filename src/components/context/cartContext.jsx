/* eslint-disable react-refresh/only-export-components */
// cartContext.jsx
// eslint-disable-next-line no-unused-vars
import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';  // Import PropTypes for validation
import { updateCartItemQuantity } from '../../cartUtils';  // Import the utility function

// Create Cart Context
export const CartContext = createContext(); // Export CartContext for use in the custom hook

const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    // Load cart from localStorage on initial render
    useEffect(() => {
        const guestCart = JSON.parse(localStorage.getItem('guestCart')) || [];
        setCartItems(guestCart);
    }, []);

    // Update localStorage when cartItems change
    useEffect(() => {
        if (cartItems.length > 0) {
            localStorage.setItem('guestCart', JSON.stringify(cartItems));  // Save to localStorage
        }
    }, [cartItems]);  // This ensures that localStorage is updated whenever cartItems changes

    // Add product to cart
    const addToCart = (product) => {
        // Check if the product already exists in the cart
        const existingProduct = cartItems.find(item => item.productId === product.productId);

        if (existingProduct) {
            // If product exists, increase its quantity
            updateCartItemQuantity(cartItems, product.productId, 1, setCartItems);
        } else {
            // If product doesn't exist, add it to the cart with quantity 1
            setCartItems([...cartItems, { ...product, quantity: 1 }]);
        }
    };

    // Remove product from cart
    const removeFromCart = (productId) => {
        updateCartItemQuantity(cartItems, productId, -1, setCartItems);  // Decrease quantity or remove product
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
