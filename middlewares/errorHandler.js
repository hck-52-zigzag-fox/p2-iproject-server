let code = 500;
let msg = "Internal Server Error";
function errorHandler(err, req, res, next) {
  switch (err.name) {
    case "SequelizeValidationError":
    case "ValidationErrorItem":
    case "SequelizeUniqueConstraintError":
      code = 400;
      msg = err.errors[0].message;
      break;

    case "Invalid Token":
    case "Unauthorized":
      code = 401;
      msg = `${err.name}`;
      break;

    case "Invalid Credential":
    case "Invalid email / password":
      code = 401;
      msg = `Invalid email / password`;
      break;

    case "Forbidden":
      code = 403;
      msg = `Access ${err.name}`;
      break;

    case "Already Bookmarked":
      code = 403;
      msg = `${err.name}`;
      break;

    case "Not Found":
      code = 404;
      msg = "Data not found!";
      break;
  }
  res.status(code).json({ msg });
}

module.exports = errorHandler;
