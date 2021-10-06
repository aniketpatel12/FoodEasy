import React, { useContext } from 'react'
import { motion } from 'framer-motion'
import { useHistory } from 'react-router-dom'
import swal from 'sweetalert'
import { Context } from '../../utils/context'
import { PageAnimation } from '../../utils/PageAnimation'
import profile from '../../SvgIcons/ProfileImage.svg'

const MyProfile = () => {

    const [state, dispatch] = useContext(Context)

    const history = useHistory()

    const logout = () => {
        swal({
            title:"Are you sure?",
            text: "You Want To Logout From Speedyfood!!",
            icon: "warning",
            buttons: true,
            dangerMode: true
        })
        .then((willDelete) => {
            if (willDelete) {
                swal("Logout Successfully.", { icon: "success" })
                dispatch({type:"UNSET_USER"})
                history.push('/')
            }
        })   
    }
    
    return (
        <motion.section className="flex justify-center pt-24" initial='in' animate='out' exit='exit' 
            variants={PageAnimation} transition={{ duration: 0.4 }}>
            
            <div className="w-full lg:w-2/5 rounded-lg shadow-xl bg-white opacity-75" style={{ marginTop:"-60px"}}>
                <div class="w-full lg:w-2/5 bg-white mx-44 lg:mx-30 my-0">
                    <img src={profile} alt="profile" class="rounded-none lg:rounded-lg hidden lg:block h-70 mb-1" />
                </div>
                <div className="p-4 md:p-12 text-center lg:text-left mt-0">
                    
                    <h1 className="text-3xl font-bold pt-8 lg:pt-0 mt-0">{state.user.username || 'NA'}</h1>
                    <div class="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25"></div>
                    <p class="pt-4 text-base font-bold flex items-center justify-center lg:justify-start"><svg class="h-4 fill-current text-green-700 pr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9v2zm3-8V2H8v1h4z" /></svg>{state.user.email || 'NA'}</p>
                    <p class="pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-center lg:justify-start"><svg class="h-4 fill-current text-green-700 pr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm7.75-8a8.01 8.01 0 0 0 0-4h-3.82a28.81 28.81 0 0 1 0 4h3.82zm-.82 2h-3.22a14.44 14.44 0 0 1-.95 3.51A8.03 8.03 0 0 0 16.93 14zm-8.85-2h3.84a24.61 24.61 0 0 0 0-4H8.08a24.61 24.61 0 0 0 0 4zm.25 2c.41 2.4 1.13 4 1.67 4s1.26-1.6 1.67-4H8.33zm-6.08-2h3.82a28.81 28.81 0 0 1 0-4H2.25a8.01 8.01 0 0 0 0 4zm.82 2a8.03 8.03 0 0 0 4.17 3.51c-.42-.96-.74-2.16-.95-3.51H3.07zm13.86-8a8.03 8.03 0 0 0-4.17-3.51c.42.96.74 2.16.95 3.51h3.22zm-8.6 0h3.34c-.41-2.4-1.13-4-1.67-4S8.74 3.6 8.33 6zM3.07 6h3.22c.2-1.35.53-2.55.95-3.51A8.03 8.03 0 0 0 3.07 6z" /></svg> {state.user.phone || 'NA'}</p>
                    
                    <div className="pt-12 pb-8">
                        <button onClick={logout} className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full">
                            <span className="tracking-wider">Logout</span>
                        </button>

                        <button onClick={() => history.push('/contact')} className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full mx-1" to="/editprofile">
                            <span className="tracking-wider">Contact Us</span>
                        </button>
                    </div>                   
                </div>
            </div>

            

           
        </motion.section>
    )
}

export default MyProfile