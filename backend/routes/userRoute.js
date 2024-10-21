const express=require('express')
const userController=require('../controllers/userController')
const router= express.Router();

router.post('/signup', userController.signup)
router.post('/login', userController.login)
router.post('/refreshToken', userController.refreshToken)

module.exports=router