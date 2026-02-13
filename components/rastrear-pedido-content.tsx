"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Package, Truck, CheckCircle } from "lucide-react"

export default function RastrearPedidoContent() {
  const [trackingNumber, setTrackingNumber] = useState("")
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = () => {
    setIsSearching(true)
    // Simular búsqueda
    setTimeout(() => setIsSearching(false), 1000)
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center">Rastrear Pedido</h1>
        <p className="text-lg text-muted-foreground mb-12 text-center">
          Ingresa tu número de pedido para ver el estado de tu envío
        </p>

        <div className="bg-card border rounded-lg p-8 mb-12">
          <div className="flex gap-4">
            <Input
              type="text"
              placeholder="Ej: TDA98-123456"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              className="flex-1"
            />
            <Button
              onClick={handleSearch}
              disabled={!trackingNumber || isSearching}
              className="bg-orange-500 hover:bg-orange-600"
            >
              <Search className="w-4 h-4 mr-2" />
              Buscar
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            El número de pedido se encuentra en el email de confirmación que recibiste al realizar tu compra.
          </p>
        </div>

        <div className="space-y-8">
          <h2 className="text-2xl font-bold">Estados de envío</h2>

          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <div className="bg-blue-100 p-3 rounded-full">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Pedido recibido</h3>
                <p className="text-muted-foreground">Tu pedido ha sido confirmado y está siendo preparado.</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="bg-orange-100 p-3 rounded-full">
                <Truck className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">En camino</h3>
                <p className="text-muted-foreground">Tu pedido está en ruta hacia tu dirección.</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="bg-green-100 p-3 rounded-full">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Entregado</h3>
                <p className="text-muted-foreground">Tu pedido ha sido entregado exitosamente.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
