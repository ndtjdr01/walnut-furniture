import React, { createContext, useEffect, useState } from 'react'
import { menu_list, product_list } from '../assets/assets'
import axios from 'axios'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const ProductContext = createContext(null)

const ProductGolobal = ({ children }) => {
  const [cartItems, setCartItems] = useState({})
  const [token, setToken] = useState(null)
  const [product_lists, setProduct_lists] = useState([])
  const [menu_lists, setMenu_lists] = useState([])
  const [loading,setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [isLogin,setIsLogin] = useState(false)
  // cart
  const getCartItems = async (token) => {
    try {
      setLoading(true)
      const response = await axios.post(`${API_BASE_URL}/api/user/cart/get`, {}, { headers: { token } })
      setCartItems(response.data.data.cartItems)
    } catch (error) {
      setError(true)
      console.log(error)
    }
    finally{
      setLoading(false)
    }
  }
  const addToCart = async (id) => {
    const token = localStorage.getItem('token')
    if (!token){setIsLogin(true);return}
    let cart = {...cartItems};  
    if(cart[id]>0){
      cart[id]+=1
    }
    else{
      cart[id]=1
    }
    setCartItems(cart)
    try {
      const response = await axios.post(`${API_BASE_URL}/api/user/cart/add`, { item: cart }, { headers: { token } })
      console.log(response.data.user.cartItems)
    } catch (error) {
      setError(true)
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
      const response = await axios.post(`${API_BASE_URL}/api/user/cart/add`, { item: cart }, { headers: { token } })
      // console.log(response.data.user.cartItems)
    } catch (error) {
      setError(true)
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
      setLoading(true)
      const response = await axios.get(`${API_BASE_URL}/api/product/`)
      if(response){
        setProduct_lists(response.data)
      }
    } catch (error) {
      setError(true)
      console.log(error)
    }
    finally{
      setLoading(false)
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
    getTotal,
    loading,
    error,
    isLogin,
    setIsLogin,
  }

  return (
    <ProductContext.Provider value={context}>
      {children}
    </ProductContext.Provider>
  )
}

export default ProductGolobal
