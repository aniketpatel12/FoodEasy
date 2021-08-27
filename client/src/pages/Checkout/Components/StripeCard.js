import React, { useContext, useState } from 'react'
import {loadStripe} from '@stripe/stripe-js'
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'
import { 
  notEmpty,
  validatePinCode,
  ValidatePhone } from '../../../utils/functions'
import { useHistory } from "react-router-dom"
import { SweetConfirm, SweetError, SweetInfo, SweetSuccess, SweetWrong } from '../../../SweetAlert'
import { Context } from '../../../utils/context'
import api from '../../../utils/api'


const CheckoutForm = ({checkOutDetails}) => {
    const stripe = useStripe()

    const elements = useElements()

    const [state, dispatch] = useContext(Context)

    const [isClick, setIsClick] = useState(true)

    const history = useHistory()
    
    const handleSubmit = async () => {

    setIsClick(true)

    if(ValidatePhone(checkOutDetails.phone)  && notEmpty(checkOutDetails.address,"Address") 
          && notEmpty(checkOutDetails.city,"City") && validatePinCode(checkOutDetails.pinCode)) {
        try {
            const {error, paymentMethod} = await stripe?.createPaymentMethod({
                type: 'card',
                card: elements.getElement(CardElement),
            })
            
            if(error)
                SweetInfo(error.message) 
            else {
                const { id } = paymentMethod
                const placeOrderDetails = {
                    checkOutDetails,
                    token:id
                }
                SweetConfirm()

                const res = await api.post('/placeorder',placeOrderDetails)
                const { success , error  } = res.data  
                
                if(success){
                    SweetSuccess(success)
                    dispatch({type:'EMPTY_CART'})
                    history.push('/orders')
                }
                else
                    SweetError(error)     
                }
            } catch (error) {   
                SweetWrong() 
        }
    }   
}

    return (
      <>
        <div className="mb-4 mx-3">
            <label className="input-label" htmlFor="card">Card Details</label>
            <CardElement options={{hidePostalCode:true}} className="bg-white p-3 shadow rounded-md"/>
        </div>
        <div className="mb-4 mx-4">
            <button className={`mt-10 w-full checkout-btn btn3`} onClick={handleSubmit}>
                {`Pay ${checkOutDetails?.TotalPrice}`}
            </button>
        </div>
      </>
    )
  }

const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PROMISE}`);

const StripeCard = ({checkOutDetails}) => {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm checkOutDetails={checkOutDetails}/>
        </Elements>
    )
}

export default StripeCard