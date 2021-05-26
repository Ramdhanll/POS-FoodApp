import { Flex, Text } from '@chakra-ui/layout'
import React from 'react'

const PageNotFound = () => {
   return (
      <Flex
         textAlign="center"
         justifyContent="center"
         flex={1}
         direction="column"
      >
         <Text fontSize="lg">Page Not Found</Text>
      </Flex>
   )
}

export default PageNotFound
