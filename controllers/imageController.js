const Image = require("../models/image"); // Importera Image-modellen

// Controller för att hämta en specifik produktbild baserat på ID
const getImageById = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: "Bilden kunde inte hittas" });
    }
    res.json(image);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Serverfel vid hämtning av bilden" });
  }
};

// Controller för att ladda upp en ny produktbild
const uploadImage = async (req, res) => {
  try {
    // Implementera logik för att ladda upp en bild här
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Serverfel vid uppladdning av bilden" });
  }
};

// Exportera controller-funktionerna för användning i dina routes
module.exports = {
  getImageById,
  uploadImage,
};
