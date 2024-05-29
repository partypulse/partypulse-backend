const mongoose = require("mongoose");
function getDatabaseConnectionString() {
  if (process.env.NODE_ENV === "production") {
    return "mongodb+srv://bbettinatoth:partypulse@cluster0.bhtkpan.mongodb.net/partypulse?retryWrites=true&w=majority&appName=Cluster0";
  } else {
    return "mongodb://localhost:27017/";
  }
}
const connectToDatabase = async () => {
  try {
    await mongoose.connect(getDatabaseConnectionString(), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database", error);
    process.exit(1);
  }
};

module.exports = { connectToDatabase };
