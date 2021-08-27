import { motion } from 'framer-motion'
import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../../../utils/context'
import { PageAnimation } from '../../../utils/PageAnimation'
import CartIcon from './CartIcon'
import CartItem from './CartItem'

const CartItems = () => {

    const [state, dispatch] = useContext(Context)

    let itemsPrice = state.cartItems ? state.cartItems?.reduce((a, c) => a + c.qty * c.price, 0) : 0
    let shippingPrice = itemsPrice > 500 ? 0 : 20
    let totalPrice = itemsPrice + shippingPrice
    
    
    useEffect(() => {

        const priceDetails = {
            itemsPrice,
            shippingPrice,
            totalPrice
        }
        
        dispatch({type:"SET_PRICE",priceDetails})
       
    }, [totalPrice])


    return (
        <motion.div className="w-full cart-ipad md:px-32"initial='in' animate='out' exit='exit' 
                        variants={PageAnimation} transition={{ duration: 0.4 }}>
                <div className="flex items-center pb-3 border-gray-200  border-b-4 text-gray-700 text-2xl md:text-4xl font-bold my-6">
                    <span className=""><CartIcon stroke="#374151" classes="h-9 w-14" /></span>
                    <span className="ml-2">Order Summery</span>
                </div>
                    {
                        state.cartItems.map((cartItem) => <CartItem key={cartItem.id} item={cartItem} />)
                    }
                <div className="text-right p-4">
                    <div>
                        <span className="text-base md:text-lg">Items Price:</span>
                        <span className="amount text-lg md:text-xl ml-5">{itemsPrice} Rs</span><br/>
                        <span className="text-base md:text-lg">Shipping Price:</span>
                        <span className="amount text-lg md:text-xl ml-5">{shippingPrice} Rs</span><br/>
                        <span className="text-base md:text-lg font-bold mt-3">Total Price:</span>
                        <span className="amount text-lg md:text-xl font-bold ml-5">{totalPrice} Rs</span>
                        <div className="mt-8">
                        { state.user.username ?
                            <Link to={{ pathname: '/checkout', state: { isClick: true } }}
                                className="px-6 py-2 rounded-full text-white font-bold tracking-wider btn-primary">
                                Proceed To Checkout
                            </Link>
                            :
                            <Link to="/signin"  
                                className="px-6 py-2 rounded-full text-white font-bold tracking-wider btn-primary">
                                Login To Continue
                            </Link>
                        }
                        </div>
                    </div>
                </div>
            </motion.div>
    )
}

export default CartItems
