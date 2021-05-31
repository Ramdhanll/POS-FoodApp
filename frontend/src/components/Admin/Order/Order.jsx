import React, { useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print'
import QRCode from 'react-qr-code'
import {
   Button,
   CloseButton,
   Drawer,
   DrawerBody,
   DrawerContent,
   DrawerHeader,
   DrawerOverlay,
   FormControl,
   FormLabel,
   Image,
   Modal,
   ModalBody,
   ModalCloseButton,
   ModalContent,
   ModalFooter,
   ModalHeader,
   ModalOverlay,
   useDisclosure,
} from '@chakra-ui/react'
import {
   Input,
   InputGroup,
   InputLeftAddon,
   InputLeftElement,
} from '@chakra-ui/input'
import { Badge, Box, Divider, Flex, Heading, Text } from '@chakra-ui/layout'
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table'
import { Select } from '@chakra-ui/select'
import { MdSearch, MdPrint } from 'react-icons/md'
import { FaTelegramPlane } from 'react-icons/fa'
import { IoMdBarcode } from 'react-icons/io'
import { HiCash } from 'react-icons/hi'
import { orders } from '../../../Dummies/'
import { COLORS } from '../../constants'
import Pagination from '../common/Pagination/Pagination'

const Order = () => {
   const [active, setActive] = useState(null)
   const [order, setOrder] = useState([])
   const [charge, setCharge] = useState(0)
   const [cash, setCash] = useState(0)
   const initialRef = useRef()
   const { isOpen, onOpen, onClose } = useDisclosure()
   const {
      isOpen: isOpenModalBarcode,
      onOpen: onOpenModalBarcode,
      onClose: onCloseModalBarcode,
   } = useDisclosure()
   const {
      isOpen: isOpenModalPay,
      onOpen: onOpenModalPay,
      onClose: onCloseModalPay,
   } = useDisclosure()

   const printOrderMenuRef = useRef()
   const printBarcodeRef = useRef()
   const printPaymentRef = useRef()

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
               onClick={handlePrintOrderMenu}
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
            onClick={status === 'preparing' ? handleDeliver : handlePay}
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

   const renderDetailOrder = () => (
      <Box p={3} boxShadow="md" borderRadius={10}>
         {order.items?.map((item, i) => (
            <Flex justifyContent="space-between" key={i} mb={1}>
               <Text>{`${item.qty} ${trimString(item.product.name)}`}</Text>
               <Text>Rp. {item.qty * item.product.price}</Text>
            </Flex>
         ))}
         <Divider />
         <Flex justifyContent="space-between" mt={1} fontWeight="bold">
            <Text>Total</Text>
            <Text>Rp. {order.totalPrice}</Text>
         </Flex>
      </Box>
   )

   const handleDeliver = () => {}

   const handlePay = () => {
      setCharge(cash - order.totalPrice)
      onOpenModalPay()
   }

   const handlePrintPayment = useReactToPrint({
      content: () => printPaymentRef.current,
      pageStyle: pageStyle,
   })

   const handlePrintOrderMenu = useReactToPrint({
      content: () => printOrderMenuRef.current,
      pageStyle: pageStyle,
   })

   const handlePrintBarcode = useReactToPrint({
      content: () => printBarcodeRef.current,
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
            {/* Section Main */}
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

               {/* Section Table */}
               <Box overflow="auto" mt={8} boxShadow="md">
                  <Table size="md">
                     <Thead>
                        <Tr>
                           <Th>ID Table</Th>
                           <Th>Items</Th>
                           <Th>Total</Th>
                           <Th>Author</Th>
                           <Th>Barcode</Th>
                           <Th>Status</Th>
                        </Tr>
                     </Thead>
                     <Tbody>
                        {orders
                           .filter((order) => order.status !== 'completed')
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
                                 <Td>
                                    {order.items.reduce((a, b) => a + b.qty, 0)}{' '}
                                    Items
                                 </Td>
                                 <Td>Rp.{order.totalPrice}</Td>
                                 <Td>{order.author.name}</Td>
                                 <Td
                                    onClick={(e) => {
                                       setOrder(order)
                                       e.stopPropagation()
                                    }}
                                    textAlign="center"
                                    w="10px"
                                 >
                                    <Button
                                       variant="outline"
                                       onClick={onOpenModalBarcode}
                                       _focus={{ outline: 'none' }}
                                    >
                                       <IoMdBarcode />
                                    </Button>
                                 </Td>
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

               {/* Section add n pagination */}
               <Box
                  mt={5}
                  display="flex"
                  justifyContent="space-between"
                  // alignItems="center"
                  flexDirection={['column', 'row', 'row', 'row']}
               >
                  {/* Sectionn Add Order */}
                  <Button
                     variant="solid"
                     backgroundColor="primary"
                     fontSize="sm"
                     boxShadow="lg"
                     _hover={{
                        backgroundColor: '#f0deab',
                     }}
                  >
                     Add Order
                  </Button>
                  {/* Section Pagination */}
                  <Pagination />
               </Box>
            </Box>

            {/* Section Detail */}
            <Drawer
               placement="right"
               onClose={onClose}
               isOpen={isOpen}
               onOverlayClick={() => {
                  setOrder([])
                  setCash(0)
                  setCharge(0)
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
                        onClick={() => {
                           setActive(null)
                           onClose()
                        }}
                        _focus={{ outline: 'none' }}
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
                              maxH="200px"
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
                     {order.status !== 'pending' && renderDetailOrder()}

                     {/* Section Button Action*/}
                     {order.status !== 'pending' && order.status !== 'completed'
                        ? renderButtonAction(order.status)
                        : null}

                     {/* Section Status */}
                     <Box
                        p={3}
                        mt={order.status !== 'pending' ? 6 : 0}
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
                        <Text fontSize="12px">Rp. {cash}</Text>
                     </Flex>
                     <Flex justifyContent="space-between" mt={1}>
                        <Text fontSize="12px">Charge</Text>
                        <Text fontSize="12px">Rp. {charge}</Text>
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

            {/* Section Print Detail Order */}
            <Box display="none">
               <Flex
                  backgroundColor="gray.100"
                  mt={3}
                  direction="column"
                  p={3}
                  ref={printOrderMenuRef}
               >
                  <Flex alignItems="center" direction="column">
                     <Heading color="black" size="sm" textAlign="center">
                        WARUNK <br /> BANG JOHN
                     </Heading>
                     <Text fontSize="sm" mt={2}>
                        List Pesanan id: {order.id}
                     </Text>
                  </Flex>

                  <Box p={3} borderRadius={10} mt={5}>
                     {order.items?.map((item, i) => (
                        <Flex justifyContent="space-between" key={i} mb={2}>
                           <Flex direction="column">
                              <Text color="black" fontSize="14px">{`${
                                 item.qty
                              } ${trimString(item.product.name)}`}</Text>
                              <Text ml={3} fontSize="12px" color="secondary">
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
                        <Text fontSize="14px">Rp. {order.totalPrice}</Text>
                     </Flex>
                  </Box>
               </Flex>
            </Box>

            {/* Section Modal Barcode */}
            <Modal isOpen={isOpenModalBarcode} onClose={onCloseModalBarcode}>
               <ModalOverlay />
               <ModalContent>
                  <ModalHeader>Pesanan ID: {order.id}</ModalHeader>
                  <ModalCloseButton _focus={{ outline: 'none' }} />
                  <ModalBody>
                     {/* Section Print Barcode */}
                     <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                     >
                        <Flex
                           mt={3}
                           direction="column"
                           p={3}
                           ref={printBarcodeRef}
                        >
                           <Flex alignItems="center" direction="column">
                              <Heading
                                 color="black"
                                 size="md"
                                 textAlign="center"
                                 fontWeight="bold"
                              >
                                 WARUNK <br /> BANG JOHN
                              </Heading>
                              <Text fontSize="sm" mt={2} mb={3}>
                                 Pesanan id: {order.id}
                              </Text>
                           </Flex>
                           <Box mt={5} textAlign="center" m="auto">
                              <QRCode
                                 size={130}
                                 value={`${window.location.origin}/order/${order.id}`}
                              />
                           </Box>
                           <Text
                              mt={2}
                              textAlign="center"
                              fontWeight="bold"
                              fontSize="sm"
                           >{`${window.location.origin}/order/${order.id}`}</Text>
                           <Text textAlign="center" mt={5} fontSize="sm">
                              Silahkan scan barcode diatas <br /> dan pilih menu
                              kesukaan anda :)
                           </Text>
                           <Text
                              textAlign="center"
                              mt={5}
                              fontSize="md"
                              fontWeight="bold"
                           >
                              Terimakasih
                           </Text>
                        </Flex>
                     </Box>
                  </ModalBody>

                  <ModalFooter>
                     <Button
                        variant="solid"
                        backgroundColor="primary"
                        onClick={handlePrintBarcode}
                     >
                        Print Barcode
                     </Button>
                  </ModalFooter>
               </ModalContent>
            </Modal>

            {/* Section Modal Payment */}
            <Modal
               initialFocusRef={initialRef}
               isOpen={isOpenModalPay}
               onClose={() => {
                  setCharge(0)
                  setCash(0)
                  onCloseModalPay()
               }}
            >
               <ModalOverlay />
               <ModalContent>
                  <ModalHeader>PAYMENT</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody pb={6}>
                     {renderDetailOrder()}
                     <FormControl mt={5}>
                        <FormLabel>Cash</FormLabel>
                        <InputGroup>
                           <InputLeftAddon children="Rp" />
                           <Input
                              ref={initialRef}
                              type="number"
                              placeholder="Cash"
                              fontWeight="bold"
                              onChange={(e) => {
                                 setCash(e.target.value)
                                 setCharge(e.target.value - order.totalPrice)
                              }}
                              onKeyDown={(e) => {
                                 if (e.key === 'Enter' && charge >= 0)
                                    handlePrintPayment()
                              }}
                              focusBorderColor="none"
                           />
                        </InputGroup>
                     </FormControl>

                     <FormControl mt={4}>
                        <FormLabel>Charge</FormLabel>
                        <InputGroup>
                           <InputLeftAddon children="Rp" />
                           <Input
                              type="number"
                              placeholder="Charge"
                              disabled
                              value={charge}
                              color="black"
                              fontWeight="bold"
                           />
                        </InputGroup>
                     </FormControl>
                  </ModalBody>

                  <ModalFooter>
                     <Button
                        backgroundColor="primary"
                        mr={3}
                        px={6}
                        disabled={charge < 0}
                        onClick={handlePrintPayment}
                     >
                        PAY
                     </Button>
                  </ModalFooter>
               </ModalContent>
            </Modal>
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
