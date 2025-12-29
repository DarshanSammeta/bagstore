const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

app.use("/products", require("./routes/products"));
app.use("/cart", require("./routes/cart"));
app.use("/checkout", require("./routes/checkout"));



app.listen(5000, () => console.log("Server running on port 5000"));
