"use client"

import React from "react"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Search,
  Plus,
  Filter,
  Download,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Copy,
  ChevronLeft,
  ChevronRight,
  Package,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"

const products = [
  {
    id: 1,
    name: "iPhone 15 Pro Max 256GB",
    sku: "IPH15PM256",
    image: "/modern-smartphone.png",
    category: "Tecnología",
    price: 1299.00,
    stock: 45,
    status: "publicado",
    vendor: "TechStore EC",
    sales: 156,
    date: "2025-01-15",
  },
  {
    id: 2,
    name: "MacBook Pro M3 14\"",
    sku: "MBP14M3",
    image: "/modern-laptop-workspace.png",
    category: "Tecnología",
    price: 1999.00,
    stock: 12,
    status: "publicado",
    vendor: "TechStore EC",
    sales: 89,
    date: "2025-01-14",
  },
  {
    id: 3,
    name: "Nike Air Max 90",
    sku: "NAM90-BLK",
    image: "/nike-sneakers.jpg",
    category: "Moda",
    price: 129.00,
    stock: 0,
    status: "agotado",
    vendor: "ModaStyle",
    sales: 234,
    date: "2025-01-13",
  },
  {
    id: 4,
    name: "Sofá Moderno 3 Plazas",
    sku: "SOF-MOD-3P",
    image: "/comfortable-living-room-sofa.png",
    category: "Hogar",
    price: 599.00,
    stock: 8,
    status: "publicado",
    vendor: "HomeDecor",
    sales: 45,
    date: "2025-01-12",
  },
  {
    id: 5,
    name: "Kit de Frenos Delanteros",
    sku: "KFD-001",
    image: "/auto-parts-professional.png",
    category: "Repuestos",
    price: 89.00,
    stock: 67,
    status: "borrador",
    vendor: "AutoParts Pro",
    sales: 0,
    date: "2025-01-11",
  },
  {
    id: 6,
    name: "AirPods Pro 2da Gen",
    sku: "APP2-WHT",
    image: "/wireless-headphones.png",
    category: "Tecnología",
    price: 249.00,
    stock: 5,
    status: "publicado",
    vendor: "TechStore EC",
    sales: 178,
    date: "2025-01-10",
  },
  {
    id: 7,
    name: "Chaqueta de Cuero",
    sku: "CHQ-CUE-M",
    image: "/classic-leather-jacket.png",
    category: "Moda",
    price: 199.00,
    stock: 23,
    status: "publicado",
    vendor: "ModaStyle",
    sales: 67,
    date: "2025-01-09",
  },
  {
    id: 8,
    name: "PlayStation 5",
    sku: "PS5-STD",
    image: "/playstation-5-console.png",
    category: "Tecnología",
    price: 499.00,
    stock: 3,
    status: "publicado",
    vendor: "TechStore EC",
    sales: 134,
    date: "2025-01-08",
  },
]

const statusColors: Record<string, { bg: string; text: string; icon: React.ReactNode }> = {
  publicado: { bg: "bg-green-100", text: "text-green-700", icon: <CheckCircle className="w-4 h-4" /> },
  borrador: { bg: "bg-gray-100", text: "text-gray-700", icon: <Edit className="w-4 h-4" /> },
  agotado: { bg: "bg-red-100", text: "text-red-700", icon: <XCircle className="w-4 h-4" /> },
  pendiente: { bg: "bg-yellow-100", text: "text-yellow-700", icon: <AlertCircle className="w-4 h-4" /> },
}

function AdminProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedProducts, setSelectedProducts] = useState<number[]>([])
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState<typeof products[0] | null>(null)

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    const matchesStatus = selectedStatus === "all" || product.status === selectedStatus
    return matchesSearch && matchesCategory && matchesStatus
  })

  const toggleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([])
    } else {
      setSelectedProducts(filteredProducts.map((p) => p.id))
    }
  }

  const toggleSelectProduct = (id: number) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(selectedProducts.filter((p) => p !== id))
    } else {
      setSelectedProducts([...selectedProducts, id])
    }
  }

  const handleDelete = (product: typeof products[0]) => {
    setProductToDelete(product)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    // Lógica para eliminar
    setDeleteDialogOpen(false)
    setProductToDelete(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Productos</h1>
          <p className="text-gray-500">Gestiona todos los productos de la tienda</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2 bg-transparent">
            <Download className="w-4 h-4" />
            Exportar
          </Button>
          <Link href="/admin/productos/nuevo">
            <Button className="bg-orange-500 hover:bg-orange-600 gap-2">
              <Plus className="w-4 h-4" />
              Añadir Producto
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">1,234</p>
                <p className="text-sm text-gray-500">Total</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">1,089</p>
                <p className="text-sm text-gray-500">Publicados</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">45</p>
                <p className="text-sm text-gray-500">Stock Bajo</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <XCircle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">23</p>
                <p className="text-sm text-gray-500">Agotados</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Buscar por nombre o SKU..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las categorías</SelectItem>
                <SelectItem value="Tecnología">Tecnología</SelectItem>
                <SelectItem value="Moda">Moda</SelectItem>
                <SelectItem value="Hogar">Hogar</SelectItem>
                <SelectItem value="Repuestos">Repuestos</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="publicado">Publicado</SelectItem>
                <SelectItem value="borrador">Borrador</SelectItem>
                <SelectItem value="agotado">Agotado</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2 bg-transparent">
              <Filter className="w-4 h-4" />
              Más filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedProducts.length > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 flex items-center justify-between">
          <p className="text-orange-800">
            {selectedProducts.length} producto(s) seleccionado(s)
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">Cambiar Estado</Button>
            <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
              Eliminar
            </Button>
          </div>
        </div>
      )}

      {/* Products Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="w-12 px-4 py-3">
                    <Checkbox
                      checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                      onCheckedChange={toggleSelectAll}
                    />
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Producto</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">SKU</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Categoría</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Precio</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Stock</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Estado</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Vendedor</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Ventas</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <Checkbox
                        checked={selectedProducts.includes(product.id)}
                        onCheckedChange={() => toggleSelectProduct(product.id)}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 line-clamp-1">{product.name}</p>
                          <p className="text-sm text-gray-500">{product.date}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-gray-600 font-mono">{product.sku}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-gray-600">{product.category}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-medium">${product.price.toFixed(2)}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`font-medium ${product.stock === 0 ? 'text-red-600' : product.stock < 10 ? 'text-yellow-600' : 'text-gray-900'}`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${statusColors[product.status].bg} ${statusColors[product.status].text}`}>
                        {statusColors[product.status].icon}
                        {product.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-gray-600">{product.vendor}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-gray-600">{product.sales}</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="w-4 h-4 mr-2" />
                            Ver detalles
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="w-4 h-4 mr-2" />
                            Duplicar
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => handleDelete(product)}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-3 border-t">
            <p className="text-sm text-gray-500">
              Mostrando {filteredProducts.length} de {products.length} productos
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" className="bg-orange-500 text-white hover:bg-orange-600">
                1
              </Button>
              <Button variant="outline" size="sm">2</Button>
              <Button variant="outline" size="sm">3</Button>
              <Button variant="outline" size="sm">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Delete Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Eliminar Producto</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas eliminar "{productToDelete?.name}"? Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default function Page() {
  return (
    <Suspense fallback={null}>
      <AdminProductsPage />
    </Suspense>
  )
}
