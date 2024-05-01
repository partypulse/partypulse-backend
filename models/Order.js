const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    total_price: { type: Number, required: true, default: '' },
    order_date: { type: Date, default: Date.now },
    delivery_address: { type: String, default: ''},
    status: { type: String, enum: ['pending', 'completed'], default: 'pending' }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
