export const fetchProducts = async () => {
    try {
        const response = await fetch('http://localhost:5001/api/products');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching products:', error.message);
        throw error; // Re-throw the error for handling in the calling code
    }
};
export const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
        const response = await fetch('http://localhost:5001/api/uploads', {
            method: 'POST',
            body: formData,
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error uploading file:', error.message);
        throw error; // Re-throw the error for handling in the calling code
    }
};
export const fetchTest = async () => {
    try {
        const response = await fetch('http://localhost:5001/api/test');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching test data:', error.message);
        throw error; // Re-throw the error for handling in the calling code
    }
};
export const fetchCart = async (userId) => {
    try {
        const response = await fetch(`http://localhost:5001/api/cart/${userId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching cart:', error.message);
        throw error; // Re-throw the error for handling in the calling code
    }
};
export const addToCart = async (userId, productId, quantity) => {
    try {
        const response = await fetch(`http://localhost:5001/api/cart/${userId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ productId, quantity }),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error adding to cart:', error.message);
        throw error; // Re-throw the error for handling in the calling code
    }
};
export const removeFromCart = async (userId, cartItemId) => {
    try {
        const response = await fetch(`http://localhost:5001/api/cart/${userId}/${cartItemId}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error removing from cart:', error.message);
        throw error; // Re-throw the error for handling in the calling code
    }
};
