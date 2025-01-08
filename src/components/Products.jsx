// Products.jsx
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { useCart } from './context/cartContext'; // Import the CartContext
import api from '../api/api';  // Assuming you're using an API service to fetch products
import '../css/Products.css';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();  // Accessing the addToCart function from context

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get('/products');  // Fetch the products from the API
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <p>Loading products...</p>;

    return (
        <div>
            <h1>Products</h1>
            <div className="product-grid">
                {products.map((product) => (
                    <div className="product-card" key={product._id}>
                        <img
                            src={product.image || '/images/default-product.jpg'}
                            alt={product.name}
                            className="product-image"
                        />
                        <h3 className="product-name">{product.name}</h3>
                        <p className="product-description">{product.description}</p>
                        <p className="product-price">${product.price.toFixed(2)}</p>
                        <button
                            className="add-to-cart-button"
                            onClick={() =>
                                addToCart({
                                    productId: product._id,
                                    name: product.name,
                                    price: product.price,
                                    image: product.image,
                                    description: product.description,
                                })
                            }
                        >
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;
