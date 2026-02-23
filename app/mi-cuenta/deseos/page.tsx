"use client"

import { AccountLayout } from "@/components/account-layout"
import { Heart, Trash2, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { useWishlist } from "@/lib/wishlist-context"
import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function DeseosPage() {
  const { items, removeItem } = useWishlist()
  const { addItem } = useCart()

  if (items.length === 0) {
    return (
      <AccountLayout>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center mb-6">
              <Heart className="w-16 h-16 text-gray-300" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Tu lista de deseos está vacía</h2>
            <p className="text-gray-600 mb-2">Aún no tienes ningún producto en la lista de deseos.</p>
            <p className="text-gray-600 mb-6">
              Encontrarás muchos productos interesantes en nuestra página{" "}
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

  return (
    <AccountLayout>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Mi Lista de Deseos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((product) => (
            <Card key={product.id} className="overflow-hidden group hover:shadow-md transition-all">
              <CardContent className="p-0">
                <div className="relative aspect-square overflow-hidden bg-gray-50">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full bg-orange-500 border-orange-500 text-white hover:bg-orange-600 hover:scale-110 transition-all shadow-sm"
                      onClick={() => removeItem(product.id)}
                    >
                      <Heart className="w-4 h-4 fill-current" />
                    </Button>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-xs text-muted-foreground uppercase mb-1">{product.category}</p>
                  <h3 className="font-bold text-gray-900 line-clamp-1 mb-2">{product.name}</h3>
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-bold text-[#FF6B35]">${product.price.toFixed(2)}</p>
                    <Button
                      size="sm"
                      className="rounded-full bg-slate-900 hover:bg-[#FF6B35]"
                      onClick={() => {
                        addItem({
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          image: product.image,
                          store: product.store || "Tienda98",
                        })
                      }}
                    >
                      <ShoppingCart className="w-4 h-4 mr-1" />
                      Añadir
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AccountLayout>
  )
}
