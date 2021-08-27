import React, { useReducer } from 'react'
import { Route, Switch, useLocation  } from "react-router-dom"
import Navbar from './components/Navbar'
import './index.css'
import { Context, initialState } from './utils/context'
import { reducer } from './utils/reducers'
import 'react-toastify/dist/ReactToastify.min.css'
import { ToastContainer } from 'react-toastify'

import ProtectedRoute from './authRoutes/ProtectedRoute'
import IsAuthenticated from './authRoutes/IsAuthenticate'
import PrivateRoute from './authRoutes/PrivateRoute'

import { AnimatePresence } from 'framer-motion'


import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import Login from './pages/Auth/Login/Login'
import Register from './pages/Auth/Registration/Register'
import Order from './pages/MyOrders/Components/Order'
import MyOrders from './pages/MyOrders/MyOrders'
import Checkout from './pages/Checkout/Checkout'
import MyProfile from './pages/MyProfile/MyProfile'
import ForgotPassword from './pages/Auth/ForgotPassword/ForgotPassword'
import Contact from './pages/Auth/Contact/Contact'


function App() {

  const location = useLocation()

  return (
    <Context.Provider value={useReducer(reducer, initialState)} className="main">
      <Navbar />
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />
      <AnimatePresence exitBeforeEnter>
      <Switch location={location} key={location.pathname}>
        <Route path="/cart"  component={Cart} />
        <PrivateRoute path="/checkout"  component={Checkout} />
        <Route path="/contact"  component={Contact} />
        <ProtectedRoute path="/orders"  component={MyOrders} />
        <ProtectedRoute path="/myprofile"  component={MyProfile} />
        <ProtectedRoute path="/order"  component={Order} />
        <IsAuthenticated path="/signup"  component={Register} />
        <IsAuthenticated path="/signin" exact component={Login} />
        <Route path="/forgot" exact component={ForgotPassword} />
        <Route path="/" exact component={Home} />
      </Switch>
      </AnimatePresence>
    </Context.Provider>
  );
}

export default React.memo(App);
