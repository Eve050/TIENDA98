"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import VendorSidebar from "@/components/vendor-sidebar"
import Header from "@/components/header"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LayoutDashboard, ShoppingCart, Settings, DollarSign, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function MiTiendaPage() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated || user?.type !== "seller") {
      router.push("/mi-cuenta")
    }
  }, [isAuthenticated, user, router])

  if (!isAuthenticated || user?.type !== "seller") {
    return null
  }

  const metrics = [
    { label: "Ventas totales", value: "$1,240.50", change: "+12.5%", color: "text-green-600" },
    { label: "Comisión Marketplace", value: "$186.08", change: "15%", color: "text-slate-400" },
    { label: "Ventas netas", value: "$1,054.42", change: "+10.2%", color: "text-blue-600" },
    { label: "Pedidos", value: "48", change: "+5", color: "text-slate-900" },
    { label: "Productos vendidos", value: "86", change: "+12", color: "text-slate-900" },
    { label: "Total Earning", value: "$980.25", change: "+8.4%", color: "text-[#FF6B35]" },
    { label: "Marketplace Discount", value: "$45.00", change: "-$0", color: "text-red-400" },
    { label: "Store Discount", value: "$12.50", change: "-$5", color: "text-red-400" },
    { label: "Variantes vendidas", value: "112", change: "+18", color: "text-slate-900" },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FBFC]">
      <Header />
      <div className="flex flex-1">
        <VendorSidebar />
        <main className="flex-1 p-6 md:p-10">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="bg-white p-6 rounded-[24px] shadow-sm border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h1 className="text-3xl font-black text-[#2D3142] tracking-tight uppercase">Dashboard Overview</h1>
                <p className="text-slate-400 font-medium">Bienvenido de nuevo, <span className="text-orange-600 font-bold">{user.name}</span></p>
              </div>
              <div className="flex items-center gap-6 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div className="text-right">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Balance Disponible</p>
                  <p className="text-3xl font-black text-[#2D3142] tracking-tighter">$1,054.42</p>
                </div>
                <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-200">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {metrics.map((metric, index) => (
                <Card key={index} className="border-none shadow-sm hover:shadow-md transition-shadow rounded-2xl overflow-hidden group">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{metric.label}</p>
                      {metric.change && (
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${metric.change.startsWith('+') ? 'bg-green-50 text-green-600' : 'bg-slate-50 text-slate-500'}`}>
                          {metric.change}
                        </span>
                      )}
                    </div>
                    <p className={`text-2xl font-black tracking-tight ${metric.color}`}>
                      {metric.value}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Sales Chart Context */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="border-none shadow-sm rounded-[32px] overflow-hidden">
                  <CardContent className="p-8">
                    <div className="flex items-center justify-between mb-8">
                      <h3 className="text-xl font-black text-[#2D3142]">ANÁLISIS DE VENTAS</h3>
                      <Select defaultValue="current-month">
                        <SelectTrigger className="w-[240px] rounded-xl border-slate-100 bg-slate-50 font-bold text-xs h-10">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="current-month">Ultimos 30 días</SelectItem>
                          <SelectItem value="last-year">Año pasado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="aspect-[16/9] w-full bg-slate-50 rounded-2xl border border-dashed border-slate-200 flex flex-col items-center justify-center p-12 text-center group">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform">
                        <LayoutDashboard className="w-8 h-8 text-slate-300" />
                      </div>
                      <p className="text-slate-900 font-bold mb-1">Visualización de Datos</p>
                      <p className="text-slate-400 text-sm max-w-xs">Tus ventas netas han crecido un <span className="text-orange-600 font-black">12.5%</span> este mes. Sigue publicando nuevos productos.</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar Info/Actions */}
              <div className="space-y-6">
                <Card className="border-none shadow-sm rounded-[32px] bg-[#2D3142] text-white overflow-hidden">
                  <CardContent className="p-8">
                    <h3 className="text-lg font-black mb-6 flex items-center gap-2">
                      <ShoppingCart className="w-5 h-5 text-orange-500" />
                      ÚLTIMOS PEDIDOS
                    </h3>
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
                          <div>
                            <p className="text-sm font-bold">Pedido #290{i}</p>
                            <p className="text-[10px] text-gray-400">Hace {i * 2} horas</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-black text-orange-400">$45.00</p>
                            <span className="text-[8px] font-black uppercase bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded">Procesando</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button variant="ghost" className="w-full mt-6 text-xs font-bold text-gray-400 hover:text-white hover:bg-white/5">
                      Ver todos los pedidos
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-sm rounded-[32px] overflow-hidden">
                  <CardContent className="p-8">
                    <h3 className="text-lg font-black text-[#2D3142] mb-6 flex items-center gap-2">
                      <Settings className="w-5 h-5 text-slate-400" />
                      AJUSTES RÁPIDOS
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      <Link href="/vendedor/mi-tienda/ajustes/tienda" className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-2xl hover:bg-orange-50 hover:text-orange-600 border border-slate-100 transition-all">
                        <ExternalLink className="w-6 h-6 mb-2" />
                        <span className="text-[10px] font-bold uppercase">Ver Tienda</span>
                      </Link>
                      <Link href="/vendedor/mi-tienda/ajustes/pago" className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-2xl hover:bg-orange-50 hover:text-orange-600 border border-slate-100 transition-all">
                        <DollarSign className="w-6 h-6 mb-2" />
                        <span className="text-[10px] font-bold uppercase">Pagos</span>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
