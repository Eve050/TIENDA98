"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import CategoryPageLayout from "@/components/category-page-layout"

const subcategories = [
  "Camisas",
  "Pantalones",
  "Jeans",
  "Chaquetas",
  "Trajes",
  "Ropa Deportiva",
  "Ropa Interior",
  "Accesorios",
]

const menSizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"]

const allProducts = [
  {
    id: 1,
    name: "Camisa Casual de Algodon",
    price: 45.99,
    image: "/mens-casual-shirt.png",
    rating: 4.5,
    reviews: 128,
    category: "Camisas",
    size: "M",
  },
  {
    id: 2,
    name: "Pantalon Chino Clasico",
    price: 55.99,
    image: "/chino-pants.png",
    rating: 4.6,
    reviews: 95,
    category: "Pantalones",
    size: "L",
  },
  {
    id: 3,
    name: "Chaqueta de Cuero Premium",
    price: 129.99,
    image: "/classic-leather-jacket.png",
    rating: 4.8,
    reviews: 67,
    category: "Chaquetas",
    size: "L",
  },
  {
    id: 4,
    name: "Jeans Slim Fit Azul",
    price: 49.99,
    image: "/folded-denim-stack.png",
    rating: 4.7,
    reviews: 203,
    category: "Jeans",
    size: "M",
  },
  {
    id: 5,
    name: "Traje Formal Gris",
    price: 299.99,
    image: "/formal-suit.png",
    rating: 4.9,
    reviews: 42,
    category: "Trajes",
    size: "L",
  },
  {
    id: 6,
    name: "Polo Deportivo Dry-Fit",
    price: 35.99,
    image: "/sport-polo.png",
    rating: 4.4,
    reviews: 156,
    category: "Ropa Deportiva",
    size: "M",
  },
  {
    id: 7,
    name: "Cinturon de Cuero",
    price: 29.99,
    image: "/leather-belt.png",
    rating: 4.5,
    reviews: 89,
    category: "Accesorios",
    size: "L",
  },
  {
    id: 8,
    name: "Zapatillas Casual",
    price: 79.99,
    image: "/mens-casual-shoes.png",
    rating: 4.6,
    reviews: 178,
    category: "Accesorios",
    size: "XL",
  },
  {
    id: 9,
    name: "Sudadera con Capucha",
    price: 39.99,
    image: "/mens-hoodie.png",
    rating: 4.5,
    reviews: 234,
    category: "Ropa Deportiva",
    size: "L",
  },
  {
    id: 10,
    name: "Corbata de Seda",
    price: 24.99,
    image: "/silk-tie.png",
    rating: 4.3,
    reviews: 56,
    category: "Accesorios",
    size: "S",
  },
  {
    id: 11,
    name: "Gorra Deportiva",
    price: 19.99,
    image: "/sport-cap.png",
    rating: 4.4,
    reviews: 145,
    category: "Accesorios",
    size: "M",
  },
  {
    id: 12,
    name: "Reloj Analogico",
    price: 149.99,
    image: "/analog-watch.png",
    rating: 4.7,
    reviews: 98,
    category: "Accesorios",
    size: "L",
  },
]

export default function HombresPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <CategoryPageLayout
          title="Moda para Hombres"
          description="Encuentra la mejor ropa y accesorios para hombres con estilo y calidad"
          heroImage="/hero-hombres.jpg"
          subcategories={subcategories}
          products={allProducts}
          sizes={menSizes}
        />
      </main>
      <Footer />
    </div>
  )
}
