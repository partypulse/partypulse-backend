const express = require("express");
const categoryController = require("../controllers/categoryController");
const { authenticate } = require("../service/AuthenticationService");
const Product = require("../models/Product");
const mongoose = require("mongoose");
const router = express.Router();

router.get(
  "/getcategory/:category_id",
  authenticate,
  categoryController.getCategory
);

router.post(
  "/createnewcategory",
  authenticate,
  categoryController.createCategory
);
router.put("/editcategory", authenticate, categoryController.updateCategory);
router.delete(
  "/deletecategory/:category_id",
  authenticate,
  categoryController.deleteCategory
);

// endpoint to get products by category
router.get("/products/category/:categoryId", async (req, res) => {
  try {
    const categoryId = new mongoose.Types.ObjectId(req.params.categoryId);
    const products = await Product.find({ mainCategory: categoryId }).populate(
      "mainCategory subCategory"
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
