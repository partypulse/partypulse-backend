const express = require("express");
const ProductController = require("../controllers/productController");
const { authenticate } = require("../service/AuthenticationService");
const Product = require("../models/Product");
const mongoose = require("mongoose");

const router = express.Router();

router.get("/getall", authenticate, ProductController.getAllProducts);
router.get(
  "/getone/:product_id",
  authenticate,
  ProductController.getProductById,
);
router.post("/create", authenticate, ProductController.createProduct);
router.delete(
  "/delete/:product_id",
  authenticate,
  ProductController.deleteProduct,
);
router.put("/update", authenticate, ProductController.updateProduct);
// endpoint to get products by category
router.get("/productsbycategory/:categoryId", async (req, res) => {
  try {
    const categoryId = new mongoose.Types.ObjectId(req.params.categoryId);
    const products = await Product.find({ mainCategory: categoryId }).populate(
      "mainCategory subCategory",
    );

    if (products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found for this category" });
    }

    res.json(products);
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});
module.exports = { router };
