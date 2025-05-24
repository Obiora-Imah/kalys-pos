import Link from 'next/link'
import Image from 'next/image'
import React, { ReactNode } from 'react'

type LayoutProps = { children: ReactNode }

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow p-4 flex items-center">
        <Image src="/logo.png" alt="Logo" width={40} height={40} />
        <nav className="ml-4 space-x-4">
          <Link href="/">Inventory</Link>
          <Link href="/orders">Orders</Link>
          <Link href="/cart">Cart</Link>
        </nav>
      </header>
      <main className="flex-1 p-4">{children}</main>
    </div>
  )
}
