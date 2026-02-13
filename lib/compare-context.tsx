"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface CompareItem {
  id: number
  name: string
  price: number
  image: string
  store?: string
  category?: string
  originalPrice?: number
}

interface CompareContextType {
  items: CompareItem[]
  addItem: (item: CompareItem) => void
  removeItem: (id: number) => void
  toggleItem: (item: CompareItem) => void
  isInCompare: (id: number) => boolean
  clearCompare: () => void
  itemCount: number
}

const CompareContext = createContext<CompareContextType | undefined>(undefined)

export function CompareProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CompareItem[]>([])

  useEffect(() => {
    const saved = localStorage.getItem("tienda98-compare")
    if (saved) {
      try {
        setItems(JSON.parse(saved))
      } catch (e) {
        console.error("Error loading compare list:", e)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("tienda98-compare", JSON.stringify(items))
  }, [items])

  const addItem = (item: CompareItem) => {
    setItems((prev) => {
      if (prev.find((i) => i.id === item.id)) return prev
      if (prev.length >= 4) return prev
      return [...prev, item]
    })
  }

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const toggleItem = (item: CompareItem) => {
    setItems((prev) => {
      if (prev.find((i) => i.id === item.id)) {
        return prev.filter((i) => i.id !== item.id)
      }
      if (prev.length >= 4) return prev
      return [...prev, item]
    })
  }

  const isInCompare = (id: number) => {
    return items.some((item) => item.id === id)
  }

  const clearCompare = () => {
    setItems([])
  }

  const itemCount = items.length

  return (
    <CompareContext.Provider value={{ items, addItem, removeItem, toggleItem, isInCompare, clearCompare, itemCount }}>
      {children}
    </CompareContext.Provider>
  )
}

export function useCompare() {
  const context = useContext(CompareContext)
  if (!context) {
    throw new Error("useCompare must be used within CompareProvider")
  }
  return context
}
