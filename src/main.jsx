import React from 'react'; // Explicit import of React
import ReactDOM from 'react-dom/client';  // Ensure ReactDOM is imported
import { BrowserRouter as Router } from 'react-router-dom'; // Ensure Router is imported
import App from './App'; // Import App component
import './index.css'; // Global styles
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

// Load Stripe public key from environment variables
const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;

// Validate the Stripe public key
if (!stripePublicKey) {
    console.error('Stripe public key not found! Ensure VITE_STRIPE_PUBLIC_KEY is set in the .env file.');
} else {
    console.log('Stripe public key loaded:', stripePublicKey);
}

// Initialize Stripe
const stripePromise = stripePublicKey ? loadStripe(stripePublicKey) : null;

if (!stripePromise) {
    console.error('Stripe initialization failed due to missing public key.');
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Router>
            {stripePromise ? (
                <Elements stripe={stripePromise}>
                    <App />
                </Elements>
            ) : (
                <p style={{ color: 'red', textAlign: 'center' }}>
                    Stripe is not initialized. Please check your public key setup.
                </p>
            )}
        </Router>
    </React.StrictMode>
);
