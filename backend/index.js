const express = require('express')
const cors = require('cors')
const userRouter = require('./routes/userRoutes.js')
const orderRouter = require('./routes/orderRoutes.js')
const productRoutes = require('./routes/productRoutes.js')
const app = express()
require('dotenv').config()
require('./db.js')

// middleware
app.use(cors())
app.use(express.json())
app.use('/api/images/',express.static('uploads'))

// routes
app.use('/api/user',userRouter)
app.use('/api/order',orderRouter)
app.use('/api/product/',productRoutes)

app.listen(1000,()=>console.log('listening on port 1000 ...')) 