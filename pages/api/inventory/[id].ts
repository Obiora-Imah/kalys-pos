import type { NextApiRequest, NextApiResponse } from 'next'
import connect from '../connect'
import Inventory from '../../../domain/inventory'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connect()
  const { id } = req.query
  if (req.method === 'GET') {
    const item = await Inventory.findById(id)
    return item ? res.json(item) : res.status(404).end()
  }
  if (req.method === 'PUT') {
    const updated = await Inventory.findByIdAndUpdate(id, req.body, { new: true })
    return updated ? res.json(updated) : res.status(404).end()
  }
  res.setHeader('Allow', ['GET','PUT'])
  res.status(405).end()
}
