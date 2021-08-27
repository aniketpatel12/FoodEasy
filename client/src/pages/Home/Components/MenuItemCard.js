import React, { useContext } from 'react'
import { toast } from 'react-toastify';
import CartIcon from './CartIcon';
import { Context } from '../../../utils/context'

const MenuItemCard = ({item}) => {

    const [{}, dispatch] = useContext(Context)

    return (
        <div className="my-3 card-ipad px-5 w-full md:w-1/2 lg:my-4 md:mx-12 lg:px-4 lg:w-1/4">
            <article className="bg-white overflow-hidden rounded-lg shadow-lg">
                <img alt={item.title} className="block h-auto w-full" src={item.image} />
                <header className="flex items-center flexible justify-center leading-tight p-2 md:p-4">
                    <h1 className="text-lg">{item.title}</h1>
                </header>
                <footer className="flex items-center justify-between leading-none p-2">
                    <h2>
                        <span className="font-bold">Price : </span>
                        <span>{ item.price } ₹</span>
                    </h2>
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
                            className="no-underline focus:outline-none card-button rounded-md p-2">
                        <span>
                            <CartIcon stroke="#fff" classes="h-6 w-6" />
                        </span>
                    </button>
                </footer>
            </article>
        </div>
    )
}

export default React.memo(MenuItemCard)
