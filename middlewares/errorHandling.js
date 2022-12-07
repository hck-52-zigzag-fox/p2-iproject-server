const errorHandler = (err, req, res, next) => {
  console.log(err);

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
  } else if (err.name === "UNAUTHORIZED") {
    status = 401;
    message = `Please login first!`;
  } else if (err.name === "NOT_FOUND") {
    status = 404;
    message = `Data not found`;
  }

  return res.status(status).json({ message });
};

module.exports = { errorHandler };
