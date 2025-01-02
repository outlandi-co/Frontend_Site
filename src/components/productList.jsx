import { useEffect, useState } from 'react';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:5001/api/products'); // Correct backend API endpoint
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setProducts(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchProducts();
    }, []);

    if (error) {
        return <p style={{ color: 'red', textAlign: 'center' }}>Error: {error}</p>;
    }

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>Product List</h1>
            {products.length === 0 ? (
                <p>No products available.</p>
            ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
                    {products.map((product) => (
                        <div
                            key={product._id}
                            style={{
                                width: '250px',
                                border: '1px solid #ddd',
                                borderRadius: '10px',
                                padding: '15px',
                                textAlign: 'center',
                                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                            }}
                        >
                            {product.photo && (
                                <img
                                    src={product.photo}
                                    alt={product.name}
                                    style={{
                                        width: '100%',
                                        height: '150px',
                                        objectFit: 'cover',
                                        borderRadius: '10px',
                                    }}
                                />
                            )}
                            <h2 style={{ fontSize: '18px', margin: '10px 0' }}>{product.name}</h2>
                            <p><strong>Price:</strong> ${product.price}</p>
                            <p><strong>Category:</strong> {product.category}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductList;
