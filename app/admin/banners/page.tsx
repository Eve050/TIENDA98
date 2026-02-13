"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  GripVertical,
  Calendar,
  Link as LinkIcon,
  ImageIcon,
  X,
  Monitor,
  Smartphone,
  ArrowUpRight,
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
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { AdminSidebar } from "@/components/admin-sidebar"
import { AdminHeader } from "@/components/admin-header"

interface Banner {
  id: number
  title: string
  subtitle: string
  image: string
  mobileImage?: string
  link: string
  position: "hero" | "promo" | "sidebar" | "footer"
  order: number
  startDate: string
  endDate: string
  active: boolean
  clicks: number
  impressions: number
}

export default function AdminBannersPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterPosition, setFilterPosition] = useState("all")
  const [showModal, setShowModal] = useState(false)
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null)

  const [banners, setBanners] = useState<Banner[]>([
    {
      id: 1,
      title: "Ofertas de Temporada",
      subtitle: "Hasta 50% de descuento en tecnologia",
      image: "/happy-shoppers-with-colorful-bags.jpg",
      link: "/ofertas",
      position: "hero",
      order: 1,
      startDate: "2026-01-01",
      endDate: "2026-01-31",
      active: true,
      clicks: 1234,
      impressions: 45678,
    },
    {
      id: 2,
      title: "Nueva Coleccion Moda",
      subtitle: "Descubre las ultimas tendencias",
      image: "/fashion-streetwear-models.png",
      link: "/categorias/moda-y-accesorios",
      position: "hero",
      order: 2,
      startDate: "2026-01-01",
      endDate: "2026-02-28",
      active: true,
      clicks: 987,
      impressions: 34567,
    },
    {
      id: 3,
      title: "Tecnologia Avanzada",
      subtitle: "Los mejores gadgets del mercado",
      image: "/tech-vr-neon.png",
      link: "/categorias/tecnologia",
      position: "hero",
      order: 3,
      startDate: "2026-01-15",
      endDate: "2026-03-15",
      active: true,
      clicks: 756,
      impressions: 28900,
    },
    {
      id: 4,
      title: "Envio Gratis",
      subtitle: "En compras mayores a $50",
      image: "/modern-drone-and-technology-products.jpg",
      link: "/envios",
      position: "promo",
      order: 1,
      startDate: "2026-01-01",
      endDate: "2026-12-31",
      active: true,
      clicks: 2345,
      impressions: 78900,
    },
    {
      id: 5,
      title: "Black Friday",
      subtitle: "Los mejores descuentos del ano",
      image: "/warehouse-store.jpg",
      link: "/ofertas/black-friday",
      position: "hero",
      order: 4,
      startDate: "2026-11-20",
      endDate: "2026-11-30",
      active: false,
      clicks: 0,
      impressions: 0,
    },
  ])

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    image: "",
    mobileImage: "",
    link: "",
    position: "hero" as Banner["position"],
    startDate: "",
    endDate: "",
    active: true,
  })

  const positionLabels: Record<string, string> = {
    hero: "Carrusel Principal",
    promo: "Promocional",
    sidebar: "Barra Lateral",
    footer: "Pie de Pagina",
  }

  const filteredBanners = banners.filter((banner) => {
    const matchesSearch = banner.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPosition = filterPosition === "all" || banner.position === filterPosition
    return matchesSearch && matchesPosition
  })

  const handleEdit = (banner: Banner) => {
    setEditingBanner(banner)
    setFormData({
      title: banner.title,
      subtitle: banner.subtitle,
      image: banner.image,
      mobileImage: banner.mobileImage || "",
      link: banner.link,
      position: banner.position,
      startDate: banner.startDate,
      endDate: banner.endDate,
      active: banner.active,
    })
    setShowModal(true)
  }

  const handleDelete = (id: number) => {
    if (confirm("¿Estas seguro de eliminar este banner?")) {
      setBanners(banners.filter((b) => b.id !== id))
    }
  }

  const toggleActive = (id: number) => {
    setBanners(banners.map((b) => (b.id === id ? { ...b, active: !b.active } : b)))
  }

  const handleSubmit = () => {
    if (editingBanner) {
      setBanners(
        banners.map((b) =>
          b.id === editingBanner.id
            ? { ...b, ...formData }
            : b
        )
      )
    } else {
      const newBanner: Banner = {
        id: Date.now(),
        ...formData,
        order: banners.filter((b) => b.position === formData.position).length + 1,
        clicks: 0,
        impressions: 0,
      }
      setBanners([...banners, newBanner])
    }
    setShowModal(false)
    setEditingBanner(null)
    setFormData({
      title: "",
      subtitle: "",
      image: "",
      mobileImage: "",
      link: "",
      position: "hero",
      startDate: "",
      endDate: "",
      active: true,
    })
  }

  const getCTR = (banner: Banner) => {
    if (banner.impressions === 0) return "0.00"
    return ((banner.clicks / banner.impressions) * 100).toFixed(2)
  }

  const isExpired = (endDate: string) => {
    return new Date(endDate) < new Date()
  }

  const isScheduled = (startDate: string) => {
    return new Date(startDate) > new Date()
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
              <h1 className="text-2xl font-bold text-gray-900">Banners Promocionales</h1>
              <p className="text-gray-500">Gestiona los banners y promociones de tu tienda</p>
            </div>
            <Button
              className="bg-orange-500 hover:bg-orange-600"
              onClick={() => {
                setEditingBanner(null)
                setFormData({
                  title: "",
                  subtitle: "",
                  image: "",
                  mobileImage: "",
                  link: "",
                  position: "hero",
                  startDate: "",
                  endDate: "",
                  active: true,
                })
                setShowModal(true)
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Banner
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <ImageIcon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{banners.length}</p>
                    <p className="text-xs text-gray-500">Total Banners</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Eye className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{banners.filter((b) => b.active).length}</p>
                    <p className="text-xs text-gray-500">Activos</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <ArrowUpRight className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {banners.reduce((acc, b) => acc + b.clicks, 0).toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500">Clicks Totales</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Monitor className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {banners.reduce((acc, b) => acc + b.impressions, 0).toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500">Impresiones</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="border-0 shadow-sm mb-6">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Buscar banners..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={filterPosition} onValueChange={setFilterPosition}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Posicion" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las posiciones</SelectItem>
                    <SelectItem value="hero">Carrusel Principal</SelectItem>
                    <SelectItem value="promo">Promocional</SelectItem>
                    <SelectItem value="sidebar">Barra Lateral</SelectItem>
                    <SelectItem value="footer">Pie de Pagina</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Banners Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredBanners.map((banner) => (
              <Card
                key={banner.id}
                className={`border-0 shadow-sm overflow-hidden ${!banner.active ? "opacity-60" : ""}`}
              >
                <div className="relative aspect-[21/9] bg-gray-100">
                  <Image
                    src={banner.image || "/placeholder.svg"}
                    alt={banner.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">{banner.title}</h3>
                    <p className="text-sm opacity-80">{banner.subtitle}</p>
                  </div>
                  <div className="absolute top-4 right-4 flex gap-2">
                    {isScheduled(banner.startDate) && (
                      <span className="px-2 py-1 bg-blue-500 text-white text-xs rounded-full">
                        Programado
                      </span>
                    )}
                    {isExpired(banner.endDate) && (
                      <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full">
                        Expirado
                      </span>
                    )}
                    {!isScheduled(banner.startDate) && !isExpired(banner.endDate) && banner.active && (
                      <span className="px-2 py-1 bg-green-500 text-white text-xs rounded-full">
                        Activo
                      </span>
                    )}
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                      {positionLabels[banner.position]}
                    </span>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      {new Date(banner.startDate).toLocaleDateString("es-EC")} -{" "}
                      {new Date(banner.endDate).toLocaleDateString("es-EC")}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                    <div>
                      <p className="text-lg font-bold text-gray-900">{banner.impressions.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">Impresiones</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-gray-900">{banner.clicks.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">Clicks</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-green-600">{getCTR(banner)}%</p>
                      <p className="text-xs text-gray-500">CTR</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-4 border-t">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 bg-transparent"
                      onClick={() => handleEdit(banner)}
                    >
                      <Edit2 className="w-4 h-4 mr-1" />
                      Editar
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-transparent"
                      onClick={() => toggleActive(banner.id)}
                    >
                      {banner.active ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
                      onClick={() => handleDelete(banner.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredBanners.length === 0 && (
            <div className="text-center py-12">
              <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No se encontraron banners</p>
            </div>
          )}
        </main>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white z-10">
              <h2 className="text-xl font-semibold">
                {editingBanner ? "Editar Banner" : "Nuevo Banner"}
              </h2>
              <Button variant="ghost" size="sm" onClick={() => setShowModal(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="p-6 space-y-6">
              {/* Image Upload */}
              <div className="space-y-4">
                <div>
                  <Label className="flex items-center gap-2 mb-2">
                    <Monitor className="w-4 h-4" />
                    Imagen Desktop (1920x600px recomendado)
                  </Label>
                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-orange-300 transition-colors cursor-pointer">
                    {formData.image ? (
                      <div className="relative aspect-[21/9] bg-gray-100 rounded-lg overflow-hidden">
                        <Image
                          src={formData.image || "/placeholder.svg"}
                          alt="Preview"
                          fill
                          className="object-cover"
                        />
                        <button
                          onClick={() => setFormData({ ...formData, image: "" })}
                          className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                        <p className="text-sm text-gray-500">Haz clic para subir una imagen</p>
                        <p className="text-xs text-gray-400 mt-1">PNG, JPG hasta 5MB</p>
                      </>
                    )}
                  </div>
                </div>
                <div>
                  <Label className="flex items-center gap-2 mb-2">
                    <Smartphone className="w-4 h-4" />
                    Imagen Mobile (opcional, 800x600px)
                  </Label>
                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center hover:border-orange-300 transition-colors cursor-pointer">
                    <p className="text-sm text-gray-500">Imagen optimizada para moviles</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <Label>Titulo *</Label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Ofertas de Temporada"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Subtitulo</Label>
                  <Input
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    placeholder="Hasta 50% de descuento"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label className="flex items-center gap-2">
                    <LinkIcon className="w-4 h-4" />
                    Enlace de destino
                  </Label>
                  <Input
                    value={formData.link}
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    placeholder="/ofertas"
                  />
                </div>
              </div>

              {/* Position & Schedule */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Posicion *</Label>
                  <Select
                    value={formData.position}
                    onValueChange={(value) =>
                      setFormData({ ...formData, position: value as Banner["position"] })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hero">Carrusel Principal</SelectItem>
                      <SelectItem value="promo">Promocional</SelectItem>
                      <SelectItem value="sidebar">Barra Lateral</SelectItem>
                      <SelectItem value="footer">Pie de Pagina</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Fecha inicio</Label>
                  <Input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Fecha fin</Label>
                  <Input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  />
                </div>
              </div>

              {/* Active */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <p className="font-medium">Banner activo</p>
                  <p className="text-sm text-gray-500">El banner sera visible en la tienda</p>
                </div>
                <Switch
                  checked={formData.active}
                  onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t bg-gray-50 rounded-b-2xl">
              <Button variant="outline" onClick={() => setShowModal(false)}>
                Cancelar
              </Button>
              <Button className="bg-orange-500 hover:bg-orange-600" onClick={handleSubmit}>
                {editingBanner ? "Guardar Cambios" : "Crear Banner"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
