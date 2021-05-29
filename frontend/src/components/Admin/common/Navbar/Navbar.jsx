import React from 'react'
import { Box, Flex, Text } from '@chakra-ui/layout'
import { MdMenu } from 'react-icons/md'
import { Button } from '@chakra-ui/button'
import Icon from '@chakra-ui/icon'
// import { useColorMode } from '@chakra-ui/color-mode'

const Navbar = ({ handlerSidebar }) => {
   // const { colorMode, toggleColorMode } = useColorMode()
   return (
      <>
         <Flex backgroundColor="primary" alignItems="center" height="45px">
            <Button
               display={['flex', 'flex', 'flex', 'none']}
               variant="ghost"
               _hover={{ backgroundColor: '' }}
               _focus={{
                  borderRadius: '10px',
               }}
               _active={{
                  borderRadius: '10px',
               }}
               w={7}
               h={7}
               ml={3}
               onClick={() => handlerSidebar()}
            >
               <Icon as={MdMenu} w={7} h={7} />
            </Button>

            <Box
               pl={{ base: 3, md: 15, lg: 19 }}
               pt={1}
               pb={1}
               // backgroundColor="red"
            >
               <Text
                  fontSize={{ base: 'sm', md: 'md' }}
                  fontWeight="900"
                  textAlign="center"
               >
                  WARUNK BANG JOHN
               </Text>
            </Box>

            {/* <Box ml="auto">
               <Button onClick={toggleColorMode}>
                  Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
               </Button>
            </Box> */}
         </Flex>
      </>
   )
}

export default Navbar
