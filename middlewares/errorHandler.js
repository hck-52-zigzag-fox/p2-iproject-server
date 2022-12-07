const errorHandler = async (err, req, res, next) => {

    let statusCode = 500
    let message = "Internal server error"

    switch (err.name) {
        case 'SequelizeValidationError':
        case 'SequelizeUniqueConstraintError':
            statusCode = 400
            message = err.errors[0].message
            break;

        case 'JsonWebTokenError':
            statusCode = 401
            message = "Invalid token"
            break;

        case 'noEmail':
            statusCode = 400
            message = "Email is required"
            break;

        case 'noPassword':
            statusCode = 400
            message = "Password is required"
            break;

        case 'invalidCredentials':
            statusCode = 401
            message = "Invalid email/password"
            break;

        case 'unauthorized':
            statusCode = 401
            message = "Invalid token"
            break;

        case 'notFound':
            statusCode = 404
            message = "Data not found"
            break;

        // case 'forbidden':
        //     statusCode = 403
        //     message = "You are not authorized"
        //     break;

        default:
            break;
    }


    res.status(statusCode).json({ message })

}

module.exports = errorHandler