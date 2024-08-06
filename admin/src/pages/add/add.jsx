import React, { useEffect, useState } from 'react'
import './add.css'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const Add = () => {
  const location = useLocation()
  const item = location.state?.item
  const [data, setData] = useState({
    name: '',
    price: '',
    category: ''
  })
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }
  const [image, setImage] = useState(null)

  const addProduct = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append('name', data.name)
      formData.append('price', data.price)
      formData.append('category', data.category)
      formData.append('image', image)
      const response = await axios.post(`${API_BASE_URL}/api/product/add`, formData)
      if (response) {
        setData({ name: '', price: '', category: '' })
        setImage(null)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const updateProduct = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append('name', data.name)
      formData.append('price', data.price)
      formData.append('category', data.category)
      if (image) {
        formData.append('image', image)
      }
      const response = await axios.put(`${API_BASE_URL}/api/product/update/${item._id}`, formData)
      if (response) {
        setData({ name: '', price: '', category: '' })
        setImage(null)
        location.state =''
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (item) {
      setData({
        name: item.name,
        price: item.price,
        category: item.category
      })
    }
  }, [item])
  return (
    <div className="add-container">
      <h2 className="title">Add new product</h2>
      <form onSubmit={item ? updateProduct : addProduct} className="add-form">
        <label className='label-img' htmlFor="image">
          <input type="file" required={item ? false : true} name='image' onChange={(e) => setImage(e.target.files[0])} />
          {image ? <img src={URL.createObjectURL(image)} alt="" />
            : item ? <img src={`${API_BASE_URL}/api/images/${item.image}`} alt="" /> : null}
        </label>
        <input type="text" placeholder="Product name" required name='name' value={data.name} onChange={handleChange} />
        <input type="number" placeholder="Price" required name='price' value={data.price} onChange={handleChange} />
        <input type="text" placeholder='category' required name='category' value={data.category} onChange={handleChange} />
        <button onSubmit={item ? updateProduct : addProduct}>{item ? 'Update product' : 'Add product'}</button>
      </form>
    </div>
  )
}

export default Add
