// seedProducts.js
const mongoose = require("mongoose");
const Product = require("./models/Product");
require("dotenv").config();

async function seedProducts() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    // Clear existing products
    await Product.deleteMany({});
    console.log("Old products removed");

    // Insert new products with valid direct image URLs
    const products = await Product.insertMany([
      {
        name: "Leather Bag",
        description: "Premium leather bag for daily use",
        price: 2500,
        image:
          "https://res.cloudinary.com/dclt3kszt/image/upload/v1766847049/evening-bag-6929878_1920_gwhrah.jpg",
      },
      {
        name: "Mini Backpack",
        description: "Compact backpack for casual outings",
        price: 1800,
        image:
          "https://res.cloudinary.com/dclt3kszt/image/upload/v1766846574/Mini-Bag-Store/ai-generated-9730811_1920_dyjztj.jpg",
      },
      {
        name: "Office Bag",
        description: "Professional office bag with laptop compartment",
        price: 2200,
        image:
          "https://res.cloudinary.com/dclt3kszt/image/upload/v1766846578/Mini-Bag-Store/beautiful-men-fashion-with-leather-messenger-bag_mjfrij.jpg",
      },
      {
        name: "Sling Bag",
        description: "Daily use sling bag with comfortable strap",
        price: 1500,
        image:
          "https://res.cloudinary.com/dclt3kszt/image/upload/v1766846794/camera-bag-669616_1920_ev5oey.jpg",
      },
      {
        name: "Clutch",
        description: "Elegant clutch for parties and events",
        price: 1200,
        image:
          "https://res.cloudinary.com/dclt3kszt/image/upload/v1766846574/Mini-Bag-Store/handbags-white-2472100_1920_adz0er.jpg",
      },
      {
        name: "Travel Backpack",
        description: "Spacious backpack perfect for travel and hiking",
        price: 3000,
        image:
          "https://res.cloudinary.com/dclt3kszt/image/upload/v1766846574/Mini-Bag-Store/travel-bag-4326730_1920_ee4v4z.jpg",
      },
      {
        name: "Messenger Bag",
        description: "Stylish messenger bag for everyday use",
        price: 2000,
        image:
          "https://res.cloudinary.com/dclt3kszt/image/upload/v1766846608/Mini-Bag-Store/5143432_xkpx3y.jpg",
      },
      {
        name: "Tote Bag",
        description: "Casual tote bag for shopping and outings",
        price: 1700,
        image:
          "https://res.cloudinary.com/dclt3kszt/image/upload/v1766846574/Mini-Bag-Store/laptop-bags-4379630_1920_b1eyyd.jpg",
      },
    ]);

    console.log("Products seeded successfully:");
    console.log(products.map((p) => ({ id: p._id.toString(), name: p.name })));

    process.exit(0);
  } catch (error) {
    console.error("Seeding failed ❌", error);
    process.exit(1);
  }
}

seedProducts();
