const mongoose = require('mongoose')
const user = require('./user')
const Schema = mongoose.Schema

const questionSchema = Schema({
    title :{
        type : String,
        required : [true,"Please enter a title"],
        minlengeth : [10,"Please enter a minimum length of 10 characters"],
        unique : true
    },
    content :{
        type : String,
        required : [true,"Please enter a content"],
        minlengeth : [20,"Please enter a minimum length of 20 characters"],
    },
    slug : String,
    createdTime :{
        type : Date,
        default :Date.now()
    },
    user : {
        type : mongoose.Schema.ObjectId,
        required :true,
        ref : "User"
    }
})


questionSchema.pre('save', function(next){
    if(!this.isModified("title")){
        next()

    }})



module.exports = mongoose.model('Question',questionSchema)