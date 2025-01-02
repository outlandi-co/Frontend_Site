import { useState } from 'react';
import PropTypes from 'prop-types';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const CheckoutForm = ({ clientSecret }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState(null); // Track payment status

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        setPaymentStatus(null);

        if (!stripe || !elements) {
            setError('Stripe has not loaded properly.');
            setLoading(false);
            return;
        }

        try {
            // Confirm the card payment
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                },
            });

            if (result.error) {
                console.error('Payment failed:', result.error.message);
                setError(`Payment failed: ${result.error.message}`);
                setPaymentStatus('failed');
            } else if (result.paymentIntent.status === 'succeeded') {
                console.log('Payment successful!');
                setPaymentStatus('success');
                alert('Payment Successful!');
            }
        } catch (err) {
            console.error('An error occurred during payment processing:', err.message);
            setError('An error occurred during payment processing.');
            setPaymentStatus('failed');
        }

        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
            <h2>Enter your payment details</h2>
            <CardElement style={{ width: '100%', marginBottom: '20px' }} />
            
            {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
            {paymentStatus === 'success' && (
                <p style={{ color: 'green', marginTop: '10px' }}>Payment completed successfully!</p>
            )}
            {paymentStatus === 'failed' && (
                <p style={{ color: 'red', marginTop: '10px' }}>Payment failed. Please try again.</p>
            )}

            <button
                type="submit"
                disabled={!stripe || loading}
                style={{
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    fontSize: '16px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    marginTop: '20px',
                }}
            >
                {loading ? 'Processing...' : 'Pay Now'}
            </button>
        </form>
    );
};

CheckoutForm.propTypes = {
    clientSecret: PropTypes.string.isRequired,
};

export default CheckoutForm;
