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
    image: "/hero-marketplace-shopping.jpg",
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
    <section className="relative overflow-hidden bg-gradient-to-br from-amber-50/30 via-background to-orange-50/20">
      <div className="container mx-auto px-4 md:px-6 lg:px-20 py-10 md:py-16 lg:py-24">
        <div className="relative">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`transition-opacity duration-1000 ${index === currentSlide ? "opacity-100" : "opacity-0 absolute inset-0 pointer-events-none"
                }`}
            >
              <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
                <div className="space-y-6 md:space-y-8 max-w-2xl text-center lg:text-left">
                  <div className="space-y-4 md:space-y-5">
                    <p className="text-xs md:text-sm font-bold text-primary uppercase tracking-[0.2em]">
                      {slide.eyebrow}
                    </p>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] md:leading-[1.05]">
                      {slide.title}
                    </h1>
                    <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0">
                      {slide.subtitle}
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                    <Link href={slide.href} className="w-full sm:w-auto">
                      <Button
                        size="lg"
                        className="w-full sm:w-auto rounded-full px-10 py-7 text-base md:text-lg font-bold h-auto bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 hover:scale-105 transition-all shadow-xl shadow-orange-500/20"
                      >
                        {slide.cta}
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="relative h-[250px] sm:h-[350px] md:h-[450px] lg:h-[500px] w-full mt-8 lg:mt-0 animate-fade-in-up">
                  <img
                    src={slide.image || "/placeholder.svg"}
                    alt={slide.title}
                    className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
                  />
                  {/* Decorative elements for mobile */}
                  <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-primary/5 rounded-full blur-3xl lg:hidden" />
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-center lg:justify-start gap-2.5 md:gap-3 mt-10 md:mt-12">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2.5 rounded-full transition-all duration-500 ${index === currentSlide
                    ? "w-10 md:w-12 bg-gradient-to-r from-amber-500 to-orange-500 shadow-md shadow-orange-500/40"
                    : "w-2.5 bg-foreground/10 hover:bg-amber-400/40"
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <Button
        variant="outline"
        size="icon"
        onClick={prevSlide}
        className="hidden md:flex absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 z-10 rounded-full h-10 w-10 md:h-12 md:w-12 bg-background/90 backdrop-blur-md border-2 hover:bg-background hover:scale-110 transition-all shadow-lg"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={nextSlide}
        className="hidden md:flex absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 z-10 rounded-full h-10 w-10 md:h-12 md:w-12 bg-background/90 backdrop-blur-md border-2 hover:bg-background hover:scale-110 transition-all shadow-lg"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
      </Button>
    </section>
  )
}
