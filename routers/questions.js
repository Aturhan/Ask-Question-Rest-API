const express = require('express')
const router = express.Router()
const {newQuestion} = require('../controllers/questions')
const {getAccessRoute} = require('../middlewares/authorization/auth')


router.get('/ask',getAccessRoute,newQuestion)



module.exports = router