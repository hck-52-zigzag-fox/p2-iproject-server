async function errorHandler(err, req, res, next) {
  let message = "";
  let code;
  console.log(err);
  switch (err.name) {
    case "not_found":
      code = 404;
      message = "data not found";
      break;
    case "validation":
      code = 401;
      message = "invalid username or password";
      break;
    case "unauthenticated":
    case "JsonWebTokenError":
      code = 401;
      message = "Please login first";
      break;
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      code = 400;
      message = err.errors.map((el) => el.message);
      break;
    case "forbidden":
      code = 403;
      message = "unauthorized to do action";
      break;

    default:
      code = 500;
      message = "internal server error";
      break;
  }
  console.log(message);
  res.status(code).json({ msg: message });
}

module.exports = errorHandler;
