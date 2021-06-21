import expressAsyncHandler from 'express-async-handler'
import { validationResult } from 'express-validator'
import { productsDummy } from '../../dummies.js'
import Product from '../models/productModel.js'

export const seed = expressAsyncHandler(async (req, res) => {
   await Product.deleteMany({})

   const createdProducts = await Product.insertMany(productsDummy)

   return res.send(createdProducts)
})

export const getProducts = expressAsyncHandler(async (req, res) => {
   const pageSize = 5
   const page = Number(req.query.page) || 1
   const name = req.query.name || ''
   const category = req.query.category || ''
   const _id = req.query.id || ''
   const qty = req.query.qty || ''

   const nameFilter = name ? { name: { $regex: name, $options: 'i' } } : {}
   const categoryFilter = category
      ? { category: { $regex: category, $options: 'i' } }
      : {}
   const _idFilter = _id ? { _id } : {}
   const qtyFilter = qty ? { qty } : {}

   const count = await Product.countDocuments({
      ..._idFilter,
      ...nameFilter,
      ...categoryFilter,
      ...qtyFilter,
   })

   const products = await Product.find({
      ..._idFilter,
      ...nameFilter,
      ...categoryFilter,
      ...qtyFilter,
   })
      .skip(pageSize * (page - 1))
      .limit(pageSize)

   res.status(200).json({ products, page, pages: Math.ceil(count / pageSize) })
})

export const addProduct = expressAsyncHandler(async (req, res) => {
   const errors = validationResult(req)
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
   }

   const { name, photo, description, weight, qty, price, category } = req.body
   const product = new Product({
      name,
      photo,
      description,
      weight,
      qty,
      price,
      category,
   })

   const createdProduct = await product.save()

   res.status(201).json({
      _id: createdProduct._id,
      name: createdProduct.name,
      photo: createdProduct.photo,
      description: createdProduct.description,
      weight: createdProduct.weight,
      qty: createdProduct.qty,
      price: createdProduct.price,
      category: createdProduct.category,
   })
})

export const editProduct = async (req, res) => {
   const errors = validationResult(req)
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
   }

   const productId = req.params.id

   try {
      const product = await Product.findById(productId)
      const { name, photo, description, weight, qty, price, category } =
         req.body

      product.name = name
      product.photo = photo
      product.description = description
      product.weight = weight
      product.qty = qty
      product.price = price
      product.category = category

      const updatedProduct = await product.save()

      res.send({ message: 'Product updated!', product: updatedProduct })
   } catch (error) {
      return res.status(404).json({ message: 'Product not found!' })
   }
}

export const deleteProduct = async (req, res) => {
   const productId = req.params.id

   try {
      const product = await Product.findById(productId)
      await product.deleteOne()

      res.send({ message: 'Product deleted!' })
   } catch (error) {
      return res.status(404).json({ message: 'Product not found!' })
   }
}
