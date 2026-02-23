"use client"

import React, { useEffect, useState } from "react"
import { Heart, Trash2, ShoppingCart, ArrowLeft, ShoppingBag, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useWishlist } from "@/lib/wishlist-context"
import { useCart } from "@/lib/cart-context"

export default function FavoritosPage() {
    const { items, removeItem, clearWishlist } = useWishlist()
    const { addItem } = useCart()
    const [mounted, setMounted] = useState(false)

    // Ensure hydration matches
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    if (items.length === 0) {
        return (
            <div className="min-h-screen flex flex-col bg-slate-50">
                <Header />
                <main className="flex-1 flex flex-col items-center justify-center p-4">
                    <div className="max-w-md w-full text-center py-20 px-10 bg-white rounded-[48px] shadow-2xl shadow-slate-200/60 border border-white relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-400 to-pink-600" />
                        <div className="w-28 h-28 mx-auto bg-red-50 rounded-[32px] flex items-center justify-center mb-8 rotate-[-3deg] hover:rotate-0 transition-all duration-500 shadow-inner">
                            <Heart className="w-14 h-14 text-red-500" />
                        </div>
                        <h1 className="text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">Tu Colección Especial</h1>
                        <p className="text-slate-500 mb-10 leading-relaxed font-medium">
                            Aún no has guardado favoritos. Agrega productos que te encanten para verlos aquí más tarde.
                        </p>
                        <Link href="/productos">
                            <Button className="w-full bg-slate-900 hover:bg-red-500 text-white h-16 rounded-2xl text-lg font-bold transition-all shadow-xl hover:shadow-red-200">
                                Ver Catálogo
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

            <main className="flex-1 pb-24">
                {/* Banner Superior Premium */}
                <div className="bg-white border-b border-slate-100 shadow-sm overflow-hidden relative">
                    <div className="absolute top-[-50px] right-[-30px] w-64 h-64 bg-red-50 rounded-full blur-3xl opacity-60 pointer-events-none" />

                    <div className="container mx-auto px-4 py-8 md:py-12 relative z-10">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                            <div className="space-y-3">
                                <Link href="/productos" className="inline-flex items-center text-xs font-bold text-red-600 uppercase tracking-[0.2em] hover:translate-x-[-4px] transition-all">
                                    <ArrowLeft className="w-3.5 h-3.5 mr-2 stroke-[3]" /> seguir comprando
                                </Link>
                                <div className="flex items-center gap-4">
                                    <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight">Mis Favoritos</h1>
                                </div>
                                <p className="text-slate-400 font-bold text-sm md:text-lg">
                                    Tienes <span className="text-red-500 font-extrabold">{items.length} productos</span> seleccionados en tu lista de deseos.
                                </p>
                            </div>

                            <div className="flex items-center gap-4">
                                <Button
                                    variant="ghost"
                                    className="rounded-2xl h-12 md:h-14 px-6 md:px-8 font-bold text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all border-2 border-slate-50 hover:border-red-100 text-xs uppercase"
                                    onClick={clearWishlist}
                                >
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Vaciar Colección
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Rejilla de Favoritos Premium */}
                <div className="container mx-auto px-4 mt-12 md:mt-16">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10">
                        {items.map((product) => (
                            <div key={product.id} className="group relative bg-white rounded-[40px] shadow-xl shadow-slate-200/50 border border-slate-100 p-6 transition-all duration-500 hover:shadow-2xl hover:translate-y-[-10px]">

                                {/* Botón de Eliminar Rápido */}
                                <button
                                    onClick={() => removeItem(product.id)}
                                    className="absolute top-6 right-6 w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-500 hover:text-white flex items-center justify-center shadow-lg z-20 active:scale-95"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>

                                {/* Imagen del Producto */}
                                <div className="relative aspect-square mb-6 overflow-hidden flex items-center justify-center bg-slate-50 rounded-[32px] group-hover:bg-slate-100 transition-colors duration-500">
                                    <img
                                        src={product.image || "/placeholder.svg"}
                                        alt={product.name}
                                        className="w-[85%] h-[85%] object-contain transform-gpu transition-transform duration-700 ease-out group-hover:rotate-6 group-hover:scale-110"
                                    />
                                    <div className="absolute bottom-4 left-4">
                                        <span className="px-3 py-1 bg-white/80 backdrop-blur-sm border border-slate-100/50 text-slate-600 rounded-lg text-[9px] font-black uppercase tracking-widest shadow-sm">
                                            {product.category || "General"}
                                        </span>
                                    </div>
                                </div>

                                {/* Detalles y CTA */}
                                <div className="space-y-5 px-2">
                                    <h3 className="text-base md:text-lg font-semibold text-slate-900 leading-snug line-clamp-2 h-14">
                                        {product.name}
                                    </h3>

                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <span className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight tabular-nums">${product.price.toFixed(0)}</span>
                                            {product.originalPrice && (
                                                <span className="text-xs text-slate-300 line-through font-bold mt-[-2px]">${product.originalPrice}</span>
                                            )}
                                        </div>
                                        <div className="text-[10px] font-black text-orange-500 uppercase tracking-widest bg-orange-50 px-2 py-1 rounded-md">
                                            {product.store || "Oficial"}
                                        </div>
                                    </div>

                                    <div className="pt-2">
                                        <Button
                                            className="w-full bg-slate-900 hover:bg-orange-500 text-white h-14 rounded-2xl font-bold text-xs uppercase tracking-[0.1em] transition-all transform active:scale-95 shadow-xl shadow-slate-100 hover:shadow-orange-200"
                                            onClick={() => addItem({
                                                id: product.id,
                                                name: product.name,
                                                price: product.price,
                                                image: product.image,
                                                store: product.store || "Oficial"
                                            })}
                                        >
                                            <ShoppingBag className="w-4 h-4 mr-2" />
                                            Añadir al Carrito
                                        </Button>
                                    </div>
                                </div>

                                {/* Acabado decorativo */}
                                <div className="absolute bottom-1 right-8 left-8 h-1 bg-slate-50 rounded-full group-hover:bg-orange-100/50 transition-colors" />
                            </div>
                        ))}
                    </div>

                    {/* Footer de la zona de Favoritos */}
                    <div className="mt-20 flex flex-col md:flex-row items-center justify-center gap-4 py-8 border-t border-slate-100">
                        <div className="flex items-center gap-3 text-slate-400 font-bold text-xs uppercase tracking-widest px-4 text-center">
                            <AlertCircle size={16} className="text-slate-300" /> Estos productos se guardan automáticamente en tu perfil.
                        </div>
                    </div>
                </div>
            </main>

            <Footer />

            <style jsx global>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
        </div>
    )
}

function AlertCircle({ size, className }: { size?: number, className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
    )
}
