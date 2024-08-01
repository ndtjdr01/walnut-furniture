import React, { createContext, useEffect, useState } from 'react'
import { menu_list, product_list } from '../assets/assets'
import axios from 'axios'

export const ProductContext = createContext(null)

const ProductGolobal = ({ children }) => {
  const [cartItems, setCartItems] = useState({})
  const [token, setToken] = useState(null)
  const [product_lists, setProduct_lists] = useState([])
  const [menu_lists, setMenu_lists] = useState([])

  // cart
  const getCartItems = async (token) => {
    try {
      const response = await axios.post('http://localhost:1000/api/user/cart/get', {}, { headers: { token } })
      setCartItems(response.data.data.cartItems)
    } catch (error) {
      console.log(error)
    }
  }
  const addToCart = async (id) => {
    const token = localStorage.getItem('token')
    let cart = {...cartItems};  
    if(cart[id]>0){
      cart[id]+=1
    }
    else{
      cart[id]=1
    }
    setCartItems(cart)
    try {
      const response = await axios.post(`http://localhost:1000/api/user/cart/add`, { item: cart }, { headers: { token } })
      console.log(response.data.user.cartItems)
    } catch (error) {
      console.log(error)
    }
  }
  const removeToCart = async (id) => {
    const token = localStorage.getItem('token')
    let cart = {...cartItems};  
    if(cart[id]>1){
      cart[id]-=1
    }
    else{
      delete cart[id]
    }
    setCartItems(cart)
    try {
      const response = await axios.post(`http://localhost:1000/api/user/cart/add`, { item: cart }, { headers: { token } })
      // console.log(response.data.user.cartItems)
    } catch (error) {
      console.log(error)
    }
  }
  const getTotal = () => {
    let total = 0
    for (let item of product_lists) {
      if(cartItems[item._id]>0){
        total += cartItems[item._id] *  Number(item.price)
        // console.log(cartItems[item._id])
      }
    }
    return total
  }
// product
  const getProduct = async()=>{
    try {
      const response = await axios.get('http://localhost:1000/api/product/')
      if(response){
        setProduct_lists(response.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>getProduct(),[])

  useEffect(() => {
    setMenu_lists(menu_list)
    setToken(localStorage.getItem('token') || '')
    if (token) getCartItems(token)
  }, [token])

  const context = {
    product_lists,
    menu_lists,
    setToken,
    token,
    cartItems,
    setCartItems,
    addToCart,
    removeToCart,
    getTotal
  }

  return (
    <ProductContext.Provider value={context}>
      {children}
    </ProductContext.Provider>
  )
}

export default ProductGolobal
