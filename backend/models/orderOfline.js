const mongoose = require('mongoose')

const orderOfflineSchema = new mongoose.Schema({
    name:{type: String, required: true},
    phone:{type: String, required: true},
    email:{type: String, required: true},
    address:{type: String, required: true},
    product:{type: String, required:true},
    note:{type: String},
    time:{type: String, required: true},
    date:{type: Date,default: Date.now},
})

const orderOfflineDB = mongoose.models.orderOffline || mongoose.model('orderOffline',orderOfflineSchema)

module.exports = orderOfflineDB