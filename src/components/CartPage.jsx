// CartPage.jsx
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './context/useCart';  // Correct import from useCart.js
import '../css/CartPage.css';

const CartPage = () => {
    const { cartItems, removeFromCart } = useCart();  // Access cart data

    console.log('Cart Items:', cartItems);  // Log cartItems to see if they are correctly populated

    const handleRemoveFromCart = (productId) => {
        removeFromCart(productId);  // Remove item from cart
    };

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);  // Calculate total price
    };

    if (cartItems.length === 0) {
        return <p>Your cart is empty.</p>;  // Display message if no items in cart
    }

    return (
        <div className="cart-page">
            <h1>Your Cart</h1>
            <ul>
                {cartItems.map((item) => (
                    <li key={item.productId} className="cart-item">
                        <div>
                            <strong>{item.name}</strong>
                            <p>Price: ${item.price.toFixed(2)}</p>
                            <p>Quantity: {item.quantity}</p>
                            <button onClick={() => handleRemoveFromCart(item.productId)}>Remove</button>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="cart-total">
                <h3>Total: ${getTotalPrice().toFixed(2)}</h3>
            </div>
            <div className="checkout-button">
                <Link to="/checkout">
                    <button className="checkout-btn">Proceed to Checkout</button>
                </Link>
            </div>
        </div>
    );
};

export default CartPage;
