import React, { useContext, useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import { Context } from '../../utils/context';
import { PageAnimation } from '../../utils/PageAnimation';
import MaterialTable from './Components/MaterialTable';
import AdminMaterialTable from './Components/AdminMaterialTable';
import api from '../../utils/api';
import { orderIcon } from '../../utils/svgs';
import EmptyOrder from './Components/EmptyOrder'
import Loader from '../../components/Loader';


const Orders = () => {

    const [state, {}] = useContext(Context)

    const [orders, setOrders] = useState([])

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {

        const getOrders = async () => {
            if(state.user.role === 'customer'){
                const res = await api.post('/orders',{email:state.user?.email})
                setOrders(res.data)
                setIsLoading(!isLoading)
            }
            else{
                const res = await api.post('/allorders',{email:state.user?.email})
                setOrders(res.data)
                setIsLoading(!isLoading)
            }
        }

        getOrders()
    },[])

    if(isLoading)   return <Loader />

    if(state.userOrders?.length === 0)    return <EmptyOrder />

    else
        return (
            <motion.section className="orders flex justify-center py-5" initial='in' animate='out' exit='exit' 
                            variants={PageAnimation} transition={{ duration: 0.4 }}>
                <div className="w-full px-3 md:mx-36">
                    <div className="flex items-center pb-3 border-gray-200  border-b-4 text-gray-700 text-2xl md:text-4xl font-bold my-4">
                        <span className="">
                        {orderIcon}
                        </span>
                        <span className="ml-3">All orders</span>
                    </div>
                    {
                        state.user.role === 'admin' 
                        ?  
                        <AdminMaterialTable orders={orders} /> 
                        : 
                        <MaterialTable orders={orders}/>
                    } 
                </div>
            </motion.section>
        )
    }

export default Orders
