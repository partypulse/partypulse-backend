// controllers/userController.js

const User = require("../models/User");

// GET all users
exports.getAllUsers = async (req, res) => {
  try {
    const products = await User.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET a single user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST create a new user
exports.createUser = async (req, res) => {
  console.log(req.body);
  try {
    const newUser = await new User(req.body).save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT update a user by ID
exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      },
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found. 🤷‍♀️" });
    }
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE a user by ID
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found." });
    }
    res.json({ message: "User successfully deleted! 🗑️ " });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
