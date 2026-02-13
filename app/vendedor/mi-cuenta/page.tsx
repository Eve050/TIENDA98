"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import VendorSidebar from "@/components/vendor-sidebar"
import Header from "@/components/header"
import { Card, CardContent } from "@/components/ui/card"

export default function VendedorMiCuentaPage() {
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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <VendorSidebar />
        <main className="flex-1 bg-gray-50 p-8">
          <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold">Mi Perfil</h1>

            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-600">Nombre completo</h3>
                    <p className="text-lg">{user?.name || "Vendedor"}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-600">Email</h3>
                    <p className="text-lg">{user?.email || "vendedor@tienda.com"}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-600">Tipo de cuenta</h3>
                    <p className="text-lg">Vendedor</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
