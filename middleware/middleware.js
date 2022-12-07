const { verifyToken } = require("../helpers/helper");
const { User } = require("../models");

function errorHandler(err, req, res, next) {
  let status = 500;
  let message = "Internal server error";

  switch (err.name) {
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      status = 201;
      message = err.errors[0].message;
      break;
    case "PASSWORD_REQUEST":
      status = 400;
      message = "Password is required";
      break;
    case "EMAIL_REQUEST":
      status = 400;
      message = "Email is required";
      break;
    case "invalid_credentials":
      status = 401;
      message = "Invalid email/password";
      break;
    case "Unauthorized":
      status = 401;
      message = "Please sign-in first";
      break;
    case "NOT_FOUND":
      status = 404;
      message = "Employee not found!";
      break;
    default:
      break;
  }
  res.status(status).json({ message });
}

async function authentification(req, res, next) {
  try {
    if (!req.headers.access_token) {
      throw { name: "Unauthorized" };
    }
    const decoded = verifyToken(req.headers.access_token);

    const foundUser = await User.findByPk(decoded.id);
    if (!foundUser) {
      throw { name: "Unauthorized" };
    }

    req.user = {
      id: foundUser.id,
      email: foundUser.email,
    };
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = { errorHandler, authentification };
