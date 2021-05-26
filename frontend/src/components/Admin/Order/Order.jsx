import { Input, InputGroup, InputLeftElement } from '@chakra-ui/input'
import { Badge, Box, Flex, Heading } from '@chakra-ui/layout'
import { MdSearch } from 'react-icons/md'
import React, { useState } from 'react'
import { Select } from '@chakra-ui/select'
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table'

import { orders } from '../../../Dummies/'
import { COLORS } from '../../constants'

const Order = () => {
   const [active, setActive] = useState(null)
   const [product, setproduct] = useState([])
   const renderStatus = (status) => {
      if (status === 'pending') {
         return {
            backgroundColor: COLORS.statusPending,
            color: COLORS.textPending,
         }
      } else if (status === 'preparing') {
         return {
            backgroundColor: COLORS.statusPreparing,
            color: COLORS.textPreparing,
         }
      } else if (status === 'delivering') {
         return {
            backgroundColor: COLORS.statusDelivering,
            color: COLORS.textDelivering,
         }
      } else {
         return {
            backgroundColor: COLORS.statusSuccess,
            color: COLORS.textSuccess,
         }
      }
   }

   const getDetailOrder = (order) => {
      setActive(order.id)
      setproduct(order)
   }

   return (
      <Box w="100%" p={8} h="100%">
         <Flex direction={['column', 'row', 'row']}>
            <Box w="100%">
               <Flex
                  justifyContent="space-between"
                  direction={['column', 'row', 'row']}
               >
                  <Heading color="secondary" size="lg">
                     Food Order
                  </Heading>
                  <Box
                     flex="0.8"
                     display="flex"
                     justifyContent="space-between"
                     mt={['15px', '0', '0']}
                  >
                     <InputGroup w={['150px', '200px', '250px']}>
                        <InputLeftElement
                           pointerEvents="none"
                           children={<MdSearch color="#8A8A8A" />}
                           fontSize={['1.4em', '1em', '1.4em']}
                        />
                        <Input
                           type="text"
                           placeholder="Search a item..."
                           borderRadius="40px"
                           fontSize={['13px', '16px', '18px']}
                        />
                     </InputGroup>

                     <Select
                        placeholder="Filter"
                        w={['140px', '200px', '250px']}
                        color="secondary"
                        borderRadius="40px"
                        fontSize={['13px', '16px', '18px']}
                     >
                        <option value="option1">Oprion 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                     </Select>
                  </Box>
               </Flex>

               {/* Table */}
               <Box overflow="auto" mt={8} boxShadow="md">
                  <Table size="md">
                     <Thead>
                        <Tr>
                           <Th>ID Table</Th>
                           <Th>Items</Th>
                           <Th isNumeric>Total</Th>
                           <Th>Author</Th>
                           <Th>Status</Th>
                        </Tr>
                     </Thead>
                     <Tbody>
                        {orders.map((order) => (
                           <Tr
                              key={order.id}
                              onClick={() => getDetailOrder(order)}
                              cursor="pointer"
                              _hover={{
                                 backgroundColor: '#BABABA',
                              }}
                              backgroundColor={active === order.id && '#d2d2d2'}
                           >
                              <Td>{order.id}</Td>
                              <Td>
                                 {order.items.reduce((a, b) => a + b.qty, 0)}{' '}
                                 Items
                              </Td>
                              <Td isNumeric>Rp.{order.totalPrice}</Td>
                              <Td>{order.author.name}</Td>
                              <Td>
                                 <Badge
                                    w="100px"
                                    variant="solid"
                                    paddingX={3}
                                    paddingY="2px"
                                    borderRadius={10}
                                    textAlign="center"
                                    {...renderStatus(order.status)}
                                 >
                                    {order.status}
                                 </Badge>
                              </Td>
                           </Tr>
                        ))}
                     </Tbody>
                  </Table>
               </Box>
            </Box>

            {/* Detail */}
            {/* KASIH DRAWER AJA LA */}
            {/* <Box
               overflow="auto"
               boxShadow="md"
               backgroundColor="gray.300"
               w={['100%', '100%', '40%']}
               p={[0, 8, 8]}
               mt={[8, 0, 0]}
               position="relative"
               top={[0, -8, -8]}
               right={[0, -8, '-8']}
            >
               <Heading color="secondary" size="lg">
                  Detail Order
               </Heading>
            </Box> */}
         </Flex>
      </Box>
   )
}

export default Order
