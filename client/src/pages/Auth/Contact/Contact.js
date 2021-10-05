import React, { useState } from 'react'
import { checkSpecial, notEmpty, ValidateEmail } from '../../../utils/functions'
import { useHistory } from "react-router-dom"
import { motion } from 'framer-motion';
import { ContactTemplate } from '../../../EmailJs/Templates'
import { PageAnimation } from '../../../utils/PageAnimation';
import { SweetContact, SweetWait, SweetWrong } from '../../../SweetAlert';
import { SendEmail } from '../../../EmailJs/SendEmail';
import delivery from '../../../../src/SvgIcons/ContactUs.svg'

const Contact = () => {

    const [UserDetails, setUserDetails] = useState({
        username:'',
        email:'',
        message:''
    })

    const history = useHistory()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(checkSpecial(UserDetails.username) && ValidateEmail(UserDetails.email) && notEmpty(UserDetails.message,"Message")){

            SweetWait()
        
            try {

                const isSent  = await SendEmail(ContactTemplate(UserDetails))
                
                if(isSent.status === 200){
                    SweetContact()
                    history.push('/')
                }
                
            } catch (error) {
                SweetWrong()
            }
        }

    }

    const handleChange = (e) => {
        const {name ,value } = e.target
        setUserDetails((prev) => {
            return { ...prev,[name]:value }
        })
    }

    return (
            <motion.section className="flex justify-center pt-24"  initial='in' animate='out' exit='exit' 
                            variants={PageAnimation} transition={{ duration: 0.4 }}>
                {/* <div className="w-full max-w-xs">
               
                    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-9 pt-7 pb-8 mb-7">
                    <img src={delivery} alt="delivery" />
                        <div className="mb-4">
                            <label className="input-label" htmlFor="username">Name</label>
                            <input 
                                name="username" 
                                value={UserDetails.username} 
                                onChange={handleChange}
                                className="input-box"
                                type="text" 
                                placeholder="Enter your name" />
                        </div>
                        <div className="mb-4">
                            <label className="input-label" htmlFor="email">Email</label>
                            <input 
                                name="email" 
                                value={UserDetails.email} 
                                onChange={handleChange}
                                className="input-box"
                                type="email" 
                                placeholder="Enter your email" />
                        </div>
                        <div className="mb-6">
                            <label className="input-label" htmlFor="message">Message</label>
                            <textarea 
                                name="message" 
                                value={UserDetails.message} 
                                onChange={handleChange}
                                className="input-box mb-2"
                                type="text" rows="3" 
                                placeholder="Enter your query" />
                        </div>
                        <button className="btn-primary btn" type="submit">Send</button>
                    </form>
                    <p className="text-center text-gray-500 text-xs">&copy;2021 FoodEasy. All rights reserved.</p>
                </div>
                <div className="order-first md:order-last md:col-span-2">
                    
                </div> */}

            <div className="md:mx-32 hero-ipad px-6 grid md:gap-8 grid-cols-1 md:grid-cols-3">
                <div className="main-text my-10 mx-auto text-center md:text-left md:my-auto md:mx-0">
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-9 pt-7 pb-8 mb-7">
                    {/* <img src={delivery} alt="delivery" /> */}
                        <div className="mb-4">
                            <label className="input-label" htmlFor="username">Name</label>
                            <input 
                                name="username" 
                                value={UserDetails.username} 
                                onChange={handleChange}
                                className="input-box"
                                type="text" 
                                placeholder="Enter your name" />
                        </div>
                        <div className="mb-4">
                            <label className="input-label" htmlFor="email">Email</label>
                            <input 
                                name="email" 
                                value={UserDetails.email} 
                                onChange={handleChange}
                                className="input-box"
                                type="email" 
                                placeholder="Enter your email" />
                        </div>
                        <div className="mb-6">
                            <label className="input-label" htmlFor="message">Message</label>
                            <textarea 
                                name="message" 
                                value={UserDetails.message} 
                                onChange={handleChange}
                                className="input-box mb-2"
                                type="text" rows="3" 
                                placeholder="Enter your query" />
                        </div>
                        <button className="btn-primary btn" type="submit">Send</button>
                    </form>
                    <p className="text-center text-gray-500 text-xs">&copy;2021 FoodEasy. All rights reserved.</p>


                    {/* <h6 className="text-xl mb-2 text-gray-800 lg:text-4xl hero-ipad-text lg:mb-4">Are you hungry?</h6>
                    <h1 className="text-4xl mb-4 text-gray-800 lg:text-7xl font-bold lg:mb-8 tracking-wider">Don't wait !</h1>
                    <h6 className="text-xl mb-2 text-gray-800 lg:text-2xl hero-ipad-text lg:mb-4">Your Favorite Food  Delivered Hot & Fresh</h6>
                   <Link to={'/menu'}> <button className="px-6 py-2 rounded-full text-white font-bold tracking-wider btn-primary">Order Now</button></Link> */}
                </div>
                <div className="order-first md:order-last md:col-span-2">
                    <img src={delivery} alt="delivery" />
                </div>
            </div>
            </motion.section>
    )
}

export default Contact
