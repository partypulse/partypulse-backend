const jwt = require("jsonwebtoken");

function getJwtSecret() {
  return "zwVoO7jJ27W0EQxURSqqXCP7XDs3By1kCL8DrPoqigQd1tk09GpRHUGRub4lBnAJzEzNW54NlMLTEX5uQ";
}

const authenticate = async function (request, response, next) {
  let token = request.headers["authorization"];
  if (!token) {
    return response.status(412).json({
      success: false,
      message: "This route requires authentication",
    });
  }
  if (token) {
    jwt.verify(token, getJwtSecret(), (error, decoded) => {
      if (error) {
        return response.status(412).json({
          success: false,
          message: "Token is not valid",
        });
      } else {
        request.decoded = decoded;
        next();
      }
    });
  } else {
    return response.status(412).json({
      success: false,
      message: "Authorization token is not supplied",
    });
  }
};

module.exports = { authenticate, getJwtSecret };
