import React, { createContext, useContext, useEffect, useReducer } from 'react'
import './App.css'
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import theme from './theme'

import { Admin, Home, Login, Order } from './components'
import AdminRoute from './components/utils/AdminRoute'

import { UserContext } from './contexts/userContext'
import { initialState, reducer } from './reducers/userReducer'

const App = () => {
   const [state, dispatch] = useReducer(reducer, initialState)

   useEffect(() => {
      const user = JSON.parse(localStorage.getItem('user'))
      if (user) {
         dispatch({ type: 'USER', payload: user })
      } else {
         return <Redirect to="/login" />
      }
   }, [])

   const Routing = () => (
      <>
         <Route path="/" component={Home} exact />
         <UserContext.Provider value={{ state, dispatch }}>
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
