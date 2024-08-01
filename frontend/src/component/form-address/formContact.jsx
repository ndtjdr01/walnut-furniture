import React, { useEffect, useState } from 'react'
import './form.css'
import axios from 'axios'

const FormContact = () => {
    const [data, setData] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
        product: '',
        note: '',
        time:''
    })
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const addOrderOffline = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`http://localhost:1000/api/order/offline`, data)
            if(response){
                alert('okey chúng tôi sẽ gọi bạn trong vài giờ tới, cảm ơn bạn đã liên hệ chúng tôi')
                setData({
                    name: '',
                    phone: '',
                    email: '',
                    address: '',
                    product: '',
                    note: '',
                    time:''
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => { console.log(data) }, [data])
    return (
        <div className='form-container'>
            <form onSubmit={addOrderOffline} className="form-box">
                <h3>Liên hệ</h3>
                <input required name='name' value={data.name} onChange={handleChange} type="text" placeholder='Tên' />
                <div className="multi-input">
                    <input required name='phone' value={data.phone} onChange={handleChange} type="text" placeholder='Số điện thoại' />
                    <input required name='email' value={data.email} onChange={handleChange} type="text" placeholder='Email' />
                </div>
                <input required name='address' value={data.address} onChange={handleChange} type="text" placeholder='Địa chỉ' />
                <input required name='product' value={data.product} onChange={handleChange} type="text" placeholder='Sản phẩm bạn muốn đặt' />
                <textarea type="text" placeholder='Mô tả thêm' />
                <input required name='note' value={data.note} onChange={handleChange} type="text" placeholder='Lời nhắn' />
                <div className="single-input">
                    <label htmlFor="time">Chọn giờ tư vấn</label>
                    <input required name='time' value={data.time} onChange={handleChange} type="time" />
                </div>
                <div className="submit">
                    <button onSubmit={addOrderOffline}>Gửi</button>
                </div>
            </form>
        </div>
    )
}

export default FormContact
