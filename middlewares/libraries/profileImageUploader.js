const multer = require('multer')
const path = require('path')
const CustomError = require('../errors/CustomError')

const storage = multer.diskStorage({
    destination : function(req,file,callback){
        const rootDir = path.dirname(require.main.filename)
        callback(null,path.join(rootDir,"/public/uploads"))
    },
    filename : function(req,file,callback){
        const extension = file.mimetype.split("/")[1]
        req.imageSaved = "image_" + req.user.id + "." + extension
        callback(null,req.imageSaved)
    }
})

const fileFilter = (req,file,callback) => {
    let allwoedFiles = ["images/jpg","images/jpeg","image/png"]
    if(!allwoedFiles.includes(file.mimetype)){
        return callback(new CustomError("Upload valid file!",400),false)
    }
    return callback(null,true)
  
}

const profileImageUpload = multer({storage,fileFilter})

module.exports = profileImageUpload