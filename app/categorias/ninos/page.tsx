"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import CategoryPageLayout from "@/components/category-page-layout"

const subcategories = [
  "Ropa Bebes",
  "Ropa Ninas",
  "Ropa Ninos",
  "Pijamas",
  "Ropa Deportiva",
  "Zapatos",
  "Accesorios",
  "Mochilas",
]

const kidsSizes = ["0-3m", "3-6m", "6-12m", "12-18m", "2T", "3T", "4T", "5", "6", "7", "8", "10", "12", "14"]

const allProducts = [
  {
    id: 1,
    name: "Vestido Casual Nina",
    price: 32.99,
    image: "/girls-casual-dress.png",
    rating: 4.7,
    reviews: 143,
    category: "Ropa Ninas",
    size: "6",
  },
  {
    id: 2,
    name: "Camiseta Estampada Nino",
    price: 19.99,
    image: "/boys-printed-tshirt.png",
    rating: 4.5,
    reviews: 198,
    category: "Ropa Ninos",
    size: "4T",
  },
  {
    id: 3,
    name: "Overol de Mezclilla",
    price: 39.99,
    image: "/stylish-kids.png",
    rating: 4.8,
    reviews: 125,
    category: "Ropa Ninos",
    size: "5",
  },
  {
    id: 4,
    name: "Conjunto Deportivo",
    price: 44.99,
    image: "/kids-sport-set.png",
    rating: 4.6,
    reviews: 167,
    category: "Ropa Deportiva",
    size: "7",
  },
  {
    id: 5,
    name: "Pijama de Algodon",
    price: 24.99,
    image: "/kids-pajamas.png",
    rating: 4.7,
    reviews: 234,
    category: "Pijamas",
    size: "8",
  },
  {
    id: 6,
    name: "Zapatillas Luces LED",
    price: 49.99,
    image: "/kids-led-shoes.png",
    rating: 4.9,
    reviews: 312,
    category: "Zapatos",
    size: "10",
  },
  {
    id: 7,
    name: "Mochila Escolar",
    price: 35.99,
    image: "/kids-backpack.png",
    rating: 4.6,
    reviews: 189,
    category: "Mochilas",
    size: "12",
  },
  {
    id: 8,
    name: "Gorra con Visera",
    price: 15.99,
    image: "/kids-cap.png",
    rating: 4.4,
    reviews: 98,
    category: "Accesorios",
    size: "14",
  },
  {
    id: 9,
    name: "Sudadera con Capucha",
    price: 29.99,
    image: "/kids-hoodie.png",
    rating: 4.7,
    reviews: 156,
    category: "Ropa Ninos",
    size: "2T",
  },
  {
    id: 10,
    name: "Shorts Deportivos",
    price: 22.99,
    image: "/kids-sport-shorts.png",
    rating: 4.5,
    reviews: 134,
    category: "Ropa Deportiva",
    size: "3T",
  },
  {
    id: 11,
    name: "Calcetines Pack 5",
    price: 12.99,
    image: "/kids-socks-pack.png",
    rating: 4.6,
    reviews: 267,
    category: "Accesorios",
    size: "4T",
  },
  {
    id: 12,
    name: "Bufanda de Invierno",
    price: 18.99,
    image: "/kids-winter-scarf.png",
    rating: 4.5,
    reviews: 87,
    category: "Accesorios",
    size: "5",
  },
]

export default function NinosPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <CategoryPageLayout
          title="Moda para Ninos"
          description="Ropa comoda y divertida para los mas pequenos de la casa"
          heroImage="/hero-ninos.jpg"
          subcategories={subcategories}
          products={allProducts}
          sizes={kidsSizes}
        />
      </main>
      <Footer />
    </div>
  )
}
