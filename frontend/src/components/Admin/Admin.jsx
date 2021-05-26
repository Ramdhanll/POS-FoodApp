import { Flex } from '@chakra-ui/layout'
import React, { useState } from 'react'
import { Route } from 'react-router'
import {
   AdminAccounts,
   AdminDashboard,
   AdminHistory,
   AdminOrder,
   AdminProducts,
   AdminReport,
   PageNotFound,
} from '..'
import Navbar from './common/Navbar/Navbar'
import Sidebar from './common/Sidebar/Sidebar'

const Admin = () => {
   const [openSidebar, setOpenSidebar] = useState(false)

   const handlerSidebar = () => {
      setOpenSidebar(!openSidebar)
   }

   return (
      <div style={{ height: '100%' }}>
         <Navbar handlerSidebar={handlerSidebar} />
         <Flex>
            <Sidebar openSidebar={openSidebar} />
            <Route path="/admin" component={AdminDashboard} exact />
            <Route path="/admin/order" component={AdminOrder} />
            <Route path="/admin/products" component={AdminProducts} exact />
            <Route path="/admin/history" component={AdminHistory} exact />
            <Route path="/admin/accounts" component={AdminAccounts} exact />
            <Route path="/admin/report" component={AdminReport} exact />
         </Flex>
      </div>
   )
}

export default Admin
