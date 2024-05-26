const express = require("express");
const ProductController = require("../controllers/productController");
const { authenticate } = require("../service/AuthenticationService");

const router = express.Router();

router.get("/getall", authenticate, ProductController.getAllProducts);
router.get(
  "/getone/:product_id",
  authenticate,
  ProductController.getProductById
);
router.post("/create", authenticate, ProductController.createProduct);
router.delete(
  "/delete/:product_id",
  authenticate,
  ProductController.deleteProduct
);
router.put("/update", authenticate, ProductController.updateProduct);

module.exports = { router };
