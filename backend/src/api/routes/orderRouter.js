import express from 'express'
import {
   addOrder,
   checkoutItem,
   completed,
   delivered,
   getOrder,
   getOrders,
   getRunningOrders,
   seed,
} from '../controllers/orderController.js'
import isAuth from '../middlewares/isAuth.js'

const orderRouter = express.Router()

orderRouter.get('/seed', seed)
orderRouter.get('/', getOrders)
orderRouter.post('/', isAuth, addOrder)
orderRouter.get('/running', getRunningOrders)
orderRouter.get('/:id', getOrder)
orderRouter.put('/:id', checkoutItem)
orderRouter.put('/:id/delivered', isAuth, delivered)
orderRouter.put('/:id/completed', isAuth, completed)

export default orderRouter
