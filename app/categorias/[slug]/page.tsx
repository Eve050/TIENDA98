import Header from "@/components/header"
import Footer from "@/components/footer"
import CategoryPageLayout, { type CategoryProduct } from "@/components/category-page-layout"
import { notFound } from "next/navigation"


const categories = [
  {
    slug: "moda-y-accesorios",
    name: "Moda y Accesorios",
    description:
      "Encuentra la ultima moda, ropa, zapatos, bolsos y accesorios para todos los estilos.",
    subcategories: ["Ropa Hombre", "Ropa Mujer", "Ropa Ninos", "Calzado Hombre", "Calzado Mujer", "Accesorios"],
    heroImage: "/hero-moda.jpg",
  },
  {
    slug: "tecnologia",
    name: "Tecnologia",
    description:
      "Laptops, computadoras, celulares, consolas y todos los dispositivos tecnologicos que necesitas.",
    subcategories: ["Computadoras", "Laptops", "Celulares", "Tablets", "Consolas", "Accesorios Tech"],
    heroImage: "/category-tecnologia.jpg",
  },
  {
    slug: "vehiculos",
    name: "Vehiculos",
    description: "Autos, motos, bicicletas y todo tipo de repuestos para tu vehiculo.",
    subcategories: ["Autos", "Motos", "Bicicletas", "Repuestos Auto", "Repuestos Moto", "Accesorios"],
    heroImage: "/category-vehiculos.jpg",
  },
  {
    slug: "hogar-y-jardin",
    name: "Hogar y Jardin",
    description: "Muebles, decoracion, herramientas y todo lo que necesitas para tu hogar y jardin.",
    subcategories: ["Muebles", "Decoracion", "Cocina", "Bano", "Jardin", "Herramientas"],
    heroImage: "/category-hogar.jpg",
  },
  {
    slug: "medicina",
    name: "Medicina",
    description: "Productos de salud, medicamentos, suplementos y equipo medico.",
    subcategories: [
      "Medicamentos",
      "Suplementos",
      "Equipo Medico",
      "Primeros Auxilios",
      "Vitaminas",
      "Cuidado Personal",
    ],
    heroImage: "/category-medicina.jpg",
  },
  {
    slug: "alimentos",
    name: "Alimentos",
    description: "Cafe, chocolates, productos organicos y todo tipo de alimentos frescos y procesados.",
    subcategories: ["Cafe", "Chocolates", "Organicos", "Snacks", "Bebidas", "Conservas"],
    heroImage: "/category-alimentos.jpg",
  },
  {
    slug: "belleza",
    name: "Belleza",
    description: "Productos de belleza, cosmeticos, cuidado de la piel y mucho mas.",
    subcategories: ["Cuidado Facial", "Maquillaje", "Cuidado Capilar", "Fragancias", "Cuidado Corporal", "Unas"],
    heroImage: "/category-belleza.jpg",
  },
  {
    slug: "deportes",
    name: "Deportes",
    description: "Ropa deportiva, equipos, accesorios y todo para tu vida activa.",
    subcategories: ["Ropa Deportiva", "Calzado Deportivo", "Equipos", "Suplementos", "Accesorios", "Outdoor"],
    heroImage: "/category-deportes.jpg",
  },
  {
    slug: "juegos-y-juguetes",
    name: "Juegos y Juguetes",
    description: "Diversion para todas las edades con los mejores juegos y juguetes.",
    subcategories: ["Juguetes Ninos", "Juegos Mesa", "Videojuegos", "Munecas", "Construccion", "Educativos"],
    heroImage: "/category-juegos.jpg",
  },
]

