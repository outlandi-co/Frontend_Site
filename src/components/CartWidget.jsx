// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useCart } from './context/cartContext';

const CartWidget = () => {
    const { cartItems } = useCart();

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div className="cart-widget">
            <a href="/cart" className="cart-link">
                🛒 Cart ({totalItems})
            </a>
        </div>
    );
};

export default CartWidget;
