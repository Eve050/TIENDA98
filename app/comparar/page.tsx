"use client"

import React, { useEffect, useState } from "react"
import { Shuffle, Trash2, ShoppingCart, ArrowLeft, CheckCircle2, AlertCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useCompare } from "@/lib/compare-context"
import { useCart } from "@/lib/cart-context"

export default function StandaloneCompararPage() {
  const { items, removeItem, clearCompare } = useCompare()
  const { addItem } = useCart()
  const [mounted, setMounted] = useState(false)

  // Ensure hydration matches
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleAddToCart = (item: (typeof items)[0]) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      store: item.store || "Tienda98",
    })
  }

  if (!mounted) return null

  const minPrice = items.length > 0 ? Math.min(...items.map((i) => i.price)) : 0

  // Get all unique spec keys across all items
  const allSpecKeys = Array.from(
    new Set(items.flatMap((item) => (item.specs ? Object.keys(item.specs) : [])))
  )

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center p-4">
          <div className="max-w-md w-full text-center py-16 px-8 bg-white rounded-[40px] shadow-2xl shadow-slate-200/60 border border-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-400 to-orange-600" />
            <div className="w-24 h-24 mx-auto bg-orange-50 rounded-3xl flex items-center justify-center mb-8 rotate-3 hover:rotate-0 transition-transform duration-500">
              <Shuffle className="w-12 h-12 text-orange-500" />
            </div>
            <h1 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Comparador Vacío</h1>
            <p className="text-slate-500 mb-10 leading-relaxed font-medium">
              Agrega variantes de productos para compararlos lado a lado y encontrar la mejor oferta.
            </p>
            <Link href="/productos">
              <Button className="w-full bg-slate-900 hover:bg-orange-600 text-white h-14 rounded-2xl text-lg font-bold transition-all shadow-xl hover:shadow-orange-200">
                Explorar Productos
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FBFC]">
      <Header />

      <main className="flex-1 pb-20">
        {/* Banner de Título */}
        <div className="bg-white border-b border-slate-100 shadow-sm">
          <div className="container mx-auto px-4 py-6 md:py-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-2">
                <Link href="/productos" className="inline-flex items-center text-xs font-bold text-orange-600 uppercase tracking-widest hover:translate-x-[-4px] transition-all">
                  <ArrowLeft className="w-3 h-3 mr-1.5 stroke-[3]" /> Volver a vitrina
                </Link>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl md:text-5xl font-extrabold text-[#2D3142] tracking-tight">Comparativo</h1>
                  <div className="px-3 py-1 bg-orange-100 text-orange-600 rounded-lg text-[10px] font-bold uppercase">
                    {items[0].category}
                  </div>
                </div>
                <p className="text-gray-500 font-medium text-xs md:text-sm">
                  MODELO: <span className="text-[#2D3142] font-bold">{items[0].name.toUpperCase()}</span>
                </p>
              </div>

              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  className="rounded-xl h-10 md:h-12 px-4 md:px-6 font-bold text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all border border-transparent hover:border-red-100 text-xs"
                  onClick={clearCompare}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Vaciar Todo
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Zona de Comparación */}
        <div className="container mx-auto px-4 md:px-6 lg:px-12 mt-8">
          <div className="bg-white rounded-[24px] md:rounded-[32px] shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden">

            {/* Mobile View: 2 items side-by-side grid */}
            <div className="md:hidden">
              <div className="grid grid-cols-2 divide-x divide-slate-100 border-b border-slate-100">
                {items.map((item) => (
                  <div key={item.id} className="p-4 relative group flex flex-col items-center">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="absolute top-2 right-2 w-6 h-6 rounded-full bg-red-50 text-red-500 flex items-center justify-center shadow-sm z-10"
                    >
                      <X className="w-3 h-3" />
                    </button>

                    <div className="relative aspect-square w-full mb-4 flex items-center justify-center">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="max-w-full max-h-full object-contain"
                      />
                      {item.price === minPrice && items.length > 1 && (
                        <div className="absolute top-0 left-0 bg-green-500 text-white text-[8px] font-bold px-2 py-0.5 rounded-full z-10">
                          MEJOR PRECIO
                        </div>
                      )}
                    </div>

                    <div className="text-center w-full space-y-2">
                      <h3 className="text-xs font-semibold text-[#2D3142] line-clamp-2 min-h-[2.5rem]">
                        {item.name}
                      </h3>
                      <div className="text-lg font-bold text-[#2D3142]">${item.price.toFixed(2)}</div>
                      <Button
                        size="sm"
                        className="w-full bg-[#2D3142] hover:bg-orange-600 text-white h-9 rounded-lg font-bold text-[10px] transition-all"
                        onClick={() => handleAddToCart(item)}
                      >
                        <ShoppingCart className="w-3 h-3 mr-1.5" />
                        Agregar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile Specs List */}
              <div className="p-4 space-y-6">
                <div>
                  <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 text-center">Tienda</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {items.map((item) => (
                      <div key={item.id} className="text-center text-xs font-semibold text-gray-600 bg-slate-50 py-2 rounded-lg truncate px-2">
                        {item.store || "Oficial"}
                      </div>
                    ))}
                  </div>
                </div>

                {allSpecKeys.map((key) => (
                  <div key={key}>
                    <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 text-center">{key}</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {items.map((item) => (
                        <div key={item.id} className="text-center text-[11px] font-bold text-[#2D3142] bg-slate-50 py-3 px-2 rounded-lg break-words">
                          {item.specs?.[key] || <span className="text-gray-300">---</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="grid grid-cols-2 gap-4 pt-4">
                  {items.map((item) => (
                    <Button
                      key={item.id}
                      variant="outline"
                      size="sm"
                      className="w-full rounded-lg border-2 border-orange-500 text-orange-600 font-bold text-[10px] uppercase hover:bg-orange-500 hover:text-white transition-all"
                      onClick={() => handleAddToCart(item)}
                    >
                      ELEGIR ESTE
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Desktop View: Traditional Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-slate-100">
                    {items.map((item) => (
                      <th key={item.id} className="p-8 text-center relative group border-r border-slate-50 last:border-r-0 align-top">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-50 text-slate-400 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white flex items-center justify-center shadow-md z-10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                        <div className="flex flex-col items-center w-full">
                          <div className="relative w-48 h-48 mb-6 group-hover:scale-105 transition-transform duration-500 flex items-center justify-center">
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              className="max-w-full max-h-full object-contain"
                            />
                            {item.price === minPrice && items.length > 1 && (
                              <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-green-500 text-white text-[10px] font-bold px-4 py-1.5 rounded-full shadow-lg z-10">
                                MEJOR OPCIÓN
                              </div>
                            )}
                          </div>

                          <div className="space-y-4 w-full text-center">
                            <h3 className="text-sm font-bold text-[#2D3142] line-clamp-2 h-10">
                              {item.name}
                            </h3>
                            <div className="text-3xl font-bold text-[#2D3142] tracking-tight">
                              ${item.price.toFixed(2)}
                            </div>
                            <Button
                              className="w-full bg-[#2D3142] hover:bg-orange-600 text-white h-12 rounded-xl font-bold text-sm transition-all shadow-md group/btn"
                              onClick={() => handleAddToCart(item)}
                            >
                              <ShoppingCart className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                              AGREGAR AL CARRITO
                            </Button>
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-50">
                  {/* Fila de Vendedor */}
                  <tr>
                    {items.map((item, idx) => (
                      <td key={item.id} className={`p-6 text-center border-r border-slate-50 last:border-r-0`}>
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">TIENDA</div>
                        <span className="px-4 py-2 bg-slate-50 text-[#2D3142] rounded-lg text-sm font-bold">
                          {item.store || "Oficial"}
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Especificaciones Dinámicas */}
                  {allSpecKeys.map((key) => (
                    <tr key={key} className="group hover:bg-slate-50/40 transition-colors">
                      {items.map((item) => (
                        <td key={item.id} className="p-8 text-center border-r border-slate-50 last:border-r-0">
                          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">{key}</div>
                          <div className="text-base font-bold text-[#2D3142]">
                            {item.specs?.[key] || <span className="text-gray-200">---</span>}
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}

                  {/* Fila de Acción Final */}
                  <tr>
                    {items.map((item) => (
                      <td key={item.id} className="p-8 text-center border-r border-slate-50 last:border-r-0">
                        <Button
                          variant="outline"
                          className="w-full rounded-xl border-2 border-orange-500 text-orange-600 font-bold text-sm uppercase hover:bg-orange-500 hover:text-white transition-all py-6 h-auto"
                          onClick={() => handleAddToCart(item)}
                        >
                          ELEGIR ESTE PRODUCTO
                        </Button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-12 text-center px-4">
            <div className="inline-flex items-center gap-2 p-4 bg-white shadow-sm text-gray-500 rounded-2xl text-xs font-bold border border-slate-100 italic">
              <AlertCircle className="w-5 h-5 text-orange-500" /> Comparativa exclusiva de variantes bajo el mismo modelo.
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}
