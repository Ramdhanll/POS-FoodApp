import { Button } from '@chakra-ui/button'
import {
   FormControl,
   FormErrorMessage,
   FormHelperText,
   FormLabel,
} from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { Box, Center, Flex, Heading, Stack, Text } from '@chakra-ui/layout'
import React, { useEffect, useState } from 'react'
import { COLORS } from '../../constants'

import useSWR from 'swr'

import { Field, Form, Formik } from 'formik'
import { Redirect } from 'react-router-dom'

const Login = ({ history }) => {
   const [errorSubmit, setErrorSubmit] = useState(false)
   const user = JSON.parse(localStorage.getItem('user'))
   useEffect(() => {
      if (user) {
         history.push('/admin')
      }
   }, [history, user])

   const [a, setA] = useState('')
   const [b, setB] = useState('')
   const gas = () => {
      alert(a, b)
   }

   function validateEmail(value) {
      let error
      if (!value) {
         error = 'Email is required'
      }
      return error
   }

   function validatePassword(value) {
      let error
      if (!value) {
         error = 'Password is required'
      }
      return error
   }

   const onSubmit = async (values, { setSubmitting }) => {
      const response = await fetch(
         `${process.env.REACT_APP_BASE_URL_SERVER}/api/users/login`, // test on web
         // `http://192.168.100.7:5000/api/users/login`, // test on mobile
         {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
         }
      )
      const result = await response.json()
      if (!response.ok) {
         setErrorSubmit(true)
      } else {
         localStorage.setItem('user', JSON.stringify(result))
         localStorage.setItem('token', result.token)
         localStorage.setItem('userId', result._id)
         history.push('/admin')
      }
   }

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
               <Formik
                  initialValues={{ email: '', password: '' }}
                  onSubmit={onSubmit}
               >
                  {(props) => (
                     <Form>
                        <Field name="email" validate={validateEmail}>
                           {({ field, form }) => (
                              <FormControl
                                 isInvalid={
                                    form.errors.email && form.touched.email
                                 }
                              >
                                 <FormLabel htmlFor="email">Email</FormLabel>
                                 <Input
                                    {...field}
                                    id="email"
                                    placeholder="email"
                                 />
                                 <FormErrorMessage>
                                    {form.errors.email}
                                 </FormErrorMessage>
                              </FormControl>
                           )}
                        </Field>
                        <Field name="password" validate={validatePassword}>
                           {({ field, form }) => (
                              <FormControl
                                 isInvalid={
                                    form.errors.password &&
                                    form.touched.password
                                 }
                                 mt={3}
                              >
                                 <FormLabel htmlFor="password">
                                    Password
                                 </FormLabel>
                                 <Input
                                    {...field}
                                    id="password"
                                    placeholder="password"
                                    type="password"
                                 />
                                 <FormErrorMessage>
                                    {form.errors.password}
                                 </FormErrorMessage>
                              </FormControl>
                           )}
                        </Field>
                        <Box
                           display="flex"
                           alignItems="center"
                           justifyContent="center"
                           flexDirection="column"
                        >
                           <Button
                              w="100%"
                              mt={4}
                              backgroundColor="primary"
                              isLoading={props.isSubmitting}
                              type="submit"
                           >
                              Submit
                           </Button>
                           {errorSubmit && (
                              <Text
                                 alignItems="center"
                                 mt={3}
                                 color="red"
                                 fontSize="sm"
                              >
                                 Invalid email or password!
                              </Text>
                           )}
                        </Box>
                     </Form>
                  )}
               </Formik>
            </Stack>
         </Flex>
      </Box>
   )
}

export default Login
