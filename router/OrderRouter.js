const express = require("express");
const OrderController = require("../controllers/orderController");
const { authenticate } = require("../service/AuthenticationService");

const router = express.Router();

router.get("/getorder/:order_id", authenticate, OrderController.getOrderById);
router.get("/getmyorders", authenticate, OrderController.getMyOrders);

router.post("/createneworder", authenticate, OrderController.createOrder);
router.put("/editorder/:order_id", authenticate, OrderController.updateOrder);
router.delete(
  "/deleteorder/:order_id",
  authenticate,
  OrderController.deleteOrder,
);

module.exports = { router };
