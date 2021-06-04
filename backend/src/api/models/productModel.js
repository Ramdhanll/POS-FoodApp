import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: true,
      },
      description: {
         type: String,
      },
      photo: {
         type: String,
         required: true,
      },
      weight: {
         type: String,
         required: true,
      },
      category: {
         type: Array,
      },
      qty: {
         type: Number,
         default: 0,
      },
      price: {
         type: Number,
         required: true,
      },
   },
   {
      timestamps: true,
   }
)

const Product = mongoose.model('Product', productSchema)

export default Product
