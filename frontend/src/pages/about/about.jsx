import React from 'react'
import './about.css'

const About = () => {
  return (
    <div className='about-container'>
        <h3>Xưởng nội thất Tiến Nga</h3>
        <div className="about-content">
          <div className="about-div">
            <p>Cơ sở sản xuất trực tiếp nội thất.</p>
          </div>
          <div className="about-div">
            <p>Chúng tôi chuyên nhận hàng đặt, làm kỹ.</p>
          </div>
          <div className="about-div">
            <p>Với các loại gõ chính: óc chó, mun, hương đá, sồi</p>
          </div>
          <div className="about-div">
            <p>Quý khách có thể đến thăm xưởng tại địa chỉ: <span>Hà Nội, Quốc Oai</span></p>
          </div>
          <div className="about-div">
            <p>Nếu có thắc mắc gì xin vui lòng liên hệ sđt: <span>0378951780</span></p>
          </div>
        </div>
    </div>
  )
}

export default About
