const Question = require('../models/Question')
const CustomError = require('../middlewares/errors/CustomError')
const AsyncErrorHandler = require('express-async-handler')


const newQuestion = AsyncErrorHandler ( async (req, res, next) =>{
    const info = req.body

    const question = await Question.create({
        ...info,
        user : req.user.id

    })

    res.status(200).json({
        success : true,
        message : question
    })
   
})

module.exports = {newQuestion}