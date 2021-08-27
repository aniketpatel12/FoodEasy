import React, { useContext, useState } from 'react'
import { useHistory } from "react-router-dom"
import { motion } from 'framer-motion'
import { SweetConfirm, SweetError, SweetSuccess, SweetWrong } from '../../SweetAlert'
import { Context } from '../../utils/context'
import { notEmpty, ValidatePhone, validatePinCode } from '../../utils/functions'
import api from '../../utils/api'
import { PageAnimation } from '../../utils/PageAnimation'
import StripeCard from './Components/StripeCard'

const Checkout = () => {

  const [state, dispatch] = useContext(Context)

  const history = useHistory()

  const [checkOutDetails, setCheckOutDetails] = useState({
    id:state.user.id,
    username:state.user.username,
    email:state.user.email,
    phone:'',
    address:'',
    city:'',
    pinCode:'',
    paymentMethod:'cod',
    TotalPrice:state.priceDetails.totalPrice,
    orders:state.cartItems
  })

  const handleChange = (e) => {
    const {name ,value } = e.target
    setCheckOutDetails((prev) => {
        return { ...prev,[name]:value }
    })
  }

  const handleSubmit = async (e) => {

    if(ValidatePhone(checkOutDetails.phone)  && notEmpty(checkOutDetails.address,"Address") 
          && notEmpty(checkOutDetails.city,"City") && validatePinCode(checkOutDetails.pinCode)){
      
          try { 
            const placeOrderDetails = {
              checkOutDetails,
              token: 0
            }  
            const res = await api.post('/placeorder',placeOrderDetails)
            SweetConfirm()
            const { success , error  } = res.data 
            
            if(success){
                SweetSuccess(success)
                dispatch({type:'EMPTY_CART'})
                history.push('/orders')
            }
            else
                SweetError(error)
                
          } catch (error) {
                SweetWrong()
            }  
        } 
    }

  return (
    <motion.section className="flex justify-center items-center pt-10 md:pt-20 mb-10" initial='in' animate='out' exit='exit' 
                    variants={PageAnimation} transition={{ duration: 0.4 }}>
        <div className="w-full md:w-1/2">
            <div className="bg-white mx-3 shadow-md rounded py-6 px-5 mb-4 grid md:gap-10 grid-cols-1 md:grid-cols-2">
                <div>
                    <div className="mx-3 mb-8">
                        <h1 className="text-2xl text-center md:text-left font-bold tracking-wider primary-text" htmlFor="name">Confirm Order</h1>  
                    </div>
                <div className="mb-4 mx-3">
                    <label className="input-label" htmlFor="username">Name</label>
                    <input 
                        name="username" 
                        value={checkOutDetails.username} 
                        disabled
                        className="input-box"
                        type="text"/>
                </div>
                <div className="mb-4 mx-3">  
                    <label className="input-label" htmlFor="email">Email</label>
                    <input 
                        name="email" 
                        value={checkOutDetails.email} 
                        disabled
                        className="input-box"
                        type="text"/>
                </div>
                <div className="mb-4 mx-3">
                    <label className="input-label" htmlFor="phone">Phone</label>
                    <input 
                        name="phone" 
                        value={checkOutDetails.phone} 
                        onChange={handleChange}
                        className="input-box"
                        maxLength="10"
                        placeholder="Enter your phone number" 
                        autoComplete="none"/>
                </div>
                <div className="mb-4 mx-3">
                    <label className="input-label" htmlFor="address">Address</label>
                    <input 
                        name="address" 
                        value={checkOutDetails.address} 
                        onChange={handleChange}
                        className="input-box"
                        type="text" 
                        placeholder="Enter your address"/>
                </div>
            </div>
            <div className="mt-0 md:mt-16"> 
                <div className="mb-4 mx-3">
                    <label className="input-label" htmlFor="city">City</label>
                    <input 
                        name="city" 
                        value={checkOutDetails.city} 
                        onChange={handleChange}
                        className="input-box"
                        type="text" 
                        placeholder="Enter your address"/>
                </div>
                <div className="mb-4 mx-3">
                    <label className="input-label" htmlFor="pinCode">Pin Code</label>
                    <input 
                        name="pinCode" 
                        value={checkOutDetails.pinCode} 
                        onChange={handleChange}
                        className="input-box"
                        maxLength="6"
                        placeholder="Enter your Pin Code"/>
                </div>
                <div className="mb-4 mx-4">
                    <label className="input-label">Payment Method</label>
                    <select name="paymentMethod" onChange={handleChange} className="form-select text-sm shadow p-2 w-full">
                        <option value="cod">Cash On Delivery</option>
                        <option value="card">Visa Card</option>
                    </select>  
                </div>
                {
                    checkOutDetails.paymentMethod === "card" 
                    && 
                    <StripeCard checkOutDetails={checkOutDetails}/>
                }
                <div className="mb-4 mx-4">
                    <button onClick={handleSubmit} className={`${checkOutDetails.paymentMethod === "card" ? 'remove-btn':''} mt-11 w-full checkout-btn btn3`}>
                    {`Pay ${checkOutDetails?.TotalPrice}`}
                    </button>
                </div>
                
            </div>
        </div>
    </div>
</motion.section>)
}

export default Checkout
