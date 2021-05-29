import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
   colors: {
      primary: '#FFCA40',
      secondary: '#8A8A8A',
      black: '#343434',
   },
   config: {
      initialColorMode: 'light',
      useSystemColorMode: false,
   },
})

export default theme
