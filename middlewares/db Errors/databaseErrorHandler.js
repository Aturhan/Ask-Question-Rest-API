const User = require('../../models/user')
const CustomError = require('../errors/CustomError')
const AsyncErrorHandler = require('express-async-handler')


const checkUserExist = AsyncErrorHandler (async (req,res,next) => {
    const {id} = req.params

    const user = await User.findById(id)

    if (!user) {
        return next(new CustomError("User not found with that id ",400))
    }

    next()
  
})


module.exports = {checkUserExist}