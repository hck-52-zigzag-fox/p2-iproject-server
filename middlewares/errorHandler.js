function errorHandler(err, req, res, next){
    let status = 500
    let message = "Internal Server Error"
    console.log(err)

    if(err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError'){
        status = 400
        message = err.errors.map(el => el.message)
    }else if(err.name === 'EmailPasswordRequired'){
        status = 400
        message = "Both Email and Password is required"
    }else if(err.name === 'InvalidCredentials'){
        status = 401
        message = "Invalid Email or Password"
    }

    res.status(status).json({message})
}

module.exports = errorHandler