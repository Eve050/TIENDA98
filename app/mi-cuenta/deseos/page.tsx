"use client"

import { AccountLayout } from "@/components/account-layout"
import { Heart } from "lucide-react"
import Link from "next/link"

export default function DeseosPage() {
  return (
    <AccountLayout>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center mb-6">
            <Heart className="w-16 h-16 text-gray-300" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Tu lista de deseos esta vacía</h2>
          <p className="text-gray-600 mb-2">Aún no tienes ningún producto en la lista de deseos.</p>
          <p className="text-gray-600 mb-6">
            Encontrará muchos productos interesantes en nuestra página{" "}
            <Link href="/productos" className="text-[#FF6B35] hover:underline">
              &quot;Tienda&quot;
            </Link>
            .
          </p>
          <Link
            href="/productos"
            className="px-6 py-3 bg-black text-white rounded-lg hover:bg-black/90 transition-colors font-medium"
          >
            Volver A La Tienda
          </Link>
        </div>
      </div>
    </AccountLayout>
  )
}
