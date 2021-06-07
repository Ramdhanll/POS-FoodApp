import React, { createContext, useContext, useEffect, useReducer } from 'react'
import './App.css'
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import theme from './theme'

import { Admin, Home, Login, Order } from './components'
import AdminRoute from './components/utils/AdminRoute'

import { UserContext } from './contexts/userContext'
import { initialState, reducer } from './reducers/userReducer'
import axios from 'axios'

// axios.defaults.baseURL =
//    process.env.REACT_APP_ENDPOINTS || 'http://localhost:5000'

if (
   /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
   )
) {
   // true for mobile device
   console.log('mobile')
   axios.defaults.baseURL = 'http://192.168.100.7:5000'
} else {
   // false for not mobile device
   console.log('laptop')
   axios.defaults.baseURL =
      process.env.REACT_APP_ENDPOINTS || 'http://localhost:5000'
}
const App = () => {
   const [userState, userDispatch] = useReducer(reducer, initialState)
   useEffect(() => {
      const user = JSON.parse(localStorage.getItem('user'))
      if (user) {
         userDispatch({ type: 'USER', payload: user })
      } else {
         return <Redirect to="/login" />
      }
   }, [])

   const Routing = () => (
      <>
         <Route path="/" component={Home} exact />
         <UserContext.Provider value={{ userState, userDispatch }}>
            <Route path="/admin" component={Admin} />
         </UserContext.Provider>
         <Route path="/order/:id" component={Order} />
         <Route path="/login" component={Login} />
      </>
   )

   return (
      <div className="App">
         <ChakraProvider theme={theme}>
            <Router>
               <Routing />
            </Router>
         </ChakraProvider>
      </div>
   )
}

export default App
