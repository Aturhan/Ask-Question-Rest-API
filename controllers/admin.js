const AsyncErrorHandler = require('express-async-handler')
const User = require('../models/user')


const deleteUser = AsyncErrorHandler (async (req,res,next) => {

    const {id} = req.params
    const user = await User.findById(id)
    await user.remove()
    return res.status(200).json({
        success : true,
        message: 'User deleted successfully'
    })

  
})

module.exports = {deleteUser}