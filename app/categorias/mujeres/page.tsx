"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import CategoryPageLayout from "@/components/category-page-layout"

const subcategories = [
  "Vestidos",
  "Blusas",
  "Pantalones",
  "Faldas",
  "Jeans",
  "Chaquetas",
  "Ropa Deportiva",
  "Ropa Interior",
  "Accesorios",
]

const womenSizes = ["XS", "S", "M", "L", "XL", "XXL"]

const allProducts = [
  {
    id: 1,
    name: "Vestido Floral de Verano",
    price: 65.99,
    image: "/woman-in-floral-summer-dress.png",
    rating: 4.8,
    reviews: 189,
    category: "Vestidos",
    size: "M",
  },
  {
    id: 2,
    name: "Blusa Elegante de Seda",
    price: 49.99,
    image: "/elegant-silk-blouse.png",
    rating: 4.6,
    reviews: 145,
    category: "Blusas",
    size: "S",
  },
  {
    id: 3,
    name: "Pantalon de Vestir Negro",
    price: 55.99,
    image: "/black-dress-pants.png",
    rating: 4.7,
    reviews: 112,
    category: "Pantalones",
    size: "M",
  },
  {
    id: 4,
    name: "Falda Midi Plisada",
    price: 42.99,
    image: "/pleated-midi-skirt.png",
    rating: 4.5,
    reviews: 98,
    category: "Faldas",
    size: "L",
  },
  {
    id: 5,
    name: "Jeans Skinny Azul",
    price: 52.99,
    image: "/womens-skinny-jeans.png",
    rating: 4.7,
    reviews: 276,
    category: "Jeans",
    size: "XL",
  },
  {
    id: 6,
    name: "Chaqueta de Mezclilla",
    price: 79.99,
    image: "/denim-jacket.png",
    rating: 4.8,
    reviews: 167,
    category: "Chaquetas",
    size: "XXL",
  },
  {
    id: 7,
    name: "Conjunto Deportivo",
    price: 69.99,
    image: "/womens-activewear.png",
    rating: 4.6,
    reviews: 234,
    category: "Ropa Deportiva",
    size: "M",
  },
  {
    id: 8,
    name: "Bolso de Mano Elegante",
    price: 85.99,
    image: "/stylish-leather-handbag.png",
    rating: 4.9,
    reviews: 156,
    category: "Accesorios",
    size: "L",
  },
  {
    id: 9,
    name: "Zapatillas Fashion",
    price: 89.99,
    image: "/womens-fashion-sneakers.png",
    rating: 4.7,
    reviews: 203,
    category: "Accesorios",
    size: "XL",
  },
  {
    id: 10,
    name: "Bufanda de Seda",
    price: 34.99,
    image: "/silk-scarf.png",
    rating: 4.5,
    reviews: 87,
    category: "Ropa Interior",
    size: "XS",
  },
  {
    id: 11,
    name: "Gafas de Sol",
    price: 75.99,
    image: "/stylish-sunglasses.png",
    rating: 4.6,
    reviews: 134,
    category: "Accesorios",
    size: "S",
  },
  {
    id: 12,
    name: "Collar de Perlas",
    price: 129.99,
    image: "/pearl-necklace.png",
    rating: 4.8,
    reviews: 76,
    category: "Accesorios",
    size: "M",
  },
]

export default function MujeresPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <CategoryPageLayout
          title="Moda para Mujeres"
          description="Descubre las ultimas tendencias en ropa y accesorios para mujer"
          heroImage="/hero-mujeres.jpg"
          subcategories={subcategories}
          products={allProducts}
          sizes={womenSizes}
        />
      </main>
      <Footer />
    </div>
  )
}
