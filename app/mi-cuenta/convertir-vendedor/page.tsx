"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Store } from "lucide-react"
import Link from "next/link"

export default function ConvertirVendedorPage() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    storeName: "",
    storeUrl: "",
    phone: "",
  })

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/")
    } else if (user?.type === "seller") {
      router.push("/mi-cuenta")
    }
  }, [isAuthenticated, user, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Update user to seller
    const updatedUser = { ...user!, type: "seller" as const }
    localStorage.setItem("tienda98-user", JSON.stringify(updatedUser))

    setLoading(false)
    router.push("/mi-cuenta")
    window.location.reload()
  }

  if (!isAuthenticated || !user || user.type === "seller") {
    return null
  }

  const menuItems = [
    { name: "Escritorio", href: "/mi-cuenta" },
    { name: "Pedidos", href: "/mi-cuenta/pedidos" },
    { name: "Descargas", href: "/mi-cuenta/descargas" },
    { name: "Direcciones", href: "/mi-cuenta/direcciones" },
    { name: "Detalles de la cuenta", href: "/mi-cuenta/detalles" },
    { name: "Lista de deseos", href: "/mi-cuenta/deseos" },
    { name: "Cerrar Sesión", href: "#" },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-secondary/30 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <aside className="w-full lg:w-64 space-y-2">
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-1">
                    {menuItems.map((item) => (
                      <Link key={item.href} href={item.href}>
                        <Button variant="ghost" className="w-full justify-start text-sm">
                          {item.name}
                        </Button>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Store className="w-6 h-6" />
                    UPDATE ACCOUNT TO VENDOR
                  </CardTitle>
                  <CardDescription>
                    Complete el formulario para convertirse en vendedor y empezar a vender en TIENDA98
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">
                          Nombre <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="firstName"
                          type="text"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="lastName">
                          Apellidos <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="lastName"
                          type="text"
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="storeName">
                        Nombre de la tienda <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="storeName"
                        type="text"
                        value={formData.storeName}
                        onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="storeUrl">
                        URL de la tienda <span className="text-red-500">*</span>
                      </Label>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground whitespace-nowrap">
                          https://tienda98.com/tienda/
                        </span>
                        <Input
                          id="storeUrl"
                          type="text"
                          placeholder="mi-tienda"
                          value={formData.storeUrl}
                          onChange={(e) => setFormData({ ...formData, storeUrl: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">
                        Número de teléfono <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+593 99 999 9999"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                      />
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-sm text-blue-900">
                        <strong>Membresía de Vendedor:</strong> Al convertirte en vendedor, aceptas pagar una
                        mensualidad de $1.00 USD para mantener tu tienda activa y poder vender productos en TIENDA98.
                      </p>
                    </div>

                    <div className="flex gap-4">
                      <Button type="submit" disabled={loading} className="flex-1">
                        {loading ? "Procesando..." : "Convertirse en Vendedor"}
                      </Button>
                      <Button type="button" variant="outline" onClick={() => router.back()}>
                        Cancelar
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
