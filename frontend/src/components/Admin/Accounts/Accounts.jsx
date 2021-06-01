import React, { useState } from 'react'
import {
   Button,
   CloseButton,
   Drawer,
   DrawerBody,
   DrawerContent,
   DrawerHeader,
   DrawerOverlay,
   FormControl,
   FormHelperText,
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
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/input'
import { Box, Flex, Heading, Stack, Text } from '@chakra-ui/layout'
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table'
import { Select } from '@chakra-ui/select'
import { MdSearch } from 'react-icons/md'
import { users } from '../../../Dummies/'
import { COLORS } from '../../constants'
import Pagination from '../common/Pagination/Pagination'

const Accounts = () => {
   const [active, setActive] = useState(null)
   const [account, setAccount] = useState([])
   const [isModalAdd, setIsModalAdd] = useState(true)
   const { isOpen, onOpen, onClose } = useDisclosure()

   const {
      isOpen: isOpenModalAccount,
      onOpen: onOpenModalAccount,
      onClose: onCloseModalAccount,
   } = useDisclosure()

   const handleModalAccount = ({ isAdd }) => {
      if (isAdd) {
         setIsModalAdd(true)
      } else {
         setIsModalAdd(false)
      }

      onOpenModalAccount()
   }

   const handleDetailAccount = (account) => {
      setActive(account.id)
      setAccount(account)
      onOpen()
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
                     Accounts
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
                           <Th>email</Th>
                           <Th>role</Th>
                        </Tr>
                     </Thead>
                     <Tbody>
                        {users.map((account, i) => (
                           <Tr
                              key={account.id}
                              onClick={() => handleDetailAccount(account)}
                              cursor="pointer"
                              _hover={{
                                 backgroundColor: '#BABABA',
                              }}
                              backgroundColor={
                                 active === account.id && '#d2d2d2'
                              }
                           >
                              <Td>{account.id}</Td>
                              <Td>{account.name}</Td>
                              <Td>{account.email}</Td>
                              <Td>{account.role}</Td>
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
                  {/* Sectionn Add Account */}
                  <Button
                     variant="solid"
                     backgroundColor="primary"
                     fontSize="sm"
                     boxShadow="lg"
                     _hover={{
                        backgroundColor: '#f0deab',
                     }}
                     onClick={() => handleModalAccount({ isAdd: true })}
                  >
                     Add Account
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
                  setAccount([])
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
                        Detail Account
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
                           src={account.photo}
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
                              <Text>{account.name}</Text>
                           </Box>

                           <Box width="50%">
                              <Heading fontSize="md">Role</Heading>
                              <Text>{account.role}</Text>
                           </Box>
                           <Box width="100%" mt={3}>
                              <Heading fontSize="md">Email</Heading>
                              <Text>{account.email}</Text>
                           </Box>
                        </Flex>

                        <Flex mt={5} justifyContent="space-between">
                           <Button
                              variant="outline"
                              w="47%"
                              borderWidth="2px"
                              colorScheme="gray"
                              boxShadow="lg"
                              _focus={{
                                 outline: 'none',
                              }}
                              onClick={() =>
                                 handleModalAccount({ isAdd: false })
                              }
                           >
                              Edit
                           </Button>
                           <Button
                              w="47%"
                              variant="solid"
                              colorScheme="red"
                              boxShadow="lg"
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

         {/* Modal  Account */}
         <Modal isOpen={isOpenModalAccount} onClose={onCloseModalAccount}>
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>
                  {isModalAdd ? 'Add Account' : 'Edit Account'}
               </ModalHeader>
               <ModalCloseButton _focus={{ outline: 'none' }} />
               <ModalBody>
                  <Stack spacing={4}>
                     <FormControl id="name">
                        <FormLabel mb={2}>Photo</FormLabel>
                        <Input type="file" variant="unstyled" />
                        <FormHelperText color="red">
                           We'll never share your email.
                        </FormHelperText>
                     </FormControl>
                     <FormControl id="name">
                        <FormLabel mb={-1}>Name</FormLabel>
                        <Input type="name" variant="flushed" />
                        <FormHelperText color="red">
                           We'll never share your email.
                        </FormHelperText>
                     </FormControl>
                     <FormControl id="email">
                        <FormLabel mb={-1}>Email</FormLabel>
                        <Input type="email" variant="flushed" />
                        <FormHelperText>
                           We'll never share your email.
                        </FormHelperText>
                     </FormControl>
                     <FormControl id="password">
                        <FormLabel mb={-1}>Password</FormLabel>
                        <Input type="password" variant="flushed" />
                        <FormHelperText>
                           We'll never share your email.
                        </FormHelperText>
                     </FormControl>
                     <FormControl id="confirm_password">
                        <FormLabel mb={-1}>Confirm Password</FormLabel>
                        <Input type="password" variant="flushed" />
                        <FormHelperText>
                           We'll never share your email.
                        </FormHelperText>
                     </FormControl>
                     <FormControl id="role">
                        <FormLabel>Role</FormLabel>
                        <Select placeholder="Select Role">
                           <option value="option1">Super Admin</option>
                           <option value="option2">Admin</option>
                        </Select>
                        <FormHelperText>
                           We'll never share your email.
                        </FormHelperText>
                     </FormControl>
                  </Stack>
               </ModalBody>
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

export default Accounts
