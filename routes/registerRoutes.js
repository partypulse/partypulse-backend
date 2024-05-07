// registerRoutes.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

// Endpoint för registrering av användare
router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validera indata (t.ex. kontrollera om e-postadressen redan är registrerad)

        // Hasha lösenordet
        const hashedPassword = await bcrypt.hash(password, 10);

        // Skapa en ny användare med hashat lösenord
        const newUser = new User({
            email: email,
            password: hashedPassword,
            // Eventuellt andra användarattribut
        });

        // Spara användaren i databasen
        const savedUser = await newUser.save();

        res.status(201).json(savedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Serverfel vid registrering.' });
    }
});

module.exports = router;