const generateProducts = (categorySlug: string): CategoryProduct[] => {
  const productsByCategory: Record<string, CategoryProduct[]> = {
    "moda-y-accesorios": [
      { id: 1, name: "Camisa de Algodon Premium", price: 45.99, image: "/mens-casual-shirt.png", rating: 4.5, reviews: 128, category: "Ropa Hombre" },
      { id: 2, name: "Vestido Casual Verano", price: 65.99, image: "/woman-in-floral-summer-dress.png", rating: 4.8, reviews: 89, category: "Ropa Mujer" },
      { id: 3, name: "Zapatillas Deportivas", price: 89.99, image: "/diverse-sneaker-collection.png", rating: 4.7, reviews: 256, category: "Calzado Hombre" },
      { id: 4, name: "Chaqueta de Cuero", price: 129.99, image: "/classic-leather-jacket.png", rating: 4.6, reviews: 45, category: "Ropa Hombre" },
      { id: 5, name: "Bolso de Mano Elegante", price: 55.99, image: "/stylish-leather-handbag.png", rating: 4.4, reviews: 78, category: "Accesorios" },
      { id: 6, name: "Reloj Inteligente", price: 199.99, image: "/modern-smartwatch.png", rating: 4.9, reviews: 312, category: "Accesorios" },
      { id: 7, name: "Pantalon Jean Clasico", price: 49.99, image: "/folded-denim-stack.png", rating: 4.5, reviews: 167, category: "Ropa Hombre" },
      { id: 8, name: "Gafas de Sol Polarizadas", price: 75.99, image: "/stylish-sunglasses.png", rating: 4.7, reviews: 93, category: "Accesorios" },
    ],
    tecnologia: [
      { id: 1, name: "Laptop Dell XPS 15", price: 1299.99, image: "/modern-laptop-workspace.png", rating: 4.8, reviews: 432, category: "Laptops" },
      { id: 2, name: "iPhone 15 Pro Max", price: 1199.99, image: "/modern-smartphone.png", rating: 4.9, reviews: 1250, category: "Celulares" },
      { id: 3, name: "Tablet Samsung Galaxy", price: 449.99, image: "/modern-tablet-display.png", rating: 4.6, reviews: 287, category: "Tablets" },
      { id: 4, name: "Auriculares Bluetooth Sony", price: 299.99, image: "/diverse-people-listening-headphones.png", rating: 4.7, reviews: 568, category: "Accesorios Tech" },
      { id: 5, name: "Consola PlayStation 5", price: 499.99, image: "/ps5.jpg", rating: 4.9, reviews: 890, category: "Consolas" },
      { id: 6, name: "Monitor 4K LG 27 pulgadas", price: 349.99, image: "/computer-monitor.png", rating: 4.5, reviews: 201, category: "Computadoras" },
      { id: 7, name: "Teclado Mecanico RGB", price: 129.99, image: "/mechanical-keyboard.png", rating: 4.6, reviews: 342, category: "Accesorios Tech" },
      { id: 8, name: "Mouse Gaming Logitech", price: 79.99, image: "/gaming-mouse.png", rating: 4.8, reviews: 456, category: "Accesorios Tech" },
    ],
    "hogar-y-jardin": [
      { id: 1, name: "Sofa de 3 Piezas Moderno", price: 899.99, image: "/comfortable-living-room-sofa.png", rating: 4.7, reviews: 145, category: "Muebles" },
      { id: 2, name: "Lampara de Pie LED", price: 89.99, image: "/elegant-floor-lamp.png", rating: 4.5, reviews: 89, category: "Decoracion" },
      { id: 3, name: "Juego de Sartenes Antiadherentes", price: 149.99, image: "/cookware-set.png", rating: 4.8, reviews: 367, category: "Cocina" },
      { id: 4, name: "Aspiradora Robot", price: 299.99, image: "/robot-vacuum.jpg", rating: 4.6, reviews: 521, category: "Cocina" },
      { id: 5, name: "Set de Herramientas 100 Piezas", price: 79.99, image: "/assorted-tool-set.png", rating: 4.7, reviews: 234, category: "Herramientas" },
      { id: 6, name: "Cortadora de Cesped Electrica", price: 249.99, image: "/suburban-lawn-mower.png", rating: 4.5, reviews: 156, category: "Jardin" },
    ],
  }

  return (
    productsByCategory[categorySlug] || [
      { id: 1, name: "Producto 1", price: 49.99, image: "/placeholder.svg?height=400&width=400", rating: 4.5, reviews: 50, category: "General" },
      { id: 2, name: "Producto 2", price: 79.99, image: "/placeholder.svg?height=400&width=400", rating: 4.7, reviews: 75, category: "General" },
      { id: 3, name: "Producto 3", price: 99.99, image: "/placeholder.svg?height=400&width=400", rating: 4.6, reviews: 120, category: "General" },
      { id: 4, name: "Producto 4", price: 129.99, image: "/placeholder.svg?height=400&width=400", rating: 4.8, reviews: 89, category: "General" },
      { id: 5, name: "Producto 5", price: 159.99, image: "/placeholder.svg?height=400&width=400", rating: 4.4, reviews: 45, category: "General" },
      { id: 6, name: "Producto 6", price: 189.99, image: "/placeholder.svg?height=400&width=400", rating: 4.9, reviews: 210, category: "General" },
    ]
  )
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const category = categories.find((c) => c.slug === slug)

  if (!category) {
    notFound()
  }

  const products = generateProducts(slug)

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <CategoryPageLayout
          title={category.name}
          description={category.description}
          heroImage={category.heroImage}
          subcategories={category.subcategories}
          products={products}
        />
      </main>
      <Footer />
    </div>
  )
}
