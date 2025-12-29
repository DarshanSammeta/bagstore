// src/context/CartContext.js
import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // Load cart from localStorage on first render
    const saved = localStorage.getItem("cartItems");
    return saved ? JSON.parse(saved) : [];
  });

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Add product to cart
  const addToCart = async (product) => {
    const existing = cartItems.find((i) => i._id === product._id);

    if (existing) {
      updateQuantity(product._id, existing.quantity + 1);
      return;
    }

    const newItem = {
      _id: product._id,
      name: product.name,
      price: product.price,
      img: product.img || "/fallback.png",
      quantity: 1,
    };

    // Optimistically update cart
    setCartItems((prev) => [...prev, newItem]);

    // Sync with backend
    try {
      await fetch("http://localhost:5000/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product._id }),
      });
    } catch (err) {
      console.error("Add to cart failed:", err);
      // Optional: revert state or refetch cart
    }
  };

  // Update quantity of a cart item
  const updateQuantity = async (id, quantity) => {
    if (quantity < 1) return;

    // Optimistic UI update
    setCartItems((prev) =>
      prev.map((item) => (item._id === id ? { ...item, quantity } : item))
    );

    try {
      await fetch(`http://localhost:5000/cart/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity }),
      });
    } catch (err) {
      console.error("Update quantity failed:", err);
      // Optional: refetch cart from backend
    }
  };

  // Remove an item from the cart
  const removeFromCart = async (id) => {
    // Optimistic UI update
    setCartItems((prev) => prev.filter((item) => item._id !== id));

    try {
      await fetch(`http://localhost:5000/cart/${id}`, { method: "DELETE" });
    } catch (err) {
      console.error("Remove from cart failed:", err);
      // Optional: refetch cart from backend
    }
  };

  // Clear the entire cart (useful after checkout)
  const clearCart = async () => {
    setCartItems([]);
    localStorage.removeItem("cartItems");

    try {
      await fetch("http://localhost:5000/cart/clear", { method: "DELETE" });
    } catch (err) {
      console.error("Clear cart failed:", err);
    }
  };

  // Total price of cart
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalPrice,
        setCartItems, // optional: for manual updates
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
