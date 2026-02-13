"use client"

import { MessageCircle } from "lucide-react"
import Link from "next/link"

export default function WhatsAppFloat() {
  return (
    <Link
      href="https://wa.me/593999999999"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-2xl hover:scale-110 transition-all duration-300 animate-bounce"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
    </Link>
  )
}
