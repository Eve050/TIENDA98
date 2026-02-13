"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { useCart } from "@/lib/cart-context"
import { useWishlist } from "@/lib/wishlist-context"
import { useCompare } from "@/lib/compare-context"
import { Button } from "@/components/ui/button"
import {
  Star,
  Heart,
  Shuffle,
  Truck,
  Shield,
  RotateCcw,
  ChevronRight,
  Check,
  Share2,
  ThumbsUp,
  MessageSquare,
  MapPin,
  ChevronDown,
  ChevronUp,
  CreditCard,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { productCatalog } from "@/lib/product-catalog"


const allProducts: Record<string, (typeof productCatalog)[number]> = {}
for (const p of productCatalog) {
  allProducts[String(p.id)] = p
}

const reviewsData = [
  { user: "Maria G.", rating: 5, date: "Hace 3 dias", comment: "Excelente producto, llego antes de lo esperado. La calidad es increible, totalmente recomendado.", helpful: 24 },
  { user: "Carlos R.", rating: 4, date: "Hace 1 semana", comment: "Muy buen producto por el precio. El envio fue rapido y llego bien empaquetado.", helpful: 12 },
  { user: "Ana P.", rating: 5, date: "Hace 2 semanas", comment: "Me encanto! Funciona perfectamente y el diseno es muy bonito. Tienda98 siempre cumple.", helpful: 8 },
]

export default function ProductPage() {
  const routeParams = useParams()
  const productId = routeParams.id as string
  const product = allProducts[productId]

  const router = useRouter()
  const { addItem } = useCart()
  const { toggleItem, isInWishlist } = useWishlist()
  const { toggleItem: toggleCompare, isInCompare } = useCompare()
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [addedToCart, setAddedToCart] = useState(false)
  const [showAllSpecs, setShowAllSpecs] = useState(false)
  const [shared, setShared] = useState(false)

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold text-foreground">Producto no encontrado</h1>
            <p className="text-gray-500">{"El producto que buscas no existe o fue removido."}</p>
            <Link href="/productos">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white mt-4">Ver productos</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const cartItem = {
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image,
    store: product.store,
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(cartItem)
    }
    setAddedToCart(true)
    setTimeout(() => {
      setAddedToCart(false)
      router.push("/carrito")
    }, 800)
  }

  const handleBuyNow = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(cartItem)
    }
    router.push("/checkout")
  }

  const handleShare = async () => {
    const shareData = {
      title: product.name,
      text: `Mira este producto: ${product.name} - US$${product.price} en Tienda98`,
      url: window.location.href,
    }
    try {
      if (navigator.share) {
        await navigator.share(shareData)
      } else {
        await navigator.clipboard.writeText(window.location.href)
        setShared(true)
        setTimeout(() => setShared(false), 2000)
      }
    } catch {
      await navigator.clipboard.writeText(window.location.href)
      setShared(true)
      setTimeout(() => setShared(false), 2000)
    }
  }

  const images = product.images && product.images.length > 0 ? product.images : [product.image]
  const specsEntries = product.specs ? Object.entries(product.specs) : []
  const visibleSpecs = showAllSpecs ? specsEntries : specsEntries.slice(0, 5)
  const productFeatures = product.features || []
  const priceDollars = Math.floor(product.price)
  const priceCents = Math.round((product.price - priceDollars) * 100).toString().padStart(2, "0")

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b border-gray-100">
          <div className="container mx-auto px-4 md:px-6 lg:px-12 py-3">
            <nav className="flex items-center gap-1.5 text-sm text-gray-500 flex-wrap">
              <Link href="/" className="hover:text-orange-500 transition-colors">Inicio</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link href="/productos" className="hover:text-orange-500 transition-colors">Productos</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-foreground font-medium truncate max-w-[200px]">{product.name}</span>
            </nav>
          </div>
        </div>

        {/* Product Main Section - Amazon-style 3 column layout */}
        <section className="container mx-auto px-4 md:px-6 lg:px-12 py-6 md:py-8">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">

            {/* LEFT COLUMN - Image Gallery */}
            <div className="lg:w-[38%] flex-shrink-0">
              <div className="flex flex-col-reverse md:flex-row gap-3 lg:sticky lg:top-24">
                {/* Thumbnails */}
                <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-x-visible md:w-16 flex-shrink-0">
                  {images.map((img, i) => (
                    <button
                      key={`thumb-${i}`}
                      onMouseEnter={() => setSelectedImage(i)}
                      onClick={() => setSelectedImage(i)}
                      className={`w-14 h-14 md:w-16 md:h-16 rounded-lg border-2 overflow-hidden transition-all flex-shrink-0 ${
                        selectedImage === i ? "border-orange-500 shadow-sm" : "border-gray-200 hover:border-orange-300"
                      }`}
                    >
                      <img src={img || "/placeholder.svg"} alt="" className="w-full h-full object-contain p-1.5" />
                    </button>
                  ))}
                </div>

                {/* Main Image */}
                <div className="flex-1 relative">
                  <div className="relative aspect-square bg-white rounded-xl overflow-hidden border border-gray-200">
                    {product.badge && (
                      <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-md z-10">
                        {product.badge}
                      </span>
                    )}
                    <img
                      src={images[selectedImage] || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-contain p-6"
                    />
                  </div>
                  <p className="text-xs text-center text-orange-500 mt-2">Haz clic para una vista completa</p>
                </div>
              </div>
            </div>

            {/* MIDDLE COLUMN - Product Info */}
            <div className="lg:flex-1 min-w-0">
              {/* Title */}
              <h1 className="text-xl md:text-2xl font-medium text-foreground leading-snug">{product.name}</h1>

              {/* Store link */}
              <div className="mt-2">
                <span className="text-sm text-gray-500">{"Visita la tienda de "}</span>
                <Link href="/tiendas/1" className="text-sm text-orange-500 hover:text-orange-600 hover:underline">{product.store}</Link>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-3 flex-wrap">
                <span className="text-sm font-semibold text-foreground">{product.rating}</span>
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={`star-${i}`}
                      className={`w-4 h-4 ${i <= Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-orange-500">({product.reviews.toLocaleString()})</span>
                <span className="text-gray-300">|</span>
                <span className="text-sm text-gray-500">{Math.floor(product.reviews * 0.8)}+ comprados el mes pasado</span>
              </div>

              {/* Divider */}
              <hr className="my-4 border-gray-200" />

              {/* Price */}
              <div className="space-y-1">
                <div className="flex items-baseline gap-1">
                  <span className="text-sm text-foreground">US$</span>
                  <span className="text-3xl font-bold text-foreground tracking-tight">{priceDollars}</span>
                  <sup className="text-sm font-bold text-foreground">{priceCents}</sup>
                </div>
                {product.originalPrice && (
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-500">
                      {"Precio anterior: "}
                      <span className="line-through">${product.originalPrice.toFixed(2)}</span>
                    </span>
                    <span className="bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded">
                      -{discount}%
                    </span>
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-1">IVA incluido. Envio gratis en compras sobre $50.</p>
              </div>

              {/* Divider */}
              <hr className="my-4 border-gray-200" />

              {/* Specs Table */}
              {specsEntries.length > 0 && (
                <div>
                  <table className="w-full text-sm">
                    <tbody>
                      {visibleSpecs.map(([key, value]) => (
                        <tr key={key} className="border-b border-gray-100 last:border-b-0">
                          <td className="py-2.5 pr-4 font-semibold text-foreground whitespace-nowrap align-top w-[40%]">{key}</td>
                          <td className="py-2.5 text-gray-700">{String(value)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {specsEntries.length > 5 && (
                    <button
                      onClick={() => setShowAllSpecs(!showAllSpecs)}
                      className="flex items-center gap-1 text-sm text-orange-500 hover:text-orange-600 hover:underline mt-2 font-medium"
                    >
                      {showAllSpecs ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      {showAllSpecs ? "Ver menos" : "Ver mas"}
                    </button>
                  )}
                </div>
              )}

              {/* Divider */}
              <hr className="my-4 border-gray-200" />

              {/* About this item */}
              {productFeatures.length > 0 && (
                <div>
                  <h3 className="text-base font-bold text-foreground mb-3">Sobre este articulo</h3>
                  <ul className="space-y-2">
                    {productFeatures.map((feature, idx) => (
                      <li key={`feat-${idx}`} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-foreground mt-0.5 flex-shrink-0">&#8226;</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* RIGHT COLUMN - Buy Box */}
            <div className="lg:w-[280px] xl:w-[300px] flex-shrink-0">
              <div className="lg:sticky lg:top-24 border border-gray-200 rounded-xl p-5 space-y-4 bg-white">
                {/* Price in buy box */}
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-sm text-foreground">US$</span>
                    <span className="text-2xl font-bold text-foreground tracking-tight">{priceDollars}</span>
                    <sup className="text-xs font-bold text-foreground">{priceCents}</sup>
                  </div>
                  {product.originalPrice && (
                    <p className="text-xs text-gray-500 mt-1">
                      {"Precio anterior: "}
                      <span className="line-through">${product.originalPrice.toFixed(2)}</span>
                    </p>
                  )}
                </div>

                {/* Delivery info */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <Truck className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-foreground font-medium">Entrega de 2-5 dias</p>
                      <p className="text-xs text-gray-500">Envio a todo Ecuador</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span className="text-orange-500 text-sm">Enviar a Ecuador</span>
                  </div>
                </div>

                {/* Availability */}
                <p className="text-lg font-semibold text-green-600">Disponible</p>

                {/* Quantity Selector */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-foreground">Cantidad:</span>
                  <select
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-400 text-foreground"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>

                {/* Add to Cart Button */}
                <Button
                  onClick={handleAddToCart}
                  disabled={addedToCart}
                  className="w-full h-10 text-sm font-semibold rounded-full bg-amber-400 hover:bg-amber-500 text-foreground shadow-sm"
                >
                  {addedToCart ? "Agregado al carrito" : "Agregar al carrito"}
                </Button>

                {/* Buy Now Button */}
                <Button
                  onClick={handleBuyNow}
                  className="w-full h-10 text-sm font-semibold rounded-full bg-orange-500 hover:bg-orange-600 text-white shadow-sm"
                >
                  Comprar ahora
                </Button>

                {/* Seller info */}
                <div className="space-y-2 text-xs text-gray-500 pt-2 border-t border-gray-100">
                  <div className="flex justify-between">
                    <span>Remitente / Vendedor</span>
                    <span className="text-orange-500 font-medium">{product.store}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Devoluciones</span>
                    <span className="text-orange-500 font-medium">30-dia reintegro</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pago</span>
                    <span className="text-orange-500 font-medium">Transaccion segura</span>
                  </div>
                </div>

                {/* Secondary actions */}
                <div className="space-y-2 pt-2 border-t border-gray-100">
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
                    className={`flex items-center gap-2 text-sm w-full ${
                      isInWishlist(product.id) ? "text-orange-600" : "text-orange-500 hover:text-orange-600"
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? "fill-current" : ""}`} />
                    {isInWishlist(product.id) ? "En tu lista de deseos" : "Agregar a lista de deseos"}
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
                    className={`flex items-center gap-2 text-sm w-full ${
                      isInCompare(product.id) ? "text-orange-600" : "text-orange-500 hover:text-orange-600"
                    }`}
                  >
                    <Shuffle className="w-4 h-4" />
                    {isInCompare(product.id) ? "Comparando" : "Agregar para comparar"}
                  </button>
                  <button onClick={handleShare} className="flex items-center gap-2 text-sm text-orange-500 hover:text-orange-600 w-full">
                    <Share2 className="w-4 h-4" />
                    {shared ? "Enlace copiado!" : "Compartir"}
                  </button>
                </div>

                {/* Trust signals */}
                <div className="space-y-2 pt-2 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <Truck className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                    <span>Envio rapido 24-48h</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <Shield className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                    <span>Garantia de 12 meses</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <RotateCcw className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                    <span>Devolucion en 30 dias</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <CreditCard className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                    <span>Pago 100% seguro</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-gray-200" />

        {/* Description Section */}
        <section className="container mx-auto px-4 md:px-6 lg:px-12 py-8 md:py-10">
          <div className="max-w-4xl">
            <h2 className="text-xl font-bold text-foreground mb-4">Descripcion del producto</h2>
            <p className="text-gray-700 leading-relaxed text-sm">{product.description}</p>

            {productFeatures.length > 0 && (
              <>
                <h3 className="text-base font-bold text-foreground mt-6 mb-3">Caracteristicas principales</h3>
                <div className="grid sm:grid-cols-2 gap-2.5">
                  {productFeatures.map((feature, idx) => (
                    <div key={`char-${idx}`} className="flex items-start gap-2.5 bg-gray-50 rounded-lg p-3">
                      <Check className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-gray-200" />

        {/* Specifications Section */}
        {specsEntries.length > 0 && (
          <section className="container mx-auto px-4 md:px-6 lg:px-12 py-8 md:py-10">
            <div className="max-w-4xl">
              <h2 className="text-xl font-bold text-foreground mb-4">Informacion tecnica</h2>
              <div className="rounded-xl border border-gray-200 overflow-hidden">
                {specsEntries.map(([key, value], i) => (
                  <div
                    key={`spec-${key}`}
                    className={`flex ${i % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                  >
                    <span className="w-1/3 py-3 px-4 text-sm font-semibold text-foreground border-r border-gray-200">
                      {key}
                    </span>
                    <span className="flex-1 py-3 px-4 text-sm text-gray-600">{String(value)}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Divider */}
        <hr className="border-gray-200" />

        {/* Reviews Section */}
        <section className="container mx-auto px-4 md:px-6 lg:px-12 py-8 md:py-10">
          <div className="max-w-4xl">
            <h2 className="text-xl font-bold text-foreground mb-6">Opiniones de clientes</h2>

            {/* Rating Summary */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
              <div className="text-center">
                <div className="text-5xl font-black text-foreground">{product.rating}</div>
                <div className="flex items-center gap-1 mt-2 justify-center">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={`sum-star-${i}`}
                      className={`w-4 h-4 ${i <= Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}`}
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-1">{product.reviews.toLocaleString()} opiniones globales</p>
              </div>
              <div className="flex-1 space-y-1.5 w-full sm:w-auto">
                {[
                  { star: 5, pct: 72 },
                  { star: 4, pct: 18 },
                  { star: 3, pct: 6 },
                  { star: 2, pct: 3 },
                  { star: 1, pct: 1 },
                ].map((item) => (
                  <div key={`bar-${item.star}`} className="flex items-center gap-2">
                    <span className="text-xs text-orange-500 whitespace-nowrap w-16">{item.star} estrellas</span>
                    <div className="flex-1 h-5 bg-gray-200 rounded-sm overflow-hidden">
                      <div className="h-full bg-amber-400 rounded-sm" style={{ width: `${item.pct}%` }} />
                    </div>
                    <span className="text-xs text-orange-500 w-8 text-right">{item.pct}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Individual Reviews */}
            <div className="space-y-6">
              {reviewsData.map((review, idx) => (
                <div key={`review-${idx}`} className="space-y-2 pb-6 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-xs font-bold text-gray-600">
                        {review.user.charAt(0)}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-foreground">{review.user}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star
                          key={`rev-star-${idx}-${i}`}
                          className={`w-3.5 h-3.5 ${i <= review.rating ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-bold text-foreground">Compra verificada</span>
                  </div>
                  <p className="text-xs text-gray-500">{review.date}</p>
                  <p className="text-sm text-gray-700 leading-relaxed">{review.comment}</p>
                  <div className="flex items-center gap-4 pt-1">
                    <button className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-orange-500 transition-colors">
                      <ThumbsUp className="w-3.5 h-3.5" />
                      {"Util"} ({review.helpful})
                    </button>
                    <button className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-orange-500 transition-colors">
                      <MessageSquare className="w-3.5 h-3.5" />
                      Responder
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
