import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';
import '../style.css'
import api from '../../../utils/api';
import { SweetError, SweetOrderUpdated, SweetWait, SweetWrong } from '../../../SweetAlert';

  
const MaterialTable = ({orders}) => { 
      
    const handleOrderStatus = async (e,order) => {

        SweetWait()

        try {
          const res = await api.post('/updateorder',{id:order._id , status:e.target.value})
          const { success , error } = res.data  
                
                if(success)    SweetOrderUpdated()

                else    SweetError(error)   
        } catch (error) {
            SweetWrong()
        }
    }   

  return (
    <TableContainer component={Paper} style={{overflowY:'auto', maxHeight:500}}>
      <Table style={{minWidth:650}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Customers Order Id</TableCell>
            <TableCell align="center">Phone</TableCell>
            <TableCell align="center">Address</TableCell>
            <TableCell align="center" style={{minWidth:180}}>Order Date</TableCell>
            <TableCell align="center" style={{minWidth:180}}>Status</TableCell>
            <TableCell align="center">Price(Rs)</TableCell>
            <TableCell align="center">Payment Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders?.map((order) => (
            <TableRow  key={order._id}>
              <TableCell  scope="row" className="order-id">
                {order._id}
              </TableCell>
              <TableCell align="center">{order.phone}</TableCell>
              <TableCell align="center">{order.address}</TableCell>
              <TableCell align="center">{moment(order.createdAt).format('DD-MMM-YY')}</TableCell>
              <TableCell align="center">
                  <select name="paymentMethod" defaultValue={order.status} 
                          onChange={(e) => handleOrderStatus(e,order)} 
                          className="form-select text-sm shadow p-2 w-full">
                      <option value="order_placed" >Order Placed</option>
                      <option value="order_confirm">Order Confirm</option>
                      <option value="order_prepare" >Preparing Food</option>
                      <option value="order_out">Order Out</option>
                      <option value="order_deliverd">Order Deliverd</option>
                  </select> 
              </TableCell>
              <TableCell align="center">{order.totalPrice}</TableCell>
              <TableCell align="center">{order.paymentType}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default MaterialTable