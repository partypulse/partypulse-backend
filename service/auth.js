const jwt = require('jsonwebtoken');

// Funktion för att skapa JWT-token
function generateToken(user) {
    return jwt.sign({ id: user.id }, 'your_secret_key', { expiresIn: '1h' });
}

// Funktion för att verifiera JWT-token
function verifyToken(token) {
    try {
        return jwt.verify(token, 'your_secret_key');
    } catch (err) {
        return null;
    }
}

module.exports = { generateToken, verifyToken };
