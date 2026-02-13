import Link from "next/link"
import { Package, Clock, Truck } from "lucide-react"

export default function PorPedidoPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Compra Por Pedido</h1>

        <div className="prose max-w-none">
          <p className="text-lg text-muted-foreground mb-8">
            Accede a miles de productos adicionales mediante nuestro sistema de pedidos especiales.
          </p>

          <div className="grid md:grid-cols-3 gap-6 my-12">
            <div className="bg-card p-6 rounded-lg border">
              <Package className="w-12 h-12 text-orange-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Más opciones</h3>
              <p className="text-muted-foreground">Accede a productos que no están en stock permanente.</p>
            </div>

            <div className="bg-card p-6 rounded-lg border">
              <Clock className="w-12 h-12 text-orange-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Tiempo de entrega</h3>
              <p className="text-muted-foreground">Entre 7-15 días hábiles según el producto.</p>
            </div>

            <div className="bg-card p-6 rounded-lg border">
              <Truck className="w-12 h-12 text-orange-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Envío incluido</h3>
              <p className="text-muted-foreground">Envío gratis en pedidos especiales mayores a $50.</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-4">¿Cómo realizar un pedido especial?</h2>
          <ol className="list-decimal list-inside space-y-3 mb-8">
            <li>Navega por productos marcados como "Por Pedido"</li>
            <li>Realiza tu pedido con pago anticipado del 50%</li>
            <li>Te confirmaremos la fecha estimada de llegada</li>
            <li>Paga el saldo restante al recibir tu producto</li>
          </ol>

          <h2 className="text-2xl font-bold mb-4">Ventajas</h2>
          <ul className="list-disc list-inside space-y-2 mb-8">
            <li>Mayor variedad de productos y marcas</li>
            <li>Precios especiales en pedidos al por mayor</li>
            <li>Garantía de autenticidad</li>
            <li>Servicio de rastreo desde el origen</li>
          </ul>

          <Link
            href="/"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Explorar catálogo
          </Link>
        </div>
      </div>
    </div>
  )
}
