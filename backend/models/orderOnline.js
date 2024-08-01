const mongoose = require('mongoose')

const orderOnlineSchema = new mongoose.Schema({
    name:{type: String, required: true},
    phone:{type: String, required: true},
    address:{type: String, required: true},
    items:{type: Array, required: true},
    date:{type: Date,default: Date.now},
    payment:{type: Boolean, default: false},
    note:{type: String},
    amount:{type: Number,required: true},
})

const orderOnlineDB = mongoose.models.orderOnline || mongoose.model('orderOnline',orderOnlineSchema)

module.exports = orderOnlineDB