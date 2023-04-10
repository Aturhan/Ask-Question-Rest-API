const mongoose = require('mongoose')

const connectDB = () => {
  mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB")
  })
  .catch(err => {
    console.error("Failed to connect to MongoDB: " + err)
  })
}

module.exports = connectDB