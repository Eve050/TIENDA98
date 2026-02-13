"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const slides = [
  {
    id: 1,
    eyebrow: "TIENDA98",
    title: "Todo En Un Solo Lugar, Seguro Y Más Barato",
    subtitle: "El marketplace más grande de Ecuador",
    cta: "Explorar",
    href: "/informacion",
    image: "/images/captura-20de-20pantalla-202025-12-22-20191401.png",
  },
  {
    id: 2,
    eyebrow: "¿Buscas una vivienda?",
    title: "Ventas y Arriendo de casas, departamentos y locales",
    subtitle: "Y mucho más...",
    cta: "Buscar Viviendas",
    href: "/productos",
    image: "/happy-shoppers-with-colorful-bags.jpg",
  },
  {
    id: 3,
    eyebrow: "¿Buscas un vehículo?",
    title: "Compra a los mejores precios del mercado",
    subtitle: "Autos, motos y mucho más... Compras inmediatas",
    cta: "Visitar Patio",
    href: "/categorias/vehiculos",
    image: "/modern-electronics.png",
  },
]

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)

  return (
    <section className="relative bg-gradient-to-br from-amber-50/30 via-background to-orange-50/20 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-12 py-8 md:py-12 lg:py-16">
        <div className="relative">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0 absolute inset-0 pointer-events-none"
              }`}
            >
              <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
                <div className="space-y-4 md:space-y-6 max-w-2xl">
                  <div className="space-y-3 md:space-y-4">
                    <p className="text-xs md:text-sm font-semibold text-muted-foreground uppercase tracking-widest">
                      {slide.eyebrow}
                    </p>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[0.95]">
                      {slide.title}
                    </h1>
                    <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed">
                      {slide.subtitle}
                    </p>
                  </div>
                  <Link href={slide.href}>
                    <Button
                      size="lg"
                      className="rounded-full px-8 md:px-10 py-5 md:py-6 text-sm md:text-base font-semibold h-auto bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 hover:scale-105 transition-transform"
                    >
                      {slide.cta}
                    </Button>
                  </Link>
                </div>
                <div className="relative h-[280px] sm:h-[320px] md:h-[380px] lg:h-[420px]">
                  <img
                    src={slide.image || "/placeholder.svg"}
                    alt={slide.title}
                    className="w-full h-full object-contain drop-shadow-2xl"
                  />
                </div>
              </div>
            </div>
          ))}

          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none z-10">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="ml-2 md:ml-4 rounded-full h-10 w-10 md:h-12 md:w-12 bg-background/90 backdrop-blur-md border-2 hover:bg-background hover:scale-110 pointer-events-auto transition-all"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="mr-2 md:mr-4 rounded-full h-10 w-10 md:h-12 md:w-12 bg-background/90 backdrop-blur-md border-2 hover:bg-background hover:scale-110 pointer-events-auto transition-all"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </Button>
          </div>

          <div className="flex justify-center gap-2 md:gap-3 mt-6 md:mt-8">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all duration-500 ${
                  index === currentSlide
                    ? "w-8 md:w-10 bg-gradient-to-r from-amber-500 to-orange-500"
                    : "w-2 bg-foreground/20 hover:bg-amber-400/40"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
