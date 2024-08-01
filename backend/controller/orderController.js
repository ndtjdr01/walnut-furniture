const orderOfflineDB = require("../models/orderOfline")
const orderOnlineDB = require("../models/orderOnline")
const UserDB = require("../models/user")
const Stripe = require('stripe')
const stripe = new Stripe("sk_test_51Pfv5aRxqrhKbg1SDqwdJhDMzz5Y1EPYaQlGVW2LxWe3yvSrsIa3GugSeUUOJ3ujk0VCUMyJm2C1XiFAYHU2dATc00qSaQBezn")

// online
const postOrderOnline = async (req, res) => {
    try {
        // save to admin order
        const { items } = req.body
        const order = await new orderOnlineDB({
            name: req.body.name,
            phone: req.body.phone,
            address: req.body.address,
            items: req.body.items,
            amount: req.body.amount
        })
        const userId = req.body.userId
        await order.save()
        await UserDB.findByIdAndUpdate(userId, { cartItems: {} })

        // go to stripe
        const line_items = items.map(item => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.name
                },
                unit_amount: Math.round(Number(item.price / 230))
            },
            quantity: item.quantity
        }))
        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `http://localhost:5173/verify?success=true&orderId=${order._id}`,
            cancel_url: `http://localhost:5173/verify?success=false&orderId=${order._id}`
        })
        res.status(200).json({ success_url: session.url, success: true })
    } catch (error) {
        console.log(error)
    }
}
const getOrderOnline = async (req, res) => {
    try {
        const orders = await orderOnlineDB.find({})
        res.status(200).json(orders)
    } catch (error) {
        console.log(error)
    }
}
const removeOrderOnline = async (req, res) => {
    try {
        await orderOnlineDB.findByIdAndDelete(req.params.id)
        res.status(200).json({ success: true })
    } catch (error) {
        console.log(error)
    }
}
const updateOrderOnline = async (req, res) => {
    try {
        const payment = req.body.payment
        const updatedOrder = await orderOnlineDB.findByIdAndUpdate(req.params.id, { payment }, { new: true })
        res.status(200).json(updatedOrder)
    } catch (error) {
        console.log(error)
    }
}

// offline
const postOrderOffline = async (req, res) => {
    try {
        const order = await new orderOfflineDB({
            name: req.body.name
            , phone: req.body.phone
            , email: req.body.email
            , address: req.body.address
            , product: req.body.product
            , note: req.body.note
            ,time: req.body.time
        })
        await order.save()
        res.json({order})
    } catch (error) {
        console.log(error)
    }
}
const getOrderOffline = async (req, res) => {
    try {
        const orders = await orderOfflineDB.find({})
        res.status(200).json(orders)
    } catch (error) {
        console.log(error)
    }
}
const removeOrderOffline = async (req, res) => {
    try {
        await orderOfflineDB.findByIdAndDelete(req.params.id)
        res.status(200).json({ success: true })
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    postOrderOnline,
    postOrderOffline,
    getOrderOnline,
    removeOrderOnline,
    updateOrderOnline,
    removeOrderOffline,
    getOrderOffline,
};