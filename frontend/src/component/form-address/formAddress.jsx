import React, { useContext, useEffect, useState } from 'react'
import './form.css'
import axios from 'axios'
import { ProductContext } from '../../context'

const FormAddress = () => {
    const { product_lists, cartItems,getTotal } = useContext(ProductContext)
    const getItems = () => {
        let items = []
        for (let item of product_lists) {
            if (cartItems[item._id] > 0) {
                items.push({ name: item.name, quantity: cartItems[item._id], price: item.price })
            }
        }
        return items
    }

    const [data, setData] = useState({})
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        const token = localStorage.getItem('token')
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:1000/api/order/online',
                {
                    name: data.name,
                    phone: data.phone,
                    address: data.address,
                    items: getItems(),
                    amount:getTotal()
                }
                , { headers: { token } })
            if(response.data.success){
                const session_url = response.data.success_url
                window.location.replace(session_url)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => { console.log(data) }, [data])
    return (
        <div className='form-container'>
            <form onSubmit={handleSubmit} className="form-box">
                <h3>Địa chỉ nhận hàng</h3>
                <input required name='name' value={data.name} onChange={handleChange} type="text" placeholder='name' />
                <input required name='phone' value={data.phone} onChange={handleChange} type="text" placeholder='Số điện thoại' />
                <input required name='address' value={data.address} onChange={handleChange} type="text" placeholder='Địa chỉ' />
                <input required name='note' value={data.note} onChange={handleChange} type="text" placeholder='Lời nhắn' />

                <div className="submit">
                    <button onSubmit={handleSubmit}>Xác nhận</button>
                </div>
            </form>
        </div>
    )
}

export default FormAddress
