import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ModaSection() {
  return (
    <section className="container mx-auto px-4 md:px-6 lg:px-12">
      <div className="mb-6 md:mb-10">
        <Link href="/categorias/moda-y-accesorios" className="group">
          <div className="relative bg-gradient-to-r from-stone-600 via-stone-500 to-stone-400 rounded-2xl md:rounded-3xl overflow-hidden h-[320px] sm:h-[340px] md:h-[360px] lg:h-[380px] shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            <div className="absolute inset-0 rounded-2xl md:rounded-3xl group-hover:bg-white/10 transition-all duration-500" />
            <div className="relative z-10 p-6 sm:p-8 md:p-10 h-full flex flex-col justify-between">
              <div className="space-y-4 md:space-y-6">
                <div className="space-y-2 md:space-y-3">
                  <p className="text-xs font-semibold text-orange-400 uppercase tracking-widest">Tendencia 2025</p>
                  <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tighter leading-[0.95] drop-shadow-lg">
                    Viste a la moda
                  </h3>
                  <p className="text-lg sm:text-xl md:text-2xl text-white/90 font-medium drop-shadow">
                    Lo mejor de la moda 2025
                  </p>
                </div>
                <Button
                  size="lg"
                  variant="secondary"
                  className="rounded-full px-8 md:px-10 py-5 md:py-6 text-sm md:text-base font-semibold bg-orange-500 text-white hover:bg-orange-600 hover:scale-105 transition-all h-auto shadow-md"
                >
                  Ver
                </Button>
              </div>
            </div>
            <div className="absolute right-0 bottom-0 w-3/5 sm:w-1/2 h-full group-hover:scale-105 transition-transform duration-700">
              <img
                src="/fashion-streetwear-models.png"
                alt="Moda Streetwear"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <Link
          href="/categorias/hombres"
          className="group relative overflow-hidden rounded-2xl h-48 md:h-56 lg:h-64 bg-gray-100 hover:shadow-xl transition-all duration-300 border border-transparent hover:border-orange-300"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
          <img
            src="/stylish-man.png"
            alt="Hombres"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
            <h3 className="text-xl font-bold text-white">Hombres</h3>
            <p className="text-sm text-white/90">Ropa y accesorios</p>
          </div>
        </Link>

        <Link
          href="/categorias/mujeres"
          className="group relative overflow-hidden rounded-2xl h-48 md:h-56 lg:h-64 bg-gray-100 hover:shadow-xl transition-all duration-300 border border-transparent hover:border-orange-300"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
          <img
            src="/stylish-woman-city.png"
            alt="Mujeres"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
            <h3 className="text-xl font-bold text-white">Mujeres</h3>
            <p className="text-sm text-white/90">Ropa y accesorios</p>
          </div>
        </Link>

        <Link
          href="/categorias/ninos"
          className="group relative overflow-hidden rounded-2xl h-48 md:h-56 lg:h-64 bg-gray-100 hover:shadow-xl transition-all duration-300 border border-transparent hover:border-orange-300"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
          <img
            src="/stylish-kids.png"
            alt="Niños"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
            <h3 className="text-xl font-bold text-white">Niños</h3>
            <p className="text-sm text-white/90">Ropa y accesorios</p>
          </div>
        </Link>

        <Link
          href="/categorias/calzado"
          className="group relative overflow-hidden rounded-2xl h-48 md:h-56 lg:h-64 bg-gray-100 hover:shadow-xl transition-all duration-300 border border-transparent hover:border-orange-300"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
          <img
            src="/stylish-fashionable-shoes-and-sneakers-display.jpg"
            alt="Calzado"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
            <h3 className="text-xl font-bold text-white">Calzado</h3>
            <p className="text-sm text-white/90">Para hombres y mujeres</p>
          </div>
        </Link>
      </div>
    </section>
  )
}
