function errorHandler(err, req, res, next) {
    let { name } = err
    let code = null
    let message = ''


    switch (name) {
        case "InvalidCredentials":
            code = 401
            message = 'invalid email or password'
            break
        case "SequelizeUniqueConstraintError":
            code = 400
            message = err.errors[0].message
            break
        case "SequelizeValidationError":
            code = 400
            message = err.errors[0].message
            break

        default:
            code = 500
            message = 'Internal server error'
    }
    res.status(code).json({ message })
}

module.exports = errorHandler