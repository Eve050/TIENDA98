"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const menuItems = [
  { name: "Escritorio", href: "/mi-cuenta" },
  { name: "Pedidos", href: "/mi-cuenta/pedidos" },
  { name: "Descargas", href: "/mi-cuenta/descargas" },
  { name: "Direcciones", href: "/mi-cuenta/direcciones" },
  { name: "Detalles de la cuenta", href: "/mi-cuenta/detalles" },
  { name: "Lista de deseos", href: "/mi-cuenta/deseos" },
]

export function AccountLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <aside className="w-full md:w-64 flex-shrink-0">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-1">MI CUENTA</h2>
                </div>
                <nav className="border-t border-gray-200">
                  {menuItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "block px-6 py-3 text-gray-700 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0",
                          isActive && "bg-gray-100 font-medium",
                        )}
                      >
                        {item.name}
                      </Link>
                    )
                  })}
                  <button
                    onClick={logout}
                    className="w-full text-left px-6 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cerrar Sesión
                  </button>
                </nav>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">{children}</div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
