module.exports = {
  errorHandler: (err, req, res, next) => {
    let code;
    let msg;
    if (err.name === "SequelizeUniqueConstraintError") {
      err.errors?.forEach((m) => {
        msg = m.message;
      });
      code = 400;
    } else if (err.name === "SequelizeValidationError") {
      err.errors?.forEach((m) => {
        msg = m.message;
      });
      code = 400;
    } else if (err.name === "SequelizeDatabaseError") {
      err.errors?.forEach((m) => {
        msg = m.message;
      });
      code = 400;
    } else if (err.name === "JsonWebTokenError") {
      msg = err.message || err.name.message;
      code = 401;
    } else if (err.name === "ConflictCreateUser") {
      msg = "username or email already registered";
      code = 400;
    } else if (err.name === "NoEmail") {
      msg = "email is required";
      code = 400;
    } else if (err.name === "NoPassword") {
      msg = "password is required";
      code = 400;
    } else if (err.name === "ConflictLoginUser") {
      msg = "wrong email or password";
      code = 401;
    } else if (err.name === "NoData") {
      msg = "no data found";
      code = 404;
    } else if (err.name === "ConflictEmailMentor") {
      msg = "email already use by other mentors";
      code = 400;
    } else {
      msg = "internal server error";
      code = 500;
    }

    res.status(code).json({
      code: code,
      message: msg,
    });
  },
};
