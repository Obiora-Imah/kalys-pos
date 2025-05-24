import Inventory, { IInventory } from '../../domain/inventory'

export function createInventoryFactory(data: Partial<IInventory>) {
  const inv = new Inventory(data)
  return inv.save()
}
