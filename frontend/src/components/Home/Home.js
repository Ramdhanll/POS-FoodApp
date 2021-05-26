import React from 'react'
import { COLORS } from '../constants'

const Home = () => {
   return (
      <div
         style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            flexDirection: 'column',
            backgroundColor: COLORS.primary,
         }}
      >
         <div style={{ fontWeight: 'bold', fontSize: 32, textAlign: 'center' }}>
            WARUNK <br /> BANK JOHN
         </div>
      </div>
   )
}

export default Home
