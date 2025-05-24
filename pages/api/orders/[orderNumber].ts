import type { NextApiRequest, NextApiResponse } from 'next'
import connect from '../connect'
import Order from '../../../domain/order'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connect()
  const { orderNumber } = req.query
  const order = await Order.findOne({ orderNumber })
  return order ? res.json(order) : res.status(404).end()
}
