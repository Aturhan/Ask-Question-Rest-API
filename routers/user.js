const express = require('express')
const {getUser,getAllUsers} = require('../controllers/user')
const {checkUserExist} = require('../middlewares/db Errors/databaseErrorHandler')
const router = express.Router()

router.get('/',getAllUsers)
router.get('/:id',checkUserExist,getUser)

module.exports = router