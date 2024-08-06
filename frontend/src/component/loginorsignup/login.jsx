import React, { useContext, useEffect, useState } from 'react'
import './login.css'
import axios from 'axios'
import { ProductContext } from '../../context'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const ADMIN_URL = import.meta.env.VITE_ADMIN_URL
const Login = ({setIsLogin, setIsTypeLogin}) => {
    const {token,setToken} = useContext(ProductContext)
    const [data,setData] = useState({
        email: '',
        password: ''
    })
    const handleChange =(e)=>{
        setData({...data,[e.target.name]:e.target.value})
    }
    const handleSubmit= async(e)=>{
        e.preventDefault()
        try {
            const response = await axios.post(`${API_BASE_URL}/api/user/login`,{
                email:data.email,
                password:data.password
            })
            console.log(response)
            if(response.data === "email not found")
                alert('Email not found')
            else if (response.data === "wrong password")
                alert('Wrong password')
            if(data.email ==='admin' && data.password ==='admin'){
                window.open(ADMIN_URL,'_blank')
            }
            if(response.data.token){
                setToken(response.data.token)
                localStorage.setItem('token',response.data.token)
                setIsLogin(false)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>console.log(token),[token])
  return (
    <div className='login login-or-signup'>
      <form action="" className='form-login'>
        <span onClick={()=>setIsLogin(false)}>x</span>
        <h3>Login</h3>
        <p>/go to admin page with email:'admin', pass: 'admin'/</p>
        <p>this is test function</p>
        <input type="text" placeholder='email' required name='email' value={data.email} onChange={handleChange}/>
        <input type="password" placeholder='password' required name='password' value={data.password} onChange={handleChange}/>
        <div className="more-options">
            <p>Forgot Password?</p>
            <p onClick={()=>setIsTypeLogin(false)}>Sign up</p>
        </div>
        <button onClick={handleSubmit}>Login</button>
      </form>
    </div>
  )
}

export default Login
