const express = require('express');
const authController = require('../controllers/customer/authController')
const orderController = require('../controllers/customer/orderController')
const allOrderController = require('../controllers/admin/allOrderController')

const routes = express.Router();

// auth route
routes.post('/register',authController().register)
routes.post('/login',authController().login)
routes.post('/userexist',authController().userExist)
routes.post('/resetpassword',authController().resetPassword)

routes.post('/placeorder',orderController().placeOrder)
routes.post('/orders',orderController().order)
routes.post('/allorders',allOrderController().getOrders)
routes.post('/singleorder',orderController().getSingleOrder)
routes.post('/updateorder',allOrderController().updateOrder)


module.exports = routes