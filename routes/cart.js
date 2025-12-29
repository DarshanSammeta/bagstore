const express = require("express");
const mongoose = require("mongoose");
const Product = require("../models/Product");
const Cart = require("../models/Cart");

const router = express.Router();

// POST /cart - add product to cart
router.post("/", async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "productId is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const cartItem = await Cart.create({
      productId: product._id,
      name: product.name,
      price: product.price,
      quantity: 1,
    });

    res.json({ message: "Product added to cart", cartItem });
  } catch (error) {
    console.error("CART ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /cart - get all cart items
router.get("/", async (req, res) => {
  try {
    const cartItems = await Cart.find();
    res.json(cartItems);
  } catch (error) {
    console.error("CART GET ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /cart/:id - remove cart item
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid cart item ID" });
    }

    const deletedItem = await Cart.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.json({ message: "Item removed from cart" });
  } catch (error) {
    console.error("CART DELETE ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
