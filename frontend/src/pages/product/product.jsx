import React, { useContext, useEffect, useState } from 'react'
import './product.css'
import { ProductContext } from '../../context'
import { Link } from 'react-router-dom'

const Product = () => {
  const { menu_lists, product_lists, addToCart, cartItems,removeToCart } = useContext(ProductContext)
  const [data, setData] = useState([])
  const [filter, setFilter] = useState('all')
  const filterProducts = (type) => {
    if (filter === type) setFilter('all')
    else setFilter(type)
  }
  const handleCartItems = (id) => {
    if(cartItems[id]>0){
      removeToCart(id)
    }
    else{
      addToCart(id)
    }
  }
  useEffect(() => {
    if (filter === 'all') setData(product_lists)
    else setData(product_lists.filter(item => item.category === filter))
  }, [filter, product_lists])
  return (
    <div className='product-container'>
      <div className="product-header"></div>
      <div className="product-content">
        <div className="product-slide">
          <h4>Type:</h4>
          <div className="slide-items">
            {menu_lists
              ? menu_lists.map((item, index) => (
                <div className={filter === item.menu_name?'active slide-item':'slide-item'} onClick={() => filterProducts(item.menu_name)} key={index}>
                  <p>{item.menu_name}</p>
                </div>
              ))
              : null}
          </div>
        </div>
        <div className="product-items">
          {data
            ? data.map((item, index) => (
              <div className='product-item' key={index}>
                <img src={`http://localhost:1000/api/images/${item.image}`} alt="" />
                <div className='product-item-price-name'>
                  <p className='product-item-name'>{item.name}</p>
                  <p className='product-item-price'>{item.price}</p>
                </div>
                <div className="product-item-actions">
                  <button onClick={()=>handleCartItems(item._id)}>{cartItems[item._id]>0?'Remove to cart':'Add to cart'}</button>
                  <button><Link to={`/product-item/${item._id}`} style={{color:'#fff'}}>More info</Link></button>
                </div>
              </div>
            ))
            : null}
        </div>
      </div>
    </div>
  )
}

export default Product
