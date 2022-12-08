module.exports = {
    errorHandler: async (err, req, res, next) => {
      
      let statusCode = 500;
      let message = "Internal Server Error";
      switch (err.name) {
        //401 error login user not found / password not matched
        //401 error authentication
        case "Unauthorized":
          statusCode = 401;
          if (err.message) {
            message = err.message;
          } else {
            message = "Please login first";
          }
          break;
  
        //403 forbidden error di authorization
        case "Forbidden":
          statusCode = 403;
          message = "You cannot access this feature";
          break;
  
        // 400 error validation saat create
        case "BadRequest":
        case "SequelizeValidationError":
        case "SequelizeUniqueConstraintError":
        case "SequelizeForeignKeyConstraintError":
          statusCode = 400;
          if (err.name === "BadRequest") {
            message = err.message;
          } else if (err.name === "SequelizeForeignKeyConstraintError") {
            message = err.parent.detail;
          } else {
            message = err.errors.map((el) => el.message);
          }
          break;
  
        // 404 data not found
        case "NotFound":
          statusCode = 404;
          if (err.model) {
            if (err.email) {
              message = `${err.model} with Email ${err.email} Not Found`;
            } else {
              message = `${err.model} with ID ${err.id} Not Found`;
            }
          } else {
            message = "Data Not Found";
          }
          break;
        case "JsonWebTokenError":
          statusCode = 401;
          message = "Please login first";
          break;
      }
  
      res.status(statusCode).json({ message });
    },
  };
  