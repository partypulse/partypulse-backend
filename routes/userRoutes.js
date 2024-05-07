// userRoutes.js

const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

// Route för att hämta alla användare
router.get('/', UserController.getAllUsers);

// Route för att hämta en specifik användare baserat på ID
router.get('/:id', UserController.getUserById);

// Route för att skapa en ny användare
router.post('/', UserController.createUser);

// Route för att uppdatera en befintlig användare baserat på ID
router.put('/:id', UserController.updateUser);

// Route för att ta bort en användare baserat på ID
router.delete('/:id', UserController.deleteUser);

module.exports = router;
