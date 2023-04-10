const CustomError = require('../errors/CustomError')
const AsyncErrorHandler = require('express-async-handler')
const User = require('../../models/user')
const jwt = require('jsonwebtoken')
const {isTokeTrue,getAccessTokenHeader} = require('../../helpers/authorization/sendJwtToClient')
const {JWT_SECRET_KEY} = process.env

const getAccessRoute = (req,res,next) => {
    if(!isTokeTrue){
        return next(new CustomError("Access Token Error ", 401))
    }

    const accesToken = getAccessTokenHeader(req)
    jwt.verify(accesToken,JWT_SECRET_KEY,(err,decoded) => {
        if(err){
            return next(new CustomError("You are not authorized",401))
        }
        req.user = {
            id: decoded.id,
            name : decoded.name
        }
        next()
      
    })
    

  
}


const adminAccess = AsyncErrorHandler (async (req,res,next) => {
    const {id} = req.user
    const user = await User.findById(id)

    if(user.role !== 'admin'){
        return next(new CustomError("This route is not allowed",403))
    }

    next()


  
})

module.exports = {getAccessRoute,adminAccess}