const express = require('express')
const {getAccessRoute,adminAccess} = require('../middlewares/authorization/auth')
const {checkUserExist} = require('../middlewares/db Errors/databaseErrorHandler')
const {deleteUser} = require('../controllers/admin')
const { route} = require('./questions')
const router  = express.Router()

router.use(getAccessRoute,adminAccess)

router.get('/',(req,res,next) =>{
    res.status(200).json({
        success : true,
        message : "Admin page"
    })

})


router.delete('/user/:id',checkUserExist,deleteUser)




module.exports = router
