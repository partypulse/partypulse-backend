const express = require('express');
const categoryController = require('../controllers/categoryController');

const router = express.Router();

// get all categories
router.get('/', categoryController.getAllCategories);

// create a new category
router.post('/', categoryController.createCategory);

// get a specific category with its subcategories
router.get('/:id', categoryController.getCategory);

// update existing category
router.patch('/:id', categoryController.updateCategory);

// delete category
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;
