import React, { useContext, useEffect, useState } from 'react'
import './product.css'
import { ProductContext } from '../../context'
import { Link } from 'react-router-dom'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const Product = () => {
  const { menu_lists, product_lists, addToCart, cartItems, removeToCart, loading, error } = useContext(ProductContext)
  const [data, setData] = useState([])
  const [filter, setFilter] = useState('all')
  const filterProducts = (type) => {
    if (filter === type) setFilter('all')
    else setFilter(type)
  }
  const handleCartItems = (id) => {
    if (cartItems[id] > 0) {
      removeToCart(id)
    }
    else {
      addToCart(id)
    }
  }
  useEffect(() => {
    if (filter === 'all') setData(product_lists)
    else setData(product_lists.filter(item => item.category === filter))
  }, [filter, product_lists])
  if (error) return <div>Sorry! May be my host in render went wrong. Pls inbox with my email: thanh161204@gmail.com. Sory for this issue</div>
  return (
    <div>
      {loading
        ? <div>
          <p>...Sorry! Pls wait about 1-2 minutes to connect to backend on render</p>
          <p>or you can see my demo in youtube :
            <a href="https://www.youtube.com/watch?v=j2wVk2u356I" target="_blank">here</a>
          </p>
        </div>
        : <div className='product-container'>
          <div className="product-header"></div>
          <div className="product-content">
            <div className="product-slide">
              <h4>Type:</h4>
              <div className="slide-items">
                {menu_lists
                  ? menu_lists.map((item, index) => (
                    <div className={filter === item.menu_name ? 'active slide-item' : 'slide-item'} onClick={() => filterProducts(item.menu_name)} key={index}>
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
                    <img src={`${API_BASE_URL}/api/images/${item.image}`} alt="" />
                    <div className='product-item-price-name'>
                      <p className='product-item-name'>{item.name}</p>
                      <p className='product-item-price'>{`${item.price.toLocaleString('en').replace(/,/g, ' ')} đ`}</p>
                    </div>
                    <div className="product-item-actions">
                      <button onClick={() => handleCartItems(item._id)}>{cartItems[item._id] > 0 ? 'Remove to cart' : 'Add to cart'}</button>
                      <button><Link to={`/product-item/${item._id}`} style={{ color: '#fff' }}>More info</Link></button>
                    </div>
                  </div>
                ))
                : null}
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default Product
