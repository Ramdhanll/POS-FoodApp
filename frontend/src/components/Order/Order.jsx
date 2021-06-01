import { Button } from '@chakra-ui/button'
import { Image } from '@chakra-ui/image'
import { Box, Divider, Flex, Heading, Text } from '@chakra-ui/layout'
import React, { useEffect, useMemo, useState } from 'react'
import { NavLink, useLocation, useParams } from 'react-router-dom'
import { products, orders } from '../../Dummies'

import {
   useDisclosure,
   Drawer,
   DrawerBody,
   DrawerHeader,
   DrawerOverlay,
   DrawerContent,
   DrawerCloseButton,
} from '@chakra-ui/react'

import foodIcon from '../../Images/icons/rice-bowl.png'
import drinkIcon from '../../Images/icons/drink.png'
import coldIcon from '../../Images/icons/cold-drink.png'
import noodleIcon from '../../Images/icons/noodle.png'
import coffeeIcon from '../../Images/icons/coffee.png'

import { FaCartArrowDown } from 'react-icons/fa'
const Order = () => {
   const { id } = useParams()
   const { isOpen, onOpen, onClose } = useDisclosure()
   const {
      isOpen: isOpenCart,
      onOpen: onOpenCart,
      onClose: onCloseCart,
   } = useDisclosure()
   const { search } = useLocation()
   const [active, setActive] = useState(null)
   const [product, setProduct] = useState([])
   const [order, setOrder] = useState([])

   const categories = useMemo(
      () => [
         {
            id: 0,
            name: 'All',
            url: '',
            icon: '',
         },
         {
            id: 1,
            name: 'Food',
            url: '?category=food',
            icon: foodIcon,
         },
         {
            id: 2,
            name: 'Drink',
            url: '?category=drink',
            icon: drinkIcon,
         },
         {
            id: 3,
            name: 'Noodle',
            url: '?category=noodle',
            icon: noodleIcon,
         },
         {
            id: 4,
            name: 'Cold',
            url: '?category=cold-drinks',
            icon: coldIcon,
         },
         {
            id: 5,
            name: 'Hot',
            url: '?category=hot-drinks',
            icon: coffeeIcon,
         },
      ],
      []
   )

   const trimString = (name) => {
      if (name.length > 16) return name.substring(0, 16) + '...'

      return name
   }

   useEffect(() => {
      const order = orders.find((order) => order.id === 3)
      setOrder(order)
   }, [])

   useEffect(() => {
      const categoryActive = categories.filter((c) => c.url === search)

      setActive(categoryActive[0].id)
   }, [categories, search])
   const navActive = () => ({
      backgroundColor: 'primary',
      fontWeight: 'Bold',
   })

   // const filterPrice = (price) =>
   //    price.toString().split('').slice(0, -3).join('')

   const handleDetailProduct = (product) => {
      onOpen()
      setProduct(product)
   }
   return (
      <Box
         display="flex"
         justifyContent="space-between"
         h="100vh"
         overflowX="hidden"
      >
         {/* Section Left */}
         <Box px={5} py={5} w={'100%'}>
            <Flex alignItems="center" justifyContent="space-between">
               <Heading fontFamily="Roboto" fontWeight="black">
                  WARUNK BANG JOHN
               </Heading>

               <Box
                  w="70px"
                  h="90px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  cursor="pointer"
                  position="relative"
                  _active={{
                     opacity: 0.8,
                  }}
                  onClick={() => onOpenCart()}
               >
                  <FaCartArrowDown size="40" />

                  <Box
                     top="1"
                     right="0"
                     position="absolute"
                     w="25px"
                     h="25px"
                     borderRadius="full"
                     backgroundColor="primary"
                     p="5px"
                     alignItems="Center"
                     justifyContent="center"
                     display="flex"
                  >
                     <Text fontSize="12px" textAlign="Center" fontWeight="bold">
                        12
                     </Text>
                  </Box>
               </Box>
            </Flex>
            <Text color="secondary"> Table ID: {id}</Text>

            {/* Navigation */}
            <Box
               w={['100%', '100%', '100%', '50%']}
               p={3}
               display="flex"
               justifyContent="space-between"
               mt={5}
               overflow="auto"
               position="inherit"
               zIndex="33"
               css={{
                  '&::-webkit-scrollbar': {
                     width: '1.2px',
                     height: '5px',
                  },
                  '&::-webkit-scrollbar-track': {
                     width: '1px',
                  },
                  '&::-webkit-scrollbar-thumb': {
                     // background: COLORS.secondary,
                     borderRadius: '24px',
                  },
               }}
            >
               {categories.map((c) => (
                  <NavLink key={c.id} to={`/order/${id}${c.url}`}>
                     <Box
                        {...(active === c.id
                           ? navActive()
                           : { backgroundColor: '##fff' })}
                        borderRadius={30}
                        px={8}
                        py={1}
                        mr={4}
                        h="100px"
                        w="40px"
                        boxShadow="md"
                     >
                        <Flex
                           direction="column"
                           alignItems="center"
                           justifyContent={
                              c.id === 0 ? 'center' : 'space-between'
                           }
                           py={3}
                           h="100%"
                        >
                           {c.id !== 0 && (
                              <Box
                                 w="40px"
                                 h="40px"
                                 backgroundColor="gray.100"
                                 borderRadius="30"
                                 p={1}
                                 display="flex"
                                 alignItems="center"
                                 justifyContent="center"
                              >
                                 <Image src={c.icon} w={25} h={25} />
                              </Box>
                           )}

                           <Text>{c.name}</Text>
                        </Flex>
                     </Box>
                  </NavLink>
               ))}
            </Box>
            {/* Section Main */}
            <Flex
               alignItems="flex-start"
               justifyContent="space-between"
               mt={5}
               wrap="wrap"
               w="100%"
            >
               {products.map((product) => (
                  <Box
                     key={product.id}
                     mb={8}
                     cursor="pointer"
                     transition="all 0.2s linear"
                     _active={{
                        opacity: 0.9,
                     }}
                     onClick={() => handleDetailProduct(product)}
                  >
                     <Box
                        w={['100%', '100%', '100%', '400px']}
                        boxShadow="md"
                        mb={15}
                        mr={5}
                        borderRadius="3xl"
                        display="flex"
                        position="relative"
                     >
                        <Image
                           src={product.photo}
                           // w="100%"
                           w="100vw"
                           maxH="400px"
                           borderRadius="3xl"
                        />
                        <Box
                           display="flex"
                           alignItems="center"
                           justifyContent="center"
                           backgroundColor="white"
                           position="absolute"
                           h="50px"
                           w="130px"
                           px={5}
                           bottom="0"
                           borderTopRightRadius="xl"
                           borderBottomLeftRadius="md"
                        >
                           <Text
                              fontSize="lg"
                              fontWeight="bold"
                              textAlign="center"
                           >
                              IDR {product.price}
                           </Text>
                        </Box>
                     </Box>
                     <Heading fontSize="2xl" mt={-2}>
                        {product.name}
                     </Heading>
                  </Box>
               ))}
            </Flex>
         </Box>

         {/* Drawer Detail Product */}
         <Drawer placement="bottom" onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay />
            <DrawerContent>
               <DrawerCloseButton mt={2} _focus={{ outline: 'none' }} />
               <DrawerHeader borderBottomWidth="1px">
                  Detail Product
               </DrawerHeader>
               <DrawerBody px={0} py={0}>
                  <Box
                     py={3}
                     w="100%"
                     backgroundColor="#F7F7F9"
                     display="flex"
                     flexDirection="column"
                     justifyContent="center"
                     alignItems="center"
                  >
                     <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        borderRadius="20"
                        position="relative"
                     >
                        <Image
                           src={product.photo}
                           boxShadow="lg"
                           borderRadius="50"
                           w="250px"
                           h="250px"
                        />

                        <Box
                           position="absolute"
                           bottom="-5"
                           height="45px"
                           display="flex"
                           justifyContent="center"
                           alignItems="center"
                           boxShadow="lg"
                           borderRadius="25"
                        >
                           <Button
                              w="50px"
                              h="100%"
                              variant="solid"
                              backgroundColor="white"
                              color="black"
                              borderTopLeftRadius="25"
                              borderBottomLeftRadius="25"
                              borderTopRightRadius="0"
                              borderBottomRightRadius="0"
                              _focus={{ outline: 'none' }}
                           >
                              <Text fontSize="2xl" fontWeight="bold">
                                 -
                              </Text>
                           </Button>
                           <Text
                              textAlign="center"
                              w="50px"
                              h="100%"
                              alignItems="center"
                              justifyContent="center"
                              display="flex"
                              backgroundColor="white"
                              fontWeight="bold"
                              fontSize="lg"
                           >
                              2
                           </Text>
                           <Button
                              w="50px"
                              h="100%"
                              variant="solid"
                              backgroundColor="white"
                              color="black"
                              borderTopRightRadius="25"
                              borderBottomRightRadius="25"
                              borderTopLeftRadius="0"
                              borderBottomLeftRadius="0"
                              _focus={{ outline: 'none' }}
                           >
                              <Text fontSize="2xl" fontWeight="bold">
                                 +
                              </Text>
                           </Button>
                        </Box>
                     </Box>
                     {/* Section Drawer Deskripsi */}
                     <Box
                        mt={8}
                        display="flex"
                        alignItems="Center"
                        justifyContent="center"
                        textAlign="center"
                        flexDirection="column"
                        px={3}
                     >
                        <Heading fontSize="2xl">
                           {product.name} - IDR{' '}
                           {/* {product.price && filterPrice(product.price)}K */}
                           {product.price}
                        </Heading>
                        <Text mt={1} color="secondary" fontSize="sm">
                           {product.description}
                        </Text>
                     </Box>
                     {/* Drawer Footer */}
                     <Box
                        mt={3}
                        mb={-3}
                        w="100%"
                        h="100%"
                        p={5}
                        boxShadow="lg"
                        backgroundColor="white"
                        display="flex"
                        flexDirection="column"
                     >
                        <Box display="flex" justifyContent="space-between">
                           <Text fontWeight="bold">3 Items</Text>
                           <Text fontWeight="bold">IDR 30000</Text>
                        </Box>
                        <Button
                           variant="solid"
                           backgroundColor="primary"
                           mt={3}
                        >
                           Add To Cart
                        </Button>
                     </Box>
                  </Box>
               </DrawerBody>
            </DrawerContent>
         </Drawer>

         {/* Section Drawer Cart */}
         <Drawer placement="bottom" onClose={onCloseCart} isOpen={isOpenCart}>
            <DrawerOverlay />
            <DrawerContent>
               <DrawerCloseButton mt={2} _focus={{ outline: 'none' }} />
               <DrawerHeader borderBottomWidth="1px">Cart</DrawerHeader>
               <DrawerBody>
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
                              <Text fontWeight="bold">{item.product.name}</Text>
                              <Text color="secondary">{item.note}</Text>
                           </Flex>
                           <Text fontWeight="bold">{item.qty} Items</Text>
                        </Box>
                     ))}
                  </Flex>
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
                  <Button
                     variant="solid"
                     backgroundColor="primary"
                     w="100%"
                     mt={2}
                     textAlign="center"
                     alignItems="center"
                     display="flex"
                  >
                     <Text fontWeight="bold" fontSize="2xl">
                        Order
                     </Text>
                  </Button>
               </DrawerBody>
            </DrawerContent>
         </Drawer>
      </Box>
   )
}

export default Order

/**
 <Modal isOpen={isOpen} onClose={onClose} isCentered>
 <ModalOverlay />
 <ModalContent>
    <ModalHeader>Detail Product</ModalHeader>
    <ModalCloseButton _focus={{ outline: 'none' }} />
    <ModalBody>
       <Box
          w="100%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
       >
          <Image
             src={product.photo}
             borderRadius="50"
             w="250px"
             h="250px"
          />
          <Box
             display="flex"
             justifyContent="center"
             alignItems="center"
             boxShadow="lg"
             p={3}
             borderRadius="20"
          >
             <Button
                variant="solid"
                colorScheme="whiteAlpha"
                color="black"
             >
                -
             </Button>
             <Text>2</Text>
             <Button
                variant="solid"
                colorScheme="whiteAlpha"
                color="black"
             >
                +
             </Button>
          </Box>
       </Box>
    </ModalBody>

    <ModalFooter>
       <Button colorScheme="blue" mr={3} onClick={onClose}>
          Close
       </Button>
       <Button variant="ghost">Secondary Action</Button>
    </ModalFooter> 
 </ModalContent>
</Modal>

 */
