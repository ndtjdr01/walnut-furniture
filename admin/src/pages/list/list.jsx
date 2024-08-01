import React, { useEffect, useState } from 'react'
import './list.css'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'


const List = () => {
  const [product, setProduct] = useState([])
  const navigate = useNavigate()
  const setUpDate = (item)=>{
   navigate('/add',{state: {item}}) 
  }
  
  const deleteProduct = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:1000/api/product/remove/${id}`,)
      if (response) {
        getProduct()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getProduct = async () => {
    try {
      const response = await axios.get('http://localhost:1000/api/product/')
      setProduct(response.data)
    } catch (error) {
      console.error('Error:', error)
    }
  }
  useEffect(() => {
    getProduct()
  }, [])
  return (
    <div className='list-container'>
      <h2 className="title">List products</h2>
      <div className="grid grid-title">
        <p>image</p>
        <p>name</p>
        <p>category</p>
        <p>price</p>
        <p>action</p>
      </div>

      {product.map(item => (
        <div className="product-item-container" key={item._id}>
          <div className="grid">
            <img src={`http://localhost:1000/api/images/${item.image}`} />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{item.price}</p>
            <div className="actions">
              <button onClick={() => deleteProduct(item._id)}>Delete</button>
              <button onClick={() => setUpDate(item)}>Update</button>
            </div>
          </div>
        </div>
      ))}

    </div>
  )
}

export default List
