const express = require("express");
const AuthenticationController = require("../controllers/AuthenticationController");
const { authenticate } = require("../service/AuthenticationService");

const router = express.Router();

router.post("/login", AuthenticationController.login);
router.post("/register", AuthenticationController.register);

module.exports = { router };
