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
import { Pencil, Trash2, Plus, Search, Eye, ImagePlus, X } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const ALL_CATEGORIES = [
  "Moda y Accesorios",
  "Tecnología",
  "Vehículos",
  "Hogar y Jardín",
  "Medicina",
  "Alimentos",
  "Belleza",
  "Deportes",
  "Juegos y Juguetes"
]

const initialProducts = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=400&h=400&fit=crop",
    images: ["https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=400&h=400&fit=crop"],
    name: "Pantalón - Il giornale",
    status: "Publicado",
    sku: "PAN-001",
    inventory: 15,
    price: 97.00,
    earnings: 92.15,
    type: "simple",
    date: "16 mayo, 2025",
    category: "Moda y Accesorios",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop",
    images: ["https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop"],
    name: "Bolso Tote Bag - 500g",
    status: "Publicado",
    sku: "BOL-002",
    inventory: 8,
    price: 20.00,
    earnings: 19.00,
    type: "simple",
    date: "16 mayo, 2025",
    category: "Moda y Accesorios",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop"],
    name: "PA` TODO UNO - Sneakers",
    status: "Publicado",
    sku: "SNK-003",
    inventory: 42,
    price: 50.00,
    earnings: 47.50,
    type: "simple",
    date: "10 mayo, 2025",
    category: "Moda y Accesorios",
  },
]

