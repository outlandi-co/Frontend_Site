import { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

// eslint-disable-next-line react/prop-types
const PaymentForm = ({ clientSecret }) => {
    const stripe = useStripe();
    const elements = useElements();
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

    return (
        <div>
            <CardElement />
            <button onClick={handlePayment} disabled={!stripe || !clientSecret}>
                Pay Now
            </button>
            {paymentStatus && <p>{paymentStatus}</p>}
        </div>
    );
};

export default PaymentForm;
