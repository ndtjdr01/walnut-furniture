import React, { useEffect } from 'react'
import './verify.css'
import { Link, useSearchParams } from 'react-router-dom'
import axios from 'axios'

const Verify = () => {
    const [searchParams] = useSearchParams()
    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')
    const updatePayment = async () => {
        try {
            if (success) {
                const response = await axios.put(`http://localhost:1000/api/order/online/${orderId}`, { payment: true })
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
    useEffect(() => { updatePayment }, [])
    return (
        <div className='verify-container'>
            <h2 className='title'>Payment</h2>
            <div className="result-payment">
                {success === 'true'
                    ? <div className="payment-success">
                        <p>Payment success</p>
                        <button>return to home</button>
                    </div>
                    : <div className="payment-fail">
                        <p>Payment fail</p>
                        <button><Link to={'/'}>return to home</Link></button>
                    </div>
                }
            </div>
        </div>
    )
}

export default Verify
