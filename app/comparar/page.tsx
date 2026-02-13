"use client"

import { Shuffle, Trash2, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useCompare } from "@/lib/compare-context"
import { useCart } from "@/lib/cart-context"

export default function CompararPage() {
  const { items, removeItem, clearCompare } = useCompare()
  const { addItem } = useCart()

  const handleAddToCart = (item: (typeof items)[0]) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      store: item.store || "Tienda98",
    })
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="bg-[#2D3142]">
          <div className="container mx-auto px-4 py-10">
            <h1 className="text-3xl md:text-4xl font-bold text-white">Comparar Productos</h1>
            <p className="text-gray-300 mt-2">{items.length} de 4 productos (maximo 4)</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {items.length === 0 ? (
            <div className="max-w-md mx-auto text-center py-16">
              <div className="w-20 h-20 mx-auto bg-orange-100 rounded-full flex items-center justify-center mb-6">
                <Shuffle className="w-10 h-10 text-orange-500" />
              </div>
              <h2 className="text-2xl font-bold mb-3">La lista de comparacion esta vacia</h2>
              <p className="text-gray-500 mb-6">
                Agrega productos para compararlos lado a lado.
              </p>
              <Link href="/productos">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3">
                  Ver productos
                </Button>
              </Link>
            </div>
          ) : (
            <>
              <div className="flex justify-end mb-6">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600 bg-transparent"
                  onClick={clearCompare}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Limpiar lista
                </Button>
              </div>

              {/* Comparison table */}
              <div className="overflow-x-auto">
                <div className="inline-flex gap-5 min-w-full pb-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="w-64 flex-shrink-0 bg-white rounded-xl border border-gray-200 overflow-hidden"
                    >
                      <div className="relative aspect-square bg-gray-50 overflow-hidden">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={() => removeItem(item.id)}
                          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-white transition-colors shadow-sm"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="p-4 space-y-3">
                        <h3 className="font-semibold text-sm line-clamp-2">{item.name}</h3>
                        {item.category && (
                          <span className="inline-block text-xs font-semibold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">
                            {item.category}
                          </span>
                        )}
                        <div className="pt-2 border-t border-gray-100 space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Precio</span>
                            <span className="font-bold">${item.price.toFixed(2)}</span>
                          </div>
                          {item.originalPrice && (
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-500">Original</span>
                              <span className="text-gray-400 line-through">${item.originalPrice.toFixed(2)}</span>
                            </div>
                          )}
                          {item.originalPrice && (
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-500">Ahorro</span>
                              <span className="font-semibold text-green-600">
                                ${(item.originalPrice - item.price).toFixed(2)}
                              </span>
                            </div>
                          )}
                        </div>
                        <Button
                          className="w-full rounded-lg bg-[#2D3142] hover:bg-[#3D4152] text-white text-sm h-9"
                          onClick={() => handleAddToCart(item)}
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Agregar al carrito
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
