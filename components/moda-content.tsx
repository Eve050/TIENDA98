"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Heart, ShoppingCart, Shuffle, Star, ChevronRight, Sparkles } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/lib/cart-context"
import { useWishlist } from "@/lib/wishlist-context"
import { useCompare } from "@/lib/compare-context"

export default function ModaContent() {
  const searchParams = useSearchParams()
  const [activeSubcategory, setActiveSubcategory] = useState<string>("todos")
  const [addedIds, setAddedIds] = useState<number[]>([])

  const { addItem } = useCart()
  const { toggleItem, isInWishlist } = useWishlist()
  const { toggleItem: toggleCompare, isInCompare } = useCompare()

  useEffect(() => {
    const subcategoria = searchParams.get("subcategoria")
    if (subcategoria) {
      setActiveSubcategory(subcategoria)
    }
  }, [searchParams])

  const categoryGroups = [
    {
      title: "Ropa",
      items: [
        { id: "ropa-hombre", label: "Hombres" },
        { id: "ropa-mujer", label: "Mujeres" },
        { id: "ropa-ninos", label: "Ninos" },
      ],
    },
    {
      title: "Calzado",
      items: [
        { id: "calzado-hombre", label: "Hombres" },
        { id: "calzado-mujer", label: "Mujeres" },
      ],
    },
    {
      title: "Accesorios",
      items: [
        { id: "accesorios-hombre", label: "Hombres" },
        { id: "accesorios-mujer", label: "Mujeres" },
        { id: "accesorios-ninos", label: "Ninos" },
      ],
    },
  ]

  const products = [
    { id: 1, name: "Camisa de Algodon Premium", price: 45.99, image: "/mens-casual-shirt.png", rating: 4.5, reviews: 128, category: "ropa-hombre" },
    { id: 2, name: "Vestido Casual Verano", price: 65.99, image: "/woman-in-floral-summer-dress.png", rating: 4.8, reviews: 89, category: "ropa-mujer" },
    { id: 3, name: "Zapatillas Deportivas", price: 89.99, image: "/diverse-sneaker-collection.png", rating: 4.7, reviews: 256, category: "calzado-hombre" },
    { id: 4, name: "Chaqueta de Cuero", price: 129.99, image: "/classic-leather-jacket.png", rating: 4.6, reviews: 45, category: "ropa-hombre" },
    { id: 5, name: "Bolso de Mano Elegante", price: 55.99, image: "/stylish-leather-handbag.png", rating: 4.4, reviews: 78, category: "accesorios-mujer" },
    { id: 6, name: "Reloj Inteligente", price: 199.99, image: "/modern-smartwatch.png", rating: 4.9, reviews: 312, category: "accesorios-hombre" },
    { id: 7, name: "Pantalon Jean Clasico", price: 49.99, image: "/folded-denim-stack.png", rating: 4.5, reviews: 167, category: "ropa-hombre" },
    { id: 8, name: "Gafas de Sol Polarizadas", price: 75.99, image: "/stylish-sunglasses.png", rating: 4.7, reviews: 93, category: "accesorios-mujer" },
    { id: 9, name: "Blusa Elegante de Seda", price: 49.99, image: "/elegant-silk-blouse.png", rating: 4.6, reviews: 145, category: "ropa-mujer" },
    { id: 10, name: "Falda Midi Plisada", price: 42.99, image: "/pleated-midi-skirt.png", rating: 4.5, reviews: 98, category: "ropa-mujer" },
    { id: 11, name: "Botas de Cuero", price: 149.99, image: "/mens-leather-boots.png", rating: 4.6, reviews: 134, category: "calzado-hombre" },
    { id: 12, name: "Sandalias Verano", price: 45.99, image: "/womens-summer-sandals.png", rating: 4.5, reviews: 198, category: "calzado-mujer" },
    { id: 13, name: "Vestido Casual Nina", price: 32.99, image: "/girls-casual-dress.png", rating: 4.7, reviews: 143, category: "ropa-ninos" },
    { id: 14, name: "Mochila Escolar", price: 35.99, image: "/kids-backpack.png", rating: 4.6, reviews: 189, category: "accesorios-ninos" },
    { id: 15, name: "Zapatos Tacon Alto", price: 79.99, image: "/womens-high-heels.png", rating: 4.6, reviews: 156, category: "calzado-mujer" },
    { id: 16, name: "Cinturon de Cuero", price: 29.99, image: "/leather-belt.png", rating: 4.5, reviews: 89, category: "accesorios-hombre" },
  ]

  const filteredProducts =
    activeSubcategory === "todos" ? products : products.filter((p) => p.category === activeSubcategory)

  const handleAddToCart = (product: typeof products[0]) => {
    addItem({ id: product.id, name: product.name, price: product.price, image: product.image, store: "Tienda98" })
    setAddedIds((prev) => [...prev, product.id])
    setTimeout(() => setAddedIds((prev) => prev.filter((id) => id !== product.id)), 2000)
  }

  const renderStars = (rating: number) => (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`w-3 h-3 ${i < Math.floor(rating) ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}`}
        />
      ))}
    </div>
  )

  return (
    <>
      {/* Hero Banner */}
      <div className="relative h-56 md:h-72 overflow-hidden bg-[#2D3142]">
        <img src="/hero-moda.jpg" alt="Moda y Accesorios" className="absolute inset-0 w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#2D3142]/80 via-[#2D3142]/40 to-transparent" />
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-end pb-8 md:pb-10">
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-3">
            <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white font-medium">Moda y Accesorios</span>
          </nav>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">Moda y Accesorios</h1>
          <p className="text-sm md:text-base text-white/70 max-w-xl">
            Encuentra lo mejor en moda para toda la familia
          </p>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap items-start gap-6">
            <button
              onClick={() => setActiveSubcategory("todos")}
              className={`text-sm font-semibold px-4 py-2 rounded-full transition-all ${
                activeSubcategory === "todos"
                  ? "bg-[#2D3142] text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Ver Todos
              </span>
            </button>

            {categoryGroups.map((group) => (
              <div key={group.title} className="flex flex-col gap-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 px-1">{group.title}</span>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveSubcategory(item.id)}
                      className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-all ${
                        activeSubcategory === item.id
                          ? "bg-orange-500 text-white border-orange-500 shadow-sm"
                          : "text-gray-600 border-gray-200 hover:border-orange-300 hover:text-orange-500"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500">
            <span className="font-semibold text-foreground">{filteredProducts.length}</span> productos
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {filteredProducts.map((product) => (
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

                <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-200">
                  <button
                    onClick={() =>
                      toggleItem({ id: product.id, name: product.name, price: product.price, image: product.image, category: product.category })
                    }
                    className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-colors ${
                      isInWishlist(product.id) ? "bg-orange-500 text-white" : "bg-white/90 text-gray-500 hover:bg-orange-500 hover:text-white"
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isInWishlist(product.id) ? "fill-current" : ""}`} />
                  </button>
                  <button
                    onClick={() =>
                      toggleCompare({ id: product.id, name: product.name, price: product.price, image: product.image, category: product.category })
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
      </div>
    </>
  )
}
