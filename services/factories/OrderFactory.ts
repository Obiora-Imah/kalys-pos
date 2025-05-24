import Order, { IOrder } from '../../domain/order'

export function createOrderFactory(data: Partial<IOrder>) {
  const order = new Order(data)
  return order.save()
}
