import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { SWRConfig } from 'swr'
// import { ColorModeScript } from '@chakra-ui/color-mode'
// import theme from './theme'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

ReactDOM.render(
   <React.StrictMode>
      {/* <ColorModeScript initialColorMode={theme.config.initialColorMode} /> */}
      {/* <SWRConfig value={{ fetcher }}> */}
      <App />
      {/* </SWRConfig> */}
   </React.StrictMode>,
   document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
