const mongoose = require('mongoose');

// this model will save images as binary data

// Skapa ett schema för din bildmodell
const imageSchema = new mongoose.Schema({
    filename: { type: String, required: true }, // Namnet på filen
    contentType: { type: String, required: true }, // MIME-typen för filen (t.ex. image/jpeg)
    data: { type: Buffer, required: true } // Själva bilden i form av en binärdata
});

// Skapa och exportera Image-modellen baserat på det definierade schemat
const Image = mongoose.model('Image', imageSchema);
module.exports = Image;
