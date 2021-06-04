import mongoose from 'mongoose'
const { ObjectId } = mongoose.Schema.Types

const orderSchema = mongoose.Schema(
   {
      items: [{ type: ObjectId, ref: 'ListOrder' }],
      author: {
         type: ObjectId,
         ref: 'User',
         required: true,
      },
      status: {
         type: String,
         required: true,
         default: 'pending',
         enum: ['pending', 'process', 'delivered', 'completed'],
      },
      totalPrice: {
         type: Number,
         default: 0,
      },
      cash: {
         type: Number,
      },
      charge: {
         type: Number,
      },
   },
   { timestamps: true }
)

const Order = mongoose.model('Order', orderSchema)

export default Order

/**
 * id: 2,
      items: [
         {
            product: products[1],
            qty: 1,
            note: 'Level 10',
         },
         {
            product: products[2],
            qty: 2,
            note: 'Tidak ada catatan',
         },
         {
            product: products[3],
            qty: 1,
            note: 'Tidak ada catatan',
         },
         {
            product: products[4],
            qty: 1,
            note: 'Tidak ada catatan',
         },
      ],
      author: { name: 'Ramadhani', role: 'Super Admin' },
      status: 'completed',
      totalPrice:
         products[1].price * 1 +
         products[2].price * 2 +
         products[3].price * 1 +
         products[4].price * 1,
      date: `${date}`,
      cash: 80000,
      charge: 9000,
 */
