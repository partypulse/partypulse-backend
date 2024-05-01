const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    info: { type: String, default: ''},
    price: { type: Number, required: true, default: '' },
    stock: { type: Number, default: 0 },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: '' },
    image: {type: String, default: ''}
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
