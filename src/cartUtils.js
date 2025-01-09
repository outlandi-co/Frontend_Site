// cartUtils.js
export const updateCartItemQuantity = (cartItems, productId, quantity, setCartItems) => {
  const updatedCartItems = [...cartItems];  // Create a copy of the cartItems array
  const itemIndex = updatedCartItems.findIndex(item => item.productId === productId);

  if (itemIndex !== -1) {
      updatedCartItems[itemIndex].quantity += quantity;  // Update the quantity

      if (updatedCartItems[itemIndex].quantity <= 0) {
          updatedCartItems.splice(itemIndex, 1);  // Remove the item from cart if quantity is 0 or less
      }

      setCartItems(updatedCartItems);  // Update the state with the new cart
  }
};
