function errorHandler(err, req, res, next) {

    let status = 500
    let message = `Internal Server Error`
    console.log(err);
    switch (err.name) {
        case "SequelizeValidationError":
        case "SequelizeUniqueConstraintError":
            status = 400
            message = err.errors.map(el => {
                return el.message
            })
            break;
        case "id not found":
            status = 404
            message = err.name
            break;

        case "double":
            status = 400
            message = `You already have this object in your system`
            break;
            
        case "Forbidden":
            status = 403
            message = `you are not allowed to change this`
            break;

        case "Unauthorized":
            status = 401
            message = `you have to login first`
            break;

        case "invalid email or password":
            status = 400
            message = err.name
            break;
    }

    res.status(status).json({
        message: message
    })
}


module.exports = errorHandler