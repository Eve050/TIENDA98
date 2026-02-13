"use client"

import { useState } from "react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { AdminHeader } from "@/components/admin-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  BarChart3, 
  Download, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  Calendar,
  FileText,
  PieChart as PieChartIcon,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react"
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
  AreaChart,
  Area,
} from "recharts"

// Chart data
const salesData = [
  { name: "Ene", ventas: 12500, pedidos: 156, usuarios: 89 },
  { name: "Feb", ventas: 15800, pedidos: 198, usuarios: 112 },
  { name: "Mar", ventas: 14200, pedidos: 178, usuarios: 95 },
  { name: "Abr", ventas: 18900, pedidos: 236, usuarios: 145 },
  { name: "May", ventas: 22100, pedidos: 276, usuarios: 178 },
  { name: "Jun", ventas: 19500, pedidos: 244, usuarios: 156 },
  { name: "Jul", ventas: 25800, pedidos: 323, usuarios: 201 },
  { name: "Ago", ventas: 28400, pedidos: 355, usuarios: 234 },
  { name: "Sep", ventas: 31200, pedidos: 390, usuarios: 267 },
  { name: "Oct", ventas: 35600, pedidos: 445, usuarios: 312 },
  { name: "Nov", ventas: 42300, pedidos: 529, usuarios: 378 },
  { name: "Dic", ventas: 45679, pedidos: 571, usuarios: 412 },
]

const categoryData = [
  { name: "Tecnologia", value: 38, color: "#f97316" },
  { name: "Moda", value: 28, color: "#3b82f6" },
  { name: "Hogar", value: 18, color: "#10b981" },
  { name: "Repuestos", value: 10, color: "#8b5cf6" },
  { name: "Otros", value: 6, color: "#6b7280" },
]

const weeklyData = [
  { name: "Lun", ventas: 4200, pedidos: 52 },
  { name: "Mar", ventas: 5100, pedidos: 64 },
  { name: "Mie", ventas: 4800, pedidos: 60 },
  { name: "Jue", ventas: 6200, pedidos: 78 },
  { name: "Vie", ventas: 7800, pedidos: 98 },
  { name: "Sab", ventas: 9200, pedidos: 115 },
  { name: "Dom", ventas: 8400, pedidos: 105 },
]

