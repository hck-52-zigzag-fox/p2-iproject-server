function errorHandler(err, req, res, next) {
  let name = err.name;
  let code;
  let message;

  if (
    name === "SequelizeValidationError" ||
    name === "SequelizeUniqueConstraintError"
  ) {
    code = 400;
    message = err.errors[0].message;
  } else if (name === "Bad_Request") {
    code = 400;
    message = "Email/password is required";
  } else if (name === "Invalid_Credential") {
    code = 401;
    message = "Email/password is invalid";
  } else {
    code = 500;
    message = "Internal server error";
  }

  res.status(code).json({ message });
}

module.exports = errorHandler;
