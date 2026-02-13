import Header from "@/components/header"
import Footer from "@/components/footer"
import { MapPin, Phone, ShoppingBag, Heart, Shuffle, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import AddToCartButton from "@/components/add-to-cart-button"
import Link from "next/link"

const stores = [
  {
    id: 1,
    name: "QUIROLA AUTORREPUESTOS",
    address: "Juan de Salinas 152-15 entre 18 de noviembre y Av Universitaria, Loja, Loja, Ecuador",
    phone: "0999970239",
    logo: "/auto-parts-logo-red.jpg",
    category: "Vehículos",
    description: "Especialistas en repuestos automotrices de alta calidad para todo tipo de vehículos.",
    rating: 4.8,
    totalReviews: 142,
  },
  {
    id: 2,
    name: "G&O respuestos",
    address: "Juan De Salinas, 18 De Noviembre Loja, Loja, Ecuador",
    phone: "+593981502434",
    logo: "/car-parts-logo-black.jpg",
    category: "Vehículos",
    description: "Tu aliado de confianza en repuestos y accesorios para vehículos.",
    rating: 4.6,
    totalReviews: 98,
  },
  {
    id: 3,
    name: "PRODUCTOS CAMPESINOS PONCEÑITA",
    address: "JUAN MALDONADO, SN Camilo Ponce Enríquez, Azuay, Ecuador",
    phone: "0997844331",
    logo: "/farm-products-logo.jpg",
    category: "Alimentos",
    description: "Productos frescos del campo ecuatoriano directo a tu mesa.",
    rating: 4.9,
    totalReviews: 215,
  },
  {
    id: 4,
    name: "API MELISSA",
    address: "Ventanas, Los Ríos, Ecuador",
    phone: "0998035124",
    logo: "/honey-bee-logo.png",
    category: "Alimentos",
    description: "Miel pura y productos apícolas naturales de la mejor calidad.",
    rating: 5.0,
    totalReviews: 67,
  },
  {
    id: 5,
    name: "PROTEÍNAS ANCESTRALES JARAM",
    address: "Octava, Emilio Sarmiento-Monay Cuenca, Azuay, Ecuador",
    phone: "0999123456",
    logo: "/protein-foods-logo.jpg",
    category: "Alimentos",
    description: "Alimentos nutritivos basados en recetas ancestrales ecuatorianas.",
    rating: 4.7,
    totalReviews: 89,
  },
  {
    id: 6,
    name: "Luffa Esponja Natural",
    address: "Morales y Batalla de Tarqui, Ambato, Tungurahua, Ecuador",
    phone: "0998765432",
    logo: "/natural-sponge-logo.jpg",
    category: "Belleza",
    description: "Esponjas naturales y productos ecológicos para el cuidado personal.",
    rating: 4.8,
    totalReviews: 124,
  },
]

const storeProducts: Record<number, any[]> = {
  1: [
    {
      id: 101,
      name: "Filtro de Aceite Premium",
      price: 12.99,
      image: "/oil-filter-quality.jpg",
      rating: 4.7,
      reviews: 45,
      stock: 25,
    },
    {
      id: 102,
      name: "Pastillas de Freno Cerámicas",
      price: 45.99,
      image: "/brake-pads-ceramic.jpg",
      rating: 4.9,
      reviews: 67,
      stock: 15,
    },
    {
      id: 103,
      name: "Batería 12V 75Ah",
      price: 89.99,
      image: "/car-battery-powerful.jpg",
      rating: 4.8,
      reviews: 34,
      stock: 10,
    },
    {
      id: 104,
      name: "Llantas All-Terrain 265/70R17",
      price: 159.99,
      image: "/all-terrain-tires.jpg",
      rating: 4.6,
      reviews: 28,
      stock: 8,
    },
  ],
  2: [
    {
      id: 201,
      name: "Amortiguadores Delanteros",
      price: 125.99,
      image: "/shock-absorbers-front.jpg",
      rating: 4.8,
      reviews: 52,
      stock: 12,
    },
    {
      id: 202,
      name: "Kit de Embrague Completo",
      price: 189.99,
      image: "/clutch-kit-complete.jpg",
      rating: 4.7,
      reviews: 38,
      stock: 6,
    },
    {
      id: 203,
      name: "Faros LED H4",
      price: 34.99,
      image: "/led-headlights-bright.jpg",
      rating: 4.9,
      reviews: 91,
      stock: 30,
    },
    {
      id: 204,
      name: "Aceite Sintético 5W-30 (4L)",
      price: 28.99,
      image: "/synthetic-engine-oil.jpg",
      rating: 4.6,
      reviews: 103,
      stock: 45,
    },
  ],
  3: [
    {
      id: 301,
      name: "Quinua Orgánica 500g",
      price: 3.5,
      image: "/organic-quinoa-grain.jpg",
      rating: 5.0,
      reviews: 78,
      stock: 100,
    },
    {
      id: 302,
      name: "Papas Chaucha 5kg",
      price: 5.99,
      image: "/fresh-potatoes-bulk.jpg",
      rating: 4.9,
      reviews: 62,
      stock: 50,
    },
    {
      id: 303,
      name: "Maíz Mote Pelado 1kg",
      price: 2.25,
      image: "/hominy-corn-white.jpg",
      rating: 4.7,
      reviews: 45,
      stock: 75,
    },
    {
      id: 304,
      name: "Habas Frescas 1kg",
      price: 3.75,
      image: "/fresh-fava-beans.jpg",
      rating: 4.8,
      reviews: 51,
      stock: 60,
    },
  ],
  4: [
    {
      id: 401,
      name: "Miel Pura de Abeja 500ml",
      price: 8.99,
      image: "/pure-raw-honey.jpg",
      rating: 5.0,
      reviews: 124,
      stock: 40,
    },
    {
      id: 402,
      name: "Polen de Abeja 100g",
      price: 6.5,
      image: "/bee-pollen-granules.jpg",
      rating: 4.9,
      reviews: 56,
      stock: 25,
    },
    {
      id: 403,
      name: "Propóleo en Gotas 30ml",
      price: 12.99,
      image: "/propolis-drops-liquid.jpg",
      rating: 4.8,
      reviews: 42,
      stock: 30,
    },
    {
      id: 404,
      name: "Jalea Real 50g",
      price: 18.99,
      image: "/royal-jelly-fresh.jpg",
      rating: 5.0,
      reviews: 37,
      stock: 15,
    },
  ],
  5: [
    {
      id: 501,
      name: "Harina de Chocho 500g",
      price: 4.25,
      image: "/lupin-flour-protein.jpg",
      rating: 4.7,
      reviews: 34,
      stock: 50,
    },
    {
      id: 502,
      name: "Amaranto en Grano 250g",
      price: 3.5,
      image: "/amaranth-grain-seeds.jpg",
      rating: 4.8,
      reviews: 28,
      stock: 40,
    },
    {
      id: 503,
      name: "Proteína de Quinua en Polvo 300g",
      price: 15.99,
      image: "/quinoa-protein-powder.jpg",
      rating: 4.9,
      reviews: 67,
      stock: 25,
    },
    {
      id: 504,
      name: "Chía Negra 200g",
      price: 4.99,
      image: "/black-chia-seeds.jpg",
      rating: 4.6,
      reviews: 89,
      stock: 65,
    },
  ],
  6: [
    {
      id: 601,
      name: "Esponja Natural Luffa Grande",
      price: 5.99,
      image: "/natural-loofah-large.jpg",
      rating: 4.9,
      reviews: 156,
      stock: 80,
    },
    {
      id: 602,
      name: "Jabón de Luffa Exfoliante",
      price: 3.5,
      image: "/exfoliating-soap-loofah.jpg",
      rating: 4.8,
      reviews: 92,
      stock: 100,
    },
    {
      id: 603,
      name: "Kit de Spa Natural",
      price: 12.99,
      image: "/natural-spa-kit.jpg",
      rating: 5.0,
      reviews: 78,
      stock: 35,
    },
    {
      id: 604,
      name: "Guante Exfoliante Luffa",
      price: 4.25,
      image: "/loofah-glove-exfoliating.jpg",
      rating: 4.7,
      reviews: 64,
      stock: 60,
    },
  ],
}

export default function TiendaPage({ params }: { params: { id: string } }) {
  const storeId = Number.parseInt(params.id)
  const store = stores.find((s) => s.id === storeId)
  const products = storeProducts[storeId] || []

  if (!store) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Tienda no encontrada</h1>
            <Link href="/tiendas">
              <Button className="bg-[#2D3142] hover:bg-[#2D3142]/90">Volver a Tiendas</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gradient-to-br from-secondary/20 via-background to-orange-50">
        <div className="bg-gradient-to-r from-[#2D3142] to-[#3D4152] text-white">
          <div className="container mx-auto px-4 py-8 md:py-12">
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl bg-white p-4 flex items-center justify-center shadow-xl">
                <img
                  src={store.logo || "/placeholder.svg"}
                  alt={store.name}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <span className="inline-block text-xs font-bold text-orange-400 bg-orange-900/30 px-3 py-1 rounded-full mb-3">
                  {store.category}
                </span>
                <h1 className="text-3xl md:text-4xl font-bold mb-3">{store.name}</h1>
                <p className="text-gray-300 mb-4 text-sm md:text-base">{store.description}</p>
                <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-orange-400 flex-shrink-0" />
                    <span className="line-clamp-1">{store.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-orange-400 flex-shrink-0" />
                    <span className="font-bold">{store.phone}</span>
                  </div>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2 mt-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(store.rating) ? "fill-orange-400 text-orange-400" : "text-gray-400"}`}
                      />
                    ))}
                  </div>
                  <span className="text-orange-400 font-bold">{store.rating}</span>
                  <span className="text-gray-400">({store.totalReviews} reseñas)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Productos de la Tienda</h2>
              <p className="text-muted-foreground text-sm">{products.length} productos disponibles</p>
            </div>
            <Select defaultValue="recent">
              <SelectTrigger className="w-full sm:w-[200px] h-11 border-2 border-orange-500/20 rounded-xl">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Más reciente</SelectItem>
                <SelectItem value="price-low">Precio: Bajo a Alto</SelectItem>
                <SelectItem value="price-high">Precio: Alto a Bajo</SelectItem>
                <SelectItem value="popular">Más populares</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">No hay productos disponibles</h3>
              <p className="text-muted-foreground mb-6">Esta tienda aún no ha agregado productos.</p>
              <Link href="/tiendas">
                <Button className="bg-[#2D3142] hover:bg-[#2D3142]/90">Ver Otras Tiendas</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-orange-500/30 group flex flex-col"
                >
                  <div className="relative aspect-square overflow-hidden bg-secondary/20">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 bg-white rounded-full shadow-lg hover:bg-orange-50 transition-colors">
                        <Heart className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-2 bg-white rounded-full shadow-lg hover:bg-orange-50 transition-colors">
                        <Shuffle className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                    {product.stock < 10 && (
                      <div className="absolute top-2 left-2">
                        <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                          ¡Últimas {product.stock}!
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="font-bold text-base mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors min-h-[3rem]">
                      {product.name}
                    </h3>

                    <div className="flex items-center gap-1 mb-3">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${i < Math.floor(product.rating) ? "fill-orange-400 text-orange-400" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">({product.reviews})</span>
                    </div>

                    <div className="mt-auto">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xl font-bold text-orange-600">${product.price.toFixed(2)}</span>
                        <span className="text-xs text-muted-foreground">Stock: {product.stock}</span>
                      </div>

                      <AddToCartButton
                        product={{
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          image: product.image,
                        }}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-12 text-center">
            <Link href="/tiendas">
              <Button
                variant="outline"
                className="border-2 border-[#2D3142] text-[#2D3142] hover:bg-[#2D3142] hover:text-white bg-transparent"
              >
                ← Volver a Todas las Tiendas
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
