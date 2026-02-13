import Link from "next/link"
import { ArrowRight } from "lucide-react"

const categories = [
  {
    name: "Moda y Accesorios",
    slug: "moda-y-accesorios",
    image: "/category-moda.jpg",
    productCount: 128,
  },
  {
    name: "Tecnologia",
    slug: "tecnologia",
    image: "/category-tecnologia.jpg",
    productCount: 95,
  },
  {
    name: "Vehiculos",
    slug: "vehiculos",
    image: "/category-vehiculos.jpg",
    productCount: 64,
  },
  {
    name: "Hogar y Jardin",
    slug: "hogar-y-jardin",
    image: "/category-hogar.jpg",
    productCount: 82,
  },
  {
    name: "Alimentos",
    slug: "alimentos",
    image: "/category-alimentos.jpg",
    productCount: 53,
  },
  {
    name: "Belleza",
    slug: "belleza",
    image: "/category-belleza.jpg",
    productCount: 47,
  },
  {
    name: "Deportes",
    slug: "deportes",
    image: "/category-deportes.jpg",
    productCount: 71,
  },
  {
    name: "Medicina",
    slug: "medicina",
    image: "/category-medicina.jpg",
    productCount: 38,
  },
  {
    name: "Juegos y Juguetes",
    slug: "juegos-y-juguetes",
    image: "/category-juegos.jpg",
    productCount: 44,
  },
]

export default function CategorySection() {
  return (
    <section className="container mx-auto px-4 md:px-6 lg:px-12">
      <div className="space-y-8 md:space-y-10">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div className="space-y-2">
            <p className="text-xs md:text-sm font-semibold text-orange-500 uppercase tracking-widest">
              Explora nuestro catalogo
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-balance">
              Categorias
            </h2>
          </div>
          <Link
            href="/productos"
            className="text-sm font-semibold text-orange-500 hover:text-orange-600 flex items-center gap-1 transition-colors"
          >
            Ver todos los productos
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Featured top row - 2 large cards */}
        <div className="grid md:grid-cols-2 gap-5">
          {categories.slice(0, 2).map((cat) => (
            <Link
              key={cat.slug}
              href={`/categorias/${cat.slug}`}
              className="group relative overflow-hidden rounded-2xl h-64 md:h-72 bg-gray-100"
            >
              <img
                src={cat.image || "/placeholder.svg"}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">{cat.name}</h3>
                  <p className="text-sm text-white/70">{cat.productCount} productos</p>
                </div>
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-500 text-white group-hover:bg-orange-600 transition-colors">
                  <ArrowRight className="w-5 h-5" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Middle row - 3 medium cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {categories.slice(2, 5).map((cat) => (
            <Link
              key={cat.slug}
              href={`/categorias/${cat.slug}`}
              className="group relative overflow-hidden rounded-xl h-48 md:h-56 bg-gray-100"
            >
              <img
                src={cat.image || "/placeholder.svg"}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                <h3 className="text-lg md:text-xl font-bold text-white mb-0.5">{cat.name}</h3>
                <p className="text-xs text-white/70">{cat.productCount} productos</p>
              </div>
              <span className="absolute top-3 right-3 flex items-center justify-center w-8 h-8 rounded-full bg-white/20 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>

        {/* Bottom row - 4 smaller cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {categories.slice(5).map((cat) => (
            <Link
              key={cat.slug}
              href={`/categorias/${cat.slug}`}
              className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white hover:border-orange-400 hover:shadow-lg transition-all"
            >
              <div className="relative h-36 md:h-40 overflow-hidden">
                <img
                  src={cat.image || "/placeholder.svg"}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-sm md:text-base text-foreground group-hover:text-orange-600 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-gray-500">{cat.productCount} productos</p>
                </div>
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-gray-100 text-gray-400 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
