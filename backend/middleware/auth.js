const catchAsyncError = require("./catchAsyncError")
const jwt = require('jsonwebtoken')
const ErrorHandler = require("../utils/ErrorHandler")
const userModel = require("../models/userModel")

exports.isAuthenticatedUser = catchAsyncError(async (req,res,next)=>{
    const {token} = req.cookies
    if(!token){
        return next(new ErrorHandler("Please login for access"),401)
    }
    const encodedData = jwt.verify(token,process.env.SECRET_KEY)
    req.user = await userModel.findById({_id:encodedData.id})
    next()
})

exports.isAuthorizeUser = (...roles) =>{
    // console.log(user.role)
    return (req,res,next) => {
        // console.log(req.user.role)
        if(!roles.includes(req.user.role)){
            next(new ErrorHandler(`${res.user.role} is not allowed to view this page`),403)
        }
        next()
    }
}