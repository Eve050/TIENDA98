"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import VendorSidebar from "@/components/vendor-sidebar"
import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, Search, Filter, RefreshCcw, Download, User, Phone, Mail, MapPin, CreditCard, ChevronRight, X, Trash2, ExternalLink, Loader2, Check, AlertTriangle } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Calendar as CalendarIcon } from "lucide-react"
import { format, isWithinInterval, startOfDay, endOfDay } from "date-fns"
import { es } from "date-fns/locale"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

const mockOrders = [
  {
    id: "10988",
    total: "$50.00",
    earnings: "$47.50",
    status: "En-espera",
    client: "Terry Mendieta",
    date: "agosto 1, 2025",
    createdAt: new Date(2025, 7, 1),
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
    createdAt: new Date(2025, 7, 1),
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
    createdAt: new Date(2023, 9, 10),
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
    createdAt: new Date(2023, 8, 11),
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

export default function VendedorPedidosPage() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()

  const [orders, setOrders] = useState(mockOrders)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("Todos")
  const [filterCustomer, setFilterCustomer] = useState("all")
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  })
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null)
  const [orderNote, setOrderNote] = useState("")
  const [totalCardActive, setTotalCardActive] = useState(false)
  const [addressModal, setAddressModal] = useState<{ type: "billing" | "shipping"; data: string } | null>(null)
  const [isManaging, setIsManaging] = useState(false)
  const [isPrinting, setIsPrinting] = useState(false)
  const [orderToDelete, setOrderToDelete] = useState<string | null>(null)

  const handleAddNote = () => {
    if (!orderNote.trim() || !selectedOrder) return
    setOrders(prev => prev.map(o => o.id === selectedOrder
      ? { ...o, notes: [...o.notes, { text: orderNote, date: format(new Date(), "p 'del' dd/MM/yyyy", { locale: es }) }] }
      : o
    ))
    setOrderNote("")
  }

  const handlePrint = () => {
    setIsPrinting(true)
    setTimeout(() => {
      setIsPrinting(false)
      alert(`Factura del pedido #${selectedOrder} generada con éxito.`)
    }, 1500)
  }

  const handleManage = () => {
    if (!selectedOrder) return
    setIsManaging(true)

    setTimeout(() => {
      setOrders(prev => prev.map(o => o.id === selectedOrder
        ? {
          ...o,
          status: "Completado",
          notes: [
            ...o.notes,
            { text: "El pedido ha sido marcado como Completado por el vendedor.", date: format(new Date(), "p 'del' dd/MM/yyyy", { locale: es }) }
          ]
        }
        : o
      ))
      setIsManaging(false)
      alert(`Pedido #${selectedOrder} gestionado y marcado como completado.`)
    }, 2000)
  }

  useEffect(() => {
    if (!isAuthenticated || user?.type !== "seller") {
      router.push("/mi-cuenta")
    }
  }, [isAuthenticated, user, router])

  if (!isAuthenticated || !user || user?.type !== "seller") {
    return null
  }

  const handleDeleteOrder = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setOrderToDelete(id)
  }

  const confirmDeleteOrder = () => {
    if (orderToDelete) {
      setOrders(orders.filter(order => order.id !== orderToDelete))
      setOrderToDelete(null)
    }
  }

  const handleReset = () => {
    setSearchTerm("")
    setFilterStatus("Todos")
    setFilterCustomer("all")
    setDateRange({ from: undefined, to: undefined })
  }

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = filterStatus === "Todos" || order.status === filterStatus
    const matchesCustomer = filterCustomer === "all" || order.client === (filterCustomer === "terry" ? "Terry Mendieta" : "Alex Jumbo")

    let matchesDate = true
    if (dateRange.from && dateRange.to && (order as any).createdAt) {
      matchesDate = isWithinInterval((order as any).createdAt, {
        start: startOfDay(dateRange.from),
        end: endOfDay(dateRange.to),
      })
    } else if (dateRange.from && (order as any).createdAt) {
      matchesDate = startOfDay((order as any).createdAt) >= startOfDay(dateRange.from)
    }

    return matchesSearch && matchesStatus && matchesCustomer && matchesDate
  })

  const currentOrder = orders.find(o => o.id === selectedOrder)

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FBFC]">
      <Header />
      <div className="flex flex-1">
        <VendorSidebar />
        <main className="flex-1 p-6 md:p-10">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Header section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h1 className="text-3xl font-black text-[#2D3142] tracking-tight uppercase">GESTIÓN DE PEDIDOS</h1>
                <p className="text-slate-400 font-medium font-outfit">Controla y procesa tus ventas en tiempo real</p>
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={() => alert("Exportando pedidos...")}
                  className="bg-white text-[#2D3142] border border-slate-100 hover:bg-slate-50 font-black px-6 py-6 rounded-2xl shadow-sm transition-all active:scale-95"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Exportar Todo
                </Button>
                <Button
                  onClick={() => alert("Sincronizando con el servidor...")}
                  className="bg-[#2D3142] hover:bg-black text-white font-black px-8 py-6 rounded-2xl shadow-lg shadow-slate-200 transition-all active:scale-95"
                >
                  <RefreshCcw className="w-4 h-4 mr-2" />
                  Sincronizar
                </Button>
              </div>
            </div>

            {/* Stats/Tabs section */}
            <div className="flex flex-wrap gap-2 pb-2">
              <Badge
                onClick={() => setFilterStatus("Todos")}
                variant="outline"
                className={`px-5 py-2.5 rounded-full border-none font-black text-[10px] uppercase tracking-wider cursor-pointer transition-all ${filterStatus === "Todos" ? "bg-[#2D3142] text-white" : "bg-white text-slate-400 hover:bg-slate-50"}`}>
                Todos ({orders.length})
              </Badge>
              <Badge
                onClick={() => setFilterStatus("Pendiente de pago")}
                variant="outline"
                className={`px-5 py-2.5 rounded-full border font-black text-[10px] uppercase tracking-wider cursor-pointer transition-all ${filterStatus === "Pendiente de pago" ? "bg-[#2D3142] text-white border-transparent" : "bg-white text-slate-400 border-slate-100 hover:bg-slate-50"}`}>
                Pendiente de pago ({orders.filter(o => o.status === "Pendiente de pago").length})
              </Badge>
              <Badge
                onClick={() => setFilterStatus("En-espera")}
                variant="outline"
                className={`px-5 py-2.5 rounded-full border font-black text-[10px] uppercase tracking-wider cursor-pointer transition-all ${filterStatus === "En-espera" ? "bg-[#2D3142] text-white border-transparent" : "bg-white text-slate-400 border-slate-100 hover:bg-slate-50"}`}>
                En espera ({orders.filter(o => o.status === "En-espera").length})
              </Badge>
              <Badge
                onClick={() => setFilterStatus("Completado")}
                variant="outline"
                className={`px-5 py-2.5 rounded-full border font-black text-[10px] uppercase tracking-wider cursor-pointer transition-all ${filterStatus === "Completado" ? "bg-[#2D3142] text-white border-transparent" : "bg-white text-slate-400 border-slate-100 hover:bg-slate-50"}`}>
                Completado ({orders.filter(o => o.status === "Completado").length})
              </Badge>
              <Badge
                onClick={() => setFilterStatus("Cancelado")}
                variant="outline"
                className={`px-5 py-2.5 rounded-full border font-black text-[10px] uppercase tracking-wider cursor-pointer transition-all ${filterStatus === "Cancelado" ? "bg-[#2D3142] text-white border-transparent" : "bg-white text-slate-400 border-slate-100 hover:bg-slate-50"}`}>
                Cancelado ({orders.filter(o => o.status === "Cancelado").length})
              </Badge>
            </div>

            {/* Filter Bar */}
            <Card className="border-none shadow-sm rounded-[32px] p-6 bg-white">
              <div className="flex flex-wrap items-center gap-4">
                <div className="relative flex-1 min-w-[300px]">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    placeholder="Buscar por ID, cliente o correo..."
                    className="pl-11 rounded-2xl h-12 bg-slate-50 border-slate-100 focus:ring-[#2D3142]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={filterCustomer} onValueChange={setFilterCustomer}>
                  <SelectTrigger className="w-56 rounded-2xl h-12 bg-slate-50 border-slate-100 font-bold text-xs uppercase text-left">
                    <SelectValue placeholder="Filtrar por cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los clientes</SelectItem>
                    <SelectItem value="terry">Terry Mendieta</SelectItem>
                    <SelectItem value="alex">Alex Jumbo</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-56 rounded-2xl h-12 bg-slate-50 border-slate-100 font-bold text-xs uppercase text-left">
                    <SelectValue placeholder="Estado de pago" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Todos">Todos los estados</SelectItem>
                    <SelectItem value="Pendiente de pago">Pendiente de pago</SelectItem>
                    <SelectItem value="En-espera">En espera</SelectItem>
                    <SelectItem value="Completado">Completado</SelectItem>
                    <SelectItem value="Cancelado">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-64 justify-start text-left font-bold text-xs uppercase h-12 rounded-2xl bg-slate-50 border-slate-100 hover:bg-slate-100 transition-colors",
                        !dateRange.from && "text-slate-400"
                      )}
                    >
                      <CalendarIcon className="mr-3 h-4 w-4" />
                      {dateRange.from ? (
                        dateRange.to ? (
                          <>
                            {format(dateRange.from as Date, "LLL dd, y", { locale: es })} -{" "}
                            {format(dateRange.to as Date, "LLL dd, y", { locale: es })}
                          </>
                        ) : (
                          format(dateRange.from as Date, "LLL dd, y", { locale: es })
                        )
                      ) : (
                        <span>Rango de Fechas</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 rounded-3xl border-none shadow-2xl" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={dateRange.from}
                      selected={{ from: dateRange.from, to: dateRange.to }}
                      onSelect={(range: any) => setDateRange({ from: range?.from, to: range?.to })}
                      numberOfMonths={2}
                      locale={es}
                    />
                  </PopoverContent>
                </Popover>
                <Button
                  variant="ghost"
                  onClick={handleReset}
                  className="text-xs font-bold text-slate-400 hover:text-orange-600 px-6"
                >
                  RESTABLECER
                </Button>
              </div>
            </Card>

            {/* Orders Table */}
            <div className="bg-white rounded-[32px] shadow-sm border border-slate-50 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-[#F8FAFC]">
                    <tr className="border-b border-slate-100">
                      <th className="px-8 py-6 text-[11px] font-black uppercase tracking-[0.2em] text-[#2D3142] text-left leading-none">N° PEDIDO</th>
                      <th className="px-8 py-6 text-[11px] font-black uppercase tracking-[0.2em] text-[#2D3142] text-left leading-none">CLIENTE</th>
                      <th className="px-8 py-6 text-[11px] font-black uppercase tracking-[0.2em] text-[#2D3142] text-left leading-none">FECHA</th>
                      <th className="px-8 py-6 text-[11px] font-black uppercase tracking-[0.2em] text-[#2D3142] text-center leading-none">ESTADO</th>
                      <th className="px-8 py-6 text-[11px] font-black uppercase tracking-[0.2em] text-[#2D3142] text-right leading-none">TOTAL</th>
                      <th className="px-8 py-6 text-[11px] font-black uppercase tracking-[0.2em] text-[#2D3142] text-right leading-none">GANANCIA</th>
                      <th className="px-8 py-6 text-[11px] font-black uppercase tracking-[0.2em] text-[#2D3142] text-right leading-none">ACCIONES</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {filteredOrders.length > 0 ? (
                      filteredOrders.map((order) => (
                        <tr
                          key={order.id}
                          className="hover:bg-slate-50/50 transition-colors group"
                        >
                          <td className="px-8 py-5">
                            <span className="font-black text-[#2D3142] text-sm">#{order.id}</span>
                          </td>
                          <td className="px-8 py-5">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-[#2D3142] font-black text-xs">
                                {order.client.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div>
                                <p className="font-bold text-[#2D3142] text-sm line-clamp-1">{order.client}</p>
                                <p className="text-[10px] font-medium text-slate-400">{order.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-5">
                            <p className="text-xs font-bold text-slate-600">{order.date}</p>
                          </td>
                          <td className="px-8 py-5 text-center">
                            <span
                              className={`inline-block px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter ${order.status === "Completado"
                                ? "bg-green-50 text-green-600"
                                : "bg-orange-50 text-orange-600"
                                }`}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td className="px-8 py-5 text-right font-black text-[#2D3142] text-sm">
                            {order.total}
                          </td>
                          <td className="px-8 py-5 text-right font-black text-orange-600 text-sm">
                            {order.earnings}
                          </td>
                          <td className="px-8 py-7 text-right">
                            <div className="flex items-center justify-end gap-3">
                              <button
                                onClick={() => setSelectedOrder(order.id)}
                                className="w-12 h-12 bg-white text-slate-400 hover:text-blue-600 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-50 flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                              >
                                <Eye className="w-5 h-5" />
                              </button>
                              <button
                                onClick={(e) => handleDeleteOrder(order.id, e)}
                                className="w-12 h-12 bg-white text-slate-400 hover:text-red-500 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-50 flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="px-8 py-20 text-center">
                          <p className="font-black text-[#2D3142] uppercase text-lg">No se encontraron pedidos</p>
                          <p className="text-slate-400 text-xs font-bold mt-2">Pruebe a cambiar los filtros o el término de búsqueda</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>

      <Dialog open={!!selectedOrder} onOpenChange={(open) => {
        if (!open) {
          setSelectedOrder(null)
          setTotalCardActive(false)
          setOrderNote("")
        }
      }}>
        <DialogContent className="max-w-4xl w-full p-0 overflow-hidden rounded-2xl border-0 shadow-2xl gap-0" style={{ maxHeight: "90vh", overflowY: "auto" }}>

          {/* ── HEADER ─────────────────────────────────────────────── */}
          <div className="flex items-center justify-between px-7 py-5 bg-[#1a1d2e]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
                <Eye size={16} className="text-white" />
              </div>
              <div>
                <p className="text-white/40 text-[9px] uppercase tracking-[0.25em] font-bold leading-none mb-1">Pedido</p>
                <p className="text-white text-lg font-black tracking-tight leading-none">#{currentOrder?.id}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {currentOrder && (
                <span
                  className="text-[10px] font-bold px-3 py-1.5 rounded-full"
                  style={{
                    background:
                      currentOrder.status === "Completado" ? "#16a34a20" :
                        currentOrder.status === "En-espera" ? "#d9770620" :
                          currentOrder.status === "Cancelado" ? "#dc262620" : "#2563eb20",
                    color:
                      currentOrder.status === "Completado" ? "#16a34a" :
                        currentOrder.status === "En-espera" ? "#d97706" :
                          currentOrder.status === "Cancelado" ? "#dc2626" : "#2563eb",
                    border: `1px solid ${currentOrder.status === "Completado" ? "#16a34a40" :
                      currentOrder.status === "En-espera" ? "#d9770640" :
                        currentOrder.status === "Cancelado" ? "#dc262640" : "#2563eb40"
                      }`
                  }}
                >
                  {currentOrder.status === "En-espera" ? "En espera" : currentOrder.status}
                </span>
              )}
            </div>
          </div>

          {currentOrder && (
            <>
              {/* ── METRICS ROW ──────────────────────────────────────── */}
              <div className="grid grid-cols-4 divide-x divide-slate-100 bg-white border-b border-slate-100">
                <div className="px-6 py-4">
                  <p className="text-[9px] uppercase tracking-widest font-bold text-slate-400 mb-1">Fecha</p>
                  <p className="font-bold text-slate-800 text-sm">{currentOrder.date}</p>
                </div>
                <div
                  onClick={() => setTotalCardActive(!totalCardActive)}
                  className={cn(
                    "px-6 py-4 cursor-pointer transition-all duration-300 group relative",
                    totalCardActive ? "bg-[#1a1d2e]" : "bg-white hover:bg-slate-50"
                  )}
                >
                  <p className={cn("text-[9px] uppercase tracking-widest font-bold mb-1 transition-colors", totalCardActive ? "text-white/40" : "text-slate-400")}>Total del pedido</p>
                  <div className="flex items-center justify-between">
                    <p className={cn("font-black text-lg transition-colors", totalCardActive ? "text-white" : "text-slate-800")}>{currentOrder.total}</p>
                    {!totalCardActive && <ChevronRight size={14} className="text-slate-300 group-hover:translate-x-1 transition-all" />}
                  </div>
                  {!totalCardActive && <span className="absolute bottom-1.5 left-6 text-[8px] font-bold text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-tighter">Ver detalles</span>}
                </div>
                <div className="px-6 py-4">
                  <p className="text-[9px] uppercase tracking-widest font-bold text-slate-400 mb-1">Comisión</p>
                  <p className="font-black text-rose-500 text-lg">
                    -${(parseFloat(currentOrder.total.replace("$", "")) - parseFloat(currentOrder.earnings.replace("$", ""))).toFixed(2)}
                  </p>
                </div>
                <div className="px-6 py-4">
                  <p className="text-[9px] uppercase tracking-widest font-bold text-slate-400 mb-1">Tu ganancia</p>
                  <p className="font-black text-emerald-600 text-lg">{currentOrder.earnings}</p>
                  <p className="text-[9px] text-emerald-500 mt-0.5">Acreditado en 48h</p>
                </div>
              </div>

              {/* ── BODY ─────────────────────────────────────────────── */}
              <div className="grid grid-cols-3 bg-slate-50">

                {/* LEFT: Products + Notes */}
                <div className="col-span-2 p-6 space-y-4">

                  {/* Products */}
                  <div className="bg-white rounded-xl border border-slate-100 overflow-hidden shadow-sm">
                    <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-50">
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Productos</span>
                      <span className="text-[9px] bg-slate-100 text-slate-500 px-2 py-1 rounded-full font-bold">
                        {currentOrder.items.length} item(s)
                      </span>
                    </div>

                    {currentOrder.items.map((item: any, idx: number) => (
                      <div key={idx} className="flex items-center gap-4 px-5 py-4 border-b border-slate-50 last:border-0">
                        <div className="w-14 h-14 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-slate-800 text-sm">{item.name}</p>
                          <p className="text-[10px] text-slate-400 mt-0.5">Cantidad: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-black text-slate-800 text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                          <p className="text-[10px] text-slate-400">${item.price.toFixed(2)} c/u</p>
                        </div>
                      </div>
                    ))}

                    {/* Totals */}
                    <div className="bg-slate-50 px-5 py-3 space-y-1.5">
                      {[
                        { label: "Subtotal", value: currentOrder.total },
                        { label: "Descuento", value: currentOrder.discount ? `-$${currentOrder.discount}` : "—" },
                        { label: "Envío", value: currentOrder.shipping ? `$${currentOrder.shipping}` : "Gratis" },
                      ].map((row, i) => (
                        <div key={i} className="flex justify-between text-[11px]">
                          <span className="text-slate-500">{row.label}</span>
                          <span className="text-slate-600 font-medium">{row.value}</span>
                        </div>
                      ))}
                      <div className="flex justify-between text-[13px] pt-2 border-t border-slate-200">
                        <span className="font-black text-slate-800">Total</span>
                        <span className="font-black text-slate-800">{currentOrder.total}</span>
                      </div>
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="bg-white rounded-xl border border-slate-100 overflow-hidden shadow-sm">
                    <div className="px-5 py-3.5 border-b border-slate-50">
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Notas del pedido</span>
                    </div>
                    <div className="p-5 space-y-3">
                      {currentOrder.notes.length > 0
                        ? currentOrder.notes.map((note: any, i: number) => (
                          <div key={i} className="flex gap-2.5 text-[11px]">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 flex-shrink-0" />
                            <div>
                              <p className="text-slate-700">{note.text}</p>
                              <p className="text-slate-400 mt-0.5">{note.date}</p>
                            </div>
                          </div>
                        ))
                        : <p className="text-[11px] text-slate-400 italic">Sin notas para este pedido.</p>
                      }
                      <div className="pt-2 border-t border-slate-100 flex gap-2">
                        <input
                          value={orderNote}
                          onChange={e => setOrderNote(e.target.value)}
                          onKeyDown={e => e.key === 'Enter' && handleAddNote()}
                          placeholder="Añadir nota..."
                          className="flex-1 text-[11px] px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1a1d2e]/20 bg-slate-50"
                        />
                        <button
                          onClick={handleAddNote}
                          className="px-3 py-2 bg-[#1a1d2e] text-white text-[10px] font-bold rounded-lg hover:bg-black transition-colors"
                        >
                          Añadir
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* RIGHT: Client info */}
                <div className="col-span-1 p-6 space-y-4 border-l border-slate-100">

                  {/* Client */}
                  <div className="bg-white rounded-xl border border-slate-100 p-5 shadow-sm">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4">Cliente</p>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-[#1a1d2e] flex items-center justify-center text-white font-black text-xs">
                        {currentOrder.client.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 text-sm leading-tight">{currentOrder.client}</p>
                        <p className="text-[9px] text-slate-400">Cliente registrado</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-[11px] text-slate-600">
                        <Mail size={11} className="text-slate-400 flex-shrink-0" />
                        <span className="truncate">{currentOrder.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-slate-600">
                        <Phone size={11} className="text-slate-400 flex-shrink-0" />
                        <span>{currentOrder.phone}</span>
                      </div>
                    </div>
                  </div>

                  {/* Billing */}
                  <div
                    onClick={() => setAddressModal({ type: "billing", data: currentOrder.billingAddress })}
                    className="bg-white rounded-xl border border-slate-100 p-5 shadow-sm hover:border-[#1a1d2e] hover:shadow-md transition-all cursor-pointer group overflow-hidden"
                  >
                    <div className="flex items-center justify-between mb-3 w-full border-b border-slate-50 pb-2">
                      <div className="flex items-center gap-1.5 overflow-hidden">
                        <MapPin size={12} className="text-slate-400 group-hover:text-[#1a1d2e] transition-colors flex-shrink-0" />
                        <span className="text-[9px] font-black uppercase tracking-normal text-slate-500 truncate">Facturación</span>
                      </div>
                      <ChevronRight size={10} className="text-slate-300 group-hover:text-[#1a1d2e] transition-colors flex-shrink-0" />
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed whitespace-pre-line line-clamp-2">{currentOrder.billingAddress}</p>
                  </div>

                  {/* Shipping */}
                  <div
                    onClick={() => setAddressModal({ type: "shipping", data: currentOrder.shippingAddress })}
                    className="bg-white rounded-xl border border-slate-100 p-5 shadow-sm hover:border-[#1a1d2e] hover:shadow-md transition-all cursor-pointer group overflow-hidden"
                  >
                    <div className="flex items-center justify-between mb-3 w-full border-b border-slate-50 pb-2">
                      <div className="flex items-center gap-1.5 overflow-hidden">
                        <CreditCard size={12} className="text-slate-400 group-hover:text-[#1a1d2e] transition-colors flex-shrink-0" />
                        <span className="text-[9px] font-black uppercase tracking-normal text-slate-500 truncate">Envío</span>
                      </div>
                      <ChevronRight size={10} className="text-slate-300 group-hover:text-[#1a1d2e] transition-colors flex-shrink-0" />
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed whitespace-pre-line line-clamp-2">{currentOrder.shippingAddress}</p>
                  </div>

                  {/* IP */}
                  <div className="px-4 py-3 rounded-xl bg-slate-100">
                    <p className="text-[9px] text-slate-400 uppercase tracking-wider font-bold mb-1">IP del cliente</p>
                    <p className="text-[9px] text-slate-500 font-mono break-all">{currentOrder.ip}</p>
                  </div>
                </div>
              </div>

              {/* ── FOOTER ───────────────────────────────────────────── */}
              <div className="flex items-center justify-between px-7 py-4 bg-white border-t border-slate-100">
                <button
                  onClick={handlePrint}
                  disabled={isPrinting}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-[11px] font-bold text-slate-600 hover:bg-slate-50 transition-all disabled:opacity-50"
                >
                  {isPrinting ? <Loader2 size={13} className="animate-spin" /> : <Download size={13} />}
                  {isPrinting ? "Generando..." : "Imprimir Factura"}
                </button>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="text-[11px] font-bold text-slate-400 hover:text-slate-700 transition-colors px-4 py-2.5"
                  >
                    Cerrar
                  </button>
                  <button
                    onClick={handleManage}
                    disabled={isManaging}
                    className="flex items-center gap-1.5 px-5 py-2.5 bg-[#1a1d2e] hover:bg-black text-white text-[11px] font-black rounded-xl transition-all disabled:opacity-50 shadow-lg shadow-slate-200 active:scale-95"
                  >
                    {isManaging ? <Loader2 size={13} className="animate-spin" /> : <Check size={13} />}
                    {isManaging ? "Gestionando..." : "Gestionar Pedido"}
                    {!isManaging && <ChevronRight size={13} />}
                  </button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* ── ADDRESS DETAIL MODAL ─────────────────────────────────── */}
      <Dialog open={!!addressModal} onOpenChange={() => setAddressModal(null)}>
        <DialogContent className="max-w-md p-0 overflow-hidden rounded-[32px] border-0 shadow-2xl">
          <div className="bg-[#1a1d2e] px-8 py-6 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                {addressModal?.type === "billing" ? <MapPin size={18} /> : <CreditCard size={18} />}
              </div>
              <div>
                <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold mb-0.5">Detalle de</p>
                <p className="text-lg font-black">{addressModal?.type === "billing" ? "Facturación" : "Envío"}</p>
              </div>
            </div>
            <button onClick={() => setAddressModal(null)} className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
              <X size={16} />
            </button>
          </div>
          <div className="p-8 bg-white">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
              <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line font-medium">
                {addressModal?.data}
              </p>
            </div>
            <button
              onClick={() => setAddressModal(null)}
              className="w-full mt-6 py-4 bg-[#1a1d2e] hover:bg-black text-white text-xs font-black rounded-xl transition-all shadow-lg shadow-slate-200"
            >
              ENTENDIDO
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ── DELETE CONFIRMATION MODAL ────────────────────────────── */}
      <Dialog open={!!orderToDelete} onOpenChange={() => setOrderToDelete(null)}>
        <DialogContent className="max-w-sm p-0 overflow-hidden rounded-[32px] border-0 shadow-2xl">
          <div className="p-8 text-center bg-white">
            <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-red-500">
              <AlertTriangle size={32} />
            </div>
            <h3 className="text-xl font-black text-[#2D3142] mb-2 uppercase tracking-tight">¿Seguro de eliminar?</h3>
            <p className="text-slate-400 text-xs font-medium mb-8 leading-relaxed">
              Esta acción no se puede deshacer. El pedido seleccionado será eliminado permanentemente.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setOrderToDelete(null)}
                className="py-3.5 bg-slate-50 hover:bg-slate-100 text-slate-500 text-[11px] font-black rounded-xl transition-all uppercase tracking-wider"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDeleteOrder}
                className="py-3.5 bg-red-50 hover:bg-red-100 text-red-600 text-[11px] font-black rounded-xl transition-all uppercase tracking-wider"
              >
                Eliminar
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
