import { Button } from '@chakra-ui/button'
import { Box, Text } from '@chakra-ui/layout'
import React from 'react'

const Pagination = () => {
   return (
      <Box
         display="flex"
         justifyContent="center"
         alignItems="center"
         mt={[5, 0, 0, 0]}
      >
         <Button variant="ghost" _focus={{ outline: 'none' }}>
            Prev
         </Button>
         <Text
            fontSize="xs"
            px={2}
            cursor="pointer"
            borderBottom="1px solid red"
            color="red"
            fontWeight="bold"
         >
            1
         </Text>
         <Text fontSize="xs" px={2} cursor="pointer">
            2
         </Text>
         <Text fontSize="xs" px={2} cursor="pointer">
            3
         </Text>
         <Text fontSize="xs" px={2}>
            ...
         </Text>
         <Text fontSize="xs" px={2} cursor="pointer">
            200
         </Text>
         <Button variant="ghost" _focus={{ outline: 'none' }}>
            Next
         </Button>
      </Box>
   )
}

export default Pagination
