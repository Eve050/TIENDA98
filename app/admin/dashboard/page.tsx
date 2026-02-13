"use client"

import { useState } from "react"
import {
  DollarSign,
  ShoppingCart,
  Package,
  Users,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Store,
  CreditCard,
  Truck,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  MoreVertical,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import Link from "next/link"

const salesData = [
  { name: "Ene", ventas: 4000, pedidos: 240 },
  { name: "Feb", ventas: 3000, pedidos: 198 },
  { name: "Mar", ventas: 5000, pedidos: 300 },
  { name: "Abr", ventas: 4500, pedidos: 278 },
  { name: "May", ventas: 6000, pedidos: 389 },
  { name: "Jun", ventas: 5500, pedidos: 349 },
  { name: "Jul", ventas: 7000, pedidos: 430 },
]

const categoryData = [
  { name: "Tecnología", value: 35, color: "#f97316" },
  { name: "Moda", value: 25, color: "#3b82f6" },
  { name: "Hogar", value: 20, color: "#10b981" },
  { name: "Repuestos", value: 12, color: "#8b5cf6" },
  { name: "Otros", value: 8, color: "#6b7280" },
]

const recentOrders = [
  { id: "#10992", customer: "Juan Pérez", total: "$125.00", status: "completado", date: "Hace 5 min" },
  { id: "#10991", customer: "María García", total: "$89.50", status: "procesando", date: "Hace 15 min" },
  { id: "#10990", customer: "Carlos López", total: "$250.00", status: "pendiente", date: "Hace 30 min" },
  { id: "#10989", customer: "Ana Martínez", total: "$45.00", status: "completado", date: "Hace 1 hora" },
  { id: "#10988", customer: "Terry Mendieta", total: "$50.00", status: "en-espera", date: "Hace 2 horas" },
]

const topProducts = [
  { name: "iPhone 15 Pro Max", sales: 156, revenue: "$156,000", image: "/modern-smartphone.png" },
  { name: "MacBook Pro M3", sales: 89, revenue: "$178,000", image: "/modern-laptop-workspace.png" },
  { name: "AirPods Pro", sales: 234, revenue: "$58,500", image: "/wireless-headphones.png" },
  { name: "Nike Air Max", sales: 178, revenue: "$21,360", image: "/nike-sneakers.jpg" },
]

const topVendors = [
  { name: "TechStore EC", sales: "$45,230", products: 156, rating: 4.9 },
  { name: "ModaStyle", sales: "$32,100", products: 89, rating: 4.7 },
  { name: "AutoParts Pro", sales: "$28,500", products: 234, rating: 4.8 },
  { name: "HomeDecor", sales: "$19,800", products: 67, rating: 4.5 },
]

const statusColors: Record<string, string> = {
  completado: "bg-green-100 text-green-700",
  procesando: "bg-blue-100 text-blue-700",
  pendiente: "bg-yellow-100 text-yellow-700",
  "en-espera": "bg-orange-100 text-orange-700",
  cancelado: "bg-red-100 text-red-700",
}

export default function AdminDashboard() {
  const [dateRange, setDateRange] = useState("7d")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500">Bienvenido al panel de administración</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Hoy</SelectItem>
              <SelectItem value="7d">Últimos 7 días</SelectItem>
              <SelectItem value="30d">Últimos 30 días</SelectItem>
              <SelectItem value="90d">Últimos 90 días</SelectItem>
              <SelectItem value="year">Este año</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-orange-500 hover:bg-orange-600">
            Descargar Reporte
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Ventas Totales</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">$45,231</p>
                <div className="flex items-center gap-1 mt-2 text-green-600 text-sm">
                  <TrendingUp className="w-4 h-4" />
                  <span>+12.5%</span>
                  <span className="text-gray-500">vs mes anterior</span>
                </div>
              </div>
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center">
                <DollarSign className="w-7 h-7 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Pedidos</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">856</p>
                <div className="flex items-center gap-1 mt-2 text-green-600 text-sm">
                  <TrendingUp className="w-4 h-4" />
                  <span>+8.2%</span>
                  <span className="text-gray-500">vs mes anterior</span>
                </div>
              </div>
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
                <ShoppingCart className="w-7 h-7 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Productos</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">1,234</p>
                <div className="flex items-center gap-1 mt-2 text-green-600 text-sm">
                  <TrendingUp className="w-4 h-4" />
                  <span>+24</span>
                  <span className="text-gray-500">nuevos esta semana</span>
                </div>
              </div>
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center">
                <Package className="w-7 h-7 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Usuarios</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">2,451</p>
                <div className="flex items-center gap-1 mt-2 text-green-600 text-sm">
                  <TrendingUp className="w-4 h-4" />
                  <span>+156</span>
                  <span className="text-gray-500">nuevos este mes</span>
                </div>
              </div>
              <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center">
                <Users className="w-7 h-7 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Store className="w-8 h-8 opacity-80" />
              <div>
                <p className="text-2xl font-bold">48</p>
                <p className="text-sm opacity-80">Vendedores</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 opacity-80" />
              <div>
                <p className="text-2xl font-bold">23</p>
                <p className="text-sm opacity-80">Pendientes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Truck className="w-8 h-8 opacity-80" />
              <div>
                <p className="text-2xl font-bold">156</p>
                <p className="text-sm opacity-80">En camino</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CreditCard className="w-8 h-8 opacity-80" />
              <div>
                <p className="text-2xl font-bold">$12.5k</p>
                <p className="text-sm opacity-80">Por pagar</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Ventas y Pedidos</CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Exportar CSV</DropdownMenuItem>
                <DropdownMenuItem>Ver detalles</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="ventas"
                    stroke="#f97316"
                    strokeWidth={3}
                    dot={{ fill: "#f97316", strokeWidth: 2 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="pedidos"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={{ fill: "#3b82f6", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full" />
                <span className="text-sm text-gray-600">Ventas ($)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full" />
                <span className="text-sm text-gray-600">Pedidos</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Categories Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Ventas por Categoría</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-4">
              {categoryData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-gray-600">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Pedidos Recientes</CardTitle>
            <Link href="/admin/pedidos">
              <Button variant="ghost" size="sm" className="text-orange-600">
                Ver todos
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border">
                      <ShoppingCart className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{order.id}</p>
                      <p className="text-sm text-gray-500">{order.customer}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{order.total}</p>
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${statusColors[order.status]}`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Productos Más Vendidos</CardTitle>
            <Link href="/admin/productos">
              <Button variant="ghost" size="sm" className="text-orange-600">
                Ver todos
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div
                  key={product.name}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border font-bold text-gray-400">
                      #{index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-500">{product.sales} vendidos</p>
                    </div>
                  </div>
                  <p className="font-medium text-green-600">{product.revenue}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Vendors */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Top Vendedores</CardTitle>
          <Link href="/admin/vendedores">
            <Button variant="ghost" size="sm" className="text-orange-600">
              Ver todos
              <ArrowUpRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {topVendors.map((vendor, index) => (
              <div
                key={vendor.name}
                className="p-4 bg-gray-50 rounded-xl"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <Store className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{vendor.name}</p>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">★</span>
                      <span className="text-sm text-gray-600">{vendor.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Ventas</span>
                    <span className="font-medium text-gray-900">{vendor.sales}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Productos</span>
                    <span className="font-medium text-gray-900">{vendor.products}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Activity/Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { icon: CheckCircle, color: "text-green-600", bg: "bg-green-100", text: "Pedido #10992 completado", time: "Hace 5 min" },
                { icon: Users, color: "text-blue-600", bg: "bg-blue-100", text: "Nuevo usuario registrado: María García", time: "Hace 15 min" },
                { icon: Store, color: "text-purple-600", bg: "bg-purple-100", text: "Nueva solicitud de vendedor: TechWorld", time: "Hace 30 min" },
                { icon: Package, color: "text-orange-600", bg: "bg-orange-100", text: "Producto agotado: iPhone 15 Pro (Negro)", time: "Hace 1 hora" },
                { icon: AlertCircle, color: "text-yellow-600", bg: "bg-yellow-100", text: "Disputa abierta en pedido #10985", time: "Hace 2 horas" },
              ].map((activity, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className={`w-10 h-10 ${activity.bg} rounded-full flex items-center justify-center`}>
                    <activity.icon className={`w-5 h-5 ${activity.color}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900">{activity.text}</p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Alertas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-red-50 border border-red-100 rounded-lg">
                <div className="flex items-center gap-2 text-red-600 font-medium">
                  <XCircle className="w-5 h-5" />
                  Stock Crítico
                </div>
                <p className="text-sm text-red-600 mt-1">5 productos con stock bajo</p>
              </div>
              <div className="p-4 bg-yellow-50 border border-yellow-100 rounded-lg">
                <div className="flex items-center gap-2 text-yellow-600 font-medium">
                  <AlertCircle className="w-5 h-5" />
                  Pedidos Pendientes
                </div>
                <p className="text-sm text-yellow-600 mt-1">23 pedidos sin procesar</p>
              </div>
              <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
                <div className="flex items-center gap-2 text-blue-600 font-medium">
                  <Store className="w-5 h-5" />
                  Solicitudes
                </div>
                <p className="text-sm text-blue-600 mt-1">3 vendedores esperando aprobación</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
