import React from 'react'
import './slide.css'
import { NavLink } from 'react-router-dom'

const Slide = () => {
  return (
    <div className='slide-container'>
        <NavLink className='option option-child' to={'/add'}>add</NavLink>
        <NavLink className='option option-child' to={'/list'}>list</NavLink>
        <NavLink className='option option-child' to={'/order'}>order</NavLink>
    </div>
  )
}

export default Slide
