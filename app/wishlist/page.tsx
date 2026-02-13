"use client"

import { Heart, Trash2, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useWishlist } from "@/lib/wishlist-context"
import { useCart } from "@/lib/cart-context"

export default function WishlistPage() {
  const { items, removeItem, clearWishlist } = useWishlist()
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
            <h1 className="text-3xl md:text-4xl font-bold text-white">Lista de Deseos</h1>
            <p className="text-gray-300 mt-2">{items.length} producto{items.length !== 1 ? "s" : ""}</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {items.length === 0 ? (
            <div className="max-w-md mx-auto text-center py-16">
              <div className="w-20 h-20 mx-auto bg-orange-100 rounded-full flex items-center justify-center mb-6">
                <Heart className="w-10 h-10 text-orange-500" />
              </div>
              <h2 className="text-2xl font-bold mb-3">Tu lista de deseos esta vacia</h2>
              <p className="text-gray-500 mb-6">
                Agrega productos que te gusten para verlos aqui.
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
                  onClick={clearWishlist}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Limpiar lista
                </Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-orange-400 transition-all group"
                  >
                    <div className="relative aspect-square bg-gray-50 overflow-hidden">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <button
                        onClick={() => removeItem(item.id)}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-white transition-colors shadow-sm"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="p-4">
                      {item.category && (
                        <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">
                          {item.category}
                        </span>
                      )}
                      <h3 className="font-semibold text-sm mt-2 mb-2 line-clamp-2">{item.name}</h3>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-lg font-bold">${item.price.toFixed(2)}</span>
                        {item.originalPrice && (
                          <span className="text-sm text-gray-400 line-through">${item.originalPrice.toFixed(2)}</span>
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
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
