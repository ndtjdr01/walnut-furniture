require('dotenv').config()
const jwt = require('jsonwebtoken');
const UserDB = require('../models/user');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const createToken = (userId) =>{
    const token = jwt.sign({userId},"jwt_secret")
    return token
}

const login = async (req, res) =>{
    try {
        const {email,password} = req.body
        const user = await UserDB.findOne({email})
        if(!user) return res.json('email not found')
        const compare = await bcrypt.compare(String(password), user.password)
        if(!compare) return res.json('wrong password')
            
        const token = createToken(user._id)
        return res.json({success: true, token})

    } catch (error) {
        console.log(error)
    }
}
const signup = async (req, res) =>{
    try {
        const {name,password,email} = req.body
        const existingEmail = await UserDB.findOne({email})
        if(existingEmail) return res.json('email existing')
        if(String(password).length<8) return res.json('password must be at least 8 characters')
        if(!validator.isEmail(email)) return res.json('invalid email')
        
        const salt = await bcrypt.genSalt(10)

        const hashedPass = await bcrypt.hash(String(password), salt)
 
        const user = await new UserDB({
            name,
             password: hashedPass, 
             email
            })
        await user.save()
        return res.json({success: true, data: user})

    } catch (error) {
        console.log(error)
        res.json({error: error})
    }
}   

const addToCart =async(req,res)=>{
    try {
        const userId = req.body.userId
        const item = req.body.item
        const user = await UserDB.findByIdAndUpdate(userId, {cartItems: item},{new:true})
        if(!user) return res.json('user not found')
        res.json({success: true,user:user})
    } catch (error) {
        console.log(error)
    }
}

const getUser = async(req, res) =>{
    try {
        const user = await UserDB.findOne({_id:req.body.userId})
        if(!user) return res.json('user not found')
        res.json({success: true, data: user})
    } catch (error) {
        console.log(error)
        res.json({error: error})
    } 
}

module.exports = {
    login,
    signup,
    getUser,
    addToCart
}