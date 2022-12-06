function errHandler(err, req, res, next) {
  let statusCode = 500;
  let message = `Internal Server Error`;
  switch (err.name) {
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      statusCode = 400;
      message = err.errors[0].message;
      break;
    case "ErrorEmptyInput":
      statusCode = 400;
      message = `Please Fiil The Form`;
      break;
    case "INVALID_CREDENTIALS":
      statusCode = 400;
      message = `Invalid email/password`;
      break;
    case "UNAUTHORIZED":
      statusCode = 400;
      message = `Please Login First`;
      break;
      case "Not_found":
      statusCode = 404;
      message = `Product Not Found`;
      break;
    default:
      break;
  }
  res.status(statusCode).json({ message });
}

module.exports = errHandler;
