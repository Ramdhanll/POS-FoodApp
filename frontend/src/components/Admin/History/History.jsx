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
import { orders } from '../../../Dummies/'
import { COLORS } from '../../constants'
import Pagination from '../common/Pagination/Pagination'

const History = () => {
   const [active, setActive] = useState(null)
   const [order, setOrder] = useState([])

   const { isOpen, onOpen, onClose } = useDisclosure()

   const printPaymentRef = useRef()

   const renderDetailOrder = () => (
      <Box px={3} py={5} boxShadow="lg" borderRadius={10}>
         {order.items?.map((item, i) => (
            <Flex justifyContent="space-between" key={i} mb={1}>
               <Text>{`${item.qty} ${trimString(item.product.name)}`}</Text>
               <Text>Rp. {item.qty * item.product.price}</Text>
            </Flex>
         ))}
         <Divider mb={3} mt={2} />
         <Flex justifyContent="space-between" mt={1}>
            <Text>Total</Text>
            <Text>Rp. {order.totalPrice}</Text>
         </Flex>
         <Flex justifyContent="space-between" mt={1}>
            <Text>Cash</Text>
            <Text>Rp. {order.cash}</Text>
         </Flex>
         <Flex justifyContent="space-between" mt={1}>
            <Text>Charge</Text>
            <Text>Rp. {order.charge}</Text>
         </Flex>
      </Box>
   )

   const handlePrintPayment = useReactToPrint({
      content: () => printPaymentRef.current,
      pageStyle: pageStyle,
   })

   const handlerDetailorder = (order) => {
      setActive(order.id)
      setOrder(order)
      onOpen()
   }

   const trimString = (name) => {
      if (name.length > 15) return name.substring(0, 15) + '...'

      return name
   }

   return (
      <Box w="100%" p={8} h="100%">
         <Flex direction={['column', 'row', 'row']}>
            {/* Section Main */}
            <Box w="100%">
               <Flex
                  justifyContent="space-between"
                  direction={['column', 'row', 'row']}
               >
                  <Heading color="secondary" size="lg">
                     History
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
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                     </Select>
                  </Box>
               </Flex>

               {/* Section Table */}
               <Box overflow="auto" mt={8} boxShadow="md">
                  <Table size="md">
                     <Thead>
                        <Tr>
                           <Th>ID Order</Th>
                           <Th>Author</Th>
                           <Th>Items</Th>
                           <Th>Total Price</Th>
                           <Th>Date</Th>
                           <Th>Status</Th>
                        </Tr>
                     </Thead>
                     <Tbody>
                        {orders
                           .filter((order) => order.status === 'completed')
                           .map((order) => (
                              <Tr
                                 key={order.id}
                                 onClick={() => handlerDetailorder(order)}
                                 cursor="pointer"
                                 _hover={{
                                    backgroundColor: '#BABABA',
                                 }}
                                 backgroundColor={
                                    active === order.id && '#d2d2d2'
                                 }
                              >
                                 <Td>{order.id}</Td>
                                 <Td>{order.author.name}</Td>
                                 <Td>{order.items.length} Items</Td>
                                 <Td>Rp. {order.totalPrice}</Td>
                                 <Td>{order?.date}</Td>

                                 <Td>
                                    <Badge
                                       w="100px"
                                       variant="solid"
                                       paddingX={3}
                                       paddingY="2px"
                                       borderRadius={10}
                                       textAlign="center"
                                       backgroundColor={COLORS.statusSuccess}
                                       color={COLORS.textSuccess}
                                    >
                                       {order.status}
                                    </Badge>
                                 </Td>
                              </Tr>
                           ))}
                     </Tbody>
                  </Table>
               </Box>

               {/* Section export n pagination */}
               <Box
                  mt={5}
                  display="flex"
                  justifyContent="space-between"
                  // alignItems="center"
                  flexDirection={['column', 'row', 'row', 'row']}
               >
                  {/* Sectionn Export Order */}
                  <Button
                     variant="solid"
                     backgroundColor="primary"
                     fontSize="sm"
                     boxShadow="lg"
                     _hover={{
                        backgroundColor: '#f0deab',
                     }}
                  >
                     Export Order
                  </Button>
                  {/* Section Pagination */}
                  <Pagination />
               </Box>
            </Box>

            {/* Section Drawer Detail */}
            <Drawer
               placement="right"
               onClose={onClose}
               isOpen={isOpen}
               onOverlayClick={() => {
                  setOrder([])
                  setActive(null)
               }}
               size="xs"
            >
               <DrawerOverlay />
               <DrawerContent>
                  <DrawerHeader
                     borderBottomWidth="1px"
                     display="flex"
                     justifyContent="space-between"
                  >
                     <Text color="secondary" fontWeight="bold" fontSize="2xl">
                        Detail Order
                     </Text>
                     <CloseButton
                        display={['inherit', 'inherit', 'none']}
                        _focus={{ outline: 'none' }}
                        onClick={() => {
                           setActive(null)
                           onClose()
                        }}
                     />
                  </DrawerHeader>
                  <DrawerBody mt={3}>
                     {order.status !== 'pending' && (
                        <>
                           {' '}
                           <Text fontSize="lg" fontWeight="bold">
                              Items
                           </Text>
                           <Flex
                              direction="column"
                              mt={5}
                              pr={1}
                              overflow="auto"
                              height="200px"
                              css={{
                                 '&::-webkit-scrollbar': {
                                    width: '1.2px',
                                 },
                                 '&::-webkit-scrollbar-track': {
                                    width: '1px',
                                 },
                                 '&::-webkit-scrollbar-thumb': {
                                    // background: COLORS.secondary,
                                    background: 'white',
                                    borderRadius: '24px',
                                 },
                              }}
                           >
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
                                       <Text fontWeight="bold">
                                          {item.product.name}
                                       </Text>
                                       <Text color="secondary">
                                          {item.note}
                                       </Text>
                                    </Flex>
                                    <Text fontWeight="bold">
                                       {item.qty} Items
                                    </Text>
                                 </Box>
                              ))}
                           </Flex>
                        </>
                     )}

                     {/* Detail Order */}
                     {renderDetailOrder()}

                     <Button
                        w="100%"
                        backgroundColor="primary"
                        borderRadius={10}
                        boxShadow="lg"
                        variant="outline"
                        leftIcon={<MdPrint />}
                        onClick={handlePrintPayment}
                        px={3}
                        mt={3}
                        _focus={{ outline: 'none' }}
                     >
                        Print Payment
                     </Button>
                     {/* Section Status */}
                     <Box
                        p={3}
                        mt={3}
                        borderRadius={10}
                        textAlign="center"
                        backgroundColor={COLORS.statusSuccess}
                        color={COLORS.textSuccess}
                     >
                        <Text fontSize="sm" color="secondary">
                           Status
                        </Text>
                        <Text fontSize="xl" fontWeight="bold">
                           {order.status?.toUpperCase()}
                        </Text>
                     </Box>
                  </DrawerBody>
               </DrawerContent>
            </Drawer>

            {/* Section Print Payment */}
            <Box display="none">
               <Flex mt={3} direction="column" p={3} ref={printPaymentRef}>
                  <Flex alignItems="center" direction="column">
                     <Heading
                        color="black"
                        size="sm"
                        textAlign="center"
                        fontWeight="bold"
                     >
                        WARUNK <br /> BANG JOHN
                     </Heading>
                     <Text fontSize="sm" mt={2} mb={3}>
                        Pesanan id: {order.id}
                     </Text>
                  </Flex>
                  <Box p={3} borderRadius={10}>
                     {order.items?.map((item, i) => (
                        <Flex justifyContent="space-between" key={i} mb={1}>
                           <Flex direction="column">
                              <Text color="black" fontSize="12px">{`${
                                 item.qty
                              } ${trimString(item.product.name)}`}</Text>
                           </Flex>
                           <Text fontSize="12px">
                              Rp. {item.qty * item.product.price}
                           </Text>
                        </Flex>
                     ))}
                     <Divider />
                     <Flex justifyContent="space-between" mt={3}>
                        <Text fontSize="12px">Total</Text>
                        <Text fontSize="12px">Rp. {order.totalPrice}</Text>
                     </Flex>
                     <Flex justifyContent="space-between" mt={1}>
                        <Text fontSize="12px">Cash</Text>
                        <Text fontSize="12px">Rp. {order.cash}</Text>
                     </Flex>
                     <Flex justifyContent="space-between" mt={1}>
                        <Text fontSize="12px">Charge</Text>
                        <Text fontSize="12px">Rp. {order.charge}</Text>
                     </Flex>
                  </Box>
                  <Text
                     textAlign="center"
                     mt={5}
                     fontSize="sm"
                     fontWeight="bold"
                  >
                     Terimakasih <br /> Segera Datang Kembali :)
                  </Text>
               </Flex>
            </Box>
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

export default History
