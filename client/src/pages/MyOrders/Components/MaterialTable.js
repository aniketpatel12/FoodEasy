import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';
import { useHistory } from "react-router-dom"
import '../style.css'


const MaterialTable = ({orders}) => { 

  const history = useHistory()

  return (
    <TableContainer component={Paper} style={{overflowY:'auto', maxHeight:500}}>
      <Table style={{minWidth:650}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Track Your Order</TableCell>
            <TableCell align="center">Phone</TableCell>
            <TableCell align="center">Address</TableCell>
            <TableCell align="center">Order Date</TableCell>
            <TableCell align="center">Price(Rs)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders?.map((order) => (
            <TableRow key={order._id}>
              <TableCell  scope="row" className="order-id" onClick={() => history.push(
                {
                  pathname: '/order',
                  state: { id: order._id }
                }
              )}>
                {order._id}
              </TableCell>
              <TableCell align="center">{order.phone}</TableCell>
              <TableCell align="center">{order.address}</TableCell>
              <TableCell align="center">{moment(order.createdAt).format('DD-MMM-YY')}</TableCell>
              <TableCell align="center">{order.totalPrice}</TableCell>
            </TableRow>
          ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default MaterialTable