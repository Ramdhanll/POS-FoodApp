import { Button } from '@chakra-ui/button'
import { FormControl, FormHelperText, FormLabel } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { Box, Center, Flex, Heading, Stack, Text } from '@chakra-ui/layout'
import React from 'react'
import { COLORS } from '../../constants'

const Login = () => {
   return (
      <Box
         w="100wh"
         height="100vh"
         alignItems="center"
         justifyContent="center"
         display="center"
      >
         <Flex
            boxShadow="md"
            w={['xs', 'xs', 'md', 'md']}
            p={5}
            direction="column"
         >
            <Box>
               <Heading fontSize="3xl">Login</Heading>
               <Text fontWeight="light" mt={2} fontSize="sm" color="secondary">
                  Finish what was started
               </Text>
            </Box>
            <Stack spacing={5} mt={7}>
               <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input type="email" autoFocus />
                  <FormHelperText>Email is required!</FormHelperText>
               </FormControl>
               <FormControl>
                  <FormLabel>Password</FormLabel>
                  <Input type="password" />
                  <FormHelperText>Password is required!</FormHelperText>
               </FormControl>
               <Button backgroundColor={COLORS.primary} variant="solid">
                  Log In
               </Button>
            </Stack>
         </Flex>
      </Box>
   )
}

export default Login
