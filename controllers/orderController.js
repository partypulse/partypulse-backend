// controllers/orderController.js

const Order = require('../models/Order');

// GET all orders
exports.getAllOrder = async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET a single order by ID
exports.getOrdersById = async (req, res) => {
    try {
        const orders = await Order.findById(req.params.id);
        if (!orders) {
            return res.status(404).json({ message: 'Orders not found.' });
        }
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// POST create a new order
exports.createOrder = async (req, res) => {
    console.log(req.body)
    try {
        const newOrder = await new Order(req.body).save();
        res.status(201).json(newOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// PUT update an order by ID
exports.updateOrder = async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found. 🤔' });
        }
        res.json(updatedOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// DELETE an order by ID
exports.deleteOrder = async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found. 🤔' });
        }
        res.json({ message: 'Order successfully deleted! 📦🗑️✅ ' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};