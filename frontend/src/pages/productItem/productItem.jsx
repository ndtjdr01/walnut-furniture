import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import './productItem.css'
import { ProductContext } from '../../context'

const ProductItem = ({ setFormDisplay }) => {
  const {removeToCart, addToCart,cartItems} = useContext(ProductContext)
  const { id } = useParams()
  const [item, setItem] = useState({})
  const handleCartItems = (id) => {
    if (cartItems[id] > 0) {
      removeToCart(id)
    }
    else {
      addToCart(id)
    }
  }
  const getData = async () => {
    try {
      const response = await axios.get(`http://localhost:1000/api/product/${id}`)
      setItem(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getData()
  }, [id])
  return (
    <div className='product-item-container'>
      <div className="product-item-img-container">
        <img src={`http://localhost:1000/api/images/${item.image}`} alt="" />
      </div>
      <div className="product-item-description">
        <h3>{item.name}</h3>
        <div className="box">
          <div className="detail">
            <div className="detail-li">
              <p className='detail-li-title'>Loại sản phẩm:</p>
              <p>{item.category}</p>
            </div>
            <div className="detail-li">
              <p className='detail-li-title'>Chi tiết sản phẩm: </p>
              <p>Bàn thờ óc chó được làm từ gỗ óc chó nhập khẩu Bắc Mỹ, với sơn inchern.</p>
            </div>
            <div className="detail-li">
              <p className='detail-li-title'>Mô tả sản phẩm: </p>
              <p>Bàn thờ óc chó gồm 3 phần: mặt bàn, chân bàn, đế bàn.</p>
            </div>
            <div className="detail-li">
              <p className='detail-li-title'>Kích thước:</p>
              <p>2m x 1m86</p>
            </div>
            <div className="detail-li">
              <p className='detail-li-title'>Giá sản phẩm:</p>
              <p>{item.price}</p>
            </div>
          </div>
          <div className="product-item-button">
            <button onClick={() => setFormDisplay(true)}>Liên hệ ngay</button>
            <button onClick={() => handleCartItems(item._id)}>{cartItems[item._id] > 0 ? 'Remove to cart' : 'Add to cart'}</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductItem
