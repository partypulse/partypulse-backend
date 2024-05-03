// productRoutes.js

const express = require('express');
const router = express.Router();
const { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');



// ----- PRODUCTS ------

// GET all products
router.get('/products', getAllProducts);

// GET a single product by ID
router.get('/products/:id', getProductById);

// POST create a new product
router.post('/products', createProduct);

// PUT update a product by ID
router.put('/products/:id', updateProduct);

// DELETE a product by ID
router.delete('/products/:id', deleteProduct);


module.exports = router;