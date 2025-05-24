import mongoose, { Document, Schema } from 'mongoose'

interface OrderItem {
  itemName: string
  itemSku: string
  quantity: number
  pricePaid: number
}

export interface IOrder extends Document {
  orderItems: OrderItem[]
  date: Date
  orderNumber: string
  subtotal: number
  tax: number
  total: number
}

const OrderItemSchema = new Schema<OrderItem>({ itemName: String, itemSku: String, quantity: Number, pricePaid: Number }, { _id: false })

const OrderSchema = new Schema<IOrder>({
  orderItems: [OrderItemSchema],
  date: { type: Date, default: () => new Date() },
  orderNumber: { type: String, unique: true },
  subtotal: Number,
  tax: Number,
  total: Number
})

export default mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema)
