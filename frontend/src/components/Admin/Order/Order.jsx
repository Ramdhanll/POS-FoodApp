import React, { useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print'
import {
   Button,
   CloseButton,
   Drawer,
   DrawerBody,
   DrawerContent,
   DrawerHeader,
   DrawerOverlay,
   Image,
   useDisclosure,
} from '@chakra-ui/react'
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/input'
import { Badge, Box, Divider, Flex, Heading, Text } from '@chakra-ui/layout'
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table'
import { Select } from '@chakra-ui/select'
import { MdSearch, MdPrint } from 'react-icons/md'
import { FaTelegramPlane } from 'react-icons/fa'
import { HiCash } from 'react-icons/hi'
import { orders } from '../../../Dummies/'
import { COLORS } from '../../constants'

const Order = () => {
   const [active, setActive] = useState(null)
   const [order, setOrder] = useState([])
   const { isOpen, onOpen, onClose } = useDisclosure()
   const componentRef = useRef()

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
      } else if (status === 'delivered') {
         return {
            backgroundColor: COLORS.statusDelivered,
            color: COLORS.textDelivered,
         }
      } else if (status === 'completed') {
         return {
            backgroundColor: COLORS.statusSuccess,
            color: COLORS.textSuccess,
         }
      }
   }

   const renderButtonAction = (status) => (
      <Box mt={3} display="flex" justifyContent="space-between">
         {status !== 'pending' && status !== 'delivered' && (
            <Button
               borderRadius={10}
               boxShadow="lg"
               variant="outline"
               w="130px"
               leftIcon={<MdPrint />}
               onClick={handlePrint}
            >
               Print order
            </Button>
         )}
         <Button
            boxShadow="lg"
            borderRadius={10}
            border="1px solid #d7d7d7"
            variant="solid"
            w={status === 'delivered' ? '100%' : '130px'}
            {...(status === 'preparing'
               ? renderStatus('delivered')
               : status === 'delivered'
               ? renderStatus('completed')
               : '')}
            leftIcon={
               status === 'preparing' ? (
                  <FaTelegramPlane />
               ) : (
                  <HiCash size={20} />
               )
            }
         >
            {status === 'preparing'
               ? 'Deliver'
               : status === 'delivered'
               ? 'PAY'
               : status === 'completed'
               ? 'Completed'
               : ''}
         </Button>
      </Box>
   )

   const handlePrint = useReactToPrint({
      content: () => componentRef.current,
      pageStyle: pageStyle,
   })

   const handlerDetailorder = (order) => {
      setActive(order.id)
      setOrder(order)
      onOpen()
   }

   const trimString = (name) => {
      if (name.length > 16) return name.substring(0, 16) + '...'

      return name
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
                           color="secondary"
                           fontSize={['13px', '16px', '18px']}
                           _placeholder={{
                              color: COLORS.secondary,
                           }}
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
                           <Th>Total</Th>
                           <Th>Author</Th>
                           <Th>Status</Th>
                        </Tr>
                     </Thead>
                     <Tbody>
                        {orders.map((order) => (
                           <Tr
                              key={order.id}
                              onClick={() => handlerDetailorder(order)}
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
                              <Td>Rp.{order.totalPrice}</Td>
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
            <Drawer
               placement="right"
               onClose={onClose}
               isOpen={isOpen}
               onOverlayClick={() => setActive(null)}
               size="xs"
            >
               <DrawerOverlay />
               <DrawerContent>
                  <DrawerHeader
                     borderBottomWidth="1px"
                     display="flex"
                     justifyContent="space-between"
                  >
                     <Text color="black" fontWeight="bold" fontSize="2xl">
                        Detail Order
                     </Text>
                     <CloseButton
                        display={['inherit', 'inherit', 'none']}
                        onClick={() => {
                           setActive(null)
                           onClose()
                        }}
                     />
                  </DrawerHeader>
                  <DrawerBody mt={3}>
                     <Text fontSize="lg" fontWeight="bold">
                        Items
                     </Text>
                     <Flex direction="column" mt={5}>
                        {order.items?.map((item, i) => (
                           <Box
                              key={i}
                              display="flex"
                              flexDirection="row"
                              alignItems="end"
                              justifyContent="space-between"
                              mb={5}
                           >
                              <Image
                                 src={item.product.photo}
                                 fallbackSrc="https://via.placeholder.com/60"
                                 width="60px"
                                 height="60px"
                                 borderRadius={10}
                                 loading="lazy"
                              />
                              <Flex
                                 direction="column"
                                 justifyContent="flex-start"
                                 width="50%"
                              >
                                 <Text color="black" fontWeight="bold">
                                    {item.product.name}
                                 </Text>
                                 <Text color="secondary">{item.note}</Text>
                              </Flex>
                              <Text color="black" fontWeight="bold">
                                 {item.qty} Items
                              </Text>
                           </Box>
                        ))}
                     </Flex>

                     {/* Detail Payment */}
                     <Box p={3} boxShadow="md" borderRadius={10}>
                        {order.items?.map((item, i) => (
                           <Flex justifyContent="space-between" key={i} mb={1}>
                              <Text>{`${item.qty} ${trimString(
                                 item.product.name
                              )}`}</Text>
                              <Text>Rp. {item.qty * item.product.price}</Text>
                           </Flex>
                        ))}
                        <Divider />
                        <Flex
                           justifyContent="space-between"
                           mt={1}
                           fontWeight="bold"
                        >
                           <Text>Total</Text>
                           <Text>Rp. {order.totalPrice}</Text>
                        </Flex>
                     </Box>
                     {/* Section Button Action*/}
                     {order.status !== 'pending' && order.status !== 'completed'
                        ? renderButtonAction(order.status)
                        : null}

                     {/* Section Status */}
                     <Box
                        p={3}
                        mt={6}
                        borderRadius={10}
                        textAlign="center"
                        {...renderStatus(order.status)}
                     >
                        <Text fontSize="sm" color="secondary">
                           Status
                        </Text>
                        <Text fontSize="xl" fontWeight="bold">
                           {order.status?.toUpperCase()}
                        </Text>
                     </Box>

                     {/* Print Detail Order */}
                     <Box display="none">
                        <Flex
                           backgroundColor="gray.100"
                           mt={3}
                           direction="column"
                           p={3}
                           ref={componentRef}
                        >
                           <Flex alignItems="center" direction="column">
                              <Heading
                                 color="black"
                                 size="sm"
                                 textAlign="center"
                              >
                                 WARUNK <br /> BANG JOHN
                              </Heading>
                              <Text fontSize="sm" mt={2}>
                                 List Pesanan id: {order.id}
                              </Text>
                           </Flex>

                           <Box p={3} borderRadius={10} mt={5}>
                              {order.items?.map((item, i) => (
                                 <Flex
                                    justifyContent="space-between"
                                    key={i}
                                    mb={2}
                                 >
                                    <Flex direction="column">
                                       <Text color="black" fontSize="14px">{`${
                                          item.qty
                                       } ${trimString(
                                          item.product.name
                                       )}`}</Text>
                                       <Text
                                          ml={3}
                                          fontSize="12px"
                                          color="secondary"
                                       >
                                          {item.note}
                                       </Text>
                                    </Flex>
                                    <Text fontSize="14px">
                                       Rp. {item.qty * item.product.price}
                                    </Text>
                                 </Flex>
                              ))}
                              <Divider />
                              <Flex
                                 justifyContent="space-between"
                                 mt={3}
                                 fontWeight="bold"
                              >
                                 <Text>Total</Text>
                                 <Text fontSize="14px">
                                    Rp. {order.totalPrice}
                                 </Text>
                              </Flex>
                           </Box>
                        </Flex>
                     </Box>
                  </DrawerBody>
               </DrawerContent>
            </Drawer>
         </Flex>
      </Box>
   )
}

const pageStyle = `
   @page {
      size: 80mm 80mm;
      margin-top: -50mm; 
   }
   @media print {
      .pagebreak {
         page-break-before: always;
      }
`

export default Order
