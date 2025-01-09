// useCart.js
import { useContext } from 'react';
import { CartContext } from './cartContext'; // Import CartContext from cartContext.jsx

export const useCart = () => useContext(CartContext); // Custom hook to access CartContext
