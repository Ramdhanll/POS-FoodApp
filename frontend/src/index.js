import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { SWRConfig } from 'swr'
import axios from 'axios'
// import { ColorModeScript } from '@chakra-ui/color-mode'
// import theme from './theme'

const fetcher = (url) => axios(url).then((r) => r.data)

ReactDOM.render(
   <React.StrictMode>
      {/* <ColorModeScript initialColorMode={theme.config.initialColorMode} /> */}
      <SWRConfig value={{ fetcher, dedupingInterval: 0 }}>
         <App />
      </SWRConfig>
   </React.StrictMode>,
   document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
