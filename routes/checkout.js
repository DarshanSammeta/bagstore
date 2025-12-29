const express = require("express");
const Cart = require("../models/Cart");
const Order = require("../models/Order");

const router = express.Router();

// POST /checkout
router.post("/", async (req, res) => {
  try {
    const { name, email, address } = req.body;

    if (!name || !email || !address) {
      return res.status(400).json({ message: "All fields required" });
    }

    const cartItems = await Cart.find();

    if (cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    await Order.create({
      name,
      email,
      address,
      items: cartItems,
      total,
    });

    // clear cart after order
    await Cart.deleteMany();

    res.json({ message: "Order placed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
