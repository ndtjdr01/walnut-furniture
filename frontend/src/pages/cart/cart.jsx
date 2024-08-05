import React, { useContext, useEffect, useState } from 'react'
import './cart.css'
import { ProductContext } from '../../context'
import FormAddress from '../../component/form-address/formAddress'
import FormContact from '../../component/form-address/formContact'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const Cart = () => {
    const { cartItems, product_lists, addToCart, removeToCart, getTotal } = useContext(ProductContext)
    let data = [];
    for (let item of product_lists) {
        if (cartItems[item._id] > 0) {
            let product = { ...item, quantity: cartItems[item._id] }
            data.push(product)
        }
    }
    const [payment, setPayment] = useState('offline')
    const changePayment = () => {
        setPayment(payment === 'offline' ? 'online' : 'offline')
    }
    useEffect(() => { console.log(payment) }, [payment])
    
    return (
        <div className='cart-container'>
            <h3>Giỏ hàng</h3>
            <p>Đây chỉ là giá ước tính. Thực tế giá sản phẩm sẽ thay đổi theo kích thước bạn yêu cầu</p>
            <p>Hãy liên hệ với chúng tôi hoặc gửi form ở phía dưới để được tư vấn thêm</p>
            <div className="cart-content-father">
                <div className="cart-content">
                    <div className='cart-item-title grid'>
                        <p className='cart-title-first'>Sản phẩm</p>
                        <p></p>
                        <p>Đơn giá</p>
                        <p>Số lượng</p>
                        <p>Thành tiền</p>
                    </div>
                    {
                        data.length > 0
                            ? data.map((item, index) => (
                                <div key={index} className='cart-item grid'>
                                    <div className="cart-item-img"><img src={`${API_BASE_URL}/api/images/${item.image}`} alt="" /></div>
                                    <a href='afsd' className='name'>{item.name}</a>
                                    <p>{item.price}</p>
                                    <div className="cart-item-quantity">
                                        <span onClick={() => addToCart(item._id)}>+</span>
                                        <p>{item.quantity}</p>
                                        <span onClick={() => removeToCart(item._id)}>-</span>
                                    </div>
                                    <p>{(item.quantity * Number(item.price)).toLocaleString('en').replace(/,/g, ' ')}</p>
                                </div>
                            ))
                            : <div className='empty-cart'>Bạn chưa chọn sản phẩm nào</div>
                    }
                </div>
            </div>
            <div className="cart-payment">
                <div className="form">
                    {
                        payment === "online"
                            ? <FormAddress />
                             : <FormContact />
    
                    }

                </div>
                <div className="payment">
                    <div className="payment-1">
                        <h4>Payment</h4> 
                        <p>{`Ước tính: ${getTotal().toLocaleString('en').replace(/,/g, ' ')} đ`}</p>
                        <select className='change-payment' onChange={changePayment} name="payment" id="payment" defaultValue={'Thanh toán khi nhận hàng'}>
                            <option value="Thanh toán khi nhận hàng">Thanh toán khi nhận hàng</option>
                            <option value="Thanh toán bằng thẻ tín dụng">Thanh toán bằng thẻ tín dụng</option>
                        </select>
                        {payment === "online"
                            ? <p>Vui lòng điền địa chỉ nhận hàng và sdt, chúng tôi sẽ báo thời gian giao hàng</p>
                            : <p>Vui lòng điền thông tin của bạn, chúng tôi sẽ liên hệ trong 1 vài giờ</p>
                        }
                    </div>
                    <div className="payment-2">
                        <h4>Hoặc</h4>
                        <p>Liên hệ trực tiếp với chúng tôi</p>
                        <div className="payment-contact">
                            <div className="payment-contact-facebook">
                                <i class="fa-brands fa-facebook"></i>
                                <span>fb: Nguyễn Doãn Tiến</span>
                            </div>
                            <div className="payment-contact-hotline">
                                <i class="fa-solid fa-phone"></i>
                                <span>hotline: 0378951780</span>
                            </div>
                            <div className="payment-contact-zalo">
                                <span>zalo: 0378951780</span>
                                <div>liên hệ ngay</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart
