function errorHandler(err, req, res, next){
    let status = 500
    let message = "Internal Server Error"
    // console.log(err.response.status)

    if(err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError'){
        status = 400
        message = err.errors.map(el => el.message)
    }else if(err.name === 'EmailPasswordRequired'){
        status = 400
        message = "Both Email and Password is required"
    }else if(err.name === 'InvalidCredentials'){
        status = 401
        message = "Invalid Email or Password"
    }else if(err.name === 'AxiosError'){
        status = err.response.status
        message = err.response.data.message
    }else if(err.name === "Unauthorized"){
        status = 401
        message = "Please login first"
    }else if(err.name === 'JsonWebTokenError' || err.name === 'InvalidToken'){
        status = 401
        message = "Invalid token"
    }

    res.status(status).json({message})
}

module.exports = errorHandler