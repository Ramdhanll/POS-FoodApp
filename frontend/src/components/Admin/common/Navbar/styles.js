import { makeStyles } from '@material-ui/core'
import { COLORS } from '../../../constants'

export default makeStyles(() => ({
   navbar: {
      height: 40,
      backgroundColor: COLORS.primary,
      display: 'flex',
      alignItems: 'center',
   },
   logo: {
      color: COLORS.black,
      paddingLeft: 50,
      fontWeight: '900',
      textDecoration: 'none',
      '&:hover': {
         color: '#000',
      },
   },
}))
