import React, { useState } from 'react'
import { useRouter } from 'next/router'

export default function BulkUploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const router = useRouter()
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (!file) return
    const text = await file.text()
    await fetch('/api/inventory', {
      method:'POST',
      headers:{'Content-Type':'text/csv'},
      body:text
    })
    router.push('/')
  }
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h1 className="text-2xl font-bold">Bulk Upload</h1>
      <input type="file" accept=".csv" onChange={e=>setFile(e.target.files?.[0]||null)} />
      <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">Upload CSV</button>
    </form>
  )
}
