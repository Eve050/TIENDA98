"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { searchProducts } from "@/lib/product-catalog"
import { useSearchParams } from "next/navigation"
import { Search, Star, Heart, Shuffle, ShoppingCart, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/lib/cart-context"
import { useWishlist } from "@/lib/wishlist-context"
import { useCompare } from "@/lib/compare-context"
import { useState, Suspense } from "react"

function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const results = searchProducts(query)
  const { addItem } = useCart()
  const { toggleItem, isInWishlist } = useWishlist()
  const { toggleItem: toggleCompare, isInCompare } = useCompare()
  const [addedIds, setAddedIds] = useState<number[]>([])

  const handleAddToCart = (product: (typeof results)[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      store: product.store,
    })
    setAddedIds((prev) => [...prev, product.id])
    setTimeout(() => setAddedIds((prev) => prev.filter((id) => id !== product.id)), 2000)
  }

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b border-gray-100 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-12 py-3">
          <nav className="flex items-center gap-1.5 text-sm text-gray-500">
            <Link href="/" className="hover:text-orange-500 transition-colors">Inicio</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-foreground font-medium">Buscar</span>
          </nav>
        </div>
      </div>

      {/* Results Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 md:px-6 lg:px-12 py-6">
          {query ? (
            <>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                Resultados para <span className="text-orange-500">{`"${query}"`}</span>
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {results.length} producto{results.length !== 1 ? "s" : ""} encontrado{results.length !== 1 ? "s" : ""}
              </p>
            </>
          ) : (
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Buscar productos</h1>
          )}
        </div>
      </div>

      {/* Results Grid */}
      <div className="container mx-auto px-4 md:px-6 lg:px-12 py-8">
        {results.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5">
            {results.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-orange-200 transition-all"
              >
                <div className="relative aspect-square overflow-hidden bg-gray-50">
                  <Link href={`/producto/${product.id}`}>
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>
                  {product.badge && (
                    <span className="absolute top-2.5 left-2.5 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {product.badge}
                    </span>
                  )}
                  <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-all">
                    <button
                      onClick={() =>
                        toggleItem({
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          image: product.image,
                          category: product.category,
                        })
                      }
                      className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-colors ${
                        isInWishlist(product.id) ? "bg-orange-500 text-white" : "bg-white/90 text-gray-500 hover:bg-orange-500 hover:text-white"
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${isInWishlist(product.id) ? "fill-current" : ""}`} />
                    </button>
                    <button
                      onClick={() =>
                        toggleCompare({
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          image: product.image,
                          category: product.category,
                        })
                      }
                      className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-colors ${
                        isInCompare(product.id) ? "bg-orange-500 text-white" : "bg-white/90 text-gray-500 hover:bg-orange-500 hover:text-white"
                      }`}
                    >
                      <Shuffle className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="p-3 md:p-4">
                  <span className="text-[10px] font-bold text-orange-600 uppercase tracking-wider">{product.category}</span>
                  <Link href={`/producto/${product.id}`}>
                    <h3 className="text-sm font-semibold text-foreground line-clamp-2 mt-1 mb-1.5 group-hover:text-orange-500 transition-colors leading-snug min-h-[2.5rem]">
                      {product.name}
                    </h3>
                  </Link>
                  <div className="flex items-center gap-1 mb-2">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}`}
                      />
                    ))}
                    <span className="text-[10px] text-gray-400 ml-1">({product.reviews})</span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg font-bold text-foreground">${product.price.toFixed(2)}</span>
                    {product.originalPrice && (
                      <span className="text-xs text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
                    )}
                  </div>
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={addedIds.includes(product.id)}
                    className={`w-full py-2 rounded-lg text-xs font-bold transition-all ${
                      addedIds.includes(product.id)
                        ? "bg-green-500 text-white"
                        : "bg-orange-500 hover:bg-orange-600 text-white"
                    }`}
                  >
                    <ShoppingCart className="w-3.5 h-3.5 inline mr-1.5" />
                    {addedIds.includes(product.id) ? "Agregado" : "Agregar al carrito"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : query ? (
          <div className="text-center py-20">
            <Search className="w-16 h-16 mx-auto text-gray-200 mb-4" />
            <h2 className="text-xl font-bold text-foreground mb-2">No encontramos resultados</h2>
            <p className="text-gray-500 max-w-md mx-auto mb-6">
              No hay productos que coincidan con <span className="font-semibold">{`"${query}"`}</span>. Intenta con otros terminos.
            </p>
            <Link
              href="/productos"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              Ver todos los productos
            </Link>
          </div>
        ) : (
          <div className="text-center py-20">
            <Search className="w-16 h-16 mx-auto text-gray-200 mb-4" />
            <h2 className="text-xl font-bold text-foreground mb-2">Busca productos</h2>
            <p className="text-gray-500">Escribe un termino de busqueda para encontrar productos.</p>
          </div>
        )}
      </div>
    </>
  )
}

export default function BuscarPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1">
        <Suspense fallback={null}>
          <SearchResults />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
