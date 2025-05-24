import { createRouter } from 'next-connect'
import type { NextApiRequest, NextApiResponse } from 'next'
import connect from '../connect'
import Inventory from '../../../domain/inventory'
import { parse } from 'csv-parse/sync'

const handler = createRouter<NextApiRequest, NextApiResponse>()

handler.get(async (_, res: NextApiResponse) => {
  await connect()
  const items = await Inventory.find()
  res.json(items)
})

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  await connect()
  const ct = req.headers['content-type'] || ''
  if (ct.includes('text/csv')) {
    let body = ''
    for await (const chunk of req) body += chunk
    const records = parse(body, { columns: true, skip_empty_lines: true })
    const created = []
    for (const rec of records) {
      const inv = new Inventory(rec)
      created.push(await inv.save())
    }
    return res.status(201).json(created)
  } else {
    const inv = new Inventory(req.body)
    await inv.save()
    res.status(201).json(inv)
  }
})

export default handler.handler();
