//Creating token and saving in cookie
const generateToken = (user,res,statusCode) => {
    const token = user.getJWTToken();

    //options for cookie
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_TIME * 24 * 60 * 60 * 1000 
        ),
        httpOnly:true
    }
    res.status(statusCode).cookie('token',token,options).json({
        success:true,
        token,
        user
    }) 
}
module.exports = generateToken