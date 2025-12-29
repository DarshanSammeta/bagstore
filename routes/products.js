const router = require("express").Router();
const Product = require("../models/Product");

// GET /products
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// GET /products/:id
router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
});

module.exports = router;
