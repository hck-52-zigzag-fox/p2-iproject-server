function errorHandler(err, req, res, next) {
    let statusCode = 500
    let message = 'Internal server error'
    switch (err.name) {
        case "SequelizeUniqueConstraintError":
        case "SequelizeValidationError":
            statusCode = 400
            message = err.errors.map(msg => {
                return msg.message
            })
            break;
        case "DATA NOT FOUND":
            statusCode = 404
            message = 'Product Not Found'
            break;
        case "invalid_credentials":
            statusCode = 401
            message = 'invalid username or password'
            break;
        case "JsonWebTokenError":
            statusCode = 401
            message = 'Please Login First'
            break;
        case "Forbidden":
            statusCode = 403
            message = "You don't have access"
            break;
        case "bad_request":
            statusCode = 400
            message = "Please input your email or password"
            break;
        case "Unauthorized":
            statusCode = 403
            message = "Please Login First"
            break;
    }

    res.status(statusCode).json({ message })
}


module.exports = errorHandler
