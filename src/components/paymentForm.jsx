import { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState('');
    const [paymentStatus, setPaymentStatus] = useState('');

    const handlePayment = async () => {
        if (!stripe || !elements) {
            console.error('Stripe.js has not loaded yet.');
            return;
        }

        const cardElement = elements.getElement(CardElement);

        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
            },
        });

        if (error) {
            console.error('Payment failed:', error.message);
            setPaymentStatus('Payment failed.');
        } else if (paymentIntent.status === 'succeeded') {
            console.log('Payment succeeded:', paymentIntent);
            setPaymentStatus('Payment succeeded!');
        }
    };

    // Fetch the clientSecret from your backend
    const fetchClientSecret = async () => {
        try {
            const response = await fetch('http://localhost:5001/api/payments/create-payment-intent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: 1000 }), // $10.00 in cents
            });

            const data = await response.json();

            if (data.clientSecret) {
                setClientSecret(data.clientSecret);
            } else {
                console.error('Failed to fetch client secret:', data);
            }
        } catch (error) {
            console.error('Error fetching client secret:', error.message);
        }
    };

    return (
        <div>
            <button onClick={fetchClientSecret}>Generate Client Secret</button>
            <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', margin: '10px 0' }}>
                <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
            </div>
            <button onClick={handlePayment} disabled={!stripe || !clientSecret}>
                Pay Now
            </button>
            {paymentStatus && <p>{paymentStatus}</p>}
        </div>
    );
};

export default PaymentForm;
