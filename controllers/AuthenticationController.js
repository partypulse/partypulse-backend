let jwt = require("jsonwebtoken");
const User = require("../models/User");
const AuthenticationService = require("../service/AuthenticationService");
const login = async (request, response) => {
  try {
    if (request.body.email && request.body.password) {
      const user = await User.findOne({ email: request.body.email });
      if (!user) {
        response.status(400).json({
          errorType: "no-user-found",
          errorMessage:
            "Det gick inte att hitta en användare med det användarnamnet",
        });
      } else if (user.password !== request.body.password) {
        response.status(400).json({
          errorType: "incorrect-password",
          errorMessage: "Felaktigt lösenord",
        });
      } else {
        const token = jwt.sign(
          { uid: user.email },
          AuthenticationService.getJwtSecret()
        );
        return response.status(200).json({
          success: true,
          message: "Authentication successful!",
          tid: token,
          uid: user.email,
          user: user,
          firstName: user.firstName,
          lastName: user.lastName,
          _userId: user._id,
          role: user.role,
        });
      }
    } else {
      return response.status(400).json({
        errorType: "unknown-error",
        errorMessage: "Felaktigt användarnamn eller lösenord",
      });
    }
  } catch (error) {
    console.log(error);
    response.status(400).json(error);
  }
};
const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Kontrollera om användarens e-postadress redan finns i databasen
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Skapa en ny användare och spara den i databasen
    const newUser = new User({
      email: req.body.email,
      password: req.body.password,
      role: "user",
    });
    await newUser.save();

    const token = jwt.sign(
      { uid: req.body.email },
      AuthenticationService.getJwtSecret()
    );
    return res.status(200).json({
      success: true,
      message: "Authentication successful!",
      tid: token,
      uid: newUser.email,
      user: newUser,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      _userId: newUser._id,
      role: newUser.role,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to register user" });
  }
};

module.exports = { login, register };
