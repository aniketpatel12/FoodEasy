import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useHistory } from "react-router-dom"
import { generateOTP, ValidateEmail, ValidatePassword } from '../../../utils/functions'
import { SweetError,SweetInfo,SweetOtpSent,SweetWrongOtp ,SweetWait, SweetWrong, SweetSuccess, SweetPasswordMissMatch } from '../../../SweetAlert'
import api from '../../../utils/api'
import { PageAnimation } from '../../../utils/PageAnimation'
import PasswordInput from '../Components/PasswordInput'
import { SendEmail } from '../../../EmailJs/SendEmail'
import { ResetPasswordTemplate } from '../../../EmailJs/Templates'


const ForgotPassword = () => {

    const [UserDetails, setUserDetails] = useState({
        email:'',
        password:'',
        cnfPassword:'',
        otp:''
    })

    const [otp, setOtp] = useState(generateOTP())

    const [next, setIsNext] = useState(false)

    const [isSent, setIsSent] = useState(false)
    
    const history = useHistory()
    
    const handleChange = (e) => {
        const {name ,value } = e.target
        setUserDetails((prev) => {
            return { ...prev,[name]:value }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault() 

        if(ValidatePassword(UserDetails.password)){

            if(UserDetails.password !== UserDetails.cnfPassword)    SweetPasswordMissMatch()
            
            else{
                
                SweetWait()

                const res = await api.post('/resetpassword',UserDetails)
                const { success , error  } = res.data  

                if(success){
                    SweetSuccess(success)
                    history.push('/signin')
                }

                else    SweetError(error)     
            }
        }
    }

    const sendOtp = async (e) => {
        e.preventDefault() 

        if(ValidateEmail(UserDetails.email)){
           
            SweetWait()
        
            try {
                
                const res = await api.post('/userexist',UserDetails.email)
                const { success , info , error  } = res.data 

                if(success)   SweetError(success)

                else if(info){

                    const sendEmail = {
                        otp,
                        email:UserDetails.email
                    }

                    const isMailSent  = await SendEmail(ResetPasswordTemplate(sendEmail))
                
                    if(isMailSent.status === 200){
                        SweetOtpSent()
                        setIsSent(!isSent)
                    }
                }
                else    SweetError(error)

            } catch (error) {
                SweetWrong()
            }
        }
    }

    const handleNext = (e) => {
        e.preventDefault() 

        if(otp === UserDetails.otp)    setIsNext(!next)

        else if(!UserDetails.otp)   SweetInfo("Enter Otp")

        else    SweetWrongOtp()
    }

    return (
        <motion.section className="flex justify-center pt-24" initial='in' animate='out' exit='exit' 
                        variants={PageAnimation} transition={{ duration: 0.4 }}>
            <div className="w-full max-w-xs">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"> 
                    {
                        !next 
                        ?<>
                            <div className="mb-4">
                                <label className="input-label" htmlFor="email">Email</label>
                                <input 
                                    name="email" 
                                    value={UserDetails.email} 
                                    onChange={handleChange}
                                    className="input-box" autoComplete="none"
                                    type="email" 
                                    placeholder="Enter your email" />
                            </div>
                            <div className="mb-4">
                                <label className="input-label" htmlFor="otp">Otp</label>
                                <input 
                                    name="otp" 
                                    value={UserDetails.otp} 
                                    onChange={handleChange}
                                    className="input-box"
                                    type="number" 
                                    placeholder="Enter Otp" 
                                    autoComplete="none" />
                            </div>
                            <div className="mt-2 flex justify-between">
                                <button className="btn-primary btn mr-2"  
                                        disabled={isSent}
                                        onClick={sendOtp}>Send Otp</button>
                                <button className="btn-primary btn ml-2" 
                                        disabled={!isSent}
                                        onClick={handleNext}>
                                        Next
                                </button>
                            </div>
                    </>
                    :<>
                            <PasswordInput
                                label="New Password"
                                name="password"
                                placeholder="Enter New Password" 
                                value={UserDetails.password} 
                                onChange={handleChange} />
                            <PasswordInput 
                                label="Confirm Password"
                                name="cnfPassword"
                                placeholder="Confirm New Password" 
                                value={UserDetails.cnfPassword} 
                                onChange={handleChange} />
                            <button className="btn-primary btn my-2" onClick={handleSubmit}>Reset Password</button>
                    </>
                    }
                </form>
                <p className="text-center text-gray-500 text-xs">&copy;2021 Speedyfood. All rights reserved.</p>
            </div>
        </motion.section>
    )
}

export default ForgotPassword
