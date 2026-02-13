"use client"

import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { ShoppingCart } from "lucide-react"
import { useState } from "react"

interface Product {
  id: number
  name: string
  price: number
  image: string
  store?: string
}

export function AddToCartButton({
  product,
  className,
}: {
  product: Product
  className?: string
}) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  const handleAddToCart = () => {
    addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <Button
      size="sm"
      className={`rounded-full bg-[#2D3142] hover:bg-[#2D3142]/90 text-white text-xs md:text-sm ${className || ""}`}
      onClick={handleAddToCart}
      disabled={added}
    >
      <ShoppingCart className="w-3 h-3 md:w-4 md:h-4 mr-1" />
      {added ? "Agregado" : "Agregar"}
    </Button>
  )
}

export default AddToCartButton
