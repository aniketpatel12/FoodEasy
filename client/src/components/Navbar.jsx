import React,{ useContext, useState } from 'react'
import { cancelIcon, icon , menuIcon } from '../utils/svgs'
import { Link } from "react-router-dom";
import CartIcon from './CartIcon';
import { Context } from '../utils/context';
import { motion } from 'framer-motion';
import {PageAnimation} from '../utils/PageAnimation'

const Navbar = () => {

  const [state,dispatch] = useContext(Context)

  const [isOpen, setIsOpen] = useState(true)

  return (
    <motion.section className="navbar sticky z-50 top-0 border-b-4" initial='in' animate='out' exit='exit' 
                    variants={PageAnimation} transition={{ duration: 0.5 }}>
        <nav className="flex md:mx-24 navbar-ipad items-center md:px-3 py-3 flex-wrap">
            {icon}
            <Link to="/" className="p-2 md:mr-4 inline-flex items-center outline-none">
              <span className="text-xl text-white font-bold uppercase tracking-wide">FoodEasy</span>
            </Link>
            <button className="text-white inline-flex p-3 rounded lg:hidden ml-auto hover:text-white outline-none" 
                  onClick={() => setIsOpen(!isOpen)}>
                  { isOpen ? menuIcon : cancelIcon }
            </button>
            <div className={`${isOpen ? 'hidden':'' } w-full lg:inline-flex lg:flex-grow lg:w-auto`}>
                <div className="navlink-container">
                    <Link to='/' onClick={() => setIsOpen(!isOpen)} className="navlink"><span>Home</span></Link>
                    { 
                      state.user.username ?<>
                        <Link to='/orders'  onClick={() => setIsOpen(!isOpen)} className="navlink"><span>My Orders</span></Link>
                        <Link to='/myprofile' onClick={() => setIsOpen(!isOpen)} className="navlink"><span>My Profile</span></Link>
                      </>:<>
                        <Link to='/signup' onClick={() => setIsOpen(!isOpen)} className="navlink"><span>Sign Up</span></Link>
                        <Link to='/signin' onClick={() => setIsOpen(!isOpen)} className="navlink"><span>Sign In</span></Link>
                      </>
                    }
                    <Link to='/contact' onClick={() => setIsOpen(!isOpen)} className="navlink"><span>Contact Us</span></Link>
                    <Link to="/cart" onClick={() => setIsOpen(!isOpen)} className="cart relative inline-flex cart-ipad-margin ml-3 mt-2 md:ml-0 md:mt-0">
                      <CartIcon stroke="#fff" classes="h-6 w-6" />
                      <span className="cart-basket bg-gray-700 flex items-center justify-center">
                        {state?.cartItems.length || 0}
                      </span>
                    </Link>
                </div>
            </div>
        </nav>
    </motion.section>
  )
}

export default Navbar
