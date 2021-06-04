import express from 'express'
import dotenv from 'dotenv'
import Database from './config/Database.js'
import cors from 'cors'
import {
   orderRouter,
   productRouter,
   userRouter,
   listOrderRouter,
} from './api/routes/index.js'

const PORT = process.env.PORT || 5000
dotenv.config()
const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// setup mongoose database
Database()

// Routes
app.use('/api/users', userRouter)
app.use('/api/products', productRouter)
app.use('/api/orders', orderRouter)
app.use('/api/listorders', listOrderRouter)

app.use('/', (req, res) => {
   res.send('Server is on!')
})

app.use((err, req, res, next) => {
   // this method from express-async-handler to handle error
   res.status(500).send({ message: err.message })
})

app.listen(PORT, () => {
   console.log(`Server listening on: http://localhost:${PORT}`)
})
