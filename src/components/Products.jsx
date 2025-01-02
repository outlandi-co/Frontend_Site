import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const Products = ({ userId }) => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [cartStatus, setCartStatus] = useState({}); // Track cart action feedback for each product

    useEffect(() => {
        if (!userId) {
            setError('User ID is required to load products.');
            setLoading(false);
            return;
        }

        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:5001/api/products');
                if (!response.ok) {
                    throw new Error(`Failed to fetch products. Status: ${response.status}`);
                }
                const data = await response.json();
                setProducts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [userId]);

    const addToCart = async (productId, quantity) => {
        console.log("Attempting to add product to cart:", { productId, userId, quantity });
    
        if (!userId) {
            console.error("User ID is missing. Cannot proceed with adding to cart.");
            alert("User ID is missing. Please log in or try again.");
            return;
        }
    
        setCartStatus((prev) => ({ ...prev, [productId]: 'loading' }));
    
        try {
            const response = await fetch(`http://localhost:5001/api/cart/${userId}/add`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ productId, quantity }),
            });
    
            console.log("Server response:", response);
    
            if (!response.ok) {
                const errorMessage = await response.text();
                console.error("Failed to add to cart:", errorMessage);
                throw new Error(`Failed to add to cart: ${errorMessage}`);
            }
    
            const result = await response.json();
            console.log("Successfully added to cart:", result);
    
            setCartStatus((prev) => ({ ...prev, [productId]: 'success' }));
            alert("Product successfully added to cart!");
        } catch (err) {
            console.error("Error adding to cart:", err.message);
            setCartStatus((prev) => ({ ...prev, [productId]: 'error' }));
            alert(`Error adding product to cart: ${err.message}`);
        } finally {
            setTimeout(() => {
                setCartStatus((prev) => ({ ...prev, [productId]: null }));
            }, 3000);
        }
    };
    

    if (loading) return <p style={{ textAlign: 'center' }}>Loading products...</p>;
    if (error) return <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>;

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>Products</h1>
            {products.length === 0 ? (
                <p>No products available at the moment. Please check back later!</p>
            ) : (
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {products.map((product) => (
                        <li
                            key={product._id}
                            style={{
                                marginBottom: '20px',
                                border: '1px solid #ddd',
                                borderRadius: '10px',
                                padding: '15px',
                                textAlign: 'left',
                                maxWidth: '400px',
                                margin: 'auto',
                            }}
                        >
                            <img
                                src={product.photo || '/default-placeholder.jpg'}
                                alt={product.name}
                                onError={(e) => (e.target.src = '/default-placeholder.jpg')}
                                style={{
                                    width: '100%',
                                    height: '200px',
                                    objectFit: 'cover',
                                    marginBottom: '10px',
                                    borderRadius: '10px',
                                }}
                            />
                            <h2>{product.name}</h2>
                            <p><strong>Price:</strong> ${product.price}</p>
                            <button
                                onClick={() => addToCart(product._id, 1)}
                                disabled={cartStatus[product._id] === 'loading'}
                                aria-label={
                                    cartStatus[product._id] === 'loading'
                                        ? 'Adding product to cart...'
                                        : 'Add product to cart'
                                }
                                style={{
                                    backgroundColor:
                                        cartStatus[product._id] === 'success'
                                            ? '#28a745'
                                            : cartStatus[product._id] === 'error'
                                            ? '#dc3545'
                                            : '#007bff',
                                    color: 'white',
                                    border: 'none',
                                    padding: '10px 20px',
                                    fontSize: '16px',
                                    borderRadius: '5px',
                                    cursor: cartStatus[product._id] === 'loading' ? 'not-allowed' : 'pointer',
                                    marginTop: '10px',
                                }}
                            >
                                {cartStatus[product._id] === 'loading'
                                    ? 'Adding...'
                                    : cartStatus[product._id] === 'success'
                                    ? 'Added!'
                                    : 'Add to Cart'}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

Products.propTypes = {
    userId: PropTypes.string.isRequired,
};

export default Products;
