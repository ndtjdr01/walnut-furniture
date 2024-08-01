const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    email:{type: String, required: true,unique: true},
    password:{type: String, required: true},
    name:{type: String, required: true},
    cartItems:{type: Object, default: {}},
},{minimize: false}) 

const UserDB = mongoose.models.user||mongoose.model('user', UserSchema)

module.exports = UserDB