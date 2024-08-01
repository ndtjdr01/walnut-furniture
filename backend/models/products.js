const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {type: String, require: true},
    image: {type: String, require: true},
    price: {type: Number, require: true},
    category: {type: String, require: true},
})

const ProductDB = mongoose.models.product||mongoose.model('product',ProductSchema)

module.exports = ProductDB;