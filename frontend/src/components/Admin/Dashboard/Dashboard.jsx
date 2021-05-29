import { Box, Flex, Heading, Text } from '@chakra-ui/layout'
import React from 'react'

const Dashboard = () => {
   return (
      <>
         <Box p={8} w={'100%'} h="100%">
            <Heading color="secondary" size="lg">
               Overview
            </Heading>
            <Flex
               marginRight={3}
               direction={['column', 'row', 'row']}
               mt={[5, 10, 10]}
               justifyContent="space-between"
               alignItems="center"
               wrap="wrap"
            >
               <Box
                  // w="300px"
                  w={['300px', '180px', '300px']}
                  // h="120px"
                  h={['100px', '120px', '120px']}
                  boxShadow="lg"
                  border="1px solid #D9D9D9"
                  p={5}
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  mb={{ base: '20px' }}
               >
                  <Heading
                     as="h2"
                     size={['md', 'sm', 'md']}
                     color="secondary"
                     fontWeight="regular"
                  >
                     Today's Sales
                  </Heading>
                  <Text
                     fontWeight="bold"
                     fontSize={['3xl', 'xl', '4xl']}
                     lineHeight="1"
                     mt={2}
                  >
                     Rp. 300,000
                  </Text>
               </Box>
               <Box
                  w={['300px', '200px', '300px']}
                  // h="120px"
                  h={['100px', '120px', '120px']}
                  boxShadow="lg"
                  border="1px solid #D9D9D9"
                  p={5}
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  mb={{ base: '20px' }}
               >
                  <Heading
                     as="h2"
                     size={['md', 'sm', 'md']}
                     color="secondary"
                     fontWeight="regular"
                  >
                     May's Sales
                  </Heading>
                  <Text
                     fontWeight="bold"
                     fontSize={['3xl', 'xl', '4xl']}
                     lineHeight="1"
                     mt={2}
                  >
                     Rp. 1,300,000
                  </Text>
               </Box>
               <Box
                  w={['300px', '200px', '300px']}
                  // h="120px"
                  h={['100px', '120px', '120px']}
                  boxShadow="lg"
                  border="1px solid #D9D9D9"
                  p={5}
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  mb={{ base: '20px' }}
               >
                  <Heading
                     as="h2"
                     size={['md', 'sm', 'md']}
                     color="secondary"
                     fontWeight="regular"
                  >
                     2021's Sales
                  </Heading>
                  <Text
                     fontWeight="bold"
                     fontSize={['3xl', 'xl', '4xl']}
                     lineHeight="1"
                     mt={2}
                  >
                     Rp. 45,300,000
                  </Text>
               </Box>
            </Flex>
         </Box>
      </>
   )
}

export default Dashboard
