const mongoose = require('mongoose')
const brcyptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const schema = mongoose.Schema

const UserSchema = new schema({
    name : {
        type: String,
        required: [true,"Please enter a name"]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,"Please enter a valid email address"]
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"]
    },
    password:{
        type: String,
        minlength: [8,"Please enter a password with at least 8 characters"],
        required: [true,"Please enter a password"],
        select: false
    },
    createdDate:{
        type: Date,
        default: Date.now()
    },
    title:{
        type: String
    },
    about:{
        type: String
    },
    province:{
        type: String
    },
    profile_image:{
        type: String,
        default: "defaultImage.jpg"
    },
    blocked:{
        type: Boolean,
        default: false
    },
    restePasswordToken:{
        type: String
    },
    resetPasswordExpire:{
        type: Date
    }

})


UserSchema.methods.generateJwtfromUser = function(){
    const {JWT_SECRET_KEY,JWT_EXPIRE} = process.env

    const payload ={
        id: this.id,
        name: this.name

    }

    const token = jwt.sign(payload,JWT_SECRET_KEY,{expiresIn : JWT_EXPIRE})
    return token
}

UserSchema.methods.getPasswordTokenFromUser = function(){
    const {RESET_PASSWORD_EXPIRE} = process.env
    const randomHexString = crypto.randomBytes(12).toString("hex")

    const resetPasswordToken = crypto.createHash("SHA256").update(randomHexString).digest("hex")

    this.resetPasswordToken = resetPasswordToken
    this.resetPasswordExpire = Date.now + parseInt(RESET_PASSWORD_EXPIRE)

    return resetPasswordToken
    
}




UserSchema.pre('save', function(next){
    if(!this.isModified("password")){
        next()
    }
    brcyptjs.genSalt(10,(err,salt)=>{
        if(err) next(err)
        brcyptjs.hash(this.password,salt,(err,hash)=>{
            if(err) next(err)
            this.password = hash
            next()
        })
    })

})


module.exports = mongoose.model("User",UserSchema)
