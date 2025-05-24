import mongoose, { Document, Schema } from 'mongoose'

export interface IInventory extends Document {
  itemName: string
  itemSku: string
  quantity: number
  description: string
  unit: string
  originalCost: number
  marginalCost: number
  fullPrice: number
  discountPrice: number
}

const InventorySchema = new Schema<IInventory>({
  itemName: { type: String, required: true },
  itemSku: { type: String, required: true, unique: true },
  quantity: { type: Number, required: true },
  description: String,
  unit: String,
  originalCost: Number,
  marginalCost: Number,
  fullPrice: Number,
  discountPrice: Number
})

export default mongoose.models.Inventory || mongoose.model<IInventory>('Inventory', InventorySchema)
