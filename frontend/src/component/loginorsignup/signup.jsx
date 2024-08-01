import React, { useContext, useEffect, useState } from 'react'
import './login.css'
import axios from 'axios'

const Signup = ({setIsTypeLogin,setIsLogin}) => {
    const [data, setData] = useState({
        email: '',
        name: '',
        password: '',
        confirmPassword: ''
    })
    const hanldeChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (data.password !== data.confirmPassword) return alert('password confirm is not correct')
        try {
            const response = await axios.post(`http://localhost:1000/api/user/signup`, {
                email: data.email,
                password: data.password,
                name: data.name
            })
            if(response.data){
                alert('signup successful. Pls login again')
                setIsTypeLogin(true)
            }
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className='signup login-or-signup'>
            <form action="" onSubmit={handleSubmit} className='form-signup form-login'>
                <span onClick={() => setIsLogin(false)}>x</span>
                <h3>Signup</h3>
                <input type="text" placeholder='email' required name='email' value={data.email} onChange={hanldeChange} />
                <input type="text" placeholder='name' required name='name' value={data.name} onChange={hanldeChange} />
                <input type="password" placeholder='password' required name='password' value={data.password} onChange={hanldeChange} />
                <input type="password" placeholder='confirm password' required name='confirmPassword' value={data.confirmPassword} onChange={hanldeChange} />
                <div className="more-options">
                    <p>Haved account ?</p>
                    <p onClick={() => setIsTypeLogin(true)}>Login</p>
                </div>
                <button onClick={handleSubmit}>Sign up</button>
            </form>
        </div>
    )
}

export default Signup
