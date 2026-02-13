"use client"

import { AccountLayout } from "@/components/account-layout"
import { AlertCircle } from "lucide-react"
import Link from "next/link"

export default function DescargasPage() {
  return (
    <AccountLayout>
      <div className="bg-[#EAB308] text-white rounded-lg p-4 flex items-center gap-3 shadow-sm">
        <AlertCircle className="w-5 h-5 flex-shrink-0" />
        <p className="text-sm">
          No hay descargas disponibles todavía.{" "}
          <Link href="/productos" className="underline hover:no-underline font-semibold">
            Explorar Los Productos
          </Link>
        </p>
      </div>
    </AccountLayout>
  )
}
