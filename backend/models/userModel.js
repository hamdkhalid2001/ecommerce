const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
    firstname: {
        type:String,
        minLength:[3,'First name should be more than 4 characters'],
        maxLength:[30,"First name shouldn't be more than 30 characters"],
        required:[true,'First name compulsory']
    },
    lastname: {
        type:String,
        minLength:[3,'Last name should be more than 4 characters'],
        maxLength:[30,"Last name shouldn't be more than 30 characters"],
        required:[true,'Last name compulsory']
    },
    email: {
        type:String,
        required:[true,'Email is required'],
        unique:true,
        validate:[validator.isEmail,'Please enter valid email address']
    },
    password:{
        type:String,
        required:[true,'Password is required'],
        minLength:[8,'Password should be more than 8 characters'],
        select:false
    },avatar:
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:[true,'Enter image url']
            }
    },
    role:{
        type:String,
        default:'user'
    },
    
    resetPasswordToken:{
        type:String
    },
    resetPasswordExpire:Date
    
})
userSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id}, process.env.SECRET_KEY ,{
        expiresIn:process.env.EXPIRE_TIME
    })
}
userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password)
}
userSchema.methods.getResetPasswordToken = function(){
    //Generating token
    const resetToken = crypto.randomBytes(20).toString("hex")

    //Hashing and adding reset password to token
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")
    this.resetPasswordExpire = Date.now() + 15 *60 * 1000
    return resetToken                        
}
module.exports = mongoose.model('User',userSchema)