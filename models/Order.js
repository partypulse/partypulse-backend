const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  _userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  email: { type: String, required: true },
  deliveryAddress: { type: String, default: "" },
  cart: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      name: { type: String, required: true },
      info: { type: String },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
  paymentStatus: {
    type: String,
    enum: ["Pending", "Completed", "Failed"],
    default: "Pending",
  },
  paymentMethod: {
    type: String,
    enum: ["Credit Card", "Klarna", "Swish", "Cash on Delivery"],
    required: true,
  },
  deliveryStatus: {
    type: String,
    enum: ["Pending", "Shipped", "Delivered", "Cancelled"],
    default: "Pending",
  },
  shippingStatus: {
    type: String,
    enum: ["Not Shipped", "Shipped", "In Transit", "Delivered"],
    default: "Not Shipped",
  },
  creditCardInfo: {
    cardNumber: { type: String },
    expiryDate: { type: String },
    cvv: { type: String },
  },
  orderDate: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
