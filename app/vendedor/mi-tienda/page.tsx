"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import VendorSidebar from "@/components/vendor-sidebar"
import Header from "@/components/header"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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
    { label: "Ventas totales", value: "N/D" },
    { label: "Marketplace Commission", value: "N/D" },
    { label: "Ventas netas", value: "N/D" },
    { label: "Pedidos", value: "N/D" },
    { label: "Productos vendidos", value: "N/D" },
    { label: "Total Earning", value: "N/D" },
    { label: "Marketplace Discount", value: "N/D" },
    { label: "Store Discount", value: "N/D" },
    { label: "Variantes vendidas", value: "N/D" },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <VendorSidebar />
        <main className="flex-1 bg-gray-50 p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">OVERVIEW</h1>
              <div className="text-right">
                <p className="text-sm text-gray-600">Balance:</p>
                <p className="text-2xl font-bold text-blue-600">$0.00</p>
              </div>
            </div>

            {/* Date Selector */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <label className="text-sm font-medium">Rango de fechas:</label>
                  <Select defaultValue="current-month">
                    <SelectTrigger className="w-[400px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="current-month">
                        Este Mes Hasta Hoy (1 - 12 Ene, 2026)
                        <br />
                        <span className="text-xs text-gray-500">Frente Al Año Anterior (1 - 12 Ene, 2025)</span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold">Performance</h2>
                <button className="p-2 hover:bg-gray-200 rounded">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-5 gap-4">
                {metrics.map((metric, index) => (
                  <Card key={index} className="border-2">
                    <CardContent className="p-6 text-center">
                      <p className="text-sm text-gray-600 mb-2">{metric.label}</p>
                      <p className="text-2xl font-bold text-gray-400">{metric.value}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Charts */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold">Charts</h2>
                <div className="flex items-center gap-4">
                  <Select defaultValue="day">
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="day">By day</SelectItem>
                      <SelectItem value="week">By week</SelectItem>
                      <SelectItem value="month">By month</SelectItem>
                    </SelectContent>
                  </Select>
                  <button className="p-2 hover:bg-gray-200 rounded">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                  </button>
                  <button className="p-2 hover:bg-gray-200 rounded">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                  <button className="p-2 hover:bg-gray-200 rounded">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {/* Net Sales Chart */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Net sales</h3>
                    <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded">
                      <p className="text-gray-400 text-center">
                        No data for the selected date
                        <br />
                        range
                      </p>
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked className="accent-blue-500" />
                        <span className="text-sm">Este Mes Hasta Hoy (1 - 12 Ene, 2026)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked className="accent-green-500" />
                        <span className="text-sm">Año Anterior (1 - 12 Ene, 2025)</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Orders Chart */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Orders</h3>
                    <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded">
                      <p className="text-gray-400 text-center">
                        No data for the selected date
                        <br />
                        range
                      </p>
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <input type="checkbox" defaultChecked className="accent-blue-500" />
                          <span className="text-sm">Este Mes Hasta Hoy (1 - 12 Ene, 2026)</span>
                        </div>
                        <span className="text-sm">0</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <input type="checkbox" defaultChecked className="accent-green-500" />
                          <span className="text-sm">Año Anterior (1 - 12 Ene, 2025)</span>
                        </div>
                        <span className="text-sm">0</span>
                      </div>
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
