function errorHandler(err, req, res, next) {
    let status = 500;
    let message = "Internal server error";
  
    switch (err.name) {
      case 'SequelizeValidationError':
      case 'SequelizeUniqueConstraintError':
          status = 201
          message = err.errors[0].message
        break;
      
      default:
        break;
    }
    res.status(status).json({ message });
  }
  
  
  module.exports = errorHandler
  