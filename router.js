
// routes/todos.js
const express = require('express');
const router = express.Router();
const { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('./controllers/productController');
const {login}= require('./controllers/authController');

const Todo = require('./todo');

// Create a todo
router.post('/', async (req, res) => {
    try {
        const todo = await Todo.create(req.body);
        res.status(201).json(todo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all todos
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos.map(t=>({...t._doc,todo_id:t._id})));
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a todo
router.put('/:id', async (req, res) => {
    try {
        const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(todo);
    } catch (err) {
        res.status(404).json({ message: 'Todo not found' });
    }
});

// Delete a todo
router.delete('/:id', async (req, res) => {
    try {
        await Todo.findByIdAndDelete(req.params.id);
        res.json({ message: 'Todo deleted' });
    } catch (err) {
        res.status(404).json({ message: 'Todo not found' });
    }
});



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



// LOGIN

router.post('/login', login);

module.exports = router;
