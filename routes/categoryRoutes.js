const express = require('express');
const categoryController = require('../controllers/categoryController');

const router = express.Router();


// get all categories
router.get('/categories', categoryController.getAllCategories);

// create a new category
router.post('/categories', categoryController.createCategory);

// Route för att hämta en specifik kategori med dess subkategorier
router.get('/categories/:categoryId', categoryController.getCategory);

// update existing category
router.patch('/categories/:categoryId', categoryController.updateCategory);

// delete category
router.delete('/categories/:categoryId', categoryController.deleteCategory);

module.exports = router;
