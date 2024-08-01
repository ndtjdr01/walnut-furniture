const express = require('express');
const { getProduct, addProduct, removeProduct, updateProduct ,getOneProduct} = require('../controller/productControllers');
const productRoutes = express.Router()
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    }, 
    filename: function (req, file, cb) {
        cb(null,Date.now() + '-' + file.originalname )
    }
})


const upload = multer({ storage: storage })
productRoutes.get('/', getProduct)
productRoutes.get('/:id', getOneProduct)
productRoutes.post('/add',upload.single('image'),addProduct)
productRoutes.delete('/remove/:id', removeProduct)
productRoutes.put('/update/:id',upload.single('image'), updateProduct)

module.exports = productRoutes 