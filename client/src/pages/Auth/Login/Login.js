import { useContext, useState } from 'react'
import { Link,useHistory } from "react-router-dom"
import { motion } from 'framer-motion'
import { Context } from '../../../utils/context'
import api from '../../../utils/api'
import { PageAnimation } from '../../../utils/PageAnimation'
import PasswordInput from '../Components/PasswordInput'
import { LoginValidation } from '../Utils/Validation'
import { SweetError, SweetInfo, SweetWait, SweetWelcome, SweetWrong } from '../../../SweetAlert'


const Login = () => {

    const [state, dispatch] = useContext(Context)

    const history = useHistory()

    const [UserDetails, setUserDetails] = useState({
        username:'',
        password:''
    })

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(LoginValidation(UserDetails)) {
            try { 

                SweetWait()

                const res = await api.post('/login',UserDetails)
                const { success , info , error ,user,token } = res.data  
                
                if(success){
                    SweetWelcome(success)
                    dispatch({type:'SET_USER',user,token})
                    history.push('/orders')
                }
                else if(info)   
                    SweetInfo(info)
                else    
                    SweetError(error)     
            }catch (error){ 
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
        <motion.section className="flex justify-center pt-24" initial='in' animate='out' exit='exit' 
                        variants={PageAnimation} transition={{ duration: 0.4 }}>
            <div className="w-full max-w-xs">
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="input-label" htmlFor="username">Email</label>
                    <input 
                        name="username" 
                        value={UserDetails.username} 
                        onChange={handleChange}
                        className="input-box"
                        type="text" 
                        placeholder="Enter your Email" />
                </div>
                <PasswordInput
                    value={UserDetails.password} 
                    onChange={handleChange}
                />
                <Link className="primary-text align-baseline font-bold text-sm" to="/forgot">
                    Forgot Password?
                </Link>
                <button className="btn-primary btn mt-3" type="submit">Log In</button>
                <div className="w-full text-center my-4">
                    <Link className="primary-text align-baseline font-bold text-sm" to="/signup">
                        Don't have account?
                    </Link>
                </div>
                </form>
                <p className="text-center text-gray-500 text-xs">&copy;2021 FoodEasy.All rights reserved.</p>
            </div>
        </motion.section>
    )
}

export default Login
