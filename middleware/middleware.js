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
    default:
      break;
  }
  res.status(status).json({ message });
}

module.exports = errorHandler;
