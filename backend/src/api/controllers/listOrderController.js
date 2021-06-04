import ListOrder from '../models/listOrderModel.js'

// change status listOrder
export const changeStatusListOrder = async (req, res) => {
   const listOrderId = req.params.id

   try {
      const listOrder = await ListOrder.findById(listOrderId)

      listOrder.status = 'delivered'
      const updatedListOrder = await listOrder.save()

      res.status(200).json({
         message: 'List order has been updated!',
         listOrder: updatedListOrder,
      })
   } catch (error) {
      return res.status(404).json({ message: 'List order not found!' })
   }
}
