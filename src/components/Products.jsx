// Products.jsx
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from './context/useCart';  // Import useCart hook from the new file

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart(); // Use addToCart from CartContext

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/products');
                setProducts(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    const handleAddToCart = (product) => {
        addToCart(product); // Add product to the cart
    };

    return (
        <div className="product-grid">
            {products.map((product) => (
                <div className="product-card" key={product._id}>
                    <img
                        src={product.image || '/images/default-product.jpg'}
                        alt={product.name}
                        className="product-image"
                    />
                    <div className="product-info">
                        <h3 className="product-name">{product.name}</h3>
                        <p className="product-description">{product.description}</p>
                        <p className="product-price">${product.price}</p>
                        <button
                            className="add-to-cart-button"
                            onClick={() => handleAddToCart(product)} // Handle the click
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Products;
