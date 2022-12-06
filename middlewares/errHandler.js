async function errHandler(err, req, res, next) {
  console.log(err.code, "<<<");
  if (err.name == "SequelizeValidationError" || err.name == "BadRequest") {
    let errors = [];
    err.errors.forEach((el) => {
      errors.push(el.message);
    });
    res.status(400).json({ message: errors });
  } else if (err.name == "SequelizeUniqueConstraintError") {
    res.status(400).json({ message: err.message });
  } else if (err.name == "JsonWebTokenError" || err.name == "Unauthorized") {
    res.status(401).json({ message: "Login First" });
  } else if (err.name == "EmailPasswordRequired") {
    res.status(400).json({
      message: "Email and password required",
    });
  } else if (err.name == "InvalidCredentials") {
    res.status(401).json({
      message: "Invalid Email or Password",
    });
  } else if (err.name == "NotFound") {
    res.status(404).json({
      message: "Data not found",
    });
  } else if (err.name == "Forbidden") {
    res.status(403).json({
      message: "Forbidden Access",
    });
  } else if (err.name == "StatusRequired") {
    res.status(400).json({
      message: "Status required",
    });
  } else if (err.name == "FileFormatNotSupported") {
    res.status(400).json({
      message: "File format not supported",
    });
  } else if (err.name == "AlreadyFavorite") {
    res.status(400).json({
      message: "Already Favorite",
    });
  } else if (err.code == "LIMIT_FILE_SIZE") {
    res.status(400).json({
      message: "Maximum Capacity file reached",
    });
  } else {
    res.status(500).json({ message: "Internal Server Error" });
  }
}
module.exports = errHandler;
