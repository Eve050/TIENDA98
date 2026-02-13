"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ShoppingCart, Heart, Shuffle, Filter } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useCart } from "@/lib/cart-context"
import { useWishlist } from "@/lib/wishlist-context"
import { useCompare } from "@/lib/compare-context"

const offerProducts = [
  {
    id: 1,
    name: "PlayStation 5 Digital Edition",
    category: "Tecnología",
    price: 789.99,
    originalPrice: 850.0,
    image: "/playstation-5-console.png",
    badge: "-7%",
    discount: 7,
  },
  {
    id: 2,
    name: "Sony WH-CH520 Auriculares",
    category: "Tecnología",
    price: 72.0,
    originalPrice: 85.0,
    image: "/wireless-headphones.png",
    badge: "-15%",
    discount: 15,
  },
  {
    id: 4,
    name: "Amazon Fire HD 10 Kids",
    category: "Tecnología",
    price: 182.0,
    originalPrice: 199.0,
    image: "/tablet-kids.jpg",
    badge: "-9%",
    discount: 9,
  },
  {
    id: 5,
    name: "Samsung Galaxy Buds Pro",
    category: "Tecnología",
    price: 149.99,
    originalPrice: 179.0,
    image: "/samsung-earbuds.jpg",
    badge: "-16%",
    discount: 16,
  },
  {
    id: 7,
    name: "Apple iPad Air 5ta Gen",
    category: "Tecnología",
    price: 599.0,
    originalPrice: 649.0,
    image: "/ipad-air.png",
    badge: "-8%",
    discount: 8,
  },
  {
    id: 8,
    name: "Logitech MX Master 3S",
    category: "Tecnología",
    price: 99.99,
    originalPrice: 119.0,
    image: "/wireless-computer-mouse.png",
    badge: "-16%",
    discount: 16,
  },
  {
    id: 9,
    name: "Zapatillas Nike Air Max",
    category: "Moda",
    price: 89.99,
    originalPrice: 120.0,
    image: "/nike-sneakers.jpg",
    badge: "-25%",
    discount: 25,
  },
  {
    id: 10,
    name: 'Smart TV Samsung 55"',
    category: "Tecnología",
    price: 549.0,
    originalPrice: 699.0,
    image: "/modern-smart-tv.jpg",
    badge: "-21%",
    discount: 21,
  },
]

export default function OfertasPage() {
  const [addedIds, setAddedIds] = useState<number[]>([])
  const { addItem } = useCart()
  const { toggleItem, isInWishlist } = useWishlist()
  const { toggleItem: toggleCompare, isInCompare } = useCompare()

  const handleAddToCart = (product: (typeof offerProducts)[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      store: "Tienda98",
    })
    setAddedIds((prev) => [...prev, product.id])
    setTimeout(() => setAddedIds((prev) => prev.filter((id) => id !== product.id)), 2000)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-r from-amber-500 via-orange-400 to-amber-500 text-white">
        <div className="container mx-auto px-6 md:px-12 py-12 md:py-16">
          <div className="max-w-3xl">
            <p className="text-sm md:text-base font-semibold uppercase tracking-widest mb-4">
              Solo por tiempo limitado
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-6">⚡ Ofertas Flash</h1>
            <p className="text-lg md:text-xl text-white/90">
              Aprovecha descuentos de hasta 70% en productos seleccionados. ¡No te lo pierdas!
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Productos en oferta</h2>
            <p className="text-muted-foreground mt-2">{offerProducts.length} productos con descuento</p>
          </div>
          <Button variant="outline" className="gap-2 bg-transparent">
            <Filter className="w-4 h-4" />
            Filtros
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {offerProducts.map((product) => (
            <Card
              key={product.id}
              className="group overflow-hidden border-2 hover:border-orange-500 transition-all duration-300 hover:shadow-xl"
            >
              <CardContent className="p-0">
                <Link href={`/producto/${product.id}`}>
                  <div className="relative aspect-square bg-muted overflow-hidden">
                    <div className="absolute top-4 left-4 bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-sm font-bold z-10">
                      {product.badge}
                    </div>
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  </div>
                </Link>
                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">{product.category}</p>
                    <h3 className="font-semibold text-lg leading-tight line-clamp-2">{product.name}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-orange-600">${product.price.toFixed(2)}</span>
                    <span className="text-sm text-muted-foreground line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-sm text-green-600 font-semibold">
                    ¡Ahorras ${(product.originalPrice - product.price).toFixed(2)}!
                  </p>
                  <div className="flex gap-2">
                    <Button
                      className="flex-1 rounded-full font-semibold hover:scale-105 transition-transform bg-zinc-700 hover:bg-zinc-800 text-white"
                      onClick={() => handleAddToCart(product)}
                      disabled={addedIds.includes(product.id)}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      {addedIds.includes(product.id) ? "Agregado" : "Agregar"}
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      className={`rounded-full hover:scale-105 transition-transform border-2 ${isInWishlist(product.id) ? "bg-orange-500 border-orange-500 text-white hover:bg-orange-600" : "bg-transparent hover:border-orange-500"}`}
                      onClick={() =>
                        toggleItem({
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          image: product.image,
                          category: product.category,
                          originalPrice: product.originalPrice,
                        })
                      }
                    >
                      <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? "fill-current" : ""}`} />
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      className={`rounded-full hover:scale-105 transition-transform border-2 ${isInCompare(product.id) ? "bg-orange-500 border-orange-500 text-white hover:bg-orange-600" : "bg-transparent hover:border-orange-500"}`}
                      onClick={() =>
                        toggleCompare({
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          image: product.image,
                          category: product.category,
                          originalPrice: product.originalPrice,
                        })
                      }
                    >
                      <Shuffle className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
