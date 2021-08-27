import React, { useState } from 'react'
import { checkSpecial, notEmpty, ValidateEmail } from '../../../utils/functions'
import { useHistory } from "react-router-dom"
import { motion } from 'framer-motion';
import { ContactTemplate } from '../../../EmailJs/Templates'
import { PageAnimation } from '../../../utils/PageAnimation';
import { SweetContact, SweetWait, SweetWrong } from '../../../SweetAlert';
import { SendEmail } from '../../../EmailJs/SendEmail';

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
                <div className="w-full max-w-xs">
                    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
                                className="input-box mb-3"
                                type="text" rows="4" 
                                placeholder="Enter your query" />
                        </div>
                        <button className="btn-primary btn" type="submit">Send</button>
                    </form>
                    <p className="text-center text-gray-500 text-xs">&copy;2021 Speedyfood. All rights reserved.</p>
                </div>
            </motion.section>
    )
}

export default Contact
