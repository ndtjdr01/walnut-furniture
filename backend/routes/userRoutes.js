const express = require('express');
const { login,signup, getUser, addToCart} = require('../controller/userController');
const authorization = require('../middleware/auth');

const userRouter = express.Router()

userRouter.post('/login',login)
userRouter.post('/signup',signup)
userRouter.post('/cart/get',authorization,getUser)
userRouter.post('/cart/add',authorization,addToCart)

module.exports = userRouter