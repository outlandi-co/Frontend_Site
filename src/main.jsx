import React from 'react'; // Explicit import of React
import ReactDOM from 'react-dom/client';  // Ensure ReactDOM is imported
import { BrowserRouter as Router } from 'react-router-dom'; // Ensure Router is imported
import App from './App'; // Import App component
import './index.css'; // Global styles
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;

// Check if the Stripe public key is available
if (!stripePublicKey) {
    console.error('Stripe public key not found! Ensure VITE_STRIPE_PUBLIC_KEY is set in the .env file.');
} else {
    console.log('Stripe public key loaded:', stripePublicKey);
}

// Initialize Stripe with the public key
const stripePromise = loadStripe(stripePublicKey);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Elements stripe={stripePromise}>
        <App />
      </Elements>
    </Router>
  </React.StrictMode>
);
