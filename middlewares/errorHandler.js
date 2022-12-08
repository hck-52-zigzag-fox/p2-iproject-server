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
    }else if(err.name === 'AxiosError'){
        status = err.response.status
        message = err.response.data.message
    }else if(err.name === "Unauthorized"){
        status = 401
        message = "Please login first"
    }else if(err.name === 'JsonWebTokenError' || err.name === 'InvalidToken'){
        status = 401
        message = "Invalid token"
    }else if(err.name === 'MidtransError'){
        status = err.httpStatusCode
        message = err.ApiResponse.error_messages
    }else if(err.name === 'AlreadyOwned'){
        status = 400
        message = "You already owned this game"
    }else if(err.name === 'DataNotFound'){
        status = 404
        message = "Data not found"
    }else if(err.name === 'AlreadyPaid'){
        status = 400
        message = "This order already paid"
    }else if(err.name === 'Forbidden'){
        statusCode = 403
        message = "You don't have access"
    }

    res.status(status).json({message})
}

module.exports = errorHandler