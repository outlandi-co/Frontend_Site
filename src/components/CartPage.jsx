import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const CartPage = ({ userId }) => {
    const [cart, setCart] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCart = async () => {
            if (!userId) {
                setError('User ID is required to load the cart.');
                return;
            }

            try {
                const response = await fetch(`http://localhost:5001/api/cart/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`, // Include token in the header
                    },
                });

                if (!response.ok) {
                    const errorMessage = await response.text();
                    throw new Error(errorMessage || 'Failed to fetch cart.');
                }

                const data = await response.json();
                setCart(data);
            } catch (err) {
                setError(`Failed to fetch cart. ${err.message}`); // Display the error message
                console.error('Fetch error:', err.message); // Log the error for debugging
            }
        };

        fetchCart();
    }, [userId]);

    const handleRemoveFromCart = async (itemId) => {
        try {
            const response = await fetch(`http://localhost:5001/api/cart/${itemId}/remove`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Include token in the header
                },
                body: JSON.stringify({ itemId }),
            });

            if (response.ok) {
                const updatedCart = await response.json();
                setCart(updatedCart); // Update the cart after removal
            } else {
                throw new Error('Failed to remove item from cart.');
            }
        } catch (error) {
            console.error('Remove error:', error.message);
            setError('Failed to remove item from cart.');
        }
    };

    if (!cart) {
        return <p>Loading cart...</p>;
    }

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    return (
        <div>
            <h1>Your Cart</h1>
            <ul>
                {cart.items.map((item) => (
                    <li key={item._id}>
                        {item.productId.name} - {item.quantity} x ${item.productId.price} = ${item.totalPrice}
                        <button onClick={() => handleRemoveFromCart(item._id)}>Remove</button>
                    </li>
                ))}
            </ul>
            <h3>Total: ${cart.totalAmount}</h3>
        </div>
    );
};

CartPage.propTypes = {
    userId: PropTypes.string.isRequired,
};

export default CartPage;
