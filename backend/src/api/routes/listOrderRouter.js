import express from 'express'
import { changeStatusListOrder } from '../controllers/listOrderController.js'

const listOrderRouter = express.Router()

listOrderRouter.put('/:id', changeStatusListOrder)

export default listOrderRouter
