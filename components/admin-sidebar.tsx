"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Store,
  Settings,
  BarChart3,
  Tag,
  MessageSquare,
  Bell,
  LogOut,
  ChevronDown,
  FileText,
  CreditCard,
  Truck,
  Globe,
  Percent,
  Megaphone,
  HelpCircle,
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
      { title: "Atributos", href: "/admin/atributos" },
      { title: "Marcas", href: "/admin/marcas" },
    ],
  },
  {
    title: "Pedidos",
    icon: ShoppingCart,
    submenu: [
      { title: "Todos los Pedidos", href: "/admin/pedidos" },
      { title: "Pendientes", href: "/admin/pedidos?status=pendiente" },
      { title: "Procesando", href: "/admin/pedidos?status=procesando" },
      { title: "Completados", href: "/admin/pedidos?status=completado" },
      { title: "Reembolsos", href: "/admin/reembolsos" },
    ],
  },
  {
    title: "Usuarios",
    icon: Users,
    submenu: [
      { title: "Todos los Usuarios", href: "/admin/usuarios" },
      { title: "Añadir Usuario", href: "/admin/usuarios/nuevo" },
      { title: "Roles", href: "/admin/roles" },
    ],
  },
  {
    title: "Vendedores",
    icon: Store,
    submenu: [
      { title: "Todos los Vendedores", href: "/admin/vendedores" },
      { title: "Solicitudes", href: "/admin/vendedores/solicitudes" },
      { title: "Comisiones", href: "/admin/vendedores/comisiones" },
      { title: "Retiros", href: "/admin/vendedores/retiros" },
    ],
  },
  {
    title: "Marketing",
    icon: Megaphone,
    submenu: [
      { title: "Banners", href: "/admin/banners" },
      { title: "Cupones", href: "/admin/cupones" },
      { title: "Descuentos", href: "/admin/descuentos" },
      { title: "Email Marketing", href: "/admin/email-marketing" },
    ],
  },
  {
    title: "Reportes",
    icon: BarChart3,
    submenu: [
      { title: "Vista General", href: "/admin/reportes" },
      { title: "Ventas", href: "/admin/reportes/ventas" },
      { title: "Productos", href: "/admin/reportes/productos" },
      { title: "Clientes", href: "/admin/reportes/clientes" },
      { title: "Vendedores", href: "/admin/reportes/vendedores" },
    ],
  },
  {
    title: "Configuración",
    icon: Settings,
    submenu: [
      { title: "General", href: "/admin/configuracion" },
      { title: "Pagos", href: "/admin/configuracion/pagos" },
      { title: "Envíos", href: "/admin/configuracion/envios" },
      { title: "Impuestos", href: "/admin/configuracion/impuestos" },
      { title: "Notificaciones", href: "/admin/configuracion/notificaciones" },
    ],
  },
]

function AdminSidebar({ isOpen, onToggle }: { isOpen?: boolean; onToggle?: () => void }) {
  const pathname = usePathname()
  const router = useRouter()
  const [openMenus, setOpenMenus] = useState<string[]>(["Dashboard"])

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
          <Image
            src="/logo-tienda98.png"
            alt="Tienda98"
            width={140}
            height={40}
            className="brightness-0 invert"
          />
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
