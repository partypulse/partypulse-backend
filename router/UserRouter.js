const express = require("express");
const UserController = require("../controllers/userController");
const { authenticate } = require("../service/AuthenticationService");

const router = express.Router();

router.get("/getuser/:user_id", authenticate, UserController.getUserById);

router.put("/updateuser/:id", authenticate, UserController.updateUser);

module.exports = { router };
