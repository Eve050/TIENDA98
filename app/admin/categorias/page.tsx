"use client"

import { useState } from "react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { AdminHeader } from "@/components/admin-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  FolderOpen,
  ChevronRight,
  Package,
  MoreVertical,
  X,
  ImageIcon
} from "lucide-react"
import Image from 'next/image'

interface Categoria {
  id: number
  nombre: string
  slug: string
  descripcion: string
  imagen: string
  productos: number
  subcategorias: { id: number; nombre: string; productos: number }[]
  activa: boolean
}

export default function AdminCategoriasPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [editingCategoria, setEditingCategoria] = useState<Categoria | null>(null)
  const [expandedCategoria, setExpandedCategoria] = useState<number | null>(null)

  const [categorias, setCategorias] = useState<Categoria[]>([
    {
      id: 1,
      nombre: "Tecnología",
      slug: "tecnologia",
      descripcion: "Productos electrónicos y gadgets",
      imagen: "/technology-icon-laptop.jpg",
      productos: 234,
      subcategorias: [
        { id: 11, nombre: "Celulares", productos: 56 },
        { id: 12, nombre: "Computadoras", productos: 45 },
        { id: 13, nombre: "Tablets", productos: 32 },
        { id: 14, nombre: "Accesorios", productos: 101 }
      ],
      activa: true
    },
    {
      id: 2,
      nombre: "Moda y Accesorios",
      slug: "moda-y-accesorios",
      descripcion: "Ropa, calzado y accesorios de moda",
      imagen: "/stylish-person-in-yellow-outfit-fashion.jpg",
      productos: 567,
      subcategorias: [
        { id: 21, nombre: "Hombres", productos: 189 },
        { id: 22, nombre: "Mujeres", productos: 234 },
        { id: 23, nombre: "Niños", productos: 98 },
        { id: 24, nombre: "Calzado", productos: 46 }
      ],
      activa: true
    },
    {
      id: 3,
      nombre: "Hogar y Decoración",
      slug: "hogar-y-decoracion",
      descripcion: "Muebles, decoración y artículos para el hogar",
      imagen: "/home-decor-.jpg",
      productos: 345,
      subcategorias: [
        { id: 31, nombre: "Muebles", productos: 89 },
        { id: 32, nombre: "Decoración", productos: 156 },
        { id: 33, nombre: "Cocina", productos: 67 },
        { id: 34, nombre: "Jardín", productos: 33 }
      ],
      activa: true
    },
    {
      id: 4,
      nombre: "Repuestos Automotrices",
      slug: "repuestos-automotrices",
      descripcion: "Partes y accesorios para vehículos",
      imagen: "/auto-parts-professional.png",
      productos: 189,
      subcategorias: [
        { id: 41, nombre: "Motor", productos: 45 },
        { id: 42, nombre: "Frenos", productos: 34 },
        { id: 43, nombre: "Suspensión", productos: 28 },
        { id: 44, nombre: "Eléctrico", productos: 82 }
      ],
      activa: true
    },
    {
      id: 5,
      nombre: "Artesanías",
      slug: "artesanias",
      descripcion: "Productos artesanales ecuatorianos",
      imagen: "/ecuador-artisan-products.jpg",
      productos: 123,
      subcategorias: [
        { id: 51, nombre: "Tejidos", productos: 34 },
        { id: 52, nombre: "Cerámica", productos: 28 },
        { id: 53, nombre: "Madera", productos: 41 },
        { id: 54, nombre: "Joyería", productos: 20 }
      ],
      activa: true
    },
    {
      id: 6,
      nombre: "Deportes",
      slug: "deportes",
      descripcion: "Artículos deportivos y fitness",
      imagen: "/nike-sneakers.jpg",
      productos: 98,
      subcategorias: [
        { id: 61, nombre: "Fútbol", productos: 34 },
        { id: 62, nombre: "Running", productos: 28 },
        { id: 63, nombre: "Gimnasio", productos: 36 }
      ],
      activa: false
    }
  ])

  const [formData, setFormData] = useState({
    nombre: "",
    slug: "",
    descripcion: "",
    activa: true
  })

  const filteredCategorias = categorias.filter(cat =>
    cat.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleEdit = (categoria: Categoria) => {
    setEditingCategoria(categoria)
    setFormData({
      nombre: categoria.nombre,
      slug: categoria.slug,
      descripcion: categoria.descripcion,
      activa: categoria.activa
    })
    setShowModal(true)
  }

  const handleDelete = (id: number) => {
    if (confirm("¿Estás seguro de eliminar esta categoría?")) {
      setCategorias(categorias.filter(c => c.id !== id))
    }
  }

  const handleSubmit = () => {
    if (editingCategoria) {
      setCategorias(categorias.map(c => 
        c.id === editingCategoria.id 
          ? { ...c, ...formData }
          : c
      ))
    } else {
      const newCategoria: Categoria = {
        id: Date.now(),
        ...formData,
        imagen: "/product-example.jpg",
        productos: 0,
        subcategorias: []
      }
      setCategorias([...categorias, newCategoria])
    }
    setShowModal(false)
    setEditingCategoria(null)
    setFormData({ nombre: "", slug: "", descripcion: "", activa: true })
  }

  const toggleCategoria = (id: number) => {
    setExpandedCategoria(expandedCategoria === id ? null : id)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className={`transition-all duration-300 ${sidebarOpen ? "lg:ml-64" : "lg:ml-20"}`}>
        <AdminHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="p-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Categorías</h1>
              <p className="text-gray-500">Gestiona las categorías de productos de tu tienda</p>
            </div>
            <Button 
              className="bg-orange-500 hover:bg-orange-600"
              onClick={() => {
                setEditingCategoria(null)
                setFormData({ nombre: "", slug: "", descripcion: "", activa: true })
                setShowModal(true)
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Nueva Categoría
            </Button>
          </div>

          {/* Search */}
          <Card className="border-0 shadow-sm mb-6">
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Buscar categorías..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Categorías List */}
          <div className="space-y-4">
            {filteredCategorias.map((categoria) => (
              <Card key={categoria.id} className="border-0 shadow-sm overflow-hidden">
                <CardContent className="p-0">
                  {/* Categoría Principal */}
                  <div 
                    className="flex items-center gap-4 p-4 cursor-pointer hover:bg-gray-50"
                    onClick={() => toggleCategoria(categoria.id)}
                  >
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      <Image 
                        src={categoria.imagen || "/placeholder.svg"} 
                        alt={categoria.nombre}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900">{categoria.nombre}</h3>
                        <span className={`px-2 py-0.5 text-xs rounded-full ${
                          categoria.activa 
                            ? "bg-green-100 text-green-700" 
                            : "bg-gray-100 text-gray-600"
                        }`}>
                          {categoria.activa ? "Activa" : "Inactiva"}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 truncate">{categoria.descripcion}</p>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-xs text-gray-400">
                          <Package className="w-3 h-3 inline mr-1" />
                          {categoria.productos} productos
                        </span>
                        <span className="text-xs text-gray-400">
                          <FolderOpen className="w-3 h-3 inline mr-1" />
                          {categoria.subcategorias.length} subcategorías
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleEdit(categoria)
                        }}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDelete(categoria.id)
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${
                        expandedCategoria === categoria.id ? "rotate-90" : ""
                      }`} />
                    </div>
                  </div>

                  {/* Subcategorías */}
                  {expandedCategoria === categoria.id && categoria.subcategorias.length > 0 && (
                    <div className="border-t border-gray-100 bg-gray-50">
                      {categoria.subcategorias.map((sub) => (
                        <div 
                          key={sub.id}
                          className="flex items-center justify-between px-4 py-3 pl-24 border-b border-gray-100 last:border-0 hover:bg-gray-100"
                        >
                          <div className="flex items-center gap-3">
                            <FolderOpen className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-700">{sub.nombre}</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-xs text-gray-500">{sub.productos} productos</span>
                            <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                              <MoreVertical className="w-4 h-4 text-gray-400" />
                            </Button>
                          </div>
                        </div>
                      ))}
                      <div className="px-4 py-3 pl-24">
                        <Button size="sm" variant="ghost" className="text-orange-600 hover:text-orange-700">
                          <Plus className="w-4 h-4 mr-1" />
                          Agregar subcategoría
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Estadísticas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold text-gray-900">{categorias.length}</p>
                <p className="text-sm text-gray-500">Total Categorías</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold text-gray-900">
                  {categorias.reduce((acc, c) => acc + c.subcategorias.length, 0)}
                </p>
                <p className="text-sm text-gray-500">Subcategorías</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold text-green-600">
                  {categorias.filter(c => c.activa).length}
                </p>
                <p className="text-sm text-gray-500">Activas</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold text-gray-900">
                  {categorias.reduce((acc, c) => acc + c.productos, 0)}
                </p>
                <p className="text-sm text-gray-500">Total Productos</p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      {/* Modal Nueva/Editar Categoría */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold">
                {editingCategoria ? "Editar Categoría" : "Nueva Categoría"}
              </h2>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowModal(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="p-6 space-y-4">
              {/* Imagen */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Imagen de la categoría
                </label>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-orange-300 transition-colors cursor-pointer">
                  <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Haz clic para subir una imagen</p>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG hasta 5MB</p>
                </div>
              </div>

              {/* Nombre */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre de la categoría
                </label>
                <Input
                  value={formData.nombre}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    nombre: e.target.value,
                    slug: e.target.value.toLowerCase().replace(/\s+/g, "-")
                  })}
                  placeholder="Ej: Tecnología"
                />
              </div>

              {/* Slug */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Slug (URL)
                </label>
                <Input
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="tecnologia"
                />
              </div>

              {/* Descripción */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descripción
                </label>
                <textarea
                  value={formData.descripcion}
                  onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                  rows={3}
                  placeholder="Describe brevemente esta categoría..."
                />
              </div>

              {/* Estado */}
              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Estado</label>
                  <p className="text-xs text-gray-500">La categoría será visible en la tienda</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer"
                    checked={formData.activa}
                    onChange={(e) => setFormData({ ...formData, activa: e.target.checked })}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                </label>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t bg-gray-50 rounded-b-2xl">
              <Button variant="outline" onClick={() => setShowModal(false)}>
                Cancelar
              </Button>
              <Button 
                className="bg-orange-500 hover:bg-orange-600"
                onClick={handleSubmit}
              >
                {editingCategoria ? "Guardar Cambios" : "Crear Categoría"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
