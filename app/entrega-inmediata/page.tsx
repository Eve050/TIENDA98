import Link from "next/link"
import { Truck, Clock, MapPin } from "lucide-react"

export default function EntregaInmediataPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Entrega Inmediata</h1>

        <div className="prose max-w-none">
          <p className="text-lg text-muted-foreground mb-8">
            Recibe tus productos en tiempo récord con nuestro servicio de entrega inmediata.
          </p>

          <div className="grid md:grid-cols-3 gap-6 my-12">
            <div className="bg-card p-6 rounded-lg border">
              <Truck className="w-12 h-12 text-orange-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Quito y Guayaquil</h3>
              <p className="text-muted-foreground">Entrega express en 24-48h en las principales ciudades.</p>
            </div>

            <div className="bg-card p-6 rounded-lg border">
              <Clock className="w-12 h-12 text-orange-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Disponibilidad</h3>
              <p className="text-muted-foreground">Miles de productos listos para envío inmediato.</p>
            </div>

            <div className="bg-card p-6 rounded-lg border">
              <MapPin className="w-12 h-12 text-orange-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Seguimiento</h3>
              <p className="text-muted-foreground">Rastrea tu pedido en tiempo real desde tu cuenta.</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-4">¿Cómo funciona?</h2>
          <ol className="list-decimal list-inside space-y-3 mb-8">
            <li>Busca productos con la etiqueta "Entrega Inmediata"</li>
            <li>Añade a tu carrito y completa tu compra</li>
            <li>Tu pedido se procesará en minutos</li>
            <li>Recibe tu producto en 24-48h en Quito y Guayaquil</li>
          </ol>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 my-8">
            <h3 className="text-xl font-semibold mb-3 text-orange-900">Nota importante</h3>
            <p className="text-orange-800">
              La entrega inmediata está disponible solo para productos en stock en nuestros almacenes de Quito y
              Guayaquil. Los tiempos pueden variar según la ubicación exacta y disponibilidad del producto.
            </p>
          </div>

          <Link
            href="/"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Ver productos disponibles
          </Link>
        </div>
      </div>
    </div>
  )
}
