import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import theme from './theme'

import { Admin, Home, Login, Order } from './components'

const App = () => {
   const Routing = () => (
      <>
         <Route path="/" component={Home} exact />
         <Route path="/admin" component={Admin} />
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
