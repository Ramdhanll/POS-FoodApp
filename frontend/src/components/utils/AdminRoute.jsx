import React from 'react'
import { Redirect, Route } from 'react-router'

const AdminRoute = ({ component: Component, ...rest }) => {
   const user = JSON.parse(localStorage.getItem('user'))

   return (
      <Route
         {...rest}
         render={(props) =>
            user ? <Component {...props}></Component> : <Redirect to="/login" />
         }
      ></Route>
   )
}

export default AdminRoute
