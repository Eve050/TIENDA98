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
  Copy,
  Tag,
  Percent,
  DollarSign,
  Calendar,
  Users,
  X,
  CheckCircle2
} from "lucide-react"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

interface Cupon {
  id: number
  codigo: string
  tipo: "porcentaje" | "fijo"
  valor: number
  descripcion: string
  fechaInicio: string
  fechaFin: string
  usosMaximos: number
  usosActuales: number
  minimoCompra: number
  activo: boolean
}

const Loading = () => null;

export default function AdminCuponesPage() {
  const searchParams = useSearchParams();
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [editingCupon, setEditingCupon] = useState<Cupon | null>(null)
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const [cupones, setCupones] = useState<Cupon[]>([
    {
      id: 1,
      codigo: "BIENVENIDO20",
      tipo: "porcentaje",
      valor: 20,
      descripcion: "Descuento de bienvenida para nuevos usuarios",
      fechaInicio: "2026-01-01",
      fechaFin: "2026-12-31",
      usosMaximos: 1000,
      usosActuales: 234,
      minimoCompra: 50,
      activo: true
    },
    {
      id: 2,
      codigo: "ENVIOGRATIS",
      tipo: "fijo",
      valor: 5,
      descripcion: "Envío gratis en compras mayores a $30",
      fechaInicio: "2026-01-01",
      fechaFin: "2026-03-31",
      usosMaximos: 500,
      usosActuales: 189,
      minimoCompra: 30,
      activo: true
    },
    {
      id: 3,
      codigo: "VERANO2026",
      tipo: "porcentaje",
      valor: 15,
      descripcion: "Promoción de verano",
      fechaInicio: "2026-06-01",
      fechaFin: "2026-08-31",
      usosMaximos: 2000,
      usosActuales: 0,
      minimoCompra: 0,
      activo: false
    },
    {
      id: 4,
      codigo: "TECH10",
      tipo: "porcentaje",
      valor: 10,
      descripcion: "Descuento en productos de tecnología",
      fechaInicio: "2026-01-15",
      fechaFin: "2026-02-15",
      usosMaximos: 300,
      usosActuales: 287,
      minimoCompra: 100,
      activo: true
    },
    {
      id: 5,
      codigo: "FLASH50",
      tipo: "fijo",
      valor: 50,
      descripcion: "Descuento flash de $50",
      fechaInicio: "2026-01-20",
      fechaFin: "2026-01-22",
      usosMaximos: 100,
      usosActuales: 100,
      minimoCompra: 200,
      activo: false
    }
  ])

  const [formData, setFormData] = useState({
    codigo: "",
    tipo: "porcentaje" as "porcentaje" | "fijo",
    valor: 0,
    descripcion: "",
    fechaInicio: "",
    fechaFin: "",
    usosMaximos: 100,
    minimoCompra: 0,
    activo: true
  })

  const filteredCupones = cupones.filter(cupon =>
    cupon.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cupon.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleCopyCode = (codigo: string) => {
    navigator.clipboard.writeText(codigo)
    setCopiedCode(codigo)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const handleEdit = (cupon: Cupon) => {
    setEditingCupon(cupon)
    setFormData({
      codigo: cupon.codigo,
      tipo: cupon.tipo,
      valor: cupon.valor,
      descripcion: cupon.descripcion,
      fechaInicio: cupon.fechaInicio,
      fechaFin: cupon.fechaFin,
      usosMaximos: cupon.usosMaximos,
      minimoCompra: cupon.minimoCompra,
      activo: cupon.activo
    })
    setShowModal(true)
  }

  const handleDelete = (id: number) => {
    if (confirm("¿Estás seguro de eliminar este cupón?")) {
      setCupones(cupones.filter(c => c.id !== id))
    }
  }

  const handleSubmit = () => {
    if (editingCupon) {
      setCupones(cupones.map(c => 
        c.id === editingCupon.id 
          ? { ...c, ...formData, usosActuales: c.usosActuales }
          : c
      ))
    } else {
      const newCupon: Cupon = {
        id: Date.now(),
        ...formData,
        usosActuales: 0
      }
      setCupones([...cupones, newCupon])
    }
    setShowModal(false)
    setEditingCupon(null)
    setFormData({
      codigo: "",
      tipo: "porcentaje",
      valor: 0,
      descripcion: "",
      fechaInicio: "",
      fechaFin: "",
      usosMaximos: 100,
      minimoCompra: 0,
      activo: true
    })
  }

  const getUsagePercentage = (cupon: Cupon) => {
    return Math.round((cupon.usosActuales / cupon.usosMaximos) * 100)
  }

  return (
    <Suspense fallback={<Loading />}>
      <div className="min-h-screen bg-gray-100">
        <AdminSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
        
        <div className={`transition-all duration-300 ${sidebarOpen ? "lg:ml-64" : "lg:ml-20"}`}>
          <AdminHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
          
          <main className="p-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Cupones de Descuento</h1>
                <p className="text-gray-500">Gestiona los cupones y promociones de tu tienda</p>
              </div>
              <Button 
                className="bg-orange-500 hover:bg-orange-600"
                onClick={() => {
                  setEditingCupon(null)
                  setFormData({
                    codigo: "",
                    tipo: "porcentaje",
                    valor: 0,
                    descripcion: "",
                    fechaInicio: "",
                    fechaFin: "",
                    usosMaximos: 100,
                    minimoCompra: 0,
                    activo: true
                  })
                  setShowModal(true)
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Nuevo Cupón
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Tag className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{cupones.length}</p>
                      <p className="text-xs text-gray-500">Total Cupones</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{cupones.filter(c => c.activo).length}</p>
                      <p className="text-xs text-gray-500">Activos</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{cupones.reduce((acc, c) => acc + c.usosActuales, 0)}</p>
                      <p className="text-xs text-gray-500">Usos Totales</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">$2,456</p>
                      <p className="text-xs text-gray-500">Descuentos Aplicados</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Search */}
            <Card className="border-0 shadow-sm mb-6">
              <CardContent className="p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    placeholder="Buscar cupones..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Cupones Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCupones.map((cupon) => (
                <Card key={cupon.id} className={`border-0 shadow-sm overflow-hidden ${!cupon.activo ? "opacity-60" : ""}`}>
                  <div className={`h-2 ${cupon.activo ? "bg-gradient-to-r from-orange-500 to-orange-600" : "bg-gray-300"}`} />
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          cupon.tipo === "porcentaje" ? "bg-purple-100" : "bg-green-100"
                        }`}>
                          {cupon.tipo === "porcentaje" ? (
                            <Percent className="w-5 h-5 text-purple-600" />
                          ) : (
                            <DollarSign className="w-5 h-5 text-green-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-lg">
                            {cupon.tipo === "porcentaje" ? `${cupon.valor}%` : `$${cupon.valor}`}
                          </p>
                          <p className="text-xs text-gray-500">
                            {cupon.tipo === "porcentaje" ? "Descuento" : "Fijo"}
                          </p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        cupon.activo ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                      }`}>
                        {cupon.activo ? "Activo" : "Inactivo"}
                      </span>
                    </div>

                    {/* Código */}
                    <div className="bg-gray-100 rounded-lg p-3 mb-3 flex items-center justify-between">
                      <code className="font-mono font-bold text-gray-900">{cupon.codigo}</code>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-8 w-8 p-0"
                        onClick={() => handleCopyCode(cupon.codigo)}
                      >
                        {copiedCode === cupon.codigo ? (
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </div>

                    <p className="text-sm text-gray-600 mb-3">{cupon.descripcion}</p>

                    {/* Info */}
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Válido hasta
                        </span>
                        <span>{new Date(cupon.fechaFin).toLocaleDateString("es-EC")}</span>
                      </div>
                      {cupon.minimoCompra > 0 && (
                        <div className="flex items-center justify-between text-gray-500">
                          <span>Compra mínima</span>
                          <span>${cupon.minimoCompra}</span>
                        </div>
                      )}
                      <div className="flex items-center justify-between text-gray-500">
                        <span>Usos</span>
                        <span>{cupon.usosActuales} / {cupon.usosMaximos}</span>
                      </div>
                    </div>

                    {/* Usage Bar */}
                    <div className="mt-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            getUsagePercentage(cupon) >= 90 ? "bg-red-500" : 
                            getUsagePercentage(cupon) >= 70 ? "bg-yellow-500" : "bg-green-500"
                          }`}
                          style={{ width: `${getUsagePercentage(cupon)}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-400 mt-1 text-right">
                        {getUsagePercentage(cupon)}% usado
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 mt-4 pt-4 border-t">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1 bg-transparent"
                        onClick={() => handleEdit(cupon)}
                      >
                        <Edit2 className="w-4 h-4 mr-1" />
                        Editar
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
                        onClick={() => handleDelete(cupon.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </main>
        </div>

        {/* Modal Nuevo/Editar Cupón */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white">
                <h2 className="text-xl font-semibold">
                  {editingCupon ? "Editar Cupón" : "Nuevo Cupón"}
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
                {/* Código */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Código del cupón
                  </label>
                  <Input
                    value={formData.codigo}
                    onChange={(e) => setFormData({ ...formData, codigo: e.target.value.toUpperCase() })}
                    placeholder="DESCUENTO20"
                    className="font-mono"
                  />
                </div>

                {/* Tipo y Valor */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo de descuento
                    </label>
                    <select
                      value={formData.tipo}
                      onChange={(e) => setFormData({ ...formData, tipo: e.target.value as "porcentaje" | "fijo" })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="porcentaje">Porcentaje (%)</option>
                      <option value="fijo">Monto fijo ($)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Valor
                    </label>
                    <Input
                      type="number"
                      value={formData.valor}
                      onChange={(e) => setFormData({ ...formData, valor: Number(e.target.value) })}
                      placeholder="20"
                    />
                  </div>
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
                    rows={2}
                    placeholder="Describe el cupón..."
                  />
                </div>

                {/* Fechas */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fecha inicio
                    </label>
                    <Input
                      type="date"
                      value={formData.fechaInicio}
                      onChange={(e) => setFormData({ ...formData, fechaInicio: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fecha fin
                    </label>
                    <Input
                      type="date"
                      value={formData.fechaFin}
                      onChange={(e) => setFormData({ ...formData, fechaFin: e.target.value })}
                    />
                  </div>
                </div>

                {/* Límites */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Usos máximos
                    </label>
                    <Input
                      type="number"
                      value={formData.usosMaximos}
                      onChange={(e) => setFormData({ ...formData, usosMaximos: Number(e.target.value) })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Compra mínima ($)
                    </label>
                    <Input
                      type="number"
                      value={formData.minimoCompra}
                      onChange={(e) => setFormData({ ...formData, minimoCompra: Number(e.target.value) })}
                    />
                  </div>
                </div>

                {/* Estado */}
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Estado</label>
                    <p className="text-xs text-gray-500">El cupón estará disponible para uso</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer"
                      checked={formData.activo}
                      onChange={(e) => setFormData({ ...formData, activo: e.target.checked })}
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
                  {editingCupon ? "Guardar Cambios" : "Crear Cupón"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Suspense>
  )
}
