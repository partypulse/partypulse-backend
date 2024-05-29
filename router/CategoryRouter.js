const express = require("express");
const categoryController = require("../controllers/categoryController");
const { authenticate } = require("../service/AuthenticationService");
const router = express.Router();

router.get(
  "/getcategory/:category_id",
  authenticate,
  categoryController.getCategory,
);

router.post(
  "/createnewcategory",
  authenticate,
  categoryController.createCategory,
);
router.put("/editcategory", authenticate, categoryController.updateCategory);
router.delete(
  "/deletecategory/:category_id",
  authenticate,
  categoryController.deleteCategory,
);

module.exports = { router };
