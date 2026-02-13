import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HogarSection() {
  return (
    <section className="container mx-auto px-4 md:px-6 lg:px-12">
      <div className="mb-8 md:mb-12 flex items-center justify-between">
        <div>
          <p className="text-xs md:text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-2">
            Decoración
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">Todo para decorar tu hogar</h2>
        </div>
        <Link href="/categorias/hogar-y-jardin">
          <Button
            variant="outline"
            className="rounded-full hover:bg-gradient-to-r hover:from-amber-500 hover:to-orange-500 hover:text-white transition-all bg-transparent"
          >
            Más Productos →
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Link
            key={i}
            href="/categorias/hogar-y-jardin"
            className="group bg-card rounded-2xl overflow-hidden border hover:border-orange-500 hover:shadow-xl transition-all"
          >
            <div className="aspect-square relative">
              <img
                src={`/home-decor-.jpg?height=300&width=300&query=home decor ${i}`}
                alt={`Decoración ${i}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold mb-1">Producto para hogar {i}</h3>
              <p className="text-sm text-muted-foreground">Desde $24.50</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
