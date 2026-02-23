"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import Link from "next/link"
import { FileTextIcon, Download, MapPinnedIcon, UserIcon, Heart, LogOut, Shuffle } from "lucide-react"
import { AccountLayout } from "@/components/account-layout"
import { useWishlist } from "@/lib/wishlist-context"

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

  const WishlistSummary = () => {
    const { items, toggleItem } = useWishlist()

    if (items.length === 0) return null

    return (
      <div className="mt-12 pt-8 border-t border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Mi Lista de Deseos Reciente</h3>
          <Link href="/mi-cuenta/deseos" className="text-sm font-semibold text-[#FF6B35] hover:underline">
            Ver todo
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
          {items.slice(0, 6).map((item) => (
            <div key={item.id} className="group relative">
              <Link href={`/productos/${item.id}`} className="block">
                <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-50 border border-gray-100 mb-2">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <p className="text-xs font-medium text-gray-700 truncate">{item.name}</p>
                <p className="text-xs font-bold text-[#FF6B35]">${item.price.toFixed(2)}</p>
              </Link>
              <button
                onClick={() => toggleItem(item)}
                className="absolute top-1.5 right-1.5 w-7 h-7 bg-white/90 hover:bg-orange-500 text-orange-500 hover:text-white rounded-full flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-all border border-gray-100 hover:border-orange-500"
              >
                <Heart className="w-3 h-3 fill-current" />
              </button>
            </div>
          ))}
        </div>
      </div>
    )
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
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <Link
            href="/mi-cuenta/pedidos"
            className="flex flex-col items-center justify-center p-4 md:p-8 border-2 border-gray-200 rounded-lg hover:border-[#FF6B35] hover:shadow-md transition-all group"
          >
            <FileTextIcon className="w-10 h-10 md:w-16 md:h-16 text-gray-400 mb-2 md:mb-3 group-hover:text-[#FF6B35] transition-colors" />
            <h3 className="font-semibold text-gray-900 text-sm md:text-base">Pedidos</h3>
          </Link>

          <Link
            href="/mi-cuenta/descargas"
            className="flex flex-col items-center justify-center p-4 md:p-8 border-2 border-gray-200 rounded-lg hover:border-[#FF6B35] hover:shadow-md transition-all group"
          >
            <Download className="w-10 h-10 md:w-16 md:h-16 text-gray-400 mb-2 md:mb-3 group-hover:text-[#FF6B35] transition-colors" />
            <h3 className="font-semibold text-gray-900 text-sm md:text-base">Descargas</h3>
          </Link>

          <Link
            href="/mi-cuenta/direcciones"
            className="flex flex-col items-center justify-center p-4 md:p-8 border-2 border-gray-200 rounded-lg hover:border-[#FF6B35] hover:shadow-md transition-all group"
          >
            <MapPinnedIcon className="w-10 h-10 md:w-16 md:h-16 text-gray-400 mb-2 md:mb-3 group-hover:text-[#FF6B35] transition-colors" />
            <h3 className="font-semibold text-gray-900 text-sm md:text-base">Direcciones</h3>
          </Link>

          <Link
            href="/mi-cuenta/detalles"
            className="flex flex-col items-center justify-center p-4 md:p-8 border-2 border-gray-200 rounded-lg hover:border-[#FF6B35] hover:shadow-md transition-all group"
          >
            <UserIcon className="w-10 h-10 md:w-16 md:h-16 text-gray-400 mb-2 md:mb-3 group-hover:text-[#FF6B35] transition-colors" />
            <h3 className="font-semibold text-gray-900 text-sm md:text-base">Detalles</h3>
          </Link>

          <Link
            href="/mi-cuenta/deseos"
            className="flex flex-col items-center justify-center p-4 md:p-8 border-2 border-gray-200 rounded-lg hover:border-[#FF6B35] hover:shadow-md transition-all group"
          >
            <Heart className="w-10 h-10 md:w-16 md:h-16 text-gray-400 mb-2 md:mb-3 group-hover:text-[#FF6B35] transition-colors" />
            <h3 className="font-semibold text-gray-900 text-sm md:text-base">Favoritos</h3>
          </Link>

          <Link
            href="/comparar"
            className="flex flex-col items-center justify-center p-4 md:p-8 border-2 border-gray-200 rounded-lg hover:border-[#FF6B35] hover:shadow-md transition-all group"
          >
            <Shuffle className="w-10 h-10 md:w-16 md:h-16 text-gray-400 mb-2 md:mb-3 group-hover:text-[#FF6B35] transition-colors" />
            <h3 className="font-semibold text-gray-900 text-sm md:text-base">Comparar</h3>
          </Link>

          <button
            onClick={logout}
            className="flex flex-col items-center justify-center p-4 md:p-8 border-2 border-gray-200 rounded-lg hover:border-[#FF6B35] hover:shadow-md transition-all group col-span-2 lg:col-span-1"
          >
            <LogOut className="w-10 h-10 md:w-16 md:h-16 text-gray-400 mb-2 md:mb-3 group-hover:text-[#FF6B35] transition-colors" />
            <h3 className="font-semibold text-gray-900 text-sm md:text-base">Cerrar Sesión</h3>
          </button>
        </div>

        {/* Wishlist Summary */}
        <WishlistSummary />

        {/* Become Vendor Section */}
        {user.type === "customer" && (
          <div className="mt-12 pt-8 border-t border-gray-200">
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
