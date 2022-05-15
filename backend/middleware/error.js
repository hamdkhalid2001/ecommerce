const ErrorHandler = require('../utils/ErrorHandler')
module.exports = (err,req,res,next) =>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error"

   
    //duplicate email error
    if(err.code == 11000){
        const message = 'Email Already Taken'
        err = new ErrorHandler(message,400)
    }
    //Wrong jwt token
    if(err.name == "JsonWebTokenError"){
        const message = 'Wrong Json web token'
        err = new ErrorHandler(message,400)
    }
    //Expire token
    if(err.name == "TokenExpiredError"){
        const message = 'Json web token is expired'
        err = new ErrorHandler(message,400)
    }

    res.status(err.statusCode).json({
        success:false,
        error:err.stack,  
    });
}