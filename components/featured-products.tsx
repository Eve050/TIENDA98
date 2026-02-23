"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ShoppingCart, Heart, Shuffle, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useCart } from "@/lib/cart-context"
import { useWishlist } from "@/lib/wishlist-context"
import { useCompare } from "@/lib/compare-context"
import { productCatalog } from "@/lib/product-catalog"

const products = productCatalog.slice(0, 8)

export default function FeaturedProducts() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [addedIds, setAddedIds] = useState<number[]>([])
  const { addItem } = useCart()
  const { toggleItem, isInWishlist } = useWishlist()
  const { toggleItem: toggleCompare, isInCompare } = useCompare()
  const itemsPerPage = 4

  const handleAddToCart = (product: (typeof products)[0]) => {
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + itemsPerPage) % products.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + itemsPerPage) % products.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - itemsPerPage + products.length) % products.length)
  }

  const currentProducts = products.slice(currentIndex, currentIndex + itemsPerPage)

  return (
    <section className="relative">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20">
        <div className="space-y-10 md:space-y-14">
          <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end gap-6 text-center sm:text-left">
            <div className="space-y-3 md:space-y-4">
              <p className="text-xs md:text-sm font-bold text-primary uppercase tracking-[0.2em]">
                Lo más vendido
              </p>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
                Productos destacados
              </h2>
            </div>
            <Link href="/productos" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="w-full sm:w-auto rounded-full px-8 py-6 text-base font-bold hover:scale-105 transition-all bg-transparent border-2 hover:border-primary hover:text-primary shadow-sm hover:shadow-md"
              >
                Ver todos
              </Button>
            </Link>
          </div>

          <div className="relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {currentProducts.map((product) => (
                <Card
                  key={product.id}
                  className="group overflow-hidden border-2 hover:border-orange-500 transition-all duration-300 hover:shadow-xl rounded-xl md:rounded-2xl"
                >
                  <CardContent className="p-0">
                    <Link href={`/producto/${product.id}`}>
                      <div className="relative aspect-square bg-muted overflow-hidden">
                        {product.badge && (
                          <div className="absolute top-3 md:top-4 left-3 md:left-4 bg-destructive text-destructive-foreground px-2 md:px-3 py-0.5 md:py-1 rounded-full text-xs md:text-sm font-bold z-10">
                            {product.badge}
                          </div>
                        )}
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                      </div>
                    </Link>
                    <div className="p-4 md:p-6 space-y-3 md:space-y-4">
                      <div className="space-y-1 md:space-y-2">
                        <p className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider">
                          {product.category}
                        </p>
                        <h3 className="font-semibold text-sm md:text-lg leading-tight line-clamp-2">{product.name}</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg md:text-xl font-bold">${product.price.toFixed(2)}</span>
                        {product.originalPrice && (
                          <span className="text-xs md:text-sm text-muted-foreground line-through">
                            ${product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          className="flex-1 rounded-full text-xs md:text-sm font-semibold hover:scale-105 transition-transform bg-[#2D3142] hover:bg-[#2D3142]/90 text-white h-9 md:h-10"
                          onClick={() => handleAddToCart(product)}
                          disabled={addedIds.includes(product.id)}
                        >
                          <ShoppingCart className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                          {addedIds.includes(product.id) ? "Agregado" : "Agregar"}
                        </Button>
                        <Button
                          size="icon"
                          variant="outline"
                          className={`rounded-full hover:scale-105 transition-transform border-2 h-9 w-9 md:h-10 md:w-10 ${isInWishlist(product.id) ? "bg-orange-500 border-orange-500 text-white hover:bg-orange-600" : "bg-transparent hover:border-orange-500"}`}
                          onClick={() =>
                            toggleItem({
                              id: product.id,
                              name: product.name,
                              price: product.price,
                              image: product.image,
                              category: product.category,
                            })
                          }
                        >
                          <Heart className={`w-3 h-3 md:w-4 md:h-4 ${isInWishlist(product.id) ? "fill-current" : ""}`} />
                        </Button>
                        <Button
                          size="icon"
                          variant="outline"
                          className={`rounded-full hover:scale-105 transition-transform border-2 h-9 w-9 md:h-10 md:w-10 ${isInCompare(product.id) ? "bg-orange-500 border-orange-500 text-white hover:bg-orange-600" : "bg-transparent hover:border-orange-500"}`}
                          onClick={() =>
                            toggleCompare({
                              id: product.id,
                              name: product.name,
                              price: product.price,
                              image: product.image,
                              category: product.category,
                              features: product.features,
                              specs: product.specs,
                            })
                          }
                        >
                          <Shuffle className="w-3 h-3 md:w-4 md:h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-center gap-1.5 md:gap-2 mt-4 md:mt-6">
              {Array.from({ length: Math.ceil(products.length / itemsPerPage) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index * itemsPerPage)}
                  className={`h-1.5 md:h-2 rounded-full transition-all ${Math.floor(currentIndex / itemsPerPage) === index
                    ? "w-6 md:w-8 bg-orange-500"
                    : "w-1.5 md:w-2 bg-gray-300"
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="hidden lg:flex absolute top-1/2 -translate-y-1/2 left-2 xl:left-4 items-center justify-center bg-background hover:bg-muted rounded-full p-3 shadow-lg border-2 transition-all hover:scale-110 z-10"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
      </button>
      <button
        onClick={nextSlide}
        className="hidden lg:flex absolute top-1/2 -translate-y-1/2 right-2 xl:right-4 items-center justify-center bg-background hover:bg-muted rounded-full p-3 shadow-lg border-2 transition-all hover:scale-110 z-10"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
      </button>
    </section>
  )
}
