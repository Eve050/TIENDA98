"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import VendorSidebar from "@/components/vendor-sidebar"
import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

export default function VendedorPedidosPage() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null)
  const [orderNote, setOrderNote] = useState("")

  useEffect(() => {
    if (!isAuthenticated || user?.type !== "seller") {
      router.push("/mi-cuenta")
    }
  }, [isAuthenticated, user, router])

  if (!isAuthenticated || user?.type !== "seller") {
    return null
  }

  const orders = [
    {
      id: "10988",
      total: "$50.00",
      earnings: "$47.50",
      status: "En-espera",
      client: "Terry Mendieta",
      date: "agosto 1, 2025",
      email: "admin@tienda98.com",
      phone: "0981990203",
      ip: "2800:bf0:b802:fb3:407d:5a15:bda6:2ecc",
      items: [
        {
          name: "La Mamba Negra",
          image: "/placeholder.svg?height=60&width=60",
          quantity: 1,
          price: 50.0,
        },
      ],
      discount: 0,
      shipping: 0,
      refunded: 0,
      billingAddress: "Terry Mendieta\nLoja\nLoja",
      shippingAddress: "Terry Mendieta\nLoja\nLoja\nLoja\nLOJA",
      notes: [
        {
          text: "El estado del pedido cambió de Pendiente de pago a En espera.",
          date: "añadido hace 5 meses",
        },
      ],
    },
    {
      id: "10983",
      total: "$30.00",
      earnings: "$28.50",
      status: "En-espera",
      client: "Terry Mendieta",
      date: "agosto 1, 2025",
      email: "admin@tienda98.com",
      phone: "0981990203",
      ip: "2800:bf0:b802:fb3:407d:5a15:bda6:2ecc",
      items: [
        {
          name: "Producto Demo",
          image: "/placeholder.svg?height=60&width=60",
          quantity: 1,
          price: 30.0,
        },
      ],
      discount: 0,
      shipping: 0,
      refunded: 0,
      billingAddress: "Terry Mendieta\nLoja\nLoja",
      shippingAddress: "Terry Mendieta\nLoja\nLoja\nLoja\nLOJA",
      notes: [],
    },
    {
      id: "10401",
      total: "$30.00",
      earnings: "$28.50",
      status: "En-espera",
      client: "Alex Jumbo",
      date: "octubre 10, 2023",
      email: "alex@example.com",
      phone: "0987654321",
      ip: "192.168.1.1",
      items: [
        {
          name: "Producto Demo",
          image: "/placeholder.svg?height=60&width=60",
          quantity: 1,
          price: 30.0,
        },
      ],
      discount: 0,
      shipping: 0,
      refunded: 0,
      billingAddress: "Alex Jumbo\nQuito\nPichincha",
      shippingAddress: "Alex Jumbo\nQuito\nPichincha",
      notes: [],
    },
    {
      id: "10261",
      total: "$30.00",
      earnings: "$28.50",
      status: "Completado",
      client: "Juan Diego Estrada Fierro",
      date: "septiembre 11, 2023",
      email: "juan@example.com",
      phone: "0991234567",
      ip: "192.168.1.2",
      items: [
        {
          name: "Producto Demo",
          image: "/placeholder.svg?height=60&width=60",
          quantity: 1,
          price: 30.0,
        },
      ],
      discount: 0,
      shipping: 0,
      refunded: 0,
      billingAddress: "Juan Diego Estrada Fierro\nGuayaquil\nGuayas",
      shippingAddress: "Juan Diego Estrada Fierro\nGuayaquil\nGuayas",
      notes: [],
    },
  ]

  const getOrderDetails = (orderId: string) => {
    return orders.find((order) => order.id === orderId)
  }

  const currentOrder = selectedOrder ? getOrderDetails(selectedOrder) : null

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <VendorSidebar />
        <main className="flex-1 bg-gray-50 p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex gap-4 text-sm">
                <button className="font-semibold border-b-2 border-black pb-1">All (4)</button>
                <button className="text-gray-600 hover:text-black">Pendiente de pago (0)</button>
                <button className="text-gray-600 hover:text-black">Procesando (0)</button>
                <button className="text-gray-600 hover:text-black">En espera (3)</button>
                <button className="text-gray-600 hover:text-black">Completado (1)</button>
                <button className="text-gray-600 hover:text-black">Cancelado (0)</button>
                <button className="text-gray-600 hover:text-black">Reembolsado (0)</button>
                <button className="text-gray-600 hover:text-black">Fallido (0)</button>
              </div>
            </div>

            <div className="bg-white rounded-lg border p-4">
              <div className="flex flex-wrap gap-4 items-center">
                <Select defaultValue="filter-client">
                  <SelectTrigger className="w-56">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="filter-client">Filtrar por client...</SelectItem>
                  </SelectContent>
                </Select>

                <Input
                  placeholder="Buscar pedidos"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1"
                />

                <Input type="text" placeholder="Select Date Range" className="w-64" />

                <Button variant="outline" className="border-2 bg-transparent">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Filtro
                </Button>

                <Button variant="outline" className="border-2 bg-transparent">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Restablecer
                </Button>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Button className="bg-black hover:bg-black/90">Exportar Todo</Button>
              <Button className="bg-black hover:bg-black/90">Exportar Filtrados</Button>
            </div>

            <div className="bg-white rounded-lg border overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left">
                      <input type="checkbox" className="rounded" />
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">PEDIDO</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">TOTAL DEL PEDIDO</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">GANANCIAS</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">ESTADO</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">CLIENTE</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">FECHA</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">ACCIÓN</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-4">
                        <input type="checkbox" className="rounded" />
                      </td>
                      <td className="px-4 py-4 text-sm font-medium">Pedido {order.id}</td>
                      <td className="px-4 py-4 text-sm font-semibold">{order.total}</td>
                      <td className="px-4 py-4 text-sm font-semibold">{order.earnings}</td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                            order.status === "Completado"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm">{order.client}</td>
                      <td className="px-4 py-4 text-sm text-red-600">{order.date}</td>
                      <td className="px-4 py-4">
                        <button onClick={() => setSelectedOrder(order.id)} className="p-2 hover:bg-gray-100 rounded">
                          <Eye className="w-5 h-5 text-gray-600" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-[98vw] w-full h-[98vh] max-h-[98vh] overflow-hidden flex flex-col p-0">
          <DialogHeader className="border-b pb-4 px-8 pt-6">
            <DialogTitle className="text-2xl font-semibold">Pedido#{selectedOrder} → Artículos del pedido</DialogTitle>
          </DialogHeader>
          {currentOrder && (
            <div className="grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-10 overflow-y-auto flex-1 px-8 py-6">
              {/* Left Column - Order Items and Addresses */}
              <div className="space-y-8">
                {/* Order Items Table */}
                <Card className="shadow-sm">
                  <CardContent className="p-8">
                    <table className="w-full">
                      <thead className="border-b-2">
                        <tr>
                          <th className="text-left pb-4 font-semibold text-lg">ITEM</th>
                          <th className="text-right pb-4 font-semibold text-lg">COST</th>
                          <th className="text-center pb-4 font-semibold text-lg">QTY</th>
                          <th className="text-right pb-4 font-semibold text-lg">TOTAL</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentOrder.items.map((item, idx) => (
                          <tr key={idx} className="border-b last:border-0">
                            <td className="py-6">
                              <div className="flex items-center gap-4">
                                <img
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.name}
                                  className="w-24 h-24 rounded object-cover border"
                                />
                                <span className="font-medium text-base">{item.name}</span>
                              </div>
                            </td>
                            <td className="text-right text-lg">${item.price.toFixed(2)}</td>
                            <td className="text-center text-lg">{item.quantity}</td>
                            <td className="text-right font-semibold text-lg">
                              ${(item.price * item.quantity).toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <div className="mt-8 space-y-4 border-t-2 pt-6">
                      <div className="flex justify-between items-center text-lg">
                        <span className="text-gray-600 flex items-center gap-2">
                          Discount{" "}
                          <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                              clipRule="evenodd"
                            />
                          </svg>
                          :
                        </span>
                        <span className="font-medium">- ${currentOrder.discount.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center text-lg">
                        <span className="text-gray-600 flex items-center gap-2">
                          Shipping{" "}
                          <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                              clipRule="evenodd"
                            />
                          </svg>
                          :
                        </span>
                        <span className="font-medium">${currentOrder.shipping.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center text-lg font-semibold pt-4 border-t">
                        <span>Order Total:</span>
                        <span className="text-xl">{currentOrder.total}</span>
                      </div>
                      {currentOrder.refunded > 0 && (
                        <div className="flex justify-between items-center text-red-600 text-lg font-medium">
                          <span>Refunded:</span>
                          <span>-${currentOrder.refunded.toFixed(2)}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Addresses */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="shadow-sm">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-4">Dirección de facturación</h3>
                      <p className="text-base leading-relaxed whitespace-pre-line text-gray-700">
                        {currentOrder.billingAddress}
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="shadow-sm">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-4">Dirección de envío</h3>
                      <p className="text-base leading-relaxed whitespace-pre-line text-gray-700">
                        {currentOrder.shippingAddress}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Downloadable Products */}
                <Card className="shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-4">Permisos del producto descargable</h3>
                    <div className="space-y-4">
                      <Input placeholder="Search for a downloadable product..." className="w-full text-base" />
                      <Button className="bg-green-600 hover:bg-green-700 text-base px-6 py-2">Otorgar Acceso</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Details and Notes */}
              <div className="space-y-6">
                {/* General Details */}
                <Card className="shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-6">Detalles generales</h3>
                    <div className="space-y-5">
                      <div className="pb-4 border-b">
                        <span className="text-gray-600 block mb-2 text-sm">Estado del pedido:</span>
                        <span
                          className={`inline-flex items-center px-4 py-1.5 rounded text-sm font-medium ${
                            currentOrder.status === "Completado"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {currentOrder.status}
                        </span>
                      </div>
                      <div className="py-2">
                        <span className="text-gray-600 block mb-2 text-sm">Fecha de pedido:</span>
                        <span className="font-medium text-base">{currentOrder.date}, 7:55 pm</span>
                      </div>
                      <div className="py-2 pb-4 border-b">
                        <span className="text-gray-600 block mb-2 text-sm">Ganancias del pedido:</span>
                        <span className="font-semibold text-lg text-green-600">{currentOrder.earnings}</span>
                      </div>
                      <div className="py-2">
                        <span className="text-gray-600 block mb-2 text-sm">Cliente:</span>
                        <span className="font-medium text-base">{currentOrder.client}</span>
                      </div>
                      <div className="py-2">
                        <span className="text-gray-600 block mb-2 text-sm">Correo electrónico:</span>
                        <span className="text-blue-600 text-base">{currentOrder.email}</span>
                      </div>
                      <div className="py-2">
                        <span className="text-gray-600 block mb-2 text-sm">Teléfono:</span>
                        <span className="font-medium text-base">{currentOrder.phone}</span>
                      </div>
                      <div className="py-2">
                        <span className="text-gray-600 block mb-2 text-sm">IP del cliente:</span>
                        <span className="text-sm font-mono break-all text-gray-700">{currentOrder.ip}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Order Notes */}
                <Card className="shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-6">Notas del pedido</h3>
                    <div className="space-y-4 mb-6">
                      {currentOrder.notes.length > 0 ? (
                        currentOrder.notes.map((note, idx) => (
                          <div key={idx} className="bg-gray-50 p-4 rounded-lg border">
                            <p className="text-gray-700 mb-3 text-base leading-relaxed">{note.text}</p>
                            <div className="flex items-center justify-between text-sm text-gray-500">
                              <span>{note.date}</span>
                              <button className="text-blue-600 hover:underline font-medium">Eliminar nota</button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500 text-sm italic">No hay notas para este pedido</p>
                      )}
                    </div>

                    <div className="space-y-4 pt-4 border-t">
                      <h4 className="font-semibold text-base">Añadir nota</h4>
                      <Textarea
                        placeholder="Escribe una nota sobre el pedido..."
                        value={orderNote}
                        onChange={(e) => setOrderNote(e.target.value)}
                        className="min-h-[100px] text-base"
                      />
                      <Button className="w-full bg-purple-600 hover:bg-purple-700 text-base py-2">Añadir Nota</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
