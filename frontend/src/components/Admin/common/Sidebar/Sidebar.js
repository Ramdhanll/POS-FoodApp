import { Avatar } from '@chakra-ui/avatar'
import { Button } from '@chakra-ui/button'
import { Box, Flex, Link, Text, Wrap, WrapItem } from '@chakra-ui/layout'
import {
   MdDashboard,
   MdShoppingCart,
   MdHistory,
   MdPeople,
   MdBook,
} from 'react-icons/md'
import { GiOpenedFoodCan } from 'react-icons/gi'
import React, { useEffect, useMemo, useState } from 'react'
import useWindowDimensions from '../../../utils/useWindowDimension'
import { COLORS } from '../../../constants'
import { useHistory, useLocation } from 'react-router'

const Sidebar = ({ openSidebar }) => {
   const History = useHistory()
   const url = useLocation()
   const [active, setActive] = useState(null)
   const { height } = useWindowDimensions()
   const navMenu = useMemo(
      () => [
         {
            key: 0,
            icon: MdDashboard,
            path: '/admin',
            name: 'Dashboard',
         },
         {
            key: 1,
            icon: MdShoppingCart,
            path: '/admin/order',
            name: 'Order',
         },
         {
            key: 2,
            icon: GiOpenedFoodCan,
            path: '/admin/products',
            name: 'Products',
         },
         {
            key: 3,
            icon: MdHistory,
            path: '/admin/history',
            name: 'History',
         },
      ],
      []
   )

   const navOthers = useMemo(
      () => [
         {
            key: 4,
            icon: MdPeople,
            path: '/admin/accounts',
            name: 'Account',
         },
         {
            key: 5,
            icon: MdBook,
            path: '/admin/report',
            name: 'Report',
         },
      ],
      []
   )

   useEffect(() => {
      const { pathname } = url
      const filterUrl =
         pathname.charAt(pathname.length - 1) === '/'
            ? pathname.slice(0, -1)
            : pathname

      const nav = [...navMenu, ...navOthers].filter(
         (nav) => nav.path === filterUrl
      )

      if (nav.length !== 0) {
         setActive(nav[0].key)
      }
   }, [url, navMenu, navOthers])

   const handlerNavigation = (goto, i) => {
      setActive(i)
      History.push(goto)
   }

   const Navigation = () => (
      <>
         <Flex direction="column" mt={8} ml={5} mr={4}>
            <Text fontSize="sm" color="secondary" fontWeight="light">
               MENU
            </Text>

            {navMenu.map((item) => (
               <Link
                  to="/"
                  style={{ textDecoration: 'none' }}
                  onClick={() => handlerNavigation(item.path, item.key)}
                  key={item.key}
               >
                  <Flex
                     mt={5}
                     alignItems="center"
                     p={2}
                     borderRadius="10px"
                     backgroundColor={active === item.key && 'secondary'}
                     cursor="pointer"
                     boxShadow="lg"
                     _hover={{
                        backgroundColor: '#A1A1A1',
                     }}
                  >
                     <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        borderRadius={['6px', '8px', '10px']}
                        width={['20px', '25px', '30px']}
                        height={['20px', '25px', '30px']}
                        backgroundColor={
                           active === item.key ? COLORS.primary : '#D9D9D9'
                        }
                     >
                        {<item.icon />}
                     </Box>

                     <Text
                        ml={5}
                        fontSize={{ base: '12px', md: '14px', lg: '16px' }}
                        {...(active === item.key && styles.active)}
                     >
                        {item.name}
                     </Text>
                  </Flex>
               </Link>
            ))}

            <Text fontSize="sm" color="secondary" fontWeight="light" mt={5}>
               OTHERS
            </Text>

            {navOthers.map((item) => (
               <Link
                  to="/"
                  style={{ textDecoration: 'none' }}
                  onClick={() => handlerNavigation(item.path, item.key)}
                  key={item.key}
               >
                  <Flex
                     mt={5}
                     alignItems="center"
                     p={2}
                     borderRadius="10px"
                     backgroundColor={active === item.key && 'secondary'}
                     cursor="pointer"
                     boxShadow="lg"
                     _hover={{
                        backgroundColor: '#A1A1A1',
                     }}
                  >
                     <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        borderRadius={['6px', '8px', '10px']}
                        width={['20px', '25px', '30px']}
                        height={['20px', '25px', '30px']}
                        backgroundColor={
                           active === item.key ? COLORS.primary : '#D9D9D9'
                        }
                     >
                        {<item.icon />}
                     </Box>

                     <Text
                        ml={5}
                        fontSize={{ base: '12px', md: '14px', lg: '16px' }}
                        {...(active === item.key && styles.active)}
                     >
                        {item.name}
                     </Text>
                  </Flex>
               </Link>
            ))}
         </Flex>
      </>
   )

   return (
      <Box
         zIndex="3"
         display={[
            openSidebar ? 'flex' : 'none',
            openSidebar ? 'flex' : 'none',
            'flex',
         ]}
         position={{ base: 'absolute', md: 'inherit', lg: 'inherit' }}
         transition="all 0.5s ease-out"
         backgroundColor="white"
         p={3}
         minW={['200px', '230px', '260px']}
         h={height - 45} // 45 from height navbar
         borderRight="1px solid #c7c7c7"
         flexDirection="column"
         overflow="scroll"
         css={{
            '&::-webkit-scrollbar': {
               width: '1.2px',
            },
            '&::-webkit-scrollbar-track': {
               width: '1px',
            },
            '&::-webkit-scrollbar-thumb': {
               background: COLORS.secondary,
               borderRadius: '24px',
            },
         }}
      >
         {/* Profile */}
         <Flex className="avatar" mt={3} direction="column" alignItems="center">
            <Wrap>
               <WrapItem>
                  <Avatar
                     size="xl"
                     // w="100px"
                     // h="100px"
                     name="Segun Adebayo"
                  />{' '}
               </WrapItem>
            </Wrap>
            <Text className="name" fontWeight="bold" mt={3} fontSize="sm">
               Ramadhani
            </Text>
            <Text color="secondary" fontSize="xs">
               Super Admin
            </Text>
            <Button
               variant="outline"
               borderRadius={15}
               mt={3}
               h={30}
               w={150}
               size="sm"
               boxShadow="lg"
            >
               Open Profile
            </Button>
         </Flex>

         {/* Navigation */}
         <Navigation />
      </Box>
   )
}

const styles = {
   active: {
      color: 'primary',
      fontWeight: 'bold',
   },
}

export default Sidebar
