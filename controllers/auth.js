const User = require('../models/user')
const CustomError = require('../middlewares/errors/CustomError')
const AsyncErrorHandler = require('express-async-handler')
const {sendJwt} = require('../helpers/authorization/sendJwtToClient')
const {UserinputValidation,comparePaswords} = require('../inputs/inputhelper')
const sendMail = require('../helpers/sendMail/sendMail')
const sendEmail = require('../helpers/sendMail/sendMail')
const { use } = require('../routers')

const register = AsyncErrorHandler(async (req,res,next) =>{
    // const name = "Abdullah Turhan"
    // const email = "turhan.turhan@gmail.com"
    // const password = "987654"
        const {name, email, password,role} = req.body
        const user = await User.create({
            name,
            email,
            password,
            role
        })

       sendJwt(user,res)


    })

const login = AsyncErrorHandler(async (req,res,next) =>{
    const {email,password} = req.body
    if(!UserinputValidation(email,password)){
        return next(new CustomError("Please check your Email or password",400))
    }

    const user = await User.findOne({email}).select("+password")
    if(!comparePaswords(password,user.password)){
        return next(new CustomError("Please check yoru password",400))
    }
    sendJwt(user,res)
})
 
const logout =  AsyncErrorHandler(async (req,res,next) =>{
    const {JWT_COOKIE_EXPIRE,NODE_ENV} = process.env
    res.status(200)
    .cookie({
        httpOnly : true,
        expires: new Date(Date.now),
        secure: NODE_ENV === 'development' ? false: true
    })
    .json({
        success : true,
        message: "Logout Successfull"
    })

})

const imageUpload = AsyncErrorHandler(async (req,res,next) =>{
    const user = await User.findByIdAndUpdate(req.user.id,{
        "profile_image" : req.imageSaved
    },{
        new: true,
        runValidators: true
    })


    res.status(200)
    .json({
        success : true,
        message: "Upload successfull",
        data: user
    })
})


const forgotPassword = AsyncErrorHandler(async (req,res,next)=>{
    const  resetEmail = req.user.email

    const user = await User.findOne({email : resetEmail})

    if(!user){
        return next(new CustomError("User not found",400))
    }

    const resetPasswordToken = user.getPasswordTokenFromUser()

    await user.save()

    const resetPasswordURL = `http://localhost:5000/api/auth/resetpassword?resetPasswordToken=${resetPasswordToken}`
    const emailTemplate = `<h2>Reset Password</h2>
    <p>Your password has been reset</p>`


    try{
        sendEmail({
            from: process.env.SMTP_USER,
            to : resetEmail,
            subject: "Reset Password",
            html : emailTemplate
        })
        return  res.status(200).json({
            success : true,
            message : "Jason Web Token sent your email"
        })
    }
    catch (error) {
        user.resetPasswordExpire = null
        user.resetPasswordToken = null

        await user.save()
        return next (new CustomError("Email cannot send to reset password",500))

    }

})


const resetPassword = AsyncErrorHandler(async (req,res,next) => {
    const {resetPasswordToken} = req.query
    const {password} = req.body
    
    if(!resetPasswordToken){
        console.log(new CustomError("provide a valid token",400))
    }

    let  user = await User.findOne({
        resetPasswordToken: resetPasswordToken,
        resetPasswordExpire : {$lte : Date.now }
    })

    if(!user){
        return next(new CustomError("Invalid token",404))
    }

    user.password = password
    resetPasswordToken = undefined
    resetPasswordExpire = undefined

    await user.save()





    res.status(200).json({
        success : true,
        message : "Your password has been reset"
    })
  
} )
   



const getUser = (req,res,next) => {
    res.json({
        success : true,
        data: {
            id: req.user.id,
            name: req.user.name
        }
    })
  
}






module.exports = {register,getUser,login,logout,imageUpload,forgotPassword,resetPassword}