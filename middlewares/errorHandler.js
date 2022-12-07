function errorHandler(err, req, res, next) {
    let message = "Internal Server Error";
    let statusCode = 500;

    switch (err.name) {
        case "Invalid_Credential":
            statusCode = 401;
            message = "Invalid Email or Password";
            break;
        case "Unauthorized":
            statusCode = 401;
            message = "Login First";
            break;
        case "Not Found":
            statusCode = 404;
            message = "User not Found";
            break;
        case "Forbidden":
            statusCode = 403;
            message = "You don't have access";
            break;
        case "Already Taken":
            statusCode = 400;
            message = "Already Taken";
            break;
        case "SequelizeValidationError":
        case "SequelizeUniqueConstraintError":
            statusCode = 400;
            message = err.errors.map((el) => el.message);
            break;
    }

    res.status(statusCode).json({ message });
}

module.exports = errorHandler;
