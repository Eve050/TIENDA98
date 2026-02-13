"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Package, ShoppingCart, DollarSign, Settings, ExternalLink, User, LogOut } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useState } from "react"

const miCuentaItems = [
  { name: "Mi Perfil", href: "/vendedor/mi-cuenta", icon: User },
  { name: "Detalles de Cuenta", href: "/vendedor/mi-cuenta/detalles", icon: Settings },
]

const miTiendaItems = [
  { name: "Escritorio", href: "/vendedor/mi-tienda", icon: LayoutDashboard },
  { name: "Productos", href: "/vendedor/mi-tienda/productos", icon: Package },
  { name: "Pedidos", href: "/vendedor/mi-tienda/pedidos", icon: ShoppingCart },
  { name: "Retirada", href: "/vendedor/mi-tienda/retirada", icon: DollarSign },
  { name: "Ajustes", href: "/vendedor/mi-tienda/ajustes", icon: Settings, hasSubmenu: true },
]

const submenuItems = [
  { name: "Tienda", href: "/vendedor/mi-tienda/ajustes/tienda", icon: ExternalLink },
  { name: "Pago", href: "/vendedor/mi-tienda/ajustes/pago", icon: DollarSign },
  { name: "Social Profile", href: "/vendedor/mi-tienda/ajustes/social", icon: User },
]

export default function VendorSidebar() {
  const pathname = usePathname()
  const { logout } = useAuth()
  const [showSubmenu, setShowSubmenu] = useState(pathname.startsWith("/vendedor/mi-tienda/ajustes"))

  return (
    <aside className="w-72 bg-[#3e2e7e] text-white min-h-screen flex flex-col">
      <div className="flex-1">
        <div className="px-6 py-3 bg-[#2e1e6e] border-b border-white/10">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-white/70">Mi Cuenta</h3>
        </div>

        {miCuentaItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-6 py-4 transition-colors ${
                isActive ? "bg-black text-white" : "hover:bg-[#4e3e8e]"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </Link>
          )
        })}

        <div className="px-6 py-3 bg-[#2e1e6e] border-y border-white/10 mt-2">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-white/70">Mi Tienda</h3>
        </div>

        {miTiendaItems.map((item) => {
          const Icon = item.icon
          const isActive =
            pathname === item.href ||
            (item.href === "/vendedor/mi-tienda" && pathname === "/vendedor/mi-tienda/escritorio") ||
            (item.hasSubmenu && pathname.startsWith("/vendedor/mi-tienda/ajustes"))

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
                className={`flex items-center gap-3 px-6 py-4 transition-colors ${
                  isActive ? "bg-black text-white" : "hover:bg-[#4e3e8e]"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
                {item.hasSubmenu && (
                  <svg
                    className={`w-4 h-4 ml-auto transition-transform ${showSubmenu ? "rotate-90" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </Link>

              {item.hasSubmenu && showSubmenu && (
                <div className="bg-[#4e3e8e]">
                  {submenuItems.map((subitem) => {
                    const SubIcon = subitem.icon
                    const isSubActive = pathname === subitem.href

                    return (
                      <Link
                        key={subitem.href}
                        href={subitem.href}
                        className={`flex items-center gap-3 px-12 py-3 transition-colors ${
                          isSubActive ? "bg-black text-white" : "hover:bg-[#5e4e9e]"
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
      </div>

      <div className="border-t border-white/20 p-4 flex items-center justify-around">
        <button className="p-2 hover:bg-white/10 rounded">
          <ExternalLink className="w-5 h-5" />
        </button>
        <button className="p-2 hover:bg-white/10 rounded">
          <User className="w-5 h-5" />
        </button>
        <button onClick={logout} className="p-2 hover:bg-white/10 rounded">
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </aside>
  )
}
