// File: zustand/cartStore.ts
import {create} from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  _id: string
  itemName: string
  itemSku: string
  fullPrice: number
  quantity: number
}

interface CartState {
  items: CartItem[]
  addItem(item: Omit<CartItem,'quantity'>): void
  removeItem(id: string): void
  clear(): void
  total(): number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item: any) => {
        set((state: any) => {
          const exists = state.items.find((i: any) => i._id === item._id)
          if (exists) {
            return {
              items: state.items.map((i: any) =>
                i._id === item._id
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              )
            }
          }
          return {
            items: [...state.items, { ...item, quantity: 1 }]
          }
        })
      },

      removeItem: (id: any) =>
        set((state: any) => ({
          items: state.items.filter((i: any) => i._id !== id)
        })),

      clear: () =>
        set({ items: [] }),

      total: () =>
        (get() as any).items.reduce((sum: any, i: any) => sum + i.fullPrice * i.quantity, 0),
    }),
    {
      name: 'cart-storage', // key in localStorage
    }
  )
)
