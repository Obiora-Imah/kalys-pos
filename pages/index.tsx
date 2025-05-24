import React, { useState } from 'react'
import useSWR from 'swr'
import Link from 'next/link'
import { useCartStore } from '../zustand/cartStore'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function InventoryPage() {
  const { data: items } = useSWR('/api/inventory', fetcher)
  const [q, setQ] = useState('')
  const addItem = useCartStore(state => state.addItem)

  if (!items) return <p>Loading...</p>
  const filtered = items.filter((i: any) =>
    i.itemName.toLowerCase().includes(q.toLowerCase()) ||
    i.itemSku.toLowerCase().includes(q.toLowerCase())
  )

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Inventory</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={q}
          onChange={e => setQ(e.target.value)}
          className="border p-2"
        />
        <Link href="/inventory/add" className="ml-2 px-4 py-2 bg-green-500 text-white rounded">Add</Link>
        <Link href="/inventory/bulk" className="ml-2 px-4 py-2 bg-blue-500 text-white rounded">Bulk Upload</Link>
      </div>
      <ul className="space-y-2">
        {filtered.map((item: any) => (
          <li key={item._id} className="flex justify-between p-2 border rounded">
            <Link href={`/inventory/${item._id}`} className="flex-1">{item.itemName} ({item.quantity})</Link>
            <button onClick={() => addItem(item)} className="px-2 py-1 bg-yellow-500 text-white rounded">Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
