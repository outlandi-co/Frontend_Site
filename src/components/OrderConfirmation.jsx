// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OrderConfirmation = () => {
    const [orderDetails, setOrderDetails] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const savedOrder = JSON.parse(localStorage.getItem('orderDetails'));

        if (!savedOrder) {
            navigate('/'); // Redirect if no order details are found
        } else {
            setOrderDetails(savedOrder);
        }
    }, [navigate]);

    if (!orderDetails) return <p>Loading...</p>;

    return (
        <div style={{ padding: '20px' }}>
            <h2>Order Confirmation</h2>
            <h3>Thank you for your order!</h3>
            <p>Your order has been placed successfully. Here are the details:</p>
            <ul>
                {orderDetails.items.map((item, index) => (
                    <li key={index}>
                        {item.name} (x{item.quantity}) - ${item.price.toFixed(2)}
                    </li>
                ))}
            </ul>
            <h4>Total: ${orderDetails.total.toFixed(2)}</h4>
            <p>Shipping to: {orderDetails.shippingAddress}</p>
            <p>Billing: {orderDetails.billingAddress}</p>
        </div>
    );
};

export default OrderConfirmation;
