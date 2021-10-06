import React from 'react'
import delivery from '../../SvgIcons/HomeImage.svg'
import Menu from './Components/Menu'
import { motion } from 'framer-motion';
import { PageAnimation } from '../../utils/PageAnimation';
import { Link } from 'react-router-dom';
import confused from '../../SvgIcons/Questions-pana.svg'

function CallOrder(){

}

const Home = () => {
    return (
        <motion.section className="hero" initial='in' animate='out' exit='exit' 
                        variants={PageAnimation} transition={{ duration: 0.2 }}>
            <div className="md:mx-32 hero-ipad px-6 grid md:gap-8 grid-cols-2 md:grid-cols-2">
                <div className="main-text my-10 mx-auto text-center md:text-left md:my-auto md:mx-0">
                    <h6 className="text-xl mb-2 text-gray-800 lg:text-4xl hero-ipad-text lg:mb-4">Are you <font color="#407BFF">hungry?</font></h6>
                    <h1 className="text-4xl mb-4 text-gray-800 lg:text-7xl font-bold lg:mb-8 tracking-wider">Don't wait !</h1>
                    <h6 className="text-xl mb-2 text-gray-800 lg:text-2xl hero-ipad-text lg:mb-4">Your Favorite Food will be delivered Hot & Fresh</h6>
                   <Link to={'/menu'}> <button className="px-6 py-2 rounded-full text-white font-bold tracking-wider btn-primary">Order Now</button></Link>
                </div>
                <div className="order-first md:order-last md:col-span-1">
                    {/* <img src={delivery} alt="delivery" /> */}
                    <img src={confused} alt="delivery" />
                </div>
            </div>
            {/* <Menu /> */}
        </motion.section>
    )
}

export default Home

