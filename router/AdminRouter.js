const express = require("express");
const AdminController = require("../controllers/AdminController");
const { authenticate } = require("../service/AuthenticationService");

const router = express.Router();

router.get("/products", authenticate, AdminController.getProducts);
router.get("/users", authenticate, AdminController.getUsers);
router.get("/categories", authenticate, AdminController.getCategories);
router.get("/orders", authenticate, AdminController.getOrders);

module.exports = { router };
