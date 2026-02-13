"use client"

import { Heart, Shuffle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useWishlist } from "@/lib/wishlist-context"
import { useCompare } from "@/lib/compare-context"

interface Product {
  id: number
  name: string
  price: number
  image: string
  category?: string
  store?: string
  originalPrice?: number
}

export function ProductActions({ product }: { product: Product }) {
  const { toggleItem, isInWishlist } = useWishlist()
  const { toggleItem: toggleCompare, isInCompare } = useCompare()

  return (
    <div className="absolute top-2 left-2 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-10">
      <button
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          toggleItem({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category,
            store: product.store,
          })
        }}
        className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-colors ${
          isInWishlist(product.id)
            ? "bg-orange-500 text-white"
            : "bg-white text-gray-500 hover:bg-orange-500 hover:text-white"
        }`}
      >
        <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? "fill-current" : ""}`} />
      </button>
      <button
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          toggleCompare({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category,
            store: product.store,
          })
        }}
        className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-colors ${
          isInCompare(product.id)
            ? "bg-orange-500 text-white"
            : "bg-white text-gray-500 hover:bg-orange-500 hover:text-white"
        }`}
      >
        <Shuffle className="w-4 h-4" />
      </button>
    </div>
  )
}
