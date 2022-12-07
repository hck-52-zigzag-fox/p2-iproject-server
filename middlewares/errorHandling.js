const errorHandler = (err, req, res, next) => {
  let status = 500;
  let message = "Internal Server Error";

  if (
    err.name === "SequelizeValidationError" ||
    err.name === "SequelizeUniqueConstraintError"
  ) {
    status = 400;
    message = err.errors[0].message;
  } else if (err.name === "BAD_REQUEST") {
    status = 400;
    message = `email or password is required`;
  } else if (err.name === "INVALID_CREDENTIALS") {
    status = 401;
    message = `invalid email or password`;
  }

  return res.status(status).json({ message });
};

module.exports = { errorHandler };
