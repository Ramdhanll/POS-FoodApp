import { ordersDummy } from '../../dummies.js'
import ListOrder from '../models/listOrderModel.js'
import Order from '../models/orderModel.js'
import Product from '../models/productModel.js'

export const seed = async (req, res) => {
   await Order.deleteMany({})

   try {
      const createdOrders = await Order.insertMany(ordersDummy)
      return res
         .status(201)
         .json({ message: 'Success inserted orders!', orders: createdOrders })
   } catch (error) {
      return res.status(404).json(error)
   }
}

export const addOrder = async (req, res) => {
   const order = new Order({
      status: 'pending',
      totalPrice: 0,
      items: [],
      author: req.user._id,
   })

   const createdOrder = await order.save()
   const url = `${process.env.CLIENT_HOSTNAME}/order/${createdOrder._id}`
   res.status(201).json({
      message: 'Order has created!',
      order: createdOrder,
      url,
   })
}

export const getOrders = async (req, res) => {
   const orders = await Order.find({})

   res.status(200).send(orders)
}

export const getRunningOrders = async (req, res) => {
   const orders = await Order.find({
      status: ['pending', 'process', 'delivered'],
   }).sort('created_at')

   res.status(200).json(orders)
}

export const getOrder = async (req, res) => {
   const orderId = req.params.id
   try {
      const order = await Order.findById(orderId)
         .populate({
            // populate array of object
            path: 'items',
            populate: { path: 'lists.product' },
         })
         .populate('author', '-password')
      return res.status(200).json(order)
   } catch (error) {
      return res.status(404).json({ message: 'Order not found!', error })
   }
}

// checkout order
export const checkoutItem = async (req, res) => {
   const { items } = req.body
   const orderId = req.params.id

   try {
      const order = await Order.findById(orderId).populate({
         path: 'items',
         populate: { path: 'lists.product' },
      })
      const listOrder = new ListOrder({
         lists: items,
      })

      await listOrder.save()

      const listIncoming = await ListOrder.populate(listOrder, [
         { path: 'lists.product' },
      ])

      // find totalPrice
      const totalPricePrev = order.items
         .map((item) => {
            const price = +item.lists.reduce(
               (a, b) => a + b.qty * b.product.price,
               0
            )

            return price
         })
         .reduce((a, b) => a + b, 0)

      const totalPriceIncoming = listIncoming.lists.reduce(
         (a, b) => a + b.qty * b.product.price,
         0
      )

      order.items.push(listIncoming)
      order.status = 'process'
      order.totalPrice = totalPricePrev + totalPriceIncoming

      const updatedOrder = await order.save()
      res.send(updatedOrder)
   } catch (error) {
      res.status(404).json({ message: 'Order not found!' })
   }
}

export const delivered = async (req, res) => {
   const orderId = req.params.id

   try {
      const order = await Order.findById(orderId)

      order.status = 'delivered'

      const updatedOrder = await order.save()

      res.status(200).json({
         message: 'Status has change to delivered!',
         updatedOrder,
      })
   } catch (error) {
      res.status(404).json({ message: 'Order not found!', error })
   }
}

export const completed = async (req, res) => {
   const { cash, charge } = req.body
   const orderId = req.params.id

   try {
      const order = await Order.findById(orderId)

      order.cash = cash
      order.charge = charge
      order.status = 'completed'

      const updatedOrder = await order.save()

      return res
         .status(200)
         .json({ message: 'Paymen successfully', order: updatedOrder })
   } catch (error) {
      return res.status(404).json({ message: 'Order not found!', error })
   }
}
