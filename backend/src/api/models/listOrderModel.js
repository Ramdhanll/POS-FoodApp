import mongoose from 'mongoose'
const { ObjectId } = mongoose.Schema.Types
const listOrderSchema = mongoose.Schema(
   {
      lists: [
         {
            product: {
               type: ObjectId,
               ref: 'Product',
            },
            qty: {
               type: Number,
               default: 1,
            },
            note: {
               type: String,
               default: 'Tidak ada catatan',
            },
         },
      ],
      status: {
         type: String,
         default: 'cooking',
         enum: ['cooking', 'delivered'],
      },
   },
   { timestamps: true }
)

const ListOrder = mongoose.model('ListOrder', listOrderSchema)

export default ListOrder
