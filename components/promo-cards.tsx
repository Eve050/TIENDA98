import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function PromoCards() {
  return (
    <section className="container mx-auto px-4 md:px-6 lg:px-12">
      <div className="grid md:grid-cols-1">
        <Link href="/categorias/vehiculos" className="group">
          <div className="relative bg-gradient-to-r from-gray-700 via-gray-600 to-gray-500 rounded-2xl md:rounded-3xl overflow-hidden h-[320px] sm:h-[340px] md:h-[360px] lg:h-[380px] shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 active:border-orange-500">
            <div className="absolute inset-0 rounded-2xl md:rounded-3xl group-hover:bg-white/10 transition-all duration-500" />
            <div className="relative z-10 p-6 sm:p-8 md:p-10 h-full flex flex-col justify-between">
              <div className="space-y-4 md:space-y-6 max-w-md">
                <div className="space-y-2 md:space-y-3">
                  <p className="text-xs font-semibold text-orange-400 uppercase tracking-widest">
                    Autos, Motos y bicicletas
                  </p>
                  <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tighter leading-[0.95] drop-shadow-lg">
                    ¿Repuestos?
                  </h3>
                  <p className="text-lg sm:text-xl md:text-2xl text-white/90 font-medium drop-shadow">
                    Todas las marcas
                  </p>
                </div>
                <Button
                  size="lg"
                  className="rounded-full px-8 md:px-10 py-5 md:py-6 text-sm md:text-base font-semibold bg-orange-500 text-white hover:bg-orange-600 hover:scale-105 transition-all h-auto shadow-md"
                >
                  Ver
                </Button>
              </div>
            </div>
            <div className="absolute right-0 bottom-0 w-3/5 sm:w-1/2 h-full group-hover:scale-105 transition-transform duration-700">
              <img
                src="/auto-parts-professional.png"
                alt="Repuestos"
                className="w-full h-full object-cover object-right"
              />
            </div>
          </div>
        </Link>
      </div>
    </section>
  )
}
