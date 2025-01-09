// CheckoutPage.jsx
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useCart } from '../components/context/useCart'; // Correct import from useCart.js
import '../css/CheckoutPage.css'; // Your custom styles

const CheckoutPage = () => {
    const { cartItems } = useCart();  // Access cart data from CartContext
    const [shippingInfo, setShippingInfo] = useState({
        name: '',
        address: '',
        city: '',
        postalCode: '',
        country: '',
    });
    const [isProcessing, setIsProcessing] = useState(false);

    // Handle input changes for shipping info
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setShippingInfo((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Handle the checkout process
    const handleCheckout = async () => {
        setIsProcessing(true);
        try {
            // Here, you would typically send the order data to a server for processing
            console.log('Processing order with the following details:', shippingInfo);
            console.log('Cart Items:', cartItems);

            // Simulate a delay and show success message
            setTimeout(() => {
                alert('Order placed successfully!');
                setIsProcessing(false);
            }, 2000);
        } catch (error) {
            console.error('Error during checkout:', error);
            setIsProcessing(false);
        }
    };

    // Calculate the total price of items in the cart
    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    // Debugging: Check if cartItems contains data
    console.log('Cart Items at checkout:', cartItems);

    // If cartItems is empty, show an empty cart message
    if (cartItems.length === 0) {
        return <p>Your cart is empty. Please add some products to proceed with the checkout.</p>;
    }

    return (
        <div className="checkout-page">
            <h1>Checkout</h1>
            
            {/* Shipping Form */}
            <div className="shipping-form">
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={shippingInfo.name}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Address:
                    <input
                        type="text"
                        name="address"
                        value={shippingInfo.address}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    City:
                    <input
                        type="text"
                        name="city"
                        value={shippingInfo.city}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Postal Code:
                    <input
                        type="text"
                        name="postalCode"
                        value={shippingInfo.postalCode}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Country:
                    <input
                        type="text"
                        name="country"
                        value={shippingInfo.country}
                        onChange={handleInputChange}
                    />
                </label>
            </div>

            {/* Order Summary */}
            <div className="order-summary">
                <h3>Order Summary</h3>
                <ul>
                    {cartItems.map((item) => (
                        <li key={item.productId}>
                            <strong>{item.name}</strong> - {item.quantity} x ${item.price.toFixed(2)}
                        </li>
                    ))}
                </ul>
                <h3>Total: ${getTotalPrice().toFixed(2)}</h3>
            </div>

            {/* Checkout Actions */}
            <div className="checkout-actions">
                <button onClick={handleCheckout} disabled={isProcessing}>
                    {isProcessing ? 'Processing...' : 'Place Order'}
                </button>
            </div>
        </div>
    );
};

export default CheckoutPage;
