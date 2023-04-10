const CustomError = require('./CustomError')
const errorHandlers = (err,req,res,next) =>{
    let customError = err
    

    if(customError.name === 'SyntaxError'){
        customError = new CustomError("Syntax Error",400)
    }
    if(customError.name === 'ValidationError'){
        customError = new CustomError(err.message,400)
    }
    if(err.name === 'CastError'){
        CustomError = new CustomError("Enter a valid user id",400)
    }

    if(err.code === 11000){
        customError = new CustomError("Duplicate Error: Please check your informaitons",400)
    }
    console.log( customError.message, customError.status)

    res.status(customError.status || 500)
    .json({
        success : false,
        message: customError.message 
    })
}

module.exports = errorHandlers