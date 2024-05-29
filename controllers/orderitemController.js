// controllers/orderitemController.js

const Order = require("../models/OrderItem");

// GET all orders items
exports.getAllOrderItems = async (req, res) => {
  try {
    const orders = await OrderItem.find();
    res.json(orderitems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET a single order item by ID
exports.getOrderItemsById = async (req, res) => {
  try {
    const orderitems = await Order.findById(req.params.id);
    if (!orderitems) {
      return res.status(404).json({ message: "Order items are not found. ❌" });
    }
    res.json(orderitems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST create a new order item
exports.createOrderItem = async (req, res) => {
  console.log(req.body);
  try {
    const newOrderItem = await new OrderItem(req.body).save();
    res.status(201).json(newOrderItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT update an order by ID
exports.updateOrder = async (req, res) => {
  try {
    const updatedOrderItem = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!updatedOrderItem) {
      return res.status(404).json({ message: "Order item not found. 🤔" });
    }
    res.json(updatedOrderItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE an order item by ID
exports.deleteOrderItem = async (req, res) => {
  try {
    const deletedOrderItem = await OrderItem.findByIdAndDelete(req.params.id);
    if (!deletedOrderItem) {
      return res.status(404).json({ message: "Order item not found. 🤔" });
    }
    res.json({ message: "Order item successfully deleted! 📦🗑️✅ " });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
