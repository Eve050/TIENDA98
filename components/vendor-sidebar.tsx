"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Package, ShoppingCart, DollarSign, Settings, ExternalLink, User, LogOut } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useState } from "react"

const menuItems = [
  { name: "Escritorio", href: "/vendedor/mi-tienda", icon: LayoutDashboard },
  { name: "Productos", href: "/vendedor/mi-tienda/productos", icon: Package },
  { name: "Pedidos", href: "/vendedor/mi-tienda/pedidos", icon: ShoppingCart },
  { name: "Retirada", href: "/vendedor/mi-tienda/retirada", icon: DollarSign },
  { name: "Mi Perfil", href: "/vendedor/mi-cuenta", icon: User },
  { name: "Ajustes", href: "/vendedor/mi-tienda/ajustes", icon: Settings, hasSubmenu: true },
]

const submenuItems = [
  { name: "Tienda", href: "/vendedor/mi-tienda/ajustes/tienda", icon: ExternalLink },
  { name: "Pago", href: "/vendedor/mi-tienda/ajustes/pago", icon: DollarSign },
  { name: "Social Profile", href: "/vendedor/mi-tienda/ajustes/social", icon: User },
  { name: "Detalles Cuenta", href: "/vendedor/mi-cuenta/detalles", icon: Settings },
]

export default function VendorSidebar() {
  const pathname = usePathname()
  const { logout } = useAuth()
  const [showSubmenu, setShowSubmenu] = useState(pathname.startsWith("/vendedor/mi-tienda/ajustes") || pathname.includes("/mi-cuenta/detalles"))

  return (
    <aside className="w-72 bg-[#2D3142] text-white min-h-screen flex flex-col shadow-xl">
      <div className="flex-1 py-6">
        <div className="px-6 py-4 mb-4">
          <h2 className="text-xl font-extrabold tracking-tighter text-white flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-white" />
            </div>
            MI TIENDA
          </h2>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive =
              pathname === item.href ||
              (item.href === "/vendedor/mi-tienda" && pathname === "/vendedor/mi-tienda/escritorio") ||
              (item.hasSubmenu && (pathname.startsWith("/vendedor/mi-tienda/ajustes") || pathname.includes("/mi-cuenta/detalles")))

            return (
              <div key={item.href}>
                <Link
                  href={item.href}
                  onClick={(e) => {
                    if (item.hasSubmenu) {
                      e.preventDefault()
                      setShowSubmenu(!showSubmenu)
                    }
                  }}
                  className={`flex items-center gap-3 px-6 py-3.5 transition-all duration-200 border-l-4 ${isActive
                    ? "bg-white/10 text-orange-400 border-orange-500 font-bold"
                    : "text-gray-400 border-transparent hover:bg-white/5 hover:text-white"
                    }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? "text-orange-400" : "text-gray-400"}`} />
                  <span>{item.name}</span>
                  {item.hasSubmenu && (
                    <svg
                      className={`w-4 h-4 ml-auto transition-transform duration-300 ${showSubmenu ? "rotate-90" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </Link>

                {item.hasSubmenu && showSubmenu && (
                  <div className="bg-black/20 my-1">
                    {submenuItems.map((subitem) => {
                      const SubIcon = subitem.icon
                      const isSubActive = pathname === subitem.href

                      return (
                        <Link
                          key={subitem.href}
                          href={subitem.href}
                          className={`flex items-center gap-3 px-10 py-3 transition-all duration-200 ${isSubActive
                            ? "text-orange-400 font-bold"
                            : "text-gray-500 hover:text-white"
                            }`}
                        >
                          <SubIcon className="w-4 h-4" />
                          <span className="text-sm">{subitem.name}</span>
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </nav>
      </div>

      <div className="p-4 mt-auto border-t border-white/10 flex items-center justify-between">
        <Link href="/" className="p-2.5 text-gray-400 hover:text-orange-400 transition-colors">
          <ExternalLink className="w-5 h-5" />
        </Link>
        <Link href="/vendedor/mi-cuenta" className="p-2.5 text-gray-400 hover:text-orange-400 transition-colors">
          <User className="w-5 h-5" />
        </Link>
        <button
          onClick={logout}
          className="p-2.5 text-gray-400 hover:text-red-400 transition-colors"
          title="Cerrar Sesión"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </aside>
  )
}
