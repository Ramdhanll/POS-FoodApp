import { Button } from '@chakra-ui/button'
import { Box, Text } from '@chakra-ui/layout'
import React from 'react'
import { MdArrowBack, MdArrowForward } from 'react-icons/md'

const Pagination = ({ page, pages, handlePagination }) => {
   return (
      <Box
         display="flex"
         justifyContent="center"
         alignItems="center"
         mt={[5, 0, 0, 0]}
      >
         <Button
            variant="ghost"
            _focus={{ outline: 'none' }}
            onClick={() => handlePagination(page - 1)}
            disabled={page === 1}
         >
            <MdArrowBack />
         </Button>
         {[...Array(pages < 5 ? pages : 5).keys()].map((x) => (
            <Text
               fontSize="xs"
               px={2}
               cursor="pointer"
               backgroundColor="black"
               color="white"
               borderRadius={3}
               mr={x + 1 !== pages && 1}
               _hover={{
                  backgroundColor: 'gray',
               }}
               onClick={() => {
                  handlePagination(x + 1)
               }}
               {...(page === x + 1 && style.active)}
            >
               {x + 1}
            </Text>
         ))}
         {pages > 5 && (
            <>
               <Text fontSize="xs" px={2}>
                  ...
               </Text>
               <Text fontSize="xs" px={2} cursor="pointer">
                  {pages}
               </Text>
            </>
         )}
         <Button
            variant="ghost"
            _focus={{ outline: 'none' }}
            onClick={() => handlePagination(page + 1)}
            disabled={page === pages}
         >
            <MdArrowForward />
         </Button>
      </Box>
   )
}

const style = {
   active: {
      backgroundColor: 'primary',
      color: 'black',
      fontWeight: 'black',
      fontSize: '14px',
   },
}

export default Pagination
