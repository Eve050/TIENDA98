"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Heart, ShoppingCart, Shuffle, Search, SlidersHorizontal, X, Star, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/lib/cart-context"
import { useWishlist } from "@/lib/wishlist-context"
import { useCompare } from "@/lib/compare-context"

export interface CategoryProduct {
  id: number
  name: string
  price: number
  image: string
  rating: number
  reviews: number
  category: string
  size?: string
  originalPrice?: number
}

interface CategoryPageLayoutProps {
  title: string
  description: string
  heroImage: string
  subcategories: string[]
  products: CategoryProduct[]
  sizes?: string[]
  ageRanges?: string[]
  accentColor?: string
}

export default function CategoryPageLayout({
  title,
  description,
  heroImage,
  subcategories,
  products,
  sizes,
}: CategoryPageLayoutProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedPrices, setSelectedPrices] = useState<string[]>([])
  const [selectedRatings, setSelectedRatings] = useState<number[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("relevant")
  const [searchQuery, setSearchQuery] = useState("")
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [addedIds, setAddedIds] = useState<number[]>([])

  const { addItem } = useCart()
  const { toggleItem, isInWishlist } = useWishlist()
  const { toggleItem: toggleCompare, isInCompare } = useCompare()

  const priceRanges = [
    { label: "Menos de $50", min: 0, max: 50 },
    { label: "$50 - $100", min: 50, max: 100 },
    { label: "$100 - $200", min: 100, max: 200 },
    { label: "Mas de $200", min: 200, max: Infinity },
  ]

  const handleAddToCart = (product: CategoryProduct) => {
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

  // Filter products
  const filteredProducts = products.filter((p) => {
    if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
    if (selectedCategories.length > 0 && !selectedCategories.includes(p.category)) return false
    if (selectedPrices.length > 0) {
      const match = selectedPrices.some((label) => {
        const range = priceRanges.find((r) => r.label === label)
        return range && p.price >= range.min && p.price < range.max
      })
      if (!match) return false
    }
    if (selectedRatings.length > 0) {
      if (!selectedRatings.some((r) => p.rating >= r)) return false
    }
    if (selectedSizes.length > 0 && p.size && !selectedSizes.includes(p.size)) return false
    return true
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-asc": return a.price - b.price
      case "price-desc": return b.price - a.price
      case "rating": return b.rating - a.rating
      case "popular": return b.reviews - a.reviews
      default: return 0
    }
  })

  const hasFilters = selectedCategories.length > 0 || selectedPrices.length > 0 || selectedRatings.length > 0 || selectedSizes.length > 0

  const clearAll = () => {
    setSelectedCategories([])
    setSelectedPrices([])
    setSelectedRatings([])
    setSelectedSizes([])
  }

  const toggleFilter = <T,>(arr: T[], item: T, setter: (v: T[]) => void) => {
    setter(arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item])
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            className={`w-3.5 h-3.5 ${
              i < Math.floor(rating) ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"
            }`}
          />
        ))}
      </div>
    )
  }

  // Sidebar content (reused for desktop and mobile)
  const filterContent = (
    <div className="space-y-6">
      {/* Subcategories */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Categorias</h4>
        <div className="space-y-1 max-h-48 overflow-y-auto">
          {subcategories.map((sub) => (
            <button
              key={sub}
              onClick={() => toggleFilter(selectedCategories, sub, setSelectedCategories)}
              className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${
                selectedCategories.includes(sub)
                  ? "bg-orange-500 text-white font-medium"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      </div>

      {/* Sizes */}
      {sizes && sizes.length > 0 && (
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Tallas</h4>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => toggleFilter(selectedSizes, size, setSelectedSizes)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                  selectedSizes.includes(size)
                    ? "bg-orange-500 border-orange-500 text-white font-medium"
                    : "border-gray-200 text-gray-600 hover:border-orange-400"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Price */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Precio</h4>
        <div className="space-y-1">
          {priceRanges.map(({ label }) => (
            <button
              key={label}
              onClick={() => toggleFilter(selectedPrices, label, setSelectedPrices)}
              className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${
                selectedPrices.includes(label)
                  ? "bg-orange-500 text-white font-medium"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Calificacion</h4>
        <div className="space-y-1">
          {[4, 3, 2].map((rating) => (
            <button
              key={rating}
              onClick={() => toggleFilter(selectedRatings, rating, setSelectedRatings)}
              className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                selectedRatings.includes(rating)
                  ? "bg-orange-50 text-orange-600 font-medium border border-orange-200"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${i < rating ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}`}
                  />
                ))}
              </div>
              <span>y mas</span>
            </button>
          ))}
        </div>
      </div>

      {hasFilters && (
        <Button
          variant="outline"
          onClick={clearAll}
          className="w-full text-sm text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600 bg-transparent"
        >
          <X className="w-4 h-4 mr-1" />
          Limpiar filtros
        </Button>
      )}
    </div>
  )

  return (
    <>
      {/* Hero Banner */}
      <div className="relative h-56 md:h-72 overflow-hidden bg-[#2D3142]">
        <img src={heroImage || "/placeholder.svg"} alt={title} className="absolute inset-0 w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#2D3142]/80 via-[#2D3142]/40 to-transparent" />
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-end pb-8 md:pb-10">
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-3">
            <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/productos" className="hover:text-white transition-colors">Productos</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white font-medium">{title}</span>
          </nav>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">{title}</h1>
          <p className="text-sm md:text-base text-white/70 max-w-xl">{description}</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14 gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="lg:hidden flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-orange-500 transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filtros
                {hasFilters && (
                  <span className="bg-orange-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {selectedCategories.length + selectedPrices.length + selectedRatings.length + selectedSizes.length}
                  </span>
                )}
              </button>
              <p className="text-sm text-gray-500 hidden sm:block">
                <span className="font-semibold text-foreground">{sortedProducts.length}</span> productos
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Buscar en esta categoria..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 h-9 w-56 text-sm border-gray-200 rounded-lg bg-gray-50 text-foreground placeholder:text-gray-400"
                />
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[150px] h-9 text-sm border-gray-200 rounded-lg text-foreground">
                  <SelectValue placeholder="Ordenar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevant">Mas Relevante</SelectItem>
                  <SelectItem value="price-asc">Menor Precio</SelectItem>
                  <SelectItem value="price-desc">Mayor Precio</SelectItem>
                  <SelectItem value="popular">Mas Vendidos</SelectItem>
                  <SelectItem value="rating">Mejor Calificacion</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Active filters chips */}
      {hasFilters && (
        <div className="bg-orange-50/50 border-b border-orange-100">
          <div className="container mx-auto px-4 py-2 flex flex-wrap items-center gap-2">
            <span className="text-xs text-gray-500 mr-1">Filtros activos:</span>
            {selectedCategories.map((c) => (
              <span key={c} className="inline-flex items-center gap-1 text-xs bg-white border border-orange-200 text-orange-600 px-2.5 py-1 rounded-full">
                {c}
                <button onClick={() => toggleFilter(selectedCategories, c, setSelectedCategories)}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            {selectedPrices.map((p) => (
              <span key={p} className="inline-flex items-center gap-1 text-xs bg-white border border-orange-200 text-orange-600 px-2.5 py-1 rounded-full">
                {p}
                <button onClick={() => toggleFilter(selectedPrices, p, setSelectedPrices)}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            {selectedSizes.map((s) => (
              <span key={s} className="inline-flex items-center gap-1 text-xs bg-white border border-orange-200 text-orange-600 px-2.5 py-1 rounded-full">
                Talla {s}
                <button onClick={() => toggleFilter(selectedSizes, s, setSelectedSizes)}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            <button onClick={clearAll} className="text-xs text-red-500 hover:text-red-600 ml-2">
              Limpiar todo
            </button>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-60 flex-shrink-0">
            <div className="sticky top-20">
              <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-5 flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-orange-500" />
                Filtros
              </h3>
              {filterContent}
            </div>
          </aside>

          {/* Mobile Filters Drawer */}
          {showMobileFilters && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div className="absolute inset-0 bg-black/40" onClick={() => setShowMobileFilters(false)} />
              <div className="absolute left-0 top-0 bottom-0 w-80 bg-white shadow-xl overflow-y-auto">
                <div className="flex items-center justify-between p-4 border-b">
                  <h3 className="font-bold text-lg">Filtros</h3>
                  <button onClick={() => setShowMobileFilters(false)}>
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-4">{filterContent}</div>
              </div>
            </div>
          )}

          {/* Products Grid */}
          <div className="flex-1 min-w-0">
            {sortedProducts.length === 0 ? (
              <div className="text-center py-20">
                <Search className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-semibold mb-2">No se encontraron productos</h3>
                <p className="text-sm text-gray-500 mb-4">Prueba ajustando los filtros o busqueda.</p>
                <Button onClick={clearAll} className="bg-orange-500 hover:bg-orange-600 text-white">
                  Limpiar filtros
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
                {sortedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-orange-200 transition-all"
                  >
                    {/* Image */}
                    <div className="relative aspect-square overflow-hidden bg-gray-50">
                      <Link href={`/producto/${product.id}`}>
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </Link>

                      {/* Discount badge */}
                      {product.originalPrice && (
                        <span className="absolute top-2.5 left-2.5 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                          -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                        </span>
                      )}

                      {/* Quick actions - appear on hover */}
                      <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-200">
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
                            isInWishlist(product.id)
                              ? "bg-orange-500 text-white"
                              : "bg-white/90 text-gray-500 hover:bg-orange-500 hover:text-white"
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
                            isInCompare(product.id)
                              ? "bg-orange-500 text-white"
                              : "bg-white/90 text-gray-500 hover:bg-orange-500 hover:text-white"
                          }`}
                        >
                          <Shuffle className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-3 md:p-4">
                      <Link href={`/producto/${product.id}`}>
                        <h3 className="text-sm font-semibold text-foreground line-clamp-2 mb-1.5 group-hover:text-orange-500 transition-colors leading-snug min-h-[2.5rem]">
                          {product.name}
                        </h3>
                      </Link>

                      <div className="flex items-center gap-1.5 mb-2">
                        {renderStars(product.rating)}
                        <span className="text-[11px] text-gray-400">({product.reviews})</span>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-lg font-bold text-foreground">${product.price.toFixed(2)}</span>
                        {product.originalPrice && (
                          <span className="text-xs text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
                        )}
                      </div>

                      <Button
                        className="w-full h-9 text-xs font-semibold rounded-lg bg-[#2D3142] hover:bg-[#3D4152] text-white gap-1.5"
                        onClick={() => handleAddToCart(product)}
                        disabled={addedIds.includes(product.id)}
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        {addedIds.includes(product.id) ? "Agregado" : "Agregar"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {sortedProducts.length > 0 && (
              <div className="flex justify-center items-center gap-1.5 mt-10">
                <Button variant="outline" size="sm" className="rounded-lg bg-transparent" disabled>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button size="sm" className="rounded-lg bg-orange-500 hover:bg-orange-600 text-white h-9 w-9 p-0">
                  1
                </Button>
                <Button variant="outline" size="sm" className="rounded-lg bg-transparent h-9 w-9 p-0">
                  2
                </Button>
                <Button variant="outline" size="sm" className="rounded-lg bg-transparent h-9 w-9 p-0">
                  3
                </Button>
                <Button variant="outline" size="sm" className="rounded-lg bg-transparent">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
