const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: false, default: "" },
  info: { type: String, default: "" },
  price: { type: Number, required: false, default: "" },
  stock: { type: Number, default: 0 },
  mainCategory: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
  subCategory: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
  image: { type: String, default: "" },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
