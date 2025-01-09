// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const apiUrl = `${import.meta.env.VITE_API_URL}/products`;
                console.log('Fetching products from:', apiUrl);
                const response = await axios.get(apiUrl);
                console.log('Fetched products:', response.data); // Log the fetched products
                setProducts(response.data); // Set the fetched products
                setLoading(false); // Stop loading
            } catch (err) {
                console.error('Error fetching products:', err);
                setError('Failed to fetch products. Please try again later.');
                setLoading(false); // Stop loading
            }
        };
    
        fetchProducts();
    }, []);
    

    if (loading) return <p>Loading products...</p>; // Show loading message
    if (error) return <p>{error}</p>; // Show error message

    return (
        <div>
            <h1>Products</h1>
            <div className="product-grid">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div key={product._id} className="product-card">
                            <img
                                src={product.image || '/images/default-product.jpg'} // Fallback for missing images
                                alt={product.name}
                                className="product-image"
                            />
                            <h3 className="product-name">{product.name}</h3>
                            <p className="product-description">{product.description}</p>
                            <p className="product-price">${product.price.toFixed(2)}</p>
                        </div>
                    ))
                ) : (
                    <p>No products available. Please check back later.</p>
                )}
            </div>
        </div>
    );
};

export default Products;
