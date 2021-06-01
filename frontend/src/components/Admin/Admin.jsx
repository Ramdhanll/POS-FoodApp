import { useColorModeValue } from '@chakra-ui/color-mode'
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
} from '..'
import Navbar from './common/Navbar/Navbar'
import Sidebar from './common/Sidebar/Sidebar'

const Admin = () => {
   const [openSidebar, setOpenSidebar] = useState(false)
   const bg = useColorModeValue('#fff', '#1A202C')
   const color = useColorModeValue('white', 'gray.800')

   const handlerSidebar = () => {
      setOpenSidebar(!openSidebar)
   }

   return (
      <div style={{ height: '100vh' }}>
         <Navbar handlerSidebar={handlerSidebar} />
         <Flex>
            <Sidebar openSidebar={openSidebar} bg={bg} />
            <Flex
               w="100%"
               onClick={() => openSidebar && setOpenSidebar(false)}
               bg={bg}
            >
               <Route path="/admin" component={AdminDashboard} exact />
               <Route path="/admin/order" component={AdminOrder} />
               <Route path="/admin/products" component={AdminProducts} />
               <Route path="/admin/history" component={AdminHistory} />
               <Route path="/admin/accounts" component={AdminAccounts} />
               <Route path="/admin/report" component={AdminReport} />
            </Flex>
         </Flex>
      </div>
   )
}

export default Admin
