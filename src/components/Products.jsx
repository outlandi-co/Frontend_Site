// src/components/Products.jsx
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from './context/useCart';  // Assuming useCart is a context hook for managing cart

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart(); // Use addToCart from CartContext

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch data from the backend
        const response = await axios.get('https://backend-server-1wsz.onrender.com/api/products');
        setProducts(response.data); // Set the fetched products in state
        setLoading(false); // Stop loading
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false); // Stop loading even if there's an error
      }
    };

    fetchProducts();
  }, []); // Empty array means the effect runs only once when the component mounts

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleAddToCart = (product) => {
    addToCart(product); // Add the product to the cart
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
              onClick={() => handleAddToCart(product)} // Add to cart handler
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
