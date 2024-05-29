// controllers/orderController.js

const Order = require("../models/Order");
const User = require("../models/User");

// GET all orders
exports.getAllOrder = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ _userId: req.headers._userid });
    res.json(orders);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};
// GET a single order by ID
exports.getOrderById = async (req, res) => {
  try {
    const orders = await Order.findOne({ _id: req.params.order_id });
    if (!orders) {
      return res.status(404).json({ message: "Orders not found." });
    }
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST create a new order
const handleError = (res, message, statusCode = 400) => {
  console.log(message);
  res.status(statusCode).json({ message });
};

exports.createOrder = async (req, res) => {
  try {
    const _userId = req.headers._userid;
    console.log(req.body);
    const {
      cart,
      totalPrice,
      paymentStatus = "Pending",
      paymentMethod,
      deliveryStatus = "Pending",
      shippingStatus = "Not Shipped",
      creditCardInfo,
    } = req.body;

    const user = await User.findOne({ _id: _userId });
    // Validate user
    if (!user || !user._id || !user.email) {
      return handleError(res, "Missing user information");
    }

    // Validate cart
    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      return handleError(res, "Cart is empty or invalid");
    }

    // Validate payment method
    const validPaymentMethods = [
      "Credit Card",
      "Klarna",
      "Swish",
      "Cash on Delivery",
    ];
    if (!paymentMethod || !validPaymentMethods.includes(paymentMethod)) {
      return handleError(res, "Invalid or missing payment method");
    }

    // Validate credit card information if payment method is Credit Card
    if (paymentMethod === "Credit Card") {
      if (
        !creditCardInfo ||
        !creditCardInfo.cardNumber ||
        !creditCardInfo.expiryDate ||
        !creditCardInfo.cvv
      ) {
        return handleError(res, "Missing credit card information");
      }
    }

    // Validate total price
    if (!totalPrice) {
      return handleError(res, "Missing total price");
    }

    // Create new order object
    const newOrder = new Order({
      _userId: user._id,
      email: user.email,
      cart: cart.map((item) => ({
        product: item._id,
        name: item.name,
        info: item.info,
        price: item.price,
        quantity: item.quantity,
      })),
      totalPrice,
      paymentStatus,
      paymentMethod,
      deliveryStatus,
      shippingStatus,
      creditCardInfo: paymentMethod === "Credit Card" ? creditCardInfo : null,
      orderDate: new Date(), // Default to current date
    });

    // Save the order to the database
    const savedOrder = await newOrder.save();

    res.status(201).json(savedOrder);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

// PUT update an order by ID
exports.updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findOneAndUpdate(
      { _id: req.params.order_id },
      req.body,
      { new: true },
    );
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found. 🤔" });
    }
    res.json(updatedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE an order by ID
exports.deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findOneAndDelete({
      _id: req.params.order_id,
    });
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found. 🤔" });
    }
    res.json({ message: "Order successfully deleted! 📦🗑️✅ " });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
