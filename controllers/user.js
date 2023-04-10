const User = require('../models/user')
const CustomError = require('../middlewares/errors/CustomError')
const AsyncErrorHandler = require('express-async-handler')


const getUser = AsyncErrorHandler(async (req,res,next) => {
    const {id} = req.params
    const user = await User.findById(id)

    return res.status(200)
    .json({
        success : true,
        data : user
    })
})

const getAllUsers = AsyncErrorHandler(async (req,res,next) =>{

    const users = await User.find()

    return res.status(200)
    .json({
        success : true,
        data : users
    })
    

} )


module.exports = {getUser,getAllUsers}