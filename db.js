// db.js

const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

mongoose.connect('mongodb+srv://bbettinatoth:DofJdmByXDA4whIi@cluster0.bhtkpan.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Database connected'))
    .catch(err => console.error('Database connection error:', err));


module.exports = mongoose.connection;
