import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useCartStore } from '../../zustand/cartStore'

export default function InventoryDetailPage() {
  const router = useRouter()
  const { id } = router.query
  const [item, setItem] = useState<any>(null)
  const fetchItem = async () => {
    if (id) {
      const res = await fetch(`/api/inventory/${id}`)
      const data = await res.json()
      setItem(data)
    }
  }
  useEffect(() => {
    (async () => {
      await fetchItem()
    })()
  }, [id])
  const updateInventory = async () => {
    await fetch(`/api/inventory/${id}`, {
      method:'PUT',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(item)
    })
    router.push('/')
  }
  const addToCart = useCartStore(state => state.addItem)

  if (!item) return <p>Loading...</p>
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{item.itemName}</h1>
      <p>SKU: {item.itemSku}</p>
      <p>Quantity: {item.quantity}</p>
      <button onClick={() => addToCart(item)} className="px-4 py-2 bg-blue-500 text-white rounded">Add to Cart</button>
      <form onSubmit={e => { e.preventDefault(); updateInventory(); }} className="space-y-2">
        <h2 className="text-xl">Update Inventory</h2>
        <input type="number" value={item.quantity} onChange={e => setItem({...item, quantity: +e.target.value})} className="border p-2" />
        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">Update</button>
      </form>
    </div>
  )
}
