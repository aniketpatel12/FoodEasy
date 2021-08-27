import React, { useContext } from 'react'
import { Context } from '../../utils/context'
import CartItems from './Components/CartItems'
import EmptyCart from './Components/EmptyCart'

const Cart = () => {

    const [state, dispatch] = useContext(Context)
    
    return (
        <>
        {
            state.cartItems.length === 0 
            ?
            <EmptyCart />
            :
            <CartItems />
        }
        </>
    )
}

export default Cart
