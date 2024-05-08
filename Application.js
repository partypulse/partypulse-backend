const cors = require("cors");
const morgan = require("morgan");
const router = require('./routes/router')
const {connectToDatabase} = require("./database/db");
const todoRoutes = require('./routes/router');
const express = require("express");
const app = express();
const User=require("./models/User")

app.use(cors());
app.use(morgan('dev'));
app.use(express.json({limit: '300mb'}));
app.use(express.urlencoded({extended: true, limit:'300mb'}));
app.use(router)
app.use('/todos', todoRoutes);

// POST-endpunkt för registrering
app.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Kontrollera om användarens e-postadress redan finns i databasen
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Skapa en ny användare och spara den i databasen
        const newUser = new User({ email, password });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to register user' });
    }
});


// LOGIN
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    try {
        // Check if a user with the provided email exists in the database
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Verify the password
        const isPasswordValid = await user.isValidPassword(password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // If the email and password are correct, generate a JWT token
        const token = generateToken(user);
        res.json({ token,_userId:user._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

connectToDatabase();
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// login token
const jwt = require('jsonwebtoken');

// Function to generate JWT token
function generateToken(user) {
    // Create JWT payload
    const payload = {
        user: {
            id: user.id,
            email: user.email
            // You can include more user data here if needed
        }
    };

    // Sign the token with a secret key
    return jwt.sign(payload, 'your-secret-key', { expiresIn: '1h' });
}

// Method to check if provided password matches the hashed password in the database
async function isValidPassword(password) {
    // Compare the provided password with the hashed password stored in the database
    // You need to implement this method in your User model
    return bcrypt.compare(password, this.password);
}

// no need to export
// module.exports = {
//    generateToken,
//   isValidPassword
//};


