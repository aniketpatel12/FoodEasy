import React from 'react'
// import delivery from '../../SvgIcons/HomeImage.svg'
// import Menu from './Components/Menu'
import { motion } from 'framer-motion';
import { PageAnimation } from '../../utils/PageAnimation';
import { Link } from 'react-router-dom';
import aboutpic from '../../SvgIcons/deliveryboy.svg'

function CallOrder(){

}

const Home = () => {
    return (
        <motion.section className="hero" initial='in' animate='out' exit='exit' 
                        variants={PageAnimation} transition={{ duration: 0.2 }}>
            <div className="md:mx-32 hero-ipad px-6 grid md:gap-8 grid-cols-2 md:grid-cols-2">
                <div className="main-text my-10 mx-auto text-center md:text-left md:my-auto md:mx-0">
                    <h6 className="text-4xl mb-4 text-gray-800 lg:text-6xl font-blod hero-ipad-text lg:mb-4">FoodEasy</h6>
                    {/* <h1 className="text-4xl mb-4 text-gray-800 lg:text-7xl font-bold lg:mb-8 tracking-wider">Don't wait !</h1> */}
                    <h6 className="text-xl mb-1 text-gray-800 lg:text-xl hero-ipad-text lg:mb-4">Online ordering system that we are proposing here, greatly simplifies the  ordering process for the customer. 
System presents an  interactive and up-to-date menu with all available options in an easy to use  manner. 
Customer can choose one or more items to place an order which will  land in the Cart. 
Customer can view all the order details in the cart before  checking out. 
At the end, customer gets order confirmation details. Once the  order is placed it is entered in the database and retrieved in pretty much real  time. 
</h6>
                   <Link to={'/menu'}> <button className="px-6 py-2 rounded-full text-white font-bold tracking-wider btn-primary">Order Something!</button></Link>
                </div>
                <div className="order-first md:order-last md:col-span-1">
                    <img src={aboutpic} alt="delivery" />
                    {/* <img src={confused} alt="delivery" /> */}
                </div>
            </div>
            {/* <Menu /> */}
        </motion.section>
    )
}

export default Home

