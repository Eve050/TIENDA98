"use client"

import { AccountLayout } from "@/components/account-layout"
import { Shuffle, Trash2, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useCompare } from "@/lib/compare-context"
import { useCart } from "@/lib/cart-context"

export default function CompararPage() {
    const { items, removeItem, clearCompare } = useCompare()
    const { addItem } = useCart()

    const handleAddToCart = (item: (typeof items)[0]) => {
        addItem({
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            store: item.store || "Tienda98",
        })
    }

    const minPrice = items.length > 0 ? Math.min(...items.map((i) => i.price)) : 0

    // Get all unique spec keys across all items
    const allSpecKeys = Array.from(
        new Set(items.flatMap((item) => (item.specs ? Object.keys(item.specs) : [])))
    )

    if (items.length === 0) {
        return (
            <AccountLayout>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                    <div className="w-20 h-20 mx-auto bg-orange-100 rounded-full flex items-center justify-center mb-6">
                        <Shuffle className="w-10 h-10 text-orange-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">La lista de comparación está vacía</h2>
                    <p className="text-gray-500 mb-8 max-w-md mx-auto">
                        Agrega productos similares desde nuestra tienda para comparar sus precios y características técnicas lado a lado.
                    </p>
                    <Link href="/productos">
                        <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl transition-all hover:scale-105">
                            Ir a la Tienda
                        </Button>
                    </Link>
                </div>
            </AccountLayout>
        )
    }

    return (
        <AccountLayout>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900">Comparar Productos</h2>
                    <Button
                        variant="outline"
                        size="sm"
                        className="text-red-500 border-red-100 hover:bg-red-50"
                        onClick={clearCompare}
                    >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Limpiar todo
                    </Button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr>
                                <th className="p-6 text-left bg-gray-50/50 w-48 min-w-[200px] border-r border-b border-gray-100">
                                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Especificaciones</span>
                                </th>
                                {items.map((item) => (
                                    <th key={item.id} className="p-6 text-center border-b border-gray-100 min-w-[250px] relative">
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                        <div className="flex flex-col items-center">
                                            <div className="relative w-28 h-28 mb-4">
                                                <img
                                                    src={item.image || "/placeholder.svg"}
                                                    alt={item.name}
                                                    className="w-full h-full object-contain"
                                                />
                                                {item.price === minPrice && items.length > 1 && (
                                                    <div className="absolute -top-2 -left-2 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg">
                                                        MÁS BARATO
                                                    </div>
                                                )}
                                            </div>
                                            <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 text-sm h-10">{item.name}</h3>
                                            <div className="flex flex-col items-center gap-1">
                                                <span className="text-xl font-black text-orange-500">${item.price.toFixed(2)}</span>
                                                {item.originalPrice && (
                                                    <span className="text-xs text-gray-400 line-through">${item.originalPrice.toFixed(2)}</span>
                                                )}
                                            </div>
                                            <Button
                                                size="sm"
                                                className="mt-4 w-full bg-gray-900 hover:bg-orange-500 text-white rounded-lg"
                                                onClick={() => handleAddToCart(item)}
                                            >
                                                <ShoppingCart className="w-4 h-4 mr-2" />
                                                Comprar
                                            </Button>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="p-4 font-semibold text-gray-600 bg-gray-50/50 border-r border-b border-gray-100">Categoría</td>
                                {items.map((item) => (
                                    <td key={item.id} className="p-4 text-center border-b border-gray-100">
                                        <span className="text-xs font-medium bg-gray-100 px-2.5 py-0.5 rounded-full text-gray-600">
                                            {item.category || "General"}
                                        </span>
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td className="p-4 font-semibold text-gray-600 bg-gray-50/50 border-r border-b border-gray-100">Tienda</td>
                                {items.map((item) => (
                                    <td key={item.id} className="p-4 text-center border-b border-gray-100 text-sm">
                                        {item.store || "Tienda98"}
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td className="p-4 font-semibold text-gray-600 bg-gray-50/50 border-r border-b border-gray-100 align-top">Características</td>
                                {items.map((item) => (
                                    <td key={item.id} className="p-4 border-b border-gray-100 align-top">
                                        <ul className="space-y-1 list-disc list-inside text-[11px] text-gray-600">
                                            {item.features?.map((f, i) => (
                                                <li key={i}>{f}</li>
                                            )) || <span className="italic text-gray-400">Sin datos</span>}
                                        </ul>
                                    </td>
                                ))}
                            </tr>
                            {allSpecKeys.map((key) => (
                                <tr key={key}>
                                    <td className="p-4 font-semibold text-gray-600 bg-gray-50/50 border-r border-b border-gray-100">{key}</td>
                                    {items.map((item) => (
                                        <td key={item.id} className="p-4 text-center border-b border-gray-100 text-sm">
                                            {item.specs?.[key] || <span className="text-gray-300">-</span>}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AccountLayout>
    )
}
