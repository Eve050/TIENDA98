import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { CartProvider } from "@/lib/cart-context"
import { AuthProvider } from "@/lib/auth-context"
import { WishlistProvider } from "@/lib/wishlist-context"
import { CompareProvider } from "@/lib/compare-context"
import WhatsAppFloat from "@/components/whatsapp-float"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TIENDA98 - Todo en un Solo Lugar, Seguro y Más Barato",
  description: "Tu marketplace en línea para Ecuador. Encuentra tecnología, moda, repuestos y más al mejor precio.",
  generator: "v0.app",
  icons: {
    icon: "/logo-tienda98.png",
    apple: "/logo-tienda98.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`font-sans antialiased`}>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <CompareProvider>
                {children}
                <WhatsAppFloat />
              </CompareProvider>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
