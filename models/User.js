const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  firstname: { type: String, required: false },
  lastname: { type: String, required: false },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
