import Header from "@/components/header"
import Footer from "@/components/footer"
import { MapPin, Phone, ChevronRight, Store, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import Link from "next/link"

const stores = [
  {
    id: 1,
    name: "QUIROLA AUTORREPUESTOS",
    address: "Juan de Salinas 152-15 entre 18 de noviembre y Av Universitaria, Loja, Loja, Ecuador",
    phone: "0999970239",
    logo: "/auto-parts-logo-red.jpg",
    category: "Vehiculos",
  },
  {
    id: 2,
    name: "G&O respuestos",
    address: "Juan De Salinas, 18 De Noviembre Loja, Loja, Ecuador",
    phone: "+593981502434",
    logo: "/car-parts-logo-black.jpg",
    category: "Vehiculos",
  },
  {
    id: 3,
    name: "PRODUCTOS CAMPESINOS PONCENITA",
    address: "JUAN MALDONADO, SN Camilo Ponce Enriquez, Azuay, Ecuador",
    phone: "0997844331",
    logo: "/farm-products-logo.jpg",
    category: "Alimentos",
  },
  {
    id: 4,
    name: "API MELISSA",
    address: "Ventanas, Los Rios, Ecuador",
    phone: "0998035124",
    logo: "/honey-bee-logo.png",
    category: "Alimentos",
  },
  {
    id: 5,
    name: "PROTEINAS ANCESTRALES JARAM",
    address: "Octava, Emilio Sarmiento-Monay Cuenca, Azuay, Ecuador",
    phone: "0999123456",
    logo: "/protein-foods-logo.jpg",
    category: "Alimentos",
  },
  {
    id: 6,
    name: "Luffa Esponja Natural",
    address: "Morales y Batalla de Tarqui, Ambato, Tungurahua, Ecuador",
    phone: "0998765432",
    logo: "/natural-sponge-logo.jpg",
    category: "Belleza",
  },
]

export default function TiendasPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero header */}
        <div className="bg-[#2D3142]">
          <div className="container mx-auto px-4 py-10 md:py-14">
            <p className="text-orange-400 text-sm font-semibold tracking-widest uppercase mb-2">
              Comercios nacionales registrados
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">Nuestras Tiendas</h1>
            <div className="h-1 w-20 bg-orange-500 rounded-full"></div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Toolbar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <Store className="w-6 h-6 text-orange-500" />
              <p className="text-sm text-gray-500">
                <span className="font-bold text-foreground text-lg">{stores.length}</span>{" "}
                tiendas registradas
              </p>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-60">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Buscar tienda..."
                  className="pl-9 h-10 border-gray-200 rounded-lg bg-gray-50 text-sm text-foreground placeholder:text-gray-400"
                />
              </div>
              <Select defaultValue="recent">
                <SelectTrigger className="w-[160px] h-10 border-gray-200 rounded-lg text-sm text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Mas reciente</SelectItem>
                  <SelectItem value="name">Nombre A-Z</SelectItem>
                  <SelectItem value="popular">Mas populares</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Store grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stores.map((store) => (
              <div
                key={store.id}
                className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg hover:border-orange-400 transition-all duration-300 flex flex-col overflow-hidden group"
              >
                {/* Top accent bar */}
                <div className="h-1 w-full bg-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="p-5 flex flex-col flex-grow">
                  {/* Store name */}
                  <h3 className="text-lg font-bold text-orange-600 mb-4 line-clamp-2 min-h-[3.25rem] leading-snug">
                    {store.name}
                  </h3>

                  {/* Logo area - fixed height for symmetry */}
                  <div className="flex items-center justify-center h-28 bg-gray-100 rounded-lg mb-4">
                    <img
                      src={store.logo || "/placeholder.svg"}
                      alt={store.name}
                      className="max-h-20 max-w-[80%] object-contain"
                    />
                  </div>

                  {/* Category tag */}
                  <div className="mb-4">
                    <span className="inline-block text-xs font-semibold text-orange-600 bg-orange-50 border border-orange-200 px-3 py-1 rounded-full">
                      {store.category}
                    </span>
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-2.5 bg-gray-50 rounded-lg p-3 mb-3 min-h-[4rem]">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-orange-500" />
                    <span className="text-sm text-gray-600 line-clamp-2 leading-relaxed">{store.address}</span>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-2.5 bg-gray-50 rounded-lg p-3 mb-5">
                    <Phone className="w-4 h-4 flex-shrink-0 text-orange-500" />
                    <span className="text-sm font-semibold text-foreground">{store.phone}</span>
                  </div>

                  {/* CTA Button */}
                  <div className="mt-auto">
                    <Link href={`/tiendas/${store.id}`}>
                      <Button className="w-full h-11 rounded-lg font-bold text-sm tracking-wide bg-[#2D3142] hover:bg-[#3D4152] text-white gap-2">
                        VISITAR TIENDA
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
