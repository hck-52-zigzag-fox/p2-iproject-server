const errorHandler = (err, req, res, next) => {
  let status = 500;
  let message = "Internal Server Error";

  return res.status(status).json({ message });
};

module.exports = { errorHandler };
