"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import CategoryPageLayout from "@/components/category-page-layout"

const subcategories = [
  "Zapatillas Hombre",
  "Zapatillas Mujer",
  "Zapatos Formales Hombre",
  "Zapatos Formales Mujer",
  "Botas",
  "Sandalias",
  "Deportivos",
  "Calzado Ninos",
]

const shoeSizes = ["35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48"]

const allProducts = [
  {
    id: 1,
    name: "Zapatillas Deportivas Premium",
    price: 89.99,
    image: "/diverse-sneaker-collection.png",
    rating: 4.8,
    reviews: 312,
    category: "Deportivos",
    size: "42",
  },
  {
    id: 2,
    name: "Zapatos Formales Cuero",
    price: 129.99,
    image: "/formal-leather-shoes.png",
    rating: 4.7,
    reviews: 189,
    category: "Zapatos Formales Hombre",
    size: "41",
  },
  {
    id: 3,
    name: "Zapatillas Running Mujer",
    price: 95.99,
    image: "/womens-running-shoes.png",
    rating: 4.9,
    reviews: 267,
    category: "Zapatillas Mujer",
    size: "38",
  },
  {
    id: 4,
    name: "Botas de Cuero Hombre",
    price: 149.99,
    image: "/mens-leather-boots.png",
    rating: 4.6,
    reviews: 134,
    category: "Botas",
    size: "43",
  },
  {
    id: 5,
    name: "Sandalias Verano Mujer",
    price: 45.99,
    image: "/womens-summer-sandals.png",
    rating: 4.5,
    reviews: 198,
    category: "Sandalias",
    size: "37",
  },
  {
    id: 6,
    name: "Zapatillas Basket",
    price: 119.99,
    image: "/basketball-shoes.png",
    rating: 4.8,
    reviews: 245,
    category: "Deportivos",
    size: "44",
  },
  {
    id: 7,
    name: "Zapatos Tacon Alto",
    price: 79.99,
    image: "/womens-high-heels.png",
    rating: 4.6,
    reviews: 156,
    category: "Zapatos Formales Mujer",
    size: "36",
  },
  {
    id: 8,
    name: "Zapatillas Ninos LED",
    price: 49.99,
    image: "/kids-led-shoes.png",
    rating: 4.9,
    reviews: 389,
    category: "Calzado Ninos",
    size: "38",
  },
  {
    id: 9,
    name: "Mocasines Casuales",
    price: 65.99,
    image: "/casual-loafers.png",
    rating: 4.5,
    reviews: 123,
    category: "Zapatillas Hombre",
    size: "40",
  },
  {
    id: 10,
    name: "Botas Trekking",
    price: 139.99,
    image: "/hiking-boots.png",
    rating: 4.7,
    reviews: 201,
    category: "Botas",
    size: "42",
  },
  {
    id: 11,
    name: "Zapatillas Slip-On",
    price: 55.99,
    image: "/slip-on-sneakers.png",
    rating: 4.6,
    reviews: 178,
    category: "Zapatillas Mujer",
    size: "39",
  },
  {
    id: 12,
    name: "Chanclas Playa",
    price: 24.99,
    image: "/beach-flip-flops.png",
    rating: 4.4,
    reviews: 267,
    category: "Sandalias",
    size: "41",
  },
]

export default function CalzadoPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <CategoryPageLayout
          title="Calzado"
          description="Encuentra el calzado perfecto para hombres, mujeres y ninos"
          heroImage="/hero-calzado.jpg"
          subcategories={subcategories}
          products={allProducts}
          sizes={shoeSizes}
        />
      </main>
      <Footer />
    </div>
  )
}
