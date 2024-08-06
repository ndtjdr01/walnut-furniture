import React, { useEffect } from 'react'
import './verify.css'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const Verify = () => {
    const [searchParams] = useSearchParams()
    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')
    const navigate = useNavigate()
    const backHome = () => {
        navigate('/')
        window.location.reload()
    }
    const updatePayment = async () => {
        try {
            if (success==='true') {
                const response = await axios.put(`${API_BASE_URL}/api/order/online/${orderId}`, { payment: true })
                console.log(response)
                if (response) alert('payment successful')
            }
            else {
                alert('payment failed')
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => updatePayment(), [])
    return (
        <div className='verify-container'>
            <h2 className='title'>Payment</h2>
            <div className="result-payment">
                {success === 'true'
                    ? <div className="payment-success">
                        <p>Payment success</p>
                        <button onClick={backHome}>return to home</button>
                    </div>
                    : <div className="payment-fail">
                        <p>Payment fail</p>
                        <button onClick={backHome}>return to home</button>
                    </div>
                }
            </div>
        </div>
    )
}

export default Verify
