import React, { useContext, useEffect, useState } from 'react'
import './login.css'
import axios from 'axios'
import { ProductContext } from '../../context'

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
            const response = await axios.post(`http://localhost:1000/api/user/login`,{
                email:data.email,
                password:data.password
            })
            console.log(response)
            if(response.data === "email not found")
                alert('Email not found')
            else if (response.data === "wrong password")
                alert('Wrong password')

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
