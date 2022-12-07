module.exports = {
  handleError(err, req, res, next) {
    let status;
    let msg;
    switch (err.name) {
      case "SequelizeValidationError":
        status = 400;
        msg = err.errors[0].message;
        break;
      case "NotFound":
        status = 404;
        msg = "Data not found"
        break;
      case "CredentialsNeeded":
        status = 400;
        msg = "Email and Password required";
        break
      case "Forbidden":
        status = 403;
        msg = "Cant access without permission";
        break;
      case "SequelizeUniqueConstraintError":
        status = 400;
        msg = err.errors[0].message;
        break;
      case "InputEmpty":
        status = 400;
        break;
      case "JsonWebTokenError":
        status = 401;
        msg = "Please login first";
        break;
      case "Unauthorized":
        status = 401;
        msg = "Invalid email/password";
        break;
      default:
        status = 500;
        msg = "Internal Server Error";
        break;
    }
    res.status(status).json({ msg });
  },
};
