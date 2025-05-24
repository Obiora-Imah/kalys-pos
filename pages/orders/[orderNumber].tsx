import React from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function OrderDetailPage() {
  const router = useRouter()
  const { orderNumber } = router.query
  const { data: order } = useSWR(orderNumber ? `/api/orders/${orderNumber}` : null, fetcher)

  if (!order) return <p>Loading...</p>
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Order {order.orderNumber}</h1>
      <ul className="space-y-2">
        {order.orderItems.map((item:any,i:number)=>(
          <li key={i}>{item.itemName} x {item.quantity} - ${item.pricePaid}</li>
        ))}
      </ul>
      <p>Subtotal: ${order.subtotal}</p>
      <p>Tax: ${order.tax}</p>
      <p>Total: ${order.total}</p>
      <button onClick={() => window.print()} className="px-4 py-2 bg-green-500 text-white rounded">Print</button>
    </div>
  )
}
