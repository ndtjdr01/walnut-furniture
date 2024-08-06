import React from 'react'
import './more.css'

const More = () => {
  return (
    <div className='more-container'>
      <h3>More</h3>
      <div className="more-content">
        <div className="more-container-item">
          <p>Người sáng tạo: </p>
          <p>Nguyễn Doãn Thành</p>
          </div>
        <div className="more-container-item">
          <p>Ngày sáng tạo:</p>
          <p>6/8/2024</p>
          </div>
        <div className="more-container-item">
          <p>Địa chỉ: </p>
          <p>Hà Nội, Bắc Từ Liêm, Cổ Nhuế</p>
          </div>
        <div className="more-container-item">
          <p>Contact :</p>
          <p>0346388712</p>
          </div>
      </div>
    </div>
  )
}

export default More
