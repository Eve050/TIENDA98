import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function MinimalBanner() {
  return (
    <section className="bg-gradient-to-br from-secondary/30 to-muted/20 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 py-20 md:py-32 lg:py-40">
        <div className="max-w-5xl mx-auto text-center space-y-8 md:space-y-10">
          <div className="space-y-4 md:space-y-6">
            <p className="text-xs md:text-sm font-bold text-primary uppercase tracking-[0.2em]">
              Somos TIENDA98
            </p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] md:leading-[1.05]">
              El marketplace ecuatoriano que todos aman
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Conectamos a vendedores locales con compradores de todo el país. Compra seguro, vende fácil.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/informacion">
              <Button
                size="lg"
                className="rounded-full px-12 py-8 text-base md:text-lg font-semibold h-auto hover:scale-105 transition-all bg-slate-900 hover:bg-orange-500 text-white"
              >
                Explorar
              </Button>
            </Link>
            <Link href="/registro">
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-12 py-8 text-base md:text-lg font-semibold h-auto hover:scale-105 transition-all bg-transparent border-2 border-slate-900 text-slate-900 hover:border-orange-500 hover:text-orange-500 hover:bg-orange-50"
              >
                Convertirme en vendedor
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
