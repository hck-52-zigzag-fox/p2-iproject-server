function errorHandler(err, req, res, next) {
  console.log(err);
  let name = err.name;
  let code;
  let message;

  if (
    name === "SequelizeValidationError" ||
    name === "SequelizeUniqueConstraintError"
  ) {
    code = 400;
    message = err.errors[0].message;
  } else {
    code = 500;
    message = "Internal server error";
  }

  res.status(code).json({ message });
}

module.exports = errorHandler;
