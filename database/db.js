// db.js

const express = require('express');
const mongoose = require('mongoose');

async function connectToDatabase(){
    mongoose.connect('mongodb://localhost:27017/', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => console.log('Database connected'))
        .catch(err => console.error('Database connection error:', err));

}


module.exports = {connectToDatabase};
