// cartUtils.js

export const updateCartItemQuantity = (cartItems, productId, quantity, setCartItems) => {
  // Find the item and update the quantity
  const updatedCart = cartItems.map((item) =>
      item.productId === productId
          ? { ...item, quantity: item.quantity + quantity }  // Increase/decrease quantity
          : item
  );

  // Update the cart state with the updated cart
  setCartItems(updatedCart);
};
