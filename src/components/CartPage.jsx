// CartPage.jsx
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router-dom'; // For navigating to the checkout page
import { useCart } from './context/cartContext'; // To access cart data
import '../css/CartPage.css'; // Your custom styles

const CartPage = () => {
    const { cartItems, removeFromCart } = useCart();

    const handleRemoveFromCart = (productId) => {
        removeFromCart(productId);
    };

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    if (cartItems.length === 0) {
        return <p>Your cart is empty.</p>;
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
