import React, { useContext, useEffect, useState } from 'react';
import OrderStatus from './OrderStatus';
import { useLocation } from "react-router-dom"
import io from 'socket.io-client'
import {SweetOrderStatusUpdated} from '../../../SweetAlert'
import api from '../../../utils/api';
import Loader from '../../../components/Loader';
import { Context } from '../../../utils/context';

const Order = () => {

  const { state } = useLocation()

  const [data=state, {}] = useContext(Context)

  const [isLoading, setIsLoading] = useState(true)

  const [order, setOrder] = useState([])

  const [activeStep,setActiveStep] = useState(0);

  const order_status = {
      "order_placed"  : 0,
      "order_confirm" : 1,
      "order_prepare" : 2,
      "order_out"     : 3,
      "order_deliverd": 4
  }

  const getSteps = 
        [
            'Order Placed Succesfully',
            'Order Confirm By Speedyfood', 
            'Preparing Food', 
            'Your Order Is Out For Delivery',
            'Order Deliverd Successfully'
        ]

  useEffect(() => {

    const getOrders = async () => {
            const res = await api.post('/singleorder',{email:data.user?.email,id:state?.id})
            setIsLoading(false)
            setOrder(res.data)
            setActiveStep(order_status[res.data.status])
    }

    getOrders()

     const socket = io(`http://localhost:5000/`,{
                    withCredentials: true
                })
    //  const socket = io(`${process.env.REACT_APP_ENDPOINT}`,{
    //                 withCredentials: true
    //             })

    socket.on("connect",() => {
      
        socket.emit('join',`order_${state.id}`)

        socket.on('orderUpdated',(data) => {
            setActiveStep(order_status[data.status])
            SweetOrderStatusUpdated(getSteps[order_status[data.status]])
        })

    })

    return () => {
      socket.off()
    }
},[activeStep,state?.id])

    if(isLoading)   return <Loader />

    return (
        <section className="mt-3 md:mt-10">
            <div className="md:mx-36 order grid grid-cols-1 md:gap-12 md:grid-cols-2">
                <div className="">
                    <h1 className="text-center font-bold text-xl text-gray-700 my-4">Items</h1>
                    { 
                        order?.items?.map((item) => {
                            return (
                                <div key={item.id} className="flex items-center justify-center p-2 md:ml-4  border-gray-200 border-b-2 md:py-4">
                                    <img className="w-24" src={item.image} alt="" />
                                    <div className="flex-1 item-name ml-2 md:ml-4">
                                        <h1 className="text-sm md:text-lg">{item.title}</h1>
                                    </div>
                                    <div className="flex-1 align-middle ml-2 md:ml-0">
                                        <span className="text-base md:text-lg inline-block">{item.qty} Pcs</span>
                                    </div>
                                    <span className="font-bold text-base md:text-lg">{item.price} Rs</span>
                                </div>
                            )
                        }) 
                    }
                </div>
                <div className="mx-auto md:col-span-1">
                    <h1 className="text-center font-bold text-xl text-gray-700 my-4">Order Status</h1>
                    <OrderStatus status={activeStep} />
                </div>
            </div>
        </section>
    );
}

export default Order