import React, { useContext } from 'react'
import './header.css'
import { ProductContext } from '../../context'
import {Link} from 'react-router-dom'

const Header = ({setIsLogin}) => {
  const {token} = useContext(ProductContext)
  const handleLogOut = ()=>{
    localStorage.removeItem('token')
    setIsLogin(false)
    window.location.reload() // refresh the page to remove the token from the context and update the UI accordingly  // you might want to add a toast or something to indicate the logout process to the user instead of a page refresh.  // In a real-world application, you'd probably want to clear the token and the user's details from the app's state or database as well.  // If you're using a backend API, you'd likely want to send a DELETE request to the logout endpoint.  // You'd also want to handle any potential errors that might occur during the logout process.  // Note: This is a simplified version and doesn't include error handling or additional UI elements for logout.  // In a production application, you'd want to use a more robust and secure logout process.  // You'd likely want to use a backend API for the logout process to ensure that the token is revoked
  }
  return (
    <div className='header'>
      <Link to={'/'} className="logo">Noithattiennga</Link>
      <div className="navbar">
        <ul>
          <li><a href='/'>Trang chủ</a></li>
          <li><a href='/about'>Về chúng tôi</a></li>
          <li><a href='/product'>Sản phẩm</a></li>
          <li><a href='contact'>Liên hệ</a></li>
          <li><a href='more'>Thêm</a></li>
        </ul>
      </div>
      <div className="action">
        <div><i class="fa-solid fa-magnifying-glass"></i></div>
        <div>
          <Link to={'/cart'}><i class="fa-solid fa-cart-shopping"></i></Link>
          <div className="dot"></div>
        </div>
        {token
        ?<div className='user-icon' onClick={handleLogOut}><i class="fa-solid fa-right-from-bracket"></i></div>
        :<div className='user-icon' onClick={()=>setIsLogin(true)}><i class="fa-solid fa-user"></i></div>
        }
      </div>
    </div>
  )
}

export default Header
