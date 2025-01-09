// CartWidget.jsx
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useCart } from '../components/context/useCart'; // Correct import from useCart.js

const CartWidget = () => {
    const { cartItems } = useCart();  // Access cart data from CartContext

    // Calculate total items in the cart
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div className="cart-widget">
            <a href="/cart" className="cart-link">
                🛒 Cart ({totalItems})  {/* Display total items in the cart */}
            </a>
        </div>
    );
};

export default CartWidget;
