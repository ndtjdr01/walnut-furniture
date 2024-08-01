const express = require('express');
const { postOrderOnline, postOrderOffline, getOrderOnline, removeOrderOnline, updateOrderOnline, getOrderOffline, removeOrderOffline } = require('../controller/orderController');
const authorization = require('../middleware/auth');

const orderRouter = express.Router()

// online
orderRouter.post('/online',authorization,postOrderOnline)
orderRouter.get('/online',getOrderOnline)
orderRouter.delete('/online/:id',removeOrderOnline)
orderRouter.put('/online/:id',updateOrderOnline)

// offline
orderRouter.post('/offline',postOrderOffline)
orderRouter.get('/offline',getOrderOffline)
orderRouter.delete('/offline/:id',removeOrderOffline)


module.exports = orderRouter