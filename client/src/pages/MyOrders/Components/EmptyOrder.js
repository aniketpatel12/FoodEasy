import { motion } from 'framer-motion'
import React from 'react'
import { Link } from 'react-router-dom'
import EmptyOrderSvg from '../../../SvgIcons/EmptyOrder.svg'
import { PageAnimation } from '../../../utils/PageAnimation'

const EmptyOrder = () => {
    return (
        <motion.div className="flex mt-14 flex-col justify-center items-center"initial='in' animate='out' exit='exit' 
                        variants={PageAnimation} transition={{ duration: 0.5 }}>
            <img className="w-auto md:w-1/3" src={EmptyOrderSvg} alt=""/>
            <h1 className="text-3xl font-bold my-4">No Order's Yet.</h1>
            <p className="text-gray-500 text-center text-lg mb-5">Fortunately, it is very easy to order food.</p>
            <Link to="/"  
                className="px-6 py-2 rounded-full text-white font-bold tracking-wider btn-primary">
                Order Now
            </Link>
        </motion.div>
    )
}

export default EmptyOrder
