import { useContext } from 'react'
import { Context } from '../../../utils/context'

const CartItem = ({item}) => {

    const [{}, dispatch] = useContext(Context)
    
    return (
        <div className="flex items-center justify-center p-2 md:ml-4  border-gray-100 border-b-2 md:py-4">
            <img className="w-24" src={item.image} alt="" />
            <div className="flex-1 ml-2 md:ml-4">
                <h1 className="text-sm md:text-xl">{item.title}</h1>
            </div>
            <div className="flex-1 align-middle ml-2 md:ml-0">
                <button 
                    onClick={() => dispatch({type:"ADD_CART",item})}
                    className="text-base text-gray-700 font-bold cursor-pointer md:text-2xl inline-block mr-1 md:mr-5">
                    +
                </button>
                <span className="text-base md:text-xl inline-block">{item.qty} Pcs</span>
                <button 
                    onClick={() => dispatch({type:"REMOVE_CART",item})}
                    className="text-base md:text-2xl font-bold text-gray-700 cursor-pointer inline-block ml-1 md:ml-5">
                    -
                </button>
            </div>
            <span className="font-bold text-base md:text-lg">{item.price * item.qty} Rs</span>
        </div>
    )
}

export default CartItem
