"use client"

import React from "react"
import { Suspense } from "react"
import { useSearchParams } from "next/navigation"

import { useState } from "react"
import {
  Search,
  Filter,
  Download,
  MoreVertical,
  Eye,
  Printer,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Clock,
  Truck,
  CheckCircle,
  XCircle,
  RefreshCw,
  X,
  Package,
  User,
  MapPin,
  CreditCard,
  Calendar,
  FileText,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"

const orders = [
  {
    id: "#10992",
    customer: { name: "Juan Pérez", email: "juan@email.com", phone: "0991234567" },
    items: [
      { name: "iPhone 15 Pro Max", qty: 1, price: 1299.00, image: "/modern-smartphone.png" },
    ],
    total: 1299.00,
    subtotal: 1299.00,
    shipping: 0,
    discount: 0,
    status: "completado",
    paymentMethod: "Tarjeta de crédito",
    paymentStatus: "pagado",
    shippingAddress: { name: "Juan Pérez", address: "Av. Principal 123", city: "Quito", province: "Pichincha", zip: "170150" },
    billingAddress: { name: "Juan Pérez", address: "Av. Principal 123", city: "Quito", province: "Pichincha", zip: "170150" },
    date: "2025-01-23 14:30",
    vendor: "TechStore EC",
    notes: [],
    ip: "192.168.1.1",
  },
  {
    id: "#10991",
    customer: { name: "María García", email: "maria@email.com", phone: "0987654321" },
    items: [
      { name: "Nike Air Max 90", qty: 2, price: 129.00, image: "/nike-sneakers.jpg" },
      { name: "Chaqueta de Cuero", qty: 1, price: 199.00, image: "/classic-leather-jacket.png" },
    ],
    total: 457.00,
    subtotal: 457.00,
    shipping: 0,
    discount: 0,
    status: "procesando",
    paymentMethod: "PayPhone",
    paymentStatus: "pagado",
    shippingAddress: { name: "María García", address: "Calle 10 de Agosto 456", city: "Guayaquil", province: "Guayas", zip: "090150" },
    billingAddress: { name: "María García", address: "Calle 10 de Agosto 456", city: "Guayaquil", province: "Guayas", zip: "090150" },
    date: "2025-01-23 12:15",
    vendor: "ModaStyle",
    notes: [{ text: "Cliente solicitó envío express", date: "2025-01-23 12:20" }],
    ip: "192.168.1.2",
  },
  {
    id: "#10990",
    customer: { name: "Carlos López", email: "carlos@email.com", phone: "0998765432" },
    items: [
      { name: "MacBook Pro M3", qty: 1, price: 1999.00, image: "/modern-laptop-workspace.png" },
    ],
    total: 1999.00,
    subtotal: 1999.00,
    shipping: 0,
    discount: 0,
    status: "pendiente",
    paymentMethod: "Transferencia bancaria",
    paymentStatus: "pendiente",
    shippingAddress: { name: "Carlos López", address: "Av. Amazonas 789", city: "Quito", province: "Pichincha", zip: "170180" },
    billingAddress: { name: "Carlos López", address: "Av. Amazonas 789", city: "Quito", province: "Pichincha", zip: "170180" },
    date: "2025-01-23 10:45",
    vendor: "TechStore EC",
    notes: [],
    ip: "192.168.1.3",
  },
  {
    id: "#10989",
    customer: { name: "Ana Martínez", email: "ana@email.com", phone: "0976543210" },
    items: [
      { name: "AirPods Pro", qty: 1, price: 249.00, image: "/wireless-headphones.png" },
    ],
    total: 249.00,
    subtotal: 249.00,
    shipping: 0,
    discount: 0,
    status: "enviado",
    paymentMethod: "Tarjeta de débito",
    paymentStatus: "pagado",
    shippingAddress: { name: "Ana Martínez", address: "Calle Bolívar 321", city: "Cuenca", province: "Azuay", zip: "010150" },
    billingAddress: { name: "Ana Martínez", address: "Calle Bolívar 321", city: "Cuenca", province: "Azuay", zip: "010150" },
    date: "2025-01-22 16:20",
    vendor: "TechStore EC",
    notes: [{ text: "Enviado con Servientrega - Guía #12345", date: "2025-01-23 09:00" }],
    ip: "192.168.1.4",
  },
  {
    id: "#10988",
    customer: { name: "Terry Mendieta", email: "terry@email.com", phone: "0981990203" },
    items: [
      { name: "La Mamba Negra", qty: 1, price: 50.00, image: "/mens-casual-shirt.png" },
    ],
    total: 50.00,
    subtotal: 50.00,
    shipping: 0,
    discount: 0,
    status: "en-espera",
    paymentMethod: "Transferencia bancaria",
    paymentStatus: "pendiente",
    shippingAddress: { name: "Terry Mendieta", address: "Loja", city: "Loja", province: "Loja", zip: "110150" },
    billingAddress: { name: "Terry Mendieta", address: "Loja", city: "Loja", province: "Loja", zip: "110150" },
    date: "2025-08-01 19:55",
    vendor: "Il Giornale",
    notes: [{ text: "El estado del pedido cambió de Pendiente de pago a En espera.", date: "2025-08-01 20:00" }],
    ip: "2800:bf0:b802:fb3:407d:5a15:bda6:2ecc",
  },
  {
    id: "#10987",
    customer: { name: "Pedro Sánchez", email: "pedro@email.com", phone: "0965432109" },
    items: [
      { name: "Sofá Moderno 3 Plazas", qty: 1, price: 599.00, image: "/comfortable-living-room-sofa.png" },
    ],
    total: 599.00,
    subtotal: 599.00,
    shipping: 0,
    discount: 0,
    status: "cancelado",
    paymentMethod: "Tarjeta de crédito",
    paymentStatus: "reembolsado",
    shippingAddress: { name: "Pedro Sánchez", address: "Av. 6 de Diciembre 654", city: "Quito", province: "Pichincha", zip: "170130" },
    billingAddress: { name: "Pedro Sánchez", address: "Av. 6 de Diciembre 654", city: "Quito", province: "Pichincha", zip: "170130" },
    date: "2025-01-21 09:30",
    vendor: "HomeDecor",
    notes: [{ text: "Cliente canceló el pedido", date: "2025-01-21 14:00" }],
    ip: "192.168.1.6",
  },
]

const statusConfig: Record<string, { bg: string; text: string; icon: React.ReactNode; label: string }> = {
  pendiente: { bg: "bg-yellow-100", text: "text-yellow-700", icon: <Clock className="w-4 h-4" />, label: "Pendiente" },
  procesando: { bg: "bg-blue-100", text: "text-blue-700", icon: <RefreshCw className="w-4 h-4" />, label: "Procesando" },
  "en-espera": { bg: "bg-orange-100", text: "text-orange-700", icon: <Clock className="w-4 h-4" />, label: "En espera" },
  enviado: { bg: "bg-purple-100", text: "text-purple-700", icon: <Truck className="w-4 h-4" />, label: "Enviado" },
  completado: { bg: "bg-green-100", text: "text-green-700", icon: <CheckCircle className="w-4 h-4" />, label: "Completado" },
  cancelado: { bg: "bg-red-100", text: "text-red-700", icon: <XCircle className="w-4 h-4" />, label: "Cancelado" },
}

const statusTabs = [
  { key: "all", label: "Todos", count: orders.length },
  { key: "pendiente", label: "Pendiente", count: orders.filter(o => o.status === "pendiente").length },
  { key: "procesando", label: "Procesando", count: orders.filter(o => o.status === "procesando").length },
  { key: "en-espera", label: "En espera", count: orders.filter(o => o.status === "en-espera").length },
  { key: "enviado", label: "Enviado", count: orders.filter(o => o.status === "enviado").length },
  { key: "completado", label: "Completado", count: orders.filter(o => o.status === "completado").length },
  { key: "cancelado", label: "Cancelado", count: orders.filter(o => o.status === "cancelado").length },
]

const Loading = () => null;

export default function AdminOrdersPage() {
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedOrders, setSelectedOrders] = useState<string[]>([])
  const [viewOrder, setViewOrder] = useState<typeof orders[0] | null>(null)
  const [newNote, setNewNote] = useState("")

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || order.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const toggleSelectAll = () => {
    if (selectedOrders.length === filteredOrders.length) {
      setSelectedOrders([])
    } else {
      setSelectedOrders(filteredOrders.map((o) => o.id))
    }
  }

  const toggleSelectOrder = (id: string) => {
    if (selectedOrders.includes(id)) {
      setSelectedOrders(selectedOrders.filter((o) => o !== id))
    } else {
      setSelectedOrders([...selectedOrders, id])
    }
  }

  return (
    <Suspense fallback={<Loading />}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Pedidos</h1>
            <p className="text-gray-500">Gestiona todos los pedidos de la tienda</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2 bg-transparent">
              <Download className="w-4 h-4" />
              Exportar
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-4">
              <ShoppingCart className="w-6 h-6 mb-2 opacity-80" />
              <p className="text-2xl font-bold">856</p>
              <p className="text-sm opacity-80">Total Pedidos</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white">
            <CardContent className="p-4">
              <Clock className="w-6 h-6 mb-2 opacity-80" />
              <p className="text-2xl font-bold">23</p>
              <p className="text-sm opacity-80">Pendientes</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <CardContent className="p-4">
              <RefreshCw className="w-6 h-6 mb-2 opacity-80" />
              <p className="text-2xl font-bold">45</p>
              <p className="text-sm opacity-80">Procesando</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardContent className="p-4">
              <Truck className="w-6 h-6 mb-2 opacity-80" />
              <p className="text-2xl font-bold">156</p>
              <p className="text-sm opacity-80">Enviados</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardContent className="p-4">
              <CheckCircle className="w-6 h-6 mb-2 opacity-80" />
              <p className="text-2xl font-bold">612</p>
              <p className="text-sm opacity-80">Completados</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white">
            <CardContent className="p-4">
              <XCircle className="w-6 h-6 mb-2 opacity-80" />
              <p className="text-2xl font-bold">20</p>
              <p className="text-sm opacity-80">Cancelados</p>
            </CardContent>
          </Card>
        </div>

        {/* Status Tabs */}
        <div className="flex flex-wrap gap-2 border-b pb-4">
          {statusTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedStatus(tab.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedStatus === tab.key
                  ? "bg-orange-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Buscar por # de pedido, cliente o email..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Vendedor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los vendedores</SelectItem>
                  <SelectItem value="techstore">TechStore EC</SelectItem>
                  <SelectItem value="modastyle">ModaStyle</SelectItem>
                  <SelectItem value="homedecor">HomeDecor</SelectItem>
                </SelectContent>
              </Select>
              <Input type="date" className="w-full sm:w-48" />
              <Button variant="outline" className="gap-2 bg-transparent">
                <Filter className="w-4 h-4" />
                Más filtros
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Bulk Actions */}
        {selectedOrders.length > 0 && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 flex items-center justify-between">
            <p className="text-orange-800">
              {selectedOrders.length} pedido(s) seleccionado(s)
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">Cambiar Estado</Button>
              <Button variant="outline" size="sm">Imprimir</Button>
            </div>
          </div>
        )}

        {/* Orders Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="w-12 px-4 py-3">
                      <Checkbox
                        checked={selectedOrders.length === filteredOrders.length && filteredOrders.length > 0}
                        onCheckedChange={toggleSelectAll}
                      />
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Pedido</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Cliente</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Total</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Estado</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Pago</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Vendedor</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Fecha</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <Checkbox
                          checked={selectedOrders.includes(order.id)}
                          onCheckedChange={() => toggleSelectOrder(order.id)}
                        />
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-medium text-orange-600">{order.id}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-medium text-gray-900">{order.customer.name}</p>
                          <p className="text-sm text-gray-500">{order.customer.email}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-medium">${order.total.toFixed(2)}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${statusConfig[order.status].bg} ${statusConfig[order.status].text}`}>
                          {statusConfig[order.status].icon}
                          {statusConfig[order.status].label}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-sm ${order.paymentStatus === "pagado" ? "text-green-600" : order.paymentStatus === "reembolsado" ? "text-red-600" : "text-yellow-600"}`}>
                          {order.paymentStatus}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-gray-600">{order.vendor}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-gray-600">{order.date}</span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setViewOrder(order)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => setViewOrder(order)}>
                                <Eye className="w-4 h-4 mr-2" />
                                Ver detalles
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Printer className="w-4 h-4 mr-2" />
                                Imprimir
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <XCircle className="w-4 h-4 mr-2" />
                                Cancelar pedido
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-4 py-3 border-t">
              <p className="text-sm text-gray-500">
                Mostrando {filteredOrders.length} de {orders.length} pedidos
              </p>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" className="bg-orange-500 text-white hover:bg-orange-600">
                  1
                </Button>
                <Button variant="outline" size="sm">2</Button>
                <Button variant="outline" size="sm">3</Button>
                <Button variant="outline" size="sm">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order Detail Modal - Full Screen */}
        {viewOrder && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-7xl max-h-[95vh] overflow-hidden flex flex-col">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b bg-gray-50">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Pedido {viewOrder.id} - Artículos del pedido
                  </h2>
                  <p className="text-gray-500">Fecha: {viewOrder.date}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setViewOrder(null)}>
                  <X className="w-6 h-6" />
                </Button>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Left Column - Order Items & Addresses */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Order Items */}
                    <div className="bg-white border rounded-xl p-6">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 font-semibold text-gray-900">ITEM</th>
                            <th className="text-center py-3 font-semibold text-gray-900">COST</th>
                            <th className="text-center py-3 font-semibold text-gray-900">QTY</th>
                            <th className="text-right py-3 font-semibold text-gray-900">TOTAL</th>
                          </tr>
                        </thead>
                        <tbody>
                          {viewOrder.items.map((item, index) => (
                            <tr key={index} className="border-b">
                              <td className="py-4">
                                <div className="flex items-center gap-4">
                                  <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                                    <img
                                      src={item.image || "/placeholder.svg"}
                                      alt={item.name}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <span className="font-medium text-gray-900">{item.name}</span>
                                </div>
                              </td>
                              <td className="text-center py-4">${item.price.toFixed(2)}</td>
                              <td className="text-center py-4">{item.qty}</td>
                              <td className="text-right py-4 font-medium">${(item.price * item.qty).toFixed(2)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      <div className="mt-6 space-y-2 border-t pt-4">
                        <div className="flex justify-between text-gray-600">
                          <span>Discount:</span>
                          <span>- ${viewOrder.discount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                          <span>Shipping:</span>
                          <span>${viewOrder.shipping.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t">
                          <span>Order Total:</span>
                          <span>${viewOrder.total.toFixed(2)}</span>
                        </div>
                        {viewOrder.paymentStatus === "reembolsado" && (
                          <div className="flex justify-between text-red-600">
                            <span>Refunded:</span>
                            <span>-${viewOrder.total.toFixed(2)}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Addresses */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-white border rounded-xl p-6">
                        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                          <FileText className="w-5 h-5" />
                          Dirección de facturación
                        </h3>
                        <div className="text-gray-600 space-y-1">
                          <p className="font-medium text-gray-900">{viewOrder.billingAddress.name}</p>
                          <p>{viewOrder.billingAddress.address}</p>
                          <p>{viewOrder.billingAddress.city}</p>
                          <p>{viewOrder.billingAddress.province}</p>
                          <p>{viewOrder.billingAddress.zip}</p>
                        </div>
                      </div>

                      <div className="bg-white border rounded-xl p-6">
                        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                          <Truck className="w-5 h-5" />
                          Dirección de envío
                        </h3>
                        <div className="text-gray-600 space-y-1">
                          <p className="font-medium text-gray-900">{viewOrder.shippingAddress.name}</p>
                          <p>{viewOrder.shippingAddress.address}</p>
                          <p>{viewOrder.shippingAddress.city}</p>
                          <p>{viewOrder.shippingAddress.province}</p>
                          <p>{viewOrder.shippingAddress.zip}</p>
                        </div>
                      </div>
                    </div>

                    {/* Downloadable Products */}
                    <div className="bg-white border rounded-xl p-6">
                      <h3 className="font-semibold text-gray-900 mb-4">Permisos del producto descargable</h3>
                      <div className="flex gap-2">
                        <Input placeholder="Search for a downloadable product..." className="flex-1" />
                      </div>
                      <Button className="mt-4 bg-green-600 hover:bg-green-700">
                        Otorgar Acceso
                      </Button>
                    </div>
                  </div>

                  {/* Right Column - Details & Notes */}
                  <div className="space-y-6">
                    {/* General Details */}
                    <div className="bg-white border rounded-xl p-6">
                      <h3 className="font-semibold text-gray-900 mb-4">Detalles generales</h3>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-gray-500">Estado del pedido:</p>
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded text-sm font-medium mt-1 ${statusConfig[viewOrder.status].bg} ${statusConfig[viewOrder.status].text}`}>
                            {statusConfig[viewOrder.status].icon}
                            {statusConfig[viewOrder.status].label}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Fecha de pedido:</p>
                          <p className="font-medium text-gray-900">{viewOrder.date}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Ganancias del pedido:</p>
                          <p className="text-xl font-bold text-green-600">${(viewOrder.total * 0.95).toFixed(2)}</p>
                        </div>
                        <div className="pt-4 border-t">
                          <p className="text-sm text-gray-500">Cliente:</p>
                          <p className="font-medium text-gray-900">{viewOrder.customer.name}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Correo electrónico:</p>
                          <p className="text-orange-600">{viewOrder.customer.email}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Teléfono:</p>
                          <p className="font-medium text-gray-900">{viewOrder.customer.phone}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">IP del cliente:</p>
                          <p className="text-gray-600 font-mono text-sm">{viewOrder.ip}</p>
                        </div>
                      </div>
                    </div>

                    {/* Order Notes */}
                    <div className="bg-white border rounded-xl p-6">
                      <h3 className="font-semibold text-gray-900 mb-4">Notas del pedido</h3>
                      <div className="space-y-4 mb-4">
                        {viewOrder.notes.length > 0 ? (
                          viewOrder.notes.map((note, index) => (
                            <div key={index} className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded">
                              <p className="text-gray-700">{note.text}</p>
                              <div className="flex items-center justify-between mt-2">
                                <p className="text-sm text-gray-500">añadido {note.date}</p>
                                <button className="text-sm text-red-600 hover:underline">
                                  Eliminar nota
                                </button>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-500 text-sm">No hay notas para este pedido.</p>
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Añadir nota</h4>
                        <Textarea
                          placeholder="Escribe una nota..."
                          value={newNote}
                          onChange={(e) => setNewNote(e.target.value)}
                          className="mb-2"
                        />
                        <Button className="bg-orange-500 hover:bg-orange-600">
                          Añadir Nota
                        </Button>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="bg-white border rounded-xl p-6">
                      <h3 className="font-semibold text-gray-900 mb-4">Acciones</h3>
                      <div className="space-y-2">
                        <Select defaultValue={viewOrder.status}>
                          <SelectTrigger>
                            <SelectValue placeholder="Cambiar estado" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pendiente">Pendiente</SelectItem>
                            <SelectItem value="procesando">Procesando</SelectItem>
                            <SelectItem value="en-espera">En espera</SelectItem>
                            <SelectItem value="enviado">Enviado</SelectItem>
                            <SelectItem value="completado">Completado</SelectItem>
                            <SelectItem value="cancelado">Cancelado</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button className="w-full bg-orange-500 hover:bg-orange-600">
                          Actualizar Estado
                        </Button>
                        <Button variant="outline" className="w-full gap-2 bg-transparent">
                          <Printer className="w-4 h-4" />
                          Imprimir Pedido
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Suspense>
  )
}
