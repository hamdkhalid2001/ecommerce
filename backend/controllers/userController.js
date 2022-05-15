const catchAsyncError = require('../middleware/catchAsyncError')
const User = require('../models/userModel');
const ErrorHandler = require('../utils/ErrorHandler');
const bcrypt = require('bcryptjs')
const generateToken = require('../utils/GenerateToken')
const sendEmail = require('../utils/SendEmail.js')
const crypto = require('crypto');
const productModel = require('../models/productModel');
exports.signupUser = catchAsyncError(async (req,res,next) => {
    let {firstname,lastname,email,password} = req.body
    password = await bcrypt.hash(password,10) 
    const user = await User.create({
            firstname,
            lastname,
            email,
            password,
            avatar:{
                public_id: 'this is id',
                url: 'dpurl'
            }
    })
    generateToken(user,res,201)
     
})

exports.loginUser = catchAsyncError (async(req,res,next) => {
    const {email , password} = req.body
    if(!email || !password){
        return next(new ErrorHandler("Please Enter Email or Password"),401)
    }
    const user = await User.findOne({email}).select("+password")
    if(!user){
        return next(new ErrorHandler("Invalid Email or Password"),401)
    }
    const comparePassword = await user.comparePassword(password)
    if(comparePassword){
        generateToken(user,res,200)
    }else{
        return next(new ErrorHandler("Invalid Email or Password"),401) 
    }
})

exports.logout = catchAsyncError(async(req,res,next) => {
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })
    res.status(200).json({
        success:true,
        message:"Logged out successfully"
    })
})
exports.forgetPassword = catchAsyncError(async (req,res,next)=> {
    const getUser = await User.findOne({email:req.body.email})
    if(!getUser){
        return next(new ErrorHandler('User Not Found',404))
    }
  
    const resetToken = getUser.getResetPasswordToken();
    await getUser.save({ validateBeforeSave:false })
    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/reset/password/${resetToken}`
    const message = `You can reset your password by clicking on the link below:
                    ${resetPasswordUrl}`
    try {
      await sendEmail({
        email:getUser.email,
        subject:'Ecommerce Password Reset',
        message
      })
      res.status(200).json({
          success: true,
          message: `Email Sent To User ${req.body.email}`,
      })  
    } catch (error) {
        getUser.resetPasswordToken = undefined
        getUser.resetPasswordExpire = undefined
        await getUser.save({ validateBeforeSave:false })
        return next(new ErrorHandler(error.message,500))
    }
})

exports.resetPassword = catchAsyncError(async(req,res,next) => {
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex")
    const getUser = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now()}
    })

    if(!getUser){
        return next(new ErrorHandler('Invalid token or has been expired',400))
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler("Passwords doesn't match",400))
    }
    newPassword = req.body.password
    newPassword = await bcrypt.hash(newPassword,10) 
    getUser.password = newPassword
    getUser.resetPasswordToken = undefined
    getUser.resetPasswordExpire = undefined
    await getUser.save();
    
    generateToken(getUser,res,200)

})

exports.getUserDetails = catchAsyncError(async (req,res,next) =>{
    const getUser = await User.findById(req.user.id)
    res.status(200).json({
        success:true,
        getUser
    })
})

exports.updateUserPassword = catchAsyncError(async(req,res,next)=>{
    const getUser = await User.findById(req.user.id).select("+password")
    const comparePassword = await getUser.comparePassword(req.body.oldPassword)
    if(!comparePassword){
        return next(new ErrorHandler("Please enter correct old password"))
    }
    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHandler("Password doesn't match"))
    }
    newPassword = req.body.newPassword
    newPassword = await bcrypt.hash(newPassword,10) 
    getUser.password = newPassword
    await getUser.save();
    res.status(200).json({
        success:true,
        message:"Password updated successfully"
    }) 
})

exports.updateUserProfile = catchAsyncError(async(req,res,next)=>{
    const newUserDetails = {
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,
        //avatar will be added later
    }
    const user = await User.findByIdAndUpdate(req.user.id,newUserDetails,{
        new:true,
        runValidators:true,
        useFindAndModify:true
    })
    res.status(200).json({
        success:true,
        message:"User updated successfully",
        user
    }) 
})
exports.updateUserRole = catchAsyncError(async(req,res,next) => {
    const newRole = {role:req.body.role}
    const user = await User.findByIdAndUpdate(req.params.id,newRole,{
        new:true,
        runValidators:true,
        useFindAndModify:true
    })
    res.status(200).json({
        success:true,
        message:"User Role updated successfully",
        user
    }) 
})
exports.getAllUsers = catchAsyncError(async(req,res,next)=>{
    const users = await User.find()
    if(!users){
        return next(new ErrorHandler("No Users","400"))
    }
    res.status(201).json({
        success:true,
        users
    })
})

exports.deleteUser = catchAsyncError(async(req,res,next) => {   
    const user = await User.findByIdAndDelete(req.params.id)
    if(!user){
        return next(new ErrorHandler("User not found",404))
    }
    res.status(200).json({
        success:true,
        message:"User deleted successfully",
        user
    }) 
})

