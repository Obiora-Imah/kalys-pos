import React, { useState } from 'react'
import useSWR from 'swr'
import Link from 'next/link'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function OrdersPage() {
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const { data: orders, mutate } = useSWR(
    `/api/orders?dateFrom=${dateFrom}&dateTo=${dateTo}`,
    fetcher
  )

  const handleFilter = () => mutate()
  const handleExport = () => {
    window.location.href = `/api/orders?format=csv&dateFrom=${dateFrom}&dateTo=${dateTo}`
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Orders</h1>
      <div className="space-x-2">
        <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} className="border p-2"/>
        <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} className="border p-2"/>
        <button onClick={handleFilter} className="px-4 py-2 bg-blue-500 text-white rounded">Filter</button>
        <button onClick={handleExport} className="px-4 py-2 bg-gray-500 text-white rounded">Export CSV</button>
      </div>
      {!orders ? <p>Loading...</p> : (
        <table className="min-w-full">
          <thead>
            <tr>
              <th>Order #</th><th>Date</th><th>Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o:any,i:number) => (
              <tr key={i}>
                <td><Link href={`/orders/${o.orderNumber}`}>{o.orderNumber}</Link></td>
                <td>{new Date(o.date).toLocaleString()}</td>
                <td>${o.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
