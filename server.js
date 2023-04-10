const express = require('express')
const dotenv = require('dotenv')
const router = require('./routers/index')
const connectDB = require('./database/connectDatabase')
const errorHandler = require('./middlewares/errors/errorHandlers')
const path = require('path')
const app = express()


// Config Env
dotenv.config({
    path: "./config/env/config.env",
})

connectDB()

const PORT = process.env.PORT

app.use(express.json())

app.use('/api/',router)

app.use(errorHandler)

app.use(express.static(path.join(__dirname,"public")))

app.listen(PORT,() => {
    console.log('listening on port: '+PORT , process.env.NODE_ENV  )
})