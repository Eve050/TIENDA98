import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AdditionalSections() {
  return (
    <div className="space-y-12 md:space-y-16 lg:space-y-20">
      {/* Sección de moda para todos */}
      <section className="container mx-auto px-4 md:px-6 lg:px-12">
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-3xl p-8 md:p-12 lg:p-16">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Vestirse a la moda con tienda98</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Visita nuestras tiendas y productos, lo mejor de la moda 2023 en un solo lugar.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Link href="/categorias/moda-y-accesorios/hombre">
              <Button
                variant="outline"
                className="rounded-full px-6 py-5 bg-white hover:bg-gradient-to-r hover:from-amber-500 hover:to-orange-500 hover:text-white transition-all border-2"
              >
                👨 Hombres
              </Button>
            </Link>
            <Link href="/categorias/moda-y-accesorios/mujer">
              <Button
                variant="outline"
                className="rounded-full px-6 py-5 bg-white hover:bg-gradient-to-r hover:from-amber-500 hover:to-orange-500 hover:text-white transition-all border-2"
              >
                👩 Mujeres
              </Button>
            </Link>
            <Link href="/categorias/moda-y-accesorios/ninos">
              <Button
                variant="outline"
                className="rounded-full px-6 py-5 bg-white hover:bg-gradient-to-r hover:from-amber-500 hover:to-orange-500 hover:text-white transition-all border-2"
              >
                👶 Niños
              </Button>
            </Link>
            <Link href="/categorias/moda-y-accesorios/calzado">
              <Button
                variant="outline"
                className="rounded-full px-6 py-5 bg-white hover:bg-gradient-to-r hover:from-amber-500 hover:to-orange-500 hover:text-white transition-all border-2"
              >
                👟 Calzado
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Link
              href="/categorias/moda-y-accesorios/hombre"
              className="group relative overflow-hidden rounded-2xl h-64 md:h-80"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
              <img
                src="/stylish-man.png"
                alt="Hombres"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <h3 className="text-2xl font-bold text-white mb-2">Hombres</h3>
                <p className="text-white/90">Todo para ellos</p>
              </div>
            </Link>

            <Link
              href="/categorias/moda-y-accesorios/mujer"
              className="group relative overflow-hidden rounded-2xl h-64 md:h-80"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
              <img
                src="/stylish-woman-city.png"
                alt="Mujeres"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <h3 className="text-2xl font-bold text-white mb-2">Mujeres</h3>
                <p className="text-white/90">Todo para ellas</p>
              </div>
            </Link>

            <Link
              href="/categorias/moda-y-accesorios/ninos"
              className="group relative overflow-hidden rounded-2xl h-64 md:h-80"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
              <img
                src="/stylish-kids.png"
                alt="Niños"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <h3 className="text-2xl font-bold text-white mb-2">Niños</h3>
                <p className="text-white/90">Ropas y más...</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Sección de hogar y jardin */}
      <section className="container mx-auto px-4 md:px-6 lg:px-12">
        <div className="mb-8 md:mb-12 flex items-center justify-between">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">Todo para decorar tu hogar</h2>
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

      {/* Banners de categorías especiales */}
      <section className="container mx-auto px-4 md:px-6 lg:px-12">
        <div className="grid md:grid-cols-2 gap-6">
          <Link href="/categorias/hecho-en-ecuador" className="group">
            <div className="relative rounded-2xl overflow-hidden h-48 md:h-64">
              <img
                src="/ecuador-artisan-products.jpg"
                alt="Hecho en Ecuador"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-6 md:p-8">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Artesanías Ecuatorianas</h3>
                  <p className="text-white/90">Hecho en Ecuador</p>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/categorias/tienda98" className="group">
            <div className="relative rounded-2xl overflow-hidden h-48 md:h-64">
              <img
                src="/warehouse-store.jpg"
                alt="Almacén Tienda98"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-6 md:p-8">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Almacén de tienda98</h3>
                  <p className="text-white/90">Productos directos</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>
    </div>
  )
}
