"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import VendorSidebar from "@/components/vendor-sidebar"
import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { Pencil, Trash2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function VendedorProductosPage() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)

  useEffect(() => {
    if (!isAuthenticated || user?.type !== "seller") {
      router.push("/mi-cuenta")
    }
  }, [isAuthenticated, user, router])

  if (!isAuthenticated || user?.type !== "seller") {
    return null
  }

  const products = [
    {
      id: 1,
      image: "/placeholder.svg?height=60&width=60",
      name: "Pantalón - Il giornale",
      status: "Publicado",
      sku: "-",
      inventory: "Hay existencias",
      price: "$97.00",
      earnings: "$92.15",
      type: "simple",
      views: 16,
      date: "mayo 16, 2025",
    },
    {
      id: 2,
      image: "/placeholder.svg?height=60&width=60",
      name: "Bolso Tote Bag - 500 gramos antes de Cristo",
      status: "Publicado",
      sku: "-",
      inventory: "Hay existencias",
      price: "$20.00",
      earnings: "$19.00",
      type: "simple",
      views: 84,
      date: "mayo 16, 2025",
    },
    {
      id: 3,
      image: "/placeholder.svg?height=60&width=60",
      name: "PA` TODO UNO -",
      status: "Publicado",
      sku: "-",
      inventory: "Hay existencias",
      price: "$50.00",
      earnings: "$47.50",
      type: "simple",
      views: 59,
      date: "mayo 10,",
    },
  ]

  const handleEditProduct = (productId: number) => {
    console.log("[v0] Editing product:", productId)
    alert(`Editando producto ${productId}`)
  }

  const handleDeleteProduct = (productId: number) => {
    if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      console.log("[v0] Deleting product:", productId)
      alert(`Producto ${productId} eliminado`)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <VendorSidebar />
        <main className="flex-1 bg-gray-50 p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex gap-4 text-sm">
                <button className="font-semibold border-b-2 border-black pb-1">All (11)</button>
                <button className="text-gray-600 hover:text-black">Publicado (8)</button>
                <button className="text-gray-600 hover:text-black">Borrador (3)</button>
                <button className="text-gray-600 hover:text-black">Hay existencias (11)</button>
              </div>
              <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-black hover:bg-black/90">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Añadir Nuevo Producto
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Añadir Nuevo Producto</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="product-name">Nombre del producto *</Label>
                      <Input id="product-name" placeholder="Ingresa el nombre del producto" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="product-description">Descripción</Label>
                      <Textarea id="product-description" placeholder="Descripción del producto" rows={4} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="product-price">Precio regular *</Label>
                        <Input id="product-price" type="number" placeholder="0.00" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="product-sale-price">Precio de oferta</Label>
                        <Input id="product-sale-price" type="number" placeholder="0.00" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="product-category">Categoría *</Label>
                      <Select>
                        <SelectTrigger id="product-category">
                          <SelectValue placeholder="Selecciona una categoría" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="electronics">Electrónicos</SelectItem>
                          <SelectItem value="fashion">Moda</SelectItem>
                          <SelectItem value="home">Hogar</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="product-sku">SKU</Label>
                      <Input id="product-sku" placeholder="SKU del producto" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="product-stock">Cantidad en stock *</Label>
                      <Input id="product-stock" type="number" placeholder="0" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="product-image">Imagen del producto</Label>
                      <Input id="product-image" type="file" accept="image/*" />
                    </div>

                    <div className="flex gap-4 pt-4">
                      <Button
                        className="flex-1 bg-black hover:bg-black/90"
                        onClick={() => {
                          alert("Producto agregado exitosamente")
                          setIsAddProductOpen(false)
                        }}
                      >
                        Agregar Producto
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 bg-transparent"
                        onClick={() => setIsAddProductOpen(false)}
                      >
                        Cancelar
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Filters */}
            <Card className="p-4">
              <div className="flex flex-wrap gap-4 items-center">
                <Select defaultValue="all-dates">
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-dates">Todas las fechas</SelectItem>
                  </SelectContent>
                </Select>

                <Select defaultValue="all-categories">
                  <SelectTrigger className="w-56">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-categories">- Selecciona una categoría -</SelectItem>
                  </SelectContent>
                </Select>

                <Input placeholder="Tipo de producto" className="w-48" />

                <Select defaultValue="all-brands">
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-brands">- Select a brand -</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline">Filtro</Button>
                <Button variant="outline">Restablecer</Button>

                <Input
                  placeholder="Buscar productos"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64 ml-auto"
                />
                <Button className="bg-black hover:bg-black/90">Buscar</Button>
              </div>
            </Card>

            {/* Bulk Actions */}
            <div className="flex items-center gap-4">
              <Select defaultValue="bulk-actions">
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bulk-actions">Acciones en lote</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">Aplicar</Button>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-lg border overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left">
                      <input type="checkbox" className="rounded" />
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">IMAGEN</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">NOMBRE</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">ESTADO</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">SKU</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">INVENTARIO</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">PRECIO</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">GANANCIAS</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">TIPO</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">VISUALIZACIONES</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">FECHA</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">ACCIONES</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-4">
                        <input type="checkbox" className="rounded" />
                      </td>
                      <td className="px-4 py-4">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-12 h-12 rounded object-cover"
                        />
                      </td>
                      <td className="px-4 py-4 text-sm">{product.name}</td>
                      <td className="px-4 py-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {product.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm">{product.sku}</td>
                      <td className="px-4 py-4">
                        <span className="text-sm text-green-600">{product.inventory}</span>
                      </td>
                      <td className="px-4 py-4 text-sm font-semibold">{product.price}</td>
                      <td className="px-4 py-4 text-sm font-semibold">{product.earnings}</td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-1">
                          <span className="inline-block w-1 h-1 bg-gray-400 rounded-full"></span>
                          <span className="inline-block w-1 h-1 bg-gray-400 rounded-full"></span>
                          <span className="inline-block w-1 h-1 bg-gray-400 rounded-full"></span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-center">{product.views}</td>
                      <td className="px-4 py-4 text-sm">
                        <div className="text-red-600">{product.date}</div>
                        <div className="text-xs text-gray-500">{product.status}</div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEditProduct(product.id)}
                            className="p-2 hover:bg-blue-50 rounded text-blue-600"
                            title="Editar"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="p-2 hover:bg-red-50 rounded text-red-600"
                            title="Eliminar"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
