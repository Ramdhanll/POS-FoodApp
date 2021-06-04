import express from 'express'
import { body, param } from 'express-validator'
import {
   addProduct,
   seed,
   getProducts,
   editProduct,
   deleteProduct,
} from '../controllers/productController.js'
import Product from '../models/productModel.js'

const productRouter = express.Router()

productRouter.get('/seed', seed)
productRouter.get('/', getProducts)

productRouter.post(
   '/',
   body('name').notEmpty().withMessage('the field name is required!'),
   body('photo').notEmpty().withMessage('the field photo is required!'),
   body('weight').notEmpty().withMessage('the field weight is required!'),
   body('price').notEmpty().withMessage('the field price is required!'),
   addProduct
)

productRouter.put(
   '/:id',
   body('name').notEmpty().withMessage('the field name is required!'),
   body('photo').notEmpty().withMessage('the field photo is required!'),
   body('weight').notEmpty().withMessage('the field weight is required!'),
   body('price').notEmpty().withMessage('the field price is required!'),
   editProduct
)

productRouter.delete('/:id', deleteProduct)

export default productRouter
