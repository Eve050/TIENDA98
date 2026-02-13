"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import Link from "next/link"
import { FileTextIcon, Download, MapPinnedIcon, UserIcon, Heart, LogOut } from "lucide-react"
import { AccountLayout } from "@/components/account-layout"

export default function MiCuentaPage() {
  const { user, isAuthenticated, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated || !user) {
    return null
  }

  return (
    <AccountLayout>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="mb-6">
          <p className="text-gray-700">
            Hola <span className="font-semibold">{user.name}</span> (¿no eres {user.name}?{" "}
            <button onClick={logout} className="text-[#FF6B35] hover:underline">
              Cerrar sesión
            </button>
            )
          </p>
        </div>

        <div className="mb-8">
          <p className="text-gray-600 leading-relaxed">
            Desde el escritorio de tu cuenta puedes ver tus{" "}
            <Link href="/mi-cuenta/pedidos" className="text-[#FF6B35] hover:underline">
              pedidos recientes
            </Link>
            , gestionar tus{" "}
            <Link href="/mi-cuenta/direcciones" className="text-[#FF6B35] hover:underline">
              direcciones de envío y facturación
            </Link>{" "}
            y editar tu{" "}
            <Link href="/mi-cuenta/detalles" className="text-[#FF6B35] hover:underline">
              contraseña y los detalles de tu cuenta
            </Link>
            .
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            href="/mi-cuenta/pedidos"
            className="flex flex-col items-center justify-center p-8 border-2 border-gray-200 rounded-lg hover:border-[#FF6B35] hover:shadow-md transition-all group"
          >
            <FileTextIcon className="w-16 h-16 text-gray-400 mb-3 group-hover:text-[#FF6B35] transition-colors" />
            <h3 className="font-semibold text-gray-900">Pedidos</h3>
          </Link>

          <Link
            href="/mi-cuenta/descargas"
            className="flex flex-col items-center justify-center p-8 border-2 border-gray-200 rounded-lg hover:border-[#FF6B35] hover:shadow-md transition-all group"
          >
            <Download className="w-16 h-16 text-gray-400 mb-3 group-hover:text-[#FF6B35] transition-colors" />
            <h3 className="font-semibold text-gray-900">Descargas</h3>
          </Link>

          <Link
            href="/mi-cuenta/direcciones"
            className="flex flex-col items-center justify-center p-8 border-2 border-gray-200 rounded-lg hover:border-[#FF6B35] hover:shadow-md transition-all group"
          >
            <MapPinnedIcon className="w-16 h-16 text-gray-400 mb-3 group-hover:text-[#FF6B35] transition-colors" />
            <h3 className="font-semibold text-gray-900">Direcciones</h3>
          </Link>

          <Link
            href="/mi-cuenta/detalles"
            className="flex flex-col items-center justify-center p-8 border-2 border-gray-200 rounded-lg hover:border-[#FF6B35] hover:shadow-md transition-all group"
          >
            <UserIcon className="w-16 h-16 text-gray-400 mb-3 group-hover:text-[#FF6B35] transition-colors" />
            <h3 className="font-semibold text-gray-900">Detalles de la cuenta</h3>
          </Link>

          <Link
            href="/mi-cuenta/deseos"
            className="flex flex-col items-center justify-center p-8 border-2 border-gray-200 rounded-lg hover:border-[#FF6B35] hover:shadow-md transition-all group"
          >
            <Heart className="w-16 h-16 text-gray-400 mb-3 group-hover:text-[#FF6B35] transition-colors" />
            <h3 className="font-semibold text-gray-900">Lista de deseos</h3>
          </Link>

          <button
            onClick={logout}
            className="flex flex-col items-center justify-center p-8 border-2 border-gray-200 rounded-lg hover:border-[#FF6B35] hover:shadow-md transition-all group"
          >
            <LogOut className="w-16 h-16 text-gray-400 mb-3 group-hover:text-[#FF6B35] transition-colors" />
            <h3 className="font-semibold text-gray-900">Cerrar Sesión</h3>
          </button>
        </div>

        {/* Become Vendor Section */}
        {user.type === "customer" && (
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Conviértete en proveedor</h3>
                <p className="text-gray-600">
                  Los proveedores pueden vender productos y administrar una tienda con un panel de proveedores.
                </p>
              </div>
              <Link
                href="/mi-cuenta/convertir-vendedor"
                className="ml-4 px-6 py-2 bg-[#2D3142] text-white rounded-lg hover:bg-[#2D3142]/90 transition-colors whitespace-nowrap"
              >
                Conviértete En Proveedor
              </Link>
            </div>
          </div>
        )}
      </div>
    </AccountLayout>
  )
}
