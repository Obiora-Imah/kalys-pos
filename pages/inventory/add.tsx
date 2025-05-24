import React, { useState } from 'react'
import { useRouter } from 'next/router'

export default function AddInventoryPage() {
  const [form, setForm] = useState({
    itemName:'', itemSku:'', quantity:0, description:'', unit:'', originalCost:0, marginalCost:0, fullPrice:0, discountPrice:0
  })
  const router = useRouter()
  const handleChange = (e: any) => setForm({...form,[e.target.name]: e.target.value})
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    await fetch('/api/inventory', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(form)
    })
    router.push('/')
  }
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h1 className="text-2xl font-bold">Add Inventory</h1>
      <div className="grid grid-cols-2 gap-4">
        {['itemName','itemSku','description','unit'].map((k) => (
          <div key={k}>
            <label className="block">{k}</label>
            <input name={k} value={(form as any)[k]} onChange={handleChange} className="border p-2 w-full"/>
          </div>
        ))}
        {['quantity','originalCost','marginalCost','fullPrice','discountPrice'].map((k) => (
          <div key={k}>
            <label className="block">{k}</label>
            <input type="number" name={k} value={(form as any)[k]} onChange={handleChange} className="border p-2 w-full"/>
          </div>
        ))}
      </div>
      <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">Add</button>
    </form>
  )
}
