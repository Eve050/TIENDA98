import Header from "@/components/header"
import Footer from "@/components/footer"
import { Search, Heart, Shuffle, Star } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { ProductActions } from "@/components/product-actions"
import { productCatalog } from "@/lib/product-catalog"

const products = productCatalog

export default function ProductosPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gradient-to-br from-secondary/20 via-background to-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          <div className="mb-6 md:mb-8">
            <p className="text-muted-foreground mb-2 text-xs sm:text-sm tracking-wide">
              TODO EN UN SOLO LUGAR, SEGURO Y MÁS BARATO
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 tracking-tight">Nuestros Productos</h1>
            <div className="h-1 w-20 md:w-24 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"></div>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 border-2 border-orange-500/20 rounded-xl md:rounded-2xl p-4 md:p-6 mb-6 md:mb-8 shadow-lg">
            <div className="flex flex-col gap-3 md:gap-4">
              <div className="flex-1">
                <label className="text-xs sm:text-sm font-bold mb-2 block text-orange-600">BUSCAR PRODUCTOS</label>
                <div className="relative">
                  <Input
                    placeholder="¿Qué estás buscando?"
                    className="pr-10 h-11 md:h-12 border-2 border-orange-500/20 focus:border-orange-500 rounded-xl text-sm md:text-base"
                  />
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-orange-500" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                <div className="w-full">
                  <label className="text-xs sm:text-sm font-bold mb-2 block text-orange-600">CATEGORÍA</label>
                  <Select>
                    <SelectTrigger className="h-11 md:h-12 border-2 border-orange-500/20 rounded-xl text-sm md:text-base">
                      <SelectValue placeholder="Todas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas las categorías</SelectItem>
                      <SelectItem value="tecnologia">Tecnología</SelectItem>
                      <SelectItem value="moda">Moda y Accesorios</SelectItem>
                      <SelectItem value="deportes">Deportes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-full">
                  <label className="text-xs sm:text-sm font-bold mb-2 block text-orange-600">ORDENAR</label>
                  <Select defaultValue="recent">
                    <SelectTrigger className="h-11 md:h-12 border-2 border-orange-500/20 rounded-xl text-sm md:text-base">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recent">Más reciente</SelectItem>
                      <SelectItem value="price-low">Precio: Menor a Mayor</SelectItem>
                      <SelectItem value="price-high">Precio: Mayor a Menor</SelectItem>
                      <SelectItem value="popular">Más populares</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-full sm:col-span-2 lg:col-span-1">
                  <label className="text-xs sm:text-sm font-bold mb-2 block text-orange-600 opacity-0 pointer-events-none">
                    ACCIÓN
                  </label>
                  <Button className="w-full h-11 md:h-12 px-6 md:px-8 rounded-xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 hover:opacity-90 transition-opacity text-sm md:text-base">
                    FILTRAR
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <p className="text-muted-foreground mb-4 md:mb-6 font-medium text-sm md:text-base">
            Total de productos:{" "}
            <span className="text-orange-600 font-bold text-base md:text-lg">{products.length}</span>
          </p>

          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 group border-2 border-transparent hover:border-orange-500/30 flex flex-col"
              >
                <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-secondary/30 to-secondary/10">
                  <Link href={`/producto/${product.id}`}>
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </Link>
                  {product.badge && (
                    <div className="absolute top-2 md:top-3 right-2 md:right-3 bg-red-500 text-white px-2 md:px-3 py-0.5 md:py-1 rounded-full text-[10px] md:text-xs font-bold">
                      {product.badge}
                    </div>
                  )}
                  <ProductActions product={product} />
                </div>
                <div className="p-3 md:p-5 flex flex-col flex-grow">
                  <span className="inline-block text-[10px] md:text-xs font-bold text-orange-600 bg-orange-100 px-2 md:px-3 py-0.5 md:py-1 rounded-full mb-2 w-fit">
                    {product.category}
                  </span>
                  <Link href={`/producto/${product.id}`}>
                    <h3 className="font-bold text-sm md:text-lg mb-1.5 line-clamp-2 group-hover:text-orange-600 transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}`}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] md:text-xs text-orange-500">({product.reviews.toLocaleString()})</span>
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground mb-3 font-medium">{product.store}</p>
                  <div className="flex items-center justify-between gap-2 pt-2 md:pt-3 border-t border-secondary mt-auto">
                    <div>
                      {product.originalPrice && (
                        <p className="text-[10px] md:text-xs text-muted-foreground line-through">
                          ${product.originalPrice.toFixed(2)}
                        </p>
                      )}
                      <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                        ${product.price.toFixed(2)}
                      </span>
                    </div>
                    <AddToCartButton product={product} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
