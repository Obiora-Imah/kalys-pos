import { createRouter } from 'next-connect'
import type { NextApiRequest, NextApiResponse } from 'next'
import connect from '../connect'
import Order from '../../../domain/order'

const handler = createRouter<NextApiRequest, NextApiResponse>()

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  await connect()
  const { dateFrom, dateTo, format } = req.query as any
  const filter: any = {}
  if (dateFrom || dateTo) {
    filter.date = {}
    if (dateFrom) filter.date.$gte = new Date(dateFrom)
    if (dateTo) filter.date.$lte = new Date(dateTo)
  }
  const orders = await Order.find(filter)
  if (format === 'csv') {
    const header = Object.keys(orders[0].toObject()).join(',') + '\n'
    const rows = orders.map(o => Object.values(o.toObject()).join(',')).join('\n')
    res.setHeader('Content-Type', 'text/csv')
    res.send(header + rows)
  } else {
    res.json(orders)
  }
})

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  await connect()
  const { orderItems, subtotal, tax, total } = req.body
  const orderNumber = Math.random().toString().slice(2,16)
  const order = new Order({ orderItems, subtotal, tax, total, orderNumber })
  await order.save()
  res.status(201).json(order)
})

export default handler.handler();
