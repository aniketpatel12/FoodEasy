import { motion } from 'framer-motion'
import React from 'react'
import { Link } from 'react-router-dom'
import { PageAnimation } from '../../../utils/PageAnimation'
import EmptyCartSvg from '../../../SvgIcons/EmptyCard.svg'

const EmptyCart = () => {
    return (
        <motion.div className="flex mt-7 flex-col justify-center items-center"initial='in' animate='out' exit='exit' 
                        variants={PageAnimation} transition={{ duration: 0.5 }}>
                <img className="w-auto md:w-1/4" src={EmptyCartSvg} alt=""/>
                <h1 className="text-3xl font-bold mb-2">Cart Empty 😕</h1>
                <p className="text-gray-500 text-lg mb-5">You probably haven't added a item yet. <br/>
                    To order a Food, go to the Home page.
                </p>
                <Link to="/"  
                      className="px-6 py-2 rounded-full text-white font-bold tracking-wider btn-primary">
                      Order Now
                </Link>
            </motion.div>
    )
}

export default EmptyCart
