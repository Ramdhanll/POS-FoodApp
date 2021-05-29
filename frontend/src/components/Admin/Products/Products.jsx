import React, { useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print'
import QRCode from 'react-qr-code'
import { LazyLoadImage } from 'react-lazy-load-image-component'
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
import photo150 from '../../../Images/sample150.png'
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
import { orders, products } from '../../../Dummies/'
import { COLORS } from '../../constants'
import Pagination from '../common/Pagination/Pagination'

const Products = () => {
   const [active, setActive] = useState(null)
   const [product, setProduct] = useState([])
   const [isModalAdd, setIsModalAdd] = useState(true)
   const [charge, setCharge] = useState(0)
   const [cash, setCash] = useState(0)
   const initialRef = useRef()
   const { isOpen, onOpen, onClose } = useDisclosure()

   const {
      isOpen: isOpenModalProduct,
      onOpen: onOpenModalProduct,
      onClose: onCloseModalProduct,
   } = useDisclosure()

   const printOrderMenuRef = useRef()
   const printBarcodeRef = useRef()
   const printPaymentRef = useRef()

   const handleModalProduct = ({ isAdd }) => {
      if (isAdd) {
         setIsModalAdd(true)
      } else {
         setIsModalAdd(false)
      }

      onOpenModalProduct()
   }

   const handleDetailProduct = (product) => {
      setActive(product.id)
      setProduct(product)
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
               {/* Section Header */}
               <Flex
                  justifyContent="space-between"
                  direction={['column', 'row', 'row']}
               >
                  <Heading color="secondary" size="lg">
                     Products
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
                           <Th>No</Th>
                           <Th>Name</Th>
                           <Th>Qty</Th>
                           <Th>Category</Th>
                           <Th>Price</Th>
                           <Th>Action</Th>
                        </Tr>
                     </Thead>
                     <Tbody>
                        {products.map((product, i) => (
                           <Tr
                              key={product.id}
                              onClick={() => handleDetailProduct(product)}
                              cursor="pointer"
                              _hover={{
                                 backgroundColor: '#BABABA',
                              }}
                              backgroundColor={
                                 active === product.id && '#d2d2d2'
                              }
                           >
                              <Td>{product.id}</Td>
                              <Td>{product.name}</Td>
                              <Td>{product.qty}</Td>
                              <Td>{product.category}</Td>
                              <Td>{product.price}</Td>

                              <Td>Action</Td>
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
                     onClick={() => handleModalProduct({ isAdd: true })}
                  >
                     Add Product
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
                  setProduct([])
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
                        Detail Product
                     </Text>
                     <CloseButton
                        display={['inherit', 'inherit', 'none']}
                        onClick={() => {
                           setActive(null)
                           onClose()
                        }}
                        _focus={{
                           outline: 'none',
                        }}
                     />
                  </DrawerHeader>
                  <DrawerBody mt={3}>
                     <Box>
                        <Image
                           w="100%"
                           maxH="280"
                           src={product.photo}
                           // fallbackSrc="https://via.placeholder.com/150"
                           fallbackSrc={photo150}
                           m="auto"
                           borderRadius="10"
                           boxShadow="md"
                        />

                        <Flex
                           flexWrap="wrap"
                           alignItems="flex-start"
                           justifyContent="space-between"
                           mt={5}
                        >
                           <Box width="50%">
                              <Heading fontSize="md">Name</Heading>
                              <Text>{product.name}</Text>
                           </Box>
                           <Box width="50%">
                              <Heading fontSize="md">QTY</Heading>
                              <Text>{product.qty}</Text>
                           </Box>
                           <Box width="50%" mt={3}>
                              <Heading fontSize="md">Weight</Heading>
                              <Text>{product.weight}</Text>
                           </Box>
                           <Box width="50%" mt={3}>
                              <Heading fontSize="md">Category</Heading>
                              <Text>{product.category}</Text>
                           </Box>
                           <Box width="50%" mt={3}>
                              <Heading fontSize="md">Price</Heading>
                              <Text>{product.price}</Text>
                           </Box>
                        </Flex>

                        <Flex mt={5} justifyContent="space-between">
                           <Button
                              variant="outline"
                              w="47%"
                              colorScheme="gray"
                              boxShadow="md"
                              _focus={{
                                 outline: 'none',
                              }}
                              onClick={() =>
                                 handleModalProduct({ isAdd: false })
                              }
                           >
                              Edit
                           </Button>
                           <Button
                              w="47%"
                              variant="solid"
                              colorScheme="red"
                              boxShadow="md"
                              _focus={{
                                 outline: 'none',
                              }}
                           >
                              Delete
                           </Button>
                        </Flex>
                     </Box>
                  </DrawerBody>
               </DrawerContent>
            </Drawer>
         </Flex>

         {/* Modal  Product */}
         <Modal isOpen={isOpenModalProduct} onClose={onCloseModalProduct}>
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>
                  {isModalAdd ? 'Add Product' : 'Edit Product'}
               </ModalHeader>
               <ModalCloseButton _focus={{ outline: 'none' }} />
               <ModalBody>Modal Body</ModalBody>
               <ModalFooter>
                  <Button variant="solid" backgroundColor="primary">
                     {isModalAdd ? 'Save' : 'Update'}
                  </Button>
               </ModalFooter>
            </ModalContent>
         </Modal>
      </Box>
   )
}

export default Products
