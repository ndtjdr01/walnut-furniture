import React from 'react'
import './header.css'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='header-container'>
      <Link style={{color: '#fff'}} to={'/'} className="logo">Noithattiennga</Link>
      <div className="navbar">
        <p>Tool</p>
        <p>Library</p>
        <p>Note</p>
      </div>
      <div className="setting">Setting</div>
    </div>
  )
}

export default Header
