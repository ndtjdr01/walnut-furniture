import React, { useEffect, useState } from 'react'
import './order.css'
import axios from 'axios'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const Order = () => {
  const [modeOrder, setModeOrder] = useState('offline')
  const [dataOrder, setDataOrder] = useState([])
  const handleModeChange = (event) => {
    setModeOrder(event.target.value)
    setDataOrder([])
  }
  // online
  const getOnlineOrder = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/order/online`)
      setDataOrder(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  const removeOnlineOrder = async (orderId) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/order/online/${orderId}`)
      getOnlineOrder()
    } catch (error) {
      console.log(error)
    }
  }
  // offline
  const getOfflineOrder = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/order/offline`)
      setDataOrder(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  console.log(dataOrder)
  const removeOfflineOrder = async (orderId) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/order/offline/${orderId}`)
      getOfflineOrder()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (modeOrder === 'online') {
      getOnlineOrder()
    }
    else {
      getOfflineOrder()
    }
  }, [modeOrder])
  console.log(modeOrder)
  return (
    <div className='order-container'>
      <h2 className='order-title'>Order manage</h2>
      <p className='order-subtitle'>List order</p>
      <select name="category" id="" onChange={handleModeChange} defaultValue={'offline'}>
        <option value="offline">offline</option>
        <option value="online">online</option>
      </select>

      {modeOrder === 'online' ?
        <div className="grid-order grid-title">
          <p>Name</p>
          <p>amout</p>
          <p>Phone</p>
          <p>Payment</p>
          <p>remove</p>
          <p>actions</p>
        </div>
        :
        <div className="grid-order-offline grid-title">
          <p>Name</p>
          <p>Address</p>
          <p>Phone</p>
          <p>email</p>
          <p>product</p>
          <p>note</p>
          <p>time</p>
          <p>actions</p>
        </div>}

      {modeOrder === 'online'
        ?
        dataOrder.map(item => (
          <div className="grid-order">
            <p>{item.name}</p>
            <p>{`${item.amount.toLocaleString('en').replace(/,/g, ',')} đ`}</p>
            <p>{item.phone}</p>
            <p>{item.payment.toString()}</p>
            <button onClick={() => removeOnlineOrder(item._id)}>Delete</button>
            <button>Info</button>
          </div>
        ))
        : dataOrder.map(item => (
          <div className="grid-order-offline">
            <p>{item.name}</p>
            <p>{item.address}</p>
            <p>{item.phone}</p>
            <p>{item.email}</p>
            <p>{item.product}</p>
            <p>{item.note}</p>
            <p>{item.time}</p>
            <button onClick={() => removeOfflineOrder(item._id)}>Delete</button>
          </div>
        ))
      }
    </div>
  )
}

export default Order
