import Link from "next/link"

export default function ArtesaniasSection() {
  return (
    <section className="container mx-auto px-4 md:px-6 lg:px-12">
      <div className="mb-8 md:mb-12">
        <p className="text-xs md:text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-2">
          Hecho en Ecuador
        </p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">Artesanías Ecuatorianas</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Link href="/categorias/hecho-en-ecuador" className="group">
          <div className="relative rounded-2xl overflow-hidden h-64 md:h-80">
            <img
              src="/ecuador-artisan-products.jpg"
              alt="Hecho en Ecuador"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <div className="p-6 md:p-8">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Artesanías Ecuatorianas</h3>
                <p className="text-white/90">Productos hechos a mano en Ecuador</p>
              </div>
            </div>
          </div>
        </Link>

        <Link href="/categorias/tienda98" className="group">
          <div className="relative rounded-2xl overflow-hidden h-64 md:h-80">
            <img
              src="/warehouse-store.jpg"
              alt="Almacén Tienda98"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <div className="p-6 md:p-8">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Almacén de tienda98</h3>
                <p className="text-white/90">Productos directos de nuestro almacén</p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </section>
  )
}
