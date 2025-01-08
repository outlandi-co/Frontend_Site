// useCart.js
import { useContext } from 'react';
import { CartContext } from './cartContext';

// Custom Hook to Use Cart Context
const useCart = () => useContext(CartContext);

export default useCart;