export default function VendedorProductosPage() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const [products, setProducts] = useState(initialProducts)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<any>(null)
  const [newProduct, setNewProduct] = useState<any>({
    name: "",
    price: "",
    category: "Moda y Accesorios",
    stock: "",
    sku: "",
    images: [],
  })

  useEffect(() => {
    if (!isAuthenticated || user?.type !== "seller") {
      router.push("/mi-cuenta")
    }
  }, [isAuthenticated, user, router])

  if (!isAuthenticated || user?.type !== "seller") {
    return null
  }

  const handleDeleteProduct = (productId: number) => {
    if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      setProducts(products.filter(p => p.id !== productId))
    }
  }

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price) {
      alert("Nombre y precio son requeridos")
      return
    }

    const priceNum = parseFloat(newProduct.price)
    const product = {
      id: Date.now(),
      image: newProduct.images[0] || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
      images: newProduct.images.length > 0 ? newProduct.images : ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop"],
      name: newProduct.name,
      status: "Publicado",
      sku: newProduct.sku || "N/A",
      inventory: parseInt(newProduct.stock) || 0,
      price: priceNum,
      earnings: priceNum * 0.95,
      type: "simple",
      date: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' }),
      category: newProduct.category,
    }

    setProducts([product, ...products])
    setIsAddProductOpen(false)
    setNewProduct({ name: "", price: "", category: "Moda y Accesorios", stock: "", sku: "", images: [] })
  }

  const handleEditProduct = () => {
    if (!editingProduct.name || !editingProduct.price) {
      alert("Nombre y precio son requeridos")
      return
    }

    const priceNum = parseFloat(editingProduct.price)
    const updatedProducts = products.map(p => {
      if (p.id === editingProduct.id) {
        return {
          ...p,
          ...editingProduct,
          price: priceNum,
          earnings: priceNum * 0.95,
          inventory: parseInt(editingProduct.inventory) || 0
        }
      }
      return p
    })

    setProducts(updatedProducts)
    setEditingProduct(null)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, index: number, isEditing: boolean = false) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        if (isEditing) {
          const imgs = [...(editingProduct.images || [])]
          imgs[index] = result
          setEditingProduct({ ...editingProduct, images: imgs, image: imgs[0] })
        } else {
          const imgs = [...newProduct.images]
          imgs[index] = result
          setNewProduct({ ...newProduct, images: imgs })
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "all" || product.category === filterCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FBFC]">
      <Header />
      <div className="flex flex-1">
        <VendorSidebar />
        <main className="flex-1 p-6 md:p-10">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Top Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h1 className="text-3xl font-black text-[#2D3142] tracking-tight uppercase">GESTIÓN DE PRODUCTOS</h1>
                <p className="text-slate-400 font-medium">Administra tus existencias y catálogo</p>
              </div>
              <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white font-black px-8 py-6 rounded-2xl shadow-lg shadow-orange-100 transition-all active:scale-95">
                    <Plus className="w-5 h-5 mr-2" />
                    Añadir Nuevo Producto
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl rounded-[32px] border-none p-8 max-h-[95vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-black text-[#2D3142]">AÑADIR PRODUCTO</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-8 py-6">
                    {/* Photos Section */}
                    <div className="space-y-3">
                      <Label className="text-xs font-bold uppercase text-slate-400">Fotos del producto (Carga desde tu dispositivo)</Label>
                      <div className="flex gap-4">
                        {[0, 1, 2].map((i) => (
                          <div key={i} className="relative w-24 h-24 rounded-2xl bg-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden transition-all hover:border-orange-200">
                            {newProduct.images[i] ? (
                              <>
                                <img src={newProduct.images[i]} alt="Preview" className="w-full h-full object-cover" />
                                <button
                                  onClick={() => {
                                    const imgs = [...newProduct.images]
                                    imgs.splice(i, 1)
                                    setNewProduct({ ...newProduct, images: imgs })
                                  }}
                                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 shadow-md hover:scale-110 transition-transform"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </>
                            ) : (
                              <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer group">
                                <ImagePlus className="w-8 h-8 text-slate-300 group-hover:text-orange-500 transition-colors" />
                                <input
                                  type="file"
                                  className="hidden"
                                  accept="image/*"
                                  onChange={(e) => handleFileUpload(e, i)}
                                />
                              </label>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2 md:col-span-2">
                        <Label className="text-xs font-bold uppercase text-slate-400">Nombre del producto *</Label>
                        <Input
                          value={newProduct.name}
                          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                          className="rounded-xl h-12 bg-slate-50 border-slate-100"
                          placeholder="Ej. iPhone 15 Pro"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-bold uppercase text-slate-400">Precio *</Label>
                        <Input
                          type="number"
                          value={newProduct.price}
                          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                          className="rounded-xl h-12 bg-slate-50 border-slate-100"
                          placeholder="0.00"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-bold uppercase text-slate-400">Stock</Label>
                        <Input
                          type="number"
                          value={newProduct.stock}
                          onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                          className="rounded-xl h-12 bg-slate-50 border-slate-100"
                          placeholder="0"
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label className="text-xs font-bold uppercase text-slate-400">Categoría</Label>
                        <Select
                          value={newProduct.category}
                          onValueChange={(v) => setNewProduct({ ...newProduct, category: v })}
                        >
                          <SelectTrigger className="rounded-xl h-12 bg-slate-50 border-slate-100">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {ALL_CATEGORIES.map(cat => (
                              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-4 md:col-span-2 pt-4 border-t border-slate-100">
                        <h4 className="text-sm font-black text-[#2D3142] uppercase">Opciones Adicionales</h4>
                        <div className="space-y-2">
                          <Label className="text-xs font-bold uppercase text-slate-400">SKU (Código único)</Label>
                          <Input
                            value={newProduct.sku}
                            onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })}
                            className="rounded-xl h-12 bg-slate-50 border-slate-100"
                            placeholder="Ej. SKU-IPH-15P"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Button onClick={handleAddProduct} className="flex-1 bg-[#2D3142] hover:bg-black py-6 rounded-2xl font-black transition-all">
                      CREAR PRODUCTO
                    </Button>
                    <Button onClick={() => setIsAddProductOpen(false)} variant="outline" className="flex-1 py-6 rounded-2xl font-black border-slate-200">
                      CANCELAR
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Filter Section */}
            <Card className="border-none shadow-sm rounded-[32px] p-6 bg-white">
              <div className="flex flex-wrap items-center gap-4">
                <div className="relative flex-1 min-w-[300px]">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    placeholder="Buscar por nombre de producto..."
                    className="pl-11 rounded-2xl h-12 bg-slate-50 border-slate-100 focus:ring-orange-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="w-56 rounded-2xl h-12 bg-slate-50 border-slate-100 font-bold text-xs uppercase text-left">
                    <div className="truncate">
                      {filterCategory === "all" ? "Todas las categorías" : filterCategory}
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las categorías</SelectItem>
                    {ALL_CATEGORIES.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="ghost" onClick={() => { setSearchTerm(""); setFilterCategory("all") }} className="text-xs font-bold text-slate-400 hover:text-orange-600 px-6">
                  RESTABLECER
                </Button>
              </div>
            </Card>

            {/* Products Table */}
            <div className="bg-white rounded-[32px] shadow-sm border border-slate-50 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/50">
                      <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Imagen</th>
                      <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Producto</th>
                      <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Estado</th>
                      <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Stock</th>
                      <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Precio</th>
                      <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Ganancia</th>
                      <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {filteredProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="px-8 py-5">
                          <div className="w-14 h-14 rounded-2xl overflow-hidden bg-slate-100 border border-slate-100 shadow-sm transition-transform group-hover:scale-105">
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                          </div>
                        </td>
                        <td className="px-8 py-5">
                          <p className="font-black text-[#2D3142] text-sm mb-1">{product.name}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">SKU: {product.sku}</p>
                        </td>
                        <td className="px-8 py-5 text-center">
                          <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase ${product.status === 'Publicado' ? 'bg-green-50 text-green-600' : 'bg-slate-100 text-slate-400'}`}>
                            {product.status}
                          </span>
                        </td>
                        <td className="px-8 py-5 text-center">
                          <div className={`text-sm font-black ${product.inventory < 10 ? 'text-red-500' : 'text-slate-600'}`}>
                            {product.inventory}
                          </div>
                        </td>
                        <td className="px-8 py-5 text-right font-black text-[#2D3142] text-sm">
                          ${product.price.toFixed(2)}
                        </td>
                        <td className="px-8 py-5 text-right font-black text-orange-600 text-sm">
                          ${product.earnings.toFixed(2)}
                        </td>
                        <td className="px-8 py-5 text-right">
                          <div className="flex items-center justify-end gap-3 transition-opacity">
                            <button
                              onClick={() => setEditingProduct({ ...product })}
                              className="p-3 bg-white text-slate-400 hover:text-orange-600 rounded-xl shadow-md border border-slate-100 hover:border-orange-100 hover:scale-110 transition-all active:scale-95"
                              title="Editar producto"
                            >
                              <Pencil className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              className="p-3 bg-white text-slate-400 hover:text-red-600 rounded-xl shadow-md border border-slate-100 hover:border-red-100 hover:scale-110 transition-all active:scale-95"
                              title="Eliminar producto"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredProducts.length === 0 && (
                      <tr>
                        <td colSpan={7} className="px-8 py-20 text-center">
                          <div className="flex flex-col items-center gap-3">
                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center">
                              <Search className="w-8 h-8 text-slate-200" />
                            </div>
                            <p className="text-slate-400 font-bold uppercase text-xs tracking-widest">No se encontraron productos</p>
                            <Button onClick={() => { setSearchTerm(""); setFilterCategory("all") }} variant="link" className="text-orange-600 font-black">Limpiar filtros</Button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Edit Dialog */}
            <Dialog open={!!editingProduct} onOpenChange={(open) => !open && setEditingProduct(null)}>
              <DialogContent className="max-w-2xl rounded-[32px] border-none p-8 max-h-[95vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-black text-[#2D3142]">EDITAR PRODUCTO</DialogTitle>
                </DialogHeader>
                {editingProduct && (
                  <div className="space-y-8 py-6">
                    {/* Edit Photos */}
                    <div className="space-y-3">
                      <Label className="text-xs font-bold uppercase text-slate-400">Fotos del producto</Label>
                      <div className="flex gap-4">
                        {[0, 1, 2].map((i) => (
                          <div key={i} className="relative w-24 h-24 rounded-2xl bg-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden transition-all hover:border-orange-200">
                            {editingProduct.images?.[i] ? (
                              <>
                                <img src={editingProduct.images[i]} alt="Preview" className="w-full h-full object-cover" />
                                <button
                                  onClick={() => {
                                    const imgs = [...(editingProduct.images || [])]
                                    imgs.splice(i, 1)
                                    setEditingProduct({ ...editingProduct, images: imgs, image: imgs[0] || "" })
                                  }}
                                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 shadow-md hover:scale-110 transition-transform"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </>
                            ) : (
                              <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer group">
                                <ImagePlus className="w-8 h-8 text-slate-300 group-hover:text-orange-500 transition-colors" />
                                <input
                                  type="file"
                                  className="hidden"
                                  accept="image/*"
                                  onChange={(e) => handleFileUpload(e, i, true)}
                                />
                              </label>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2 md:col-span-2">
                        <Label className="text-xs font-bold uppercase text-slate-400">Nombre del producto *</Label>
                        <Input
                          value={editingProduct.name}
                          onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                          className="rounded-xl h-12 bg-slate-50 border-slate-100"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-bold uppercase text-slate-400">Precio *</Label>
                        <Input
                          type="number"
                          value={editingProduct.price}
                          onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                          className="rounded-xl h-12 bg-slate-50 border-slate-100"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-bold uppercase text-slate-400">Stock</Label>
                        <Input
                          type="number"
                          value={editingProduct.inventory}
                          onChange={(e) => setEditingProduct({ ...editingProduct, inventory: e.target.value })}
                          className="rounded-xl h-12 bg-slate-50 border-slate-100"
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label className="text-xs font-bold uppercase text-slate-400">Categoría</Label>
                        <Select
                          value={editingProduct.category}
                          onValueChange={(v) => setEditingProduct({ ...editingProduct, category: v })}
                        >
                          <SelectTrigger className="rounded-xl h-12 bg-slate-50 border-slate-100">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {ALL_CATEGORIES.map(cat => (
                              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label className="text-xs font-bold uppercase text-slate-400">SKU</Label>
                        <Input
                          value={editingProduct.sku}
                          onChange={(e) => setEditingProduct({ ...editingProduct, sku: e.target.value })}
                          className="rounded-xl h-12 bg-slate-50 border-slate-100"
                        />
                      </div>
                    </div>
                  </div>
                )}
                <div className="flex gap-4">
                  <Button onClick={handleEditProduct} className="flex-1 bg-[#2D3142] hover:bg-black py-6 rounded-2xl font-black transition-all">
                    GUARDAR CAMBIOS
                  </Button>
                  <Button onClick={() => setEditingProduct(null)} variant="outline" className="flex-1 py-6 rounded-2xl font-black border-slate-200">
                    CANCELAR
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </main>
      </div>
    </div>
  )
}
