import React from 'react'
import { useCartStore } from '../zustand/cartStore'
import { useRouter } from 'next/router'

export default function CartPage() {
  const items = useCartStore(state => state.items)
  const clear = useCartStore(state => state.clear)
  const total = useCartStore(state => state.total)
  const router = useRouter()

  const handleCheckout = async () => {
    const subtotal = total()
    const tax = Math.round(subtotal * 0.075)
    const totalAmount = subtotal + tax
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderItems: items, subtotal, tax, total: totalAmount })
    })
    const order = await res.json()
    clear()
    router.push(`/orders/${order.orderNumber}`)
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Cart</h1>
      {items.length === 0 ? <p>Your cart is empty</p> : (
        <>
          <ul className="space-y-2">
            {items.map((item, i) => (
              <li key={i} className="flex justify-between">
                {item.itemName} x {item.quantity}
              </li>
            ))}
          </ul>
          <p>Total: ${total()}</p>
          <button onClick={handleCheckout} className="px-4 py-2 bg-green-600 text-white rounded">Confirm Payment</button>
        </>
      )}
    </div>
  )
}
