function errorHandler(err, req, res, next) {
  let statusCode = 500;
  let message = "Internal Server Error";
  switch (err.name) {
    case "BadRequest Email":
      statusCode = 400;
      message = "Email is required";
      break;
    case "BadRequest Password":
      statusCode = 400;
      message = "Password is required";
      break;
    case "Unauthorized":
      statusCode = 401;
      message = "Please login first";
      break;
    case "JsonWebTokenError":
      statusCode = 401;
      message = "Invalid token";
      break;
    case "Not Found":
      statusCode = 404;
      message = "Product Not Found";
      break;
    case "Order Not Found":
      statusCode = 404;
      message = "Order Not Found";
      break;
    case "Forbidden":
      statusCode = 403;
      message = "You don't have access";
      break;
    case "SequelizeValidationError":
      statusCode = 400;
      message = err.errors[0].message;
      break;
    case "SequelizeUniqueConstraintError":
      statusCode = 400;
      message = err.errors[0].message;
      break;
    case "Id Not Found":
      statusCode = 404;
      message = "Error ID Not Found";
      break;
    case "invalid_credentials":
      statusCode = 401;
      message = "Invalid Email or Password";
      break;
  }
  res.status(statusCode).json({
    message,
  });
}

module.exports = errorHandler;
