const express = require('express')
const {register,getUser,login,logout,imageUpload, forgotPassword,resetPassword} = require('../controllers/auth')
const {getAccessRoute} = require('../middlewares/authorization/auth')
const ppImageUpload = require('../middlewares/libraries/profileImageUploader')

const router = express.Router()

router.post('/register', register)
router.get('/profile',getAccessRoute,getUser)
router.post('/login',login)
router.get('/logout',getAccessRoute,logout)
router.post('/upload',ppImageUpload.single("profile_image"),imageUpload)
router.post('/forgotpassword',forgotPassword)
router.put('/resetpassword',resetPassword)




module.exports = router