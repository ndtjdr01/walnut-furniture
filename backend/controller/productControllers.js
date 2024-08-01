const ProductDB = require("../models/products");
const fs = require('fs')


const getProduct = async (req, res) => {
    try {
        const product = await ProductDB.find()
        res.json(product);
    } catch (error) {
        console.log(error);
    }
}
const getOneProduct = async(req,res)=>{
    try {
        const product = await ProductDB.findById(req.params.id)
        res.json(product);
    } catch (error) {
        console.log(error);
    }
}
const addProduct = async (req, res) => {
    try {
        const { name, price, category } = req.body
        const imageName = `${req.file.filename}`
        const newProduct = new ProductDB({ name, price, category, image: imageName });
        const product = await newProduct.save()
        res.json(product);
    } catch (error) {
        console.log(error);
    }
}
const removeProduct = async (req, res) => {
    try {
        const { id } = req.params
        const productDelete = await ProductDB.findById(req.params.id)
        fs.unlink(`uploads/${productDelete.image}`, () => { })
        const product = await ProductDB.findByIdAndDelete(id)
        res.json(product);
    } catch (error) {
        console.log(error);
    }
}
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const productDelete = await ProductDB.findById(req.params.id)
        let imageName 
        if (req.file) {
            fs.unlink(`uploads/${productDelete.image}`, (err) => {console.log(err) })
            imageName = `${req.file.filename}`
        }
        const data ={
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
            image: imageName||productDelete.image
        }
       
        const product = await ProductDB.findByIdAndUpdate(id, data, { new: true })
        res.json(product);
    } catch (error) {
        console.log(error); 
    }
}

module.exports = {
    getProduct,
    addProduct,
    removeProduct,
    updateProduct,
    getOneProduct,
}