import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm'; // Import the CheckoutForm component

// Load Stripe with the publishable key from the environment
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutPage = () => {
    const [clientSecret, setClientSecret] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPaymentIntent = async () => {
            try {
                const response = await fetch('http://localhost:5001/api/payments/create-payment-intent', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ amount: 5000 }), // Amount in cents (e.g., $50.00)
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`Failed to fetch payment intent: ${errorText}`);
                }

                const data = await response.json();
                setClientSecret(data.clientSecret);
            } catch (err) {
                setError(`Failed to load payment details. Error: ${err.message}`);
                console.error('Error fetching clientSecret:', err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPaymentIntent();
    }, []);

    if (loading) return <p style={{ textAlign: 'center' }}>Loading payment details...</p>;
    if (error) return <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>;

    return (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
            <div style={{ textAlign: 'center', padding: '20px' }}>
                <h1>Checkout</h1>
                {clientSecret ? (
                    <CheckoutForm clientSecret={clientSecret} /> // Pass clientSecret to the CheckoutForm
                ) : (
                    <p style={{ color: 'red' }}>Unable to load payment form. Please try again later.</p>
                )}
            </div>
        </Elements>
    );
};

export default CheckoutPage;
