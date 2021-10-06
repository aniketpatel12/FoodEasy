import React, { useContext } from 'react'
import { toast } from 'react-toastify';
import CartIcon from './CartIcon';
import { Context } from '../../../utils/context'

const MenuItemCard = ({item}) => {

    const [{}, dispatch] = useContext(Context)

    return (
        <div className="wrapper bg-gray antialiased text-gray-900 m-5">
            <div>
            <article className="bg-white overflow-hidden rounded-lg shadow-lg ">
                <img alt={item.title} className="w-full object-cover object-center rounded-lg shadow-md" src={item.image} />
                <div class="relative px-6 -mt-16 m-5 ">
                <div class ="bg-white p-6 rounded-lg shadow-lg">
                <div class ="flex items-baseline">
                <footer className="p-1.5">
                <h4 className="mt-1 text-xl font-semibold uppercase leading-tight truncate">{item.title}</h4>
                            
                <div class="mt-1">
                Price : 
                <span class ="text-gray-600 text-sm"> { item.price } ₹</span>
                </div>
                
                    <button onClick={() => {
                            toast.success('Item Added To Cart Succesfully', {
                                position: "top-right",
                                autoClose: 1000,
                                hideProgressBar: true,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                })
                            dispatch({type:"ADD_CART",item})
                            }} 
                                        className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-5 rounded-full m-4 mb-0">
                        <span>
                            Add to Cart
                        </span>
                        
                    </button>
                                </footer>
                            
                        </div>
                        </div>
                </div>
                </article>
            </div>
        </div>
    )
}

export default React.memo(MenuItemCard)