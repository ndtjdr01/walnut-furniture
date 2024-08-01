import React from 'react'
import './footer.css'

const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer-address">
        <p className='footer-title'>Địa chỉ</p>
        <div className="footer-content">
          <p>Hà Nội, Quốc Oai, Ngọc Liệp</p>
          <p>Hà Nội, Thạch Thất, Hữu Bằng</p>
        </div>
      </div>
      <div className="footer-contact">
        <p className='footer-title'>Liên hệ</p>
        <div className="footer-content">
          <p>Zalo: 0378951789</p>
          <p>Hotline: 0378951789</p>
          <p>Fb: Nguyễn Doãn Tiến</p>
        </div>
      </div>
      <div className="footer-about">
        <p className='footer-title'>Về chúng tôi</p>
        <div className="footer-content">
          <p>Sản xuất tại xưởng, trực tiếp</p>
          <p>Chuyên óc chó, mun, hương đá</p>
          <p>Giá rẻ-Uy tín-Chất lượng</p>
        </div>
      </div>
    </div>
  )
}

export default Footer