export default function AdminReportesPage() {
  const [dateRange, setDateRange] = useState("mes")
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [chartView, setChartView] = useState<"diario" | "semanal" | "mensual">("semanal")

  const reportes = [
    {
      title: "Reporte de Ventas",
      description: "Ventas totales, por categoría y por vendedor",
      icon: DollarSign,
      color: "bg-green-500",
      lastGenerated: "Hace 2 horas"
    },
    {
      title: "Reporte de Pedidos",
      description: "Estado de pedidos, tiempos de entrega y devoluciones",
      icon: ShoppingCart,
      color: "bg-blue-500",
      lastGenerated: "Hace 1 día"
    },
    {
      title: "Reporte de Usuarios",
      description: "Nuevos registros, actividad y retención",
      icon: Users,
      color: "bg-purple-500",
      lastGenerated: "Hace 3 horas"
    },
    {
      title: "Reporte de Inventario",
      description: "Stock disponible, productos agotados y rotación",
      icon: Package,
      color: "bg-orange-500",
      lastGenerated: "Hace 5 horas"
    },
    {
      title: "Reporte de Vendedores",
      description: "Rendimiento, comisiones y productos más vendidos",
      icon: BarChart3,
      color: "bg-indigo-500",
      lastGenerated: "Hace 1 hora"
    },
    {
      title: "Reporte Financiero",
      description: "Ingresos, gastos, comisiones y balance general",
      icon: FileText,
      color: "bg-emerald-500",
      lastGenerated: "Hace 4 horas"
    }
  ]

  const metricas = [
    {
      label: "Ventas del Mes",
      value: "$45,678.90",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign
    },
    {
      label: "Pedidos Completados",
      value: "1,234",
      change: "+8.2%",
      trend: "up",
      icon: ShoppingCart
    },
    {
      label: "Nuevos Usuarios",
      value: "456",
      change: "+15.3%",
      trend: "up",
      icon: Users
    },
    {
      label: "Tasa de Conversion",
      value: "3.2%",
      change: "-0.5%",
      trend: "down",
      icon: PieChartIcon
    }
  ]

  const topProductos = [
    { nombre: "iPhone 15 Pro Max", ventas: 45, ingresos: "$52,155.00" },
    { nombre: "MacBook Pro M3", ventas: 32, ingresos: "$76,768.00" },
    { nombre: "AirPods Pro 2", ventas: 89, ingresos: "$22,221.00" },
    { nombre: "PlayStation 5", ventas: 28, ingresos: "$13,972.00" },
    { nombre: "Samsung Galaxy S24", ventas: 36, ingresos: "$35,964.00" }
  ]

  const topVendedores = [
    { nombre: "TechStore EC", ventas: 234, ingresos: "$45,678.00", comision: "$4,567.80" },
    { nombre: "ModaStyle", ventas: 189, ingresos: "$23,456.00", comision: "$2,345.60" },
    { nombre: "AutoPartes Pro", ventas: 156, ingresos: "$34,567.00", comision: "$3,456.70" },
    { nombre: "Hogar & Deco", ventas: 134, ingresos: "$18,234.00", comision: "$1,823.40" },
    { nombre: "SportLife", ventas: 98, ingresos: "$12,345.00", comision: "$1,234.50" }
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className={`transition-all duration-300 ${sidebarOpen ? "lg:ml-64" : "lg:ml-20"}`}>
        <AdminHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="p-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Reportes y Análisis</h1>
              <p className="text-gray-500">Genera y descarga reportes detallados de tu tienda</p>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="hoy">Hoy</option>
                <option value="semana">Esta Semana</option>
                <option value="mes">Este Mes</option>
                <option value="trimestre">Este Trimestre</option>
                <option value="año">Este Año</option>
              </select>
              <Button className="bg-orange-500 hover:bg-orange-600">
                <Download className="w-4 h-4 mr-2" />
                Exportar Todo
              </Button>
            </div>
          </div>

          {/* Métricas Rápidas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {metricas.map((metrica, index) => (
              <Card key={index} className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">{metrica.label}</p>
                      <p className="text-2xl font-bold text-gray-900">{metrica.value}</p>
                      <div className={`flex items-center gap-1 mt-2 text-sm ${
                        metrica.trend === "up" ? "text-green-600" : "text-red-600"
                      }`}>
                        {metrica.trend === "up" ? (
                          <ArrowUpRight className="w-4 h-4" />
                        ) : (
                          <ArrowDownRight className="w-4 h-4" />
                        )}
                        {metrica.change} vs mes anterior
                      </div>
                    </div>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      metrica.trend === "up" ? "bg-green-100" : "bg-red-100"
                    }`}>
                      <metrica.icon className={`w-6 h-6 ${
                        metrica.trend === "up" ? "text-green-600" : "text-red-600"
                      }`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Tipos de Reportes */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Generar Reportes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {reportes.map((reporte, index) => (
                <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl ${reporte.color} flex items-center justify-center flex-shrink-0`}>
                        <reporte.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{reporte.title}</h3>
                        <p className="text-sm text-gray-500 mb-3">{reporte.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-400">
                            <Calendar className="w-3 h-3 inline mr-1" />
                            {reporte.lastGenerated}
                          </span>
                          <Button size="sm" variant="outline" className="h-8 bg-transparent">
                            <Download className="w-3 h-3 mr-1" />
                            Generar
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Tablas de Top */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Productos */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold">Top 5 Productos</CardTitle>
                  <Button size="sm" variant="ghost" className="text-orange-600">
                    Ver todos
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topProductos.map((producto, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </span>
                        <span className="font-medium text-gray-900">{producto.nombre}</span>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{producto.ingresos}</p>
                        <p className="text-xs text-gray-500">{producto.ventas} ventas</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Vendedores */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold">Top 5 Vendedores</CardTitle>
                  <Button size="sm" variant="ghost" className="text-orange-600">
                    Ver todos
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topVendedores.map((vendedor, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </span>
                        <div>
                          <p className="font-medium text-gray-900">{vendedor.nombre}</p>
                          <p className="text-xs text-gray-500">{vendedor.ventas} ventas</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{vendedor.ingresos}</p>
                        <p className="text-xs text-green-600">Comisión: {vendedor.comision}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Graficos de Ventas */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            {/* Grafico de Ventas Principal */}
            <Card className="border-0 shadow-sm lg:col-span-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold">Tendencia de Ventas</CardTitle>
                  <div className="flex items-center gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className={`h-8 ${chartView === "diario" ? "bg-orange-50 border-orange-200 text-orange-600" : "bg-transparent"}`}
                      onClick={() => setChartView("diario")}
                    >
                      Diario
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className={`h-8 ${chartView === "semanal" ? "bg-orange-50 border-orange-200 text-orange-600" : "bg-transparent"}`}
                      onClick={() => setChartView("semanal")}
                    >
                      Semanal
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className={`h-8 ${chartView === "mensual" ? "bg-orange-50 border-orange-200 text-orange-600" : "bg-transparent"}`}
                      onClick={() => setChartView("mensual")}
                    >
                      Mensual
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartView === "semanal" ? weeklyData : salesData}>
                      <defs>
                        <linearGradient id="colorVentas" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
                      <YAxis stroke="#6b7280" fontSize={12} tickFormatter={(value) => `$${value / 1000}k`} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: "white", 
                          border: "1px solid #e5e7eb",
                          borderRadius: "8px",
                          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                        }}
                        formatter={(value: number) => [`$${value.toLocaleString()}`, "Ventas"]}
                      />
                      <Area
                        type="monotone"
                        dataKey="ventas"
                        stroke="#f97316"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorVentas)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full" />
                    <span className="text-sm text-gray-600">Ventas ($)</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Grafico de Categorias */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Ventas por Categoria</CardTitle>
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
                      <Tooltip 
                        formatter={(value: number) => [`${value}%`, "Porcentaje"]}
                        contentStyle={{ 
                          backgroundColor: "white", 
                          border: "1px solid #e5e7eb",
                          borderRadius: "8px",
                        }}
                      />
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

          {/* Grafico de Pedidos */}
          <Card className="border-0 shadow-sm mt-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">Pedidos vs Usuarios Nuevos</CardTitle>
                <Button size="sm" variant="outline" className="h-8 bg-transparent gap-2">
                  <Download className="w-4 h-4" />
                  Exportar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
                    <YAxis stroke="#6b7280" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "white", 
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar dataKey="pedidos" fill="#f97316" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="usuarios" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full" />
                  <span className="text-sm text-gray-600">Pedidos</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full" />
                  <span className="text-sm text-gray-600">Usuarios Nuevos</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
