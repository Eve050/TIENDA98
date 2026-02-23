"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Store,
  Settings,
  BarChart3,
  LogOut,
  ChevronDown,
  Megaphone,
} from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

const menuItems = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Productos",
    icon: Package,
    submenu: [
      { title: "Todos los Productos", href: "/admin/productos" },
      { title: "Añadir Producto", href: "/admin/productos/nuevo" },
      { title: "Categorías", href: "/admin/categorias" },
    ],
  },
  {
    title: "Pedidos",
    icon: ShoppingCart,
    submenu: [
      { title: "Todos los Pedidos", href: "/admin/pedidos" },
      { title: "Reembolsos", href: "/admin/reembolsos" },
    ],
  },
  {
    title: "Usuarios",
    href: "/admin/usuarios",
    icon: Users,
  },
  {
    title: "Vendedores",
    icon: Store,
    submenu: [
      { title: "Todos los Vendedores", href: "/admin/vendedores" },
      { title: "Solicitudes", href: "/admin/vendedores/solicitudes" },
      { title: "Retiros", href: "/admin/vendedores/retiros" },
    ],
  },
  {
    title: "Marketing",
    icon: Megaphone,
    submenu: [
      { title: "Banners", href: "/admin/banners" },
      { title: "Cupones", href: "/admin/cupones" },
    ],
  },
  {
    title: "Reportes",
    href: "/admin/reportes",
    icon: BarChart3,
  },
  {
    title: "Configuración",
    href: "/admin/configuracion",
    icon: Settings,
  },
]

function AdminSidebar({ isOpen, onToggle }: { isOpen?: boolean; onToggle?: () => void }) {
  const pathname = usePathname()
  const router = useRouter()
  const getInitialOpenMenus = () => {
    const open = ["Dashboard"]
    menuItems.forEach((item) => {
      if (item.submenu?.some((sub) => pathname.startsWith(sub.href) || pathname === sub.href)) {
        open.push(item.title)
      }
    })
    return open
  }
  const [openMenus, setOpenMenus] = useState<string[]>(getInitialOpenMenus)

  const toggleMenu = (title: string) => {
    setOpenMenus((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    )
  }

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn")
    localStorage.removeItem("adminEmail")
    router.push("/admin")
  }

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-gray-900 text-white flex flex-col">
      {/* Logo */}
      <div className="p-4 border-b border-gray-800">
        <Link href="/admin/dashboard" className="flex items-center gap-3">
          <span className="text-xl font-bold tracking-tight">
            <span className="text-white">TI</span>
            <span className="text-orange-500">END</span>
            <span className="text-white">A98</span>
          </span>
          <span className="text-xs bg-orange-500 px-2 py-0.5 rounded font-medium">
            Admin
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.title}>
              {item.submenu ? (
                <div>
                  <button
                    onClick={() => toggleMenu(item.title)}
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                      openMenus.includes(item.title)
                        ? "bg-gray-800 text-white"
                        : "text-gray-400 hover:bg-gray-800 hover:text-white"
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <item.icon className="w-5 h-5" />
                      {item.title}
                    </span>
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 transition-transform",
                        openMenus.includes(item.title) && "rotate-180"
                      )}
                    />
                  </button>
                  {openMenus.includes(item.title) && (
                    <ul className="mt-1 ml-4 pl-4 border-l border-gray-700 space-y-1">
                      {item.submenu.map((subitem) => (
                        <li key={subitem.href}>
                          <Link
                            href={subitem.href}
                            className={cn(
                              "block px-3 py-2 rounded-lg text-sm transition-colors",
                              pathname === subitem.href
                                ? "bg-orange-500 text-white"
                                : "text-gray-400 hover:bg-gray-800 hover:text-white"
                            )}
                          >
                            {subitem.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <Link
                  href={item.href!}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    pathname === item.href
                      ? "bg-orange-500 text-white"
                      : "text-gray-400 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  {item.title}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Cerrar Sesión
        </button>
      </div>
    </aside>
  )
}

export { AdminSidebar }
export default AdminSidebar
