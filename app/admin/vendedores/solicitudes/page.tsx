"use client"

import { useState } from "react"
import {
  Search,
  Eye,
  Check,
  X,
  Clock,
  CheckCircle,
  XCircle,
  Store,
  Mail,
  Phone,
  MapPin,
  Calendar,
  FileText,
  ChevronLeft,
  ChevronRight,
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

interface Solicitud {
  id: string
  businessName: string
  ownerName: string
  email: string
  phone: string
  city: string
  category: string
  description: string
  ruc: string
  status: "pendiente" | "aprobado" | "rechazado"
  requestDate: string
  documents: string[]
}

export default function AdminSolicitudesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [viewSolicitud, setViewSolicitud] = useState<Solicitud | null>(null)
  const [rejectDialog, setRejectDialog] = useState<Solicitud | null>(null)
  const [rejectReason, setRejectReason] = useState("")

  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([
    {
      id: "SOL-001",
      businessName: "ElectroMax",
      ownerName: "Roberto Sanchez",
      email: "roberto@electromax.com",
      phone: "+593 99 876 5432",
      city: "Guayaquil",
      category: "Tecnologia",
      description: "Tienda de productos electronicos y gadgets importados. Contamos con 5 anos de experiencia en el mercado.",
      ruc: "0901234567001",
      status: "pendiente",
      requestDate: "2026-02-18",
      documents: ["RUC", "Cedula", "Registro Mercantil"],
    },
    {
      id: "SOL-002",
      businessName: "Moda Latina",
      ownerName: "Patricia Gomez",
      email: "patricia@modalatina.ec",
      phone: "+593 98 765 4321",
      city: "Quito",
      category: "Moda",
      description: "Boutique de ropa femenina con disenos exclusivos ecuatorianos.",
      ruc: "1712345678001",
      status: "pendiente",
      requestDate: "2026-02-17",
      documents: ["RUC", "Cedula"],
    },
    {
      id: "SOL-003",
      businessName: "AutoRepuestos JM",
      ownerName: "Jose Morales",
      email: "jmorales@autorepuestos.com",
      phone: "+593 97 654 3210",
      city: "Cuenca",
      category: "Repuestos",
      description: "Distribucion de repuestos automotrices originales y alternativos.",
      ruc: "0112345678001",
      status: "aprobado",
      requestDate: "2026-02-10",
      documents: ["RUC", "Cedula", "Registro Mercantil", "Certificado SRI"],
    },
    {
      id: "SOL-004",
      businessName: "Dulces y Mas",
      ownerName: "Laura Estrella",
      email: "laura@dulcesymas.ec",
      phone: "+593 96 543 2109",
      city: "Ambato",
      category: "Alimentos",
      description: "Venta de dulces artesanales y confiteria ecuatoriana.",
      ruc: "1812345678001",
      status: "rechazado",
      requestDate: "2026-02-05",
      documents: ["RUC", "Cedula"],
    },
    {
      id: "SOL-005",
      businessName: "DecoHome EC",
      ownerName: "Andrea Villalobos",
      email: "andrea@decohome.ec",
      phone: "+593 95 432 1098",
      city: "Quito",
      category: "Hogar",
      description: "Articulos de decoracion y muebles modernos para el hogar.",
      ruc: "1712345679001",
      status: "pendiente",
      requestDate: "2026-02-19",
      documents: ["RUC", "Cedula", "Registro Mercantil"],
    },
  ])

  const statusConfig: Record<string, { bg: string; text: string; icon: React.ReactNode; label: string }> = {
    pendiente: { bg: "bg-yellow-100", text: "text-yellow-700", icon: <Clock className="w-4 h-4" />, label: "Pendiente" },
    aprobado: { bg: "bg-green-100", text: "text-green-700", icon: <CheckCircle className="w-4 h-4" />, label: "Aprobado" },
    rechazado: { bg: "bg-red-100", text: "text-red-700", icon: <XCircle className="w-4 h-4" />, label: "Rechazado" },
  }

  const filteredSolicitudes = solicitudes.filter((s) => {
    const matchesSearch =
      s.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || s.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const handleApprove = (solicitud: Solicitud) => {
    setSolicitudes(
      solicitudes.map((s) =>
        s.id === solicitud.id ? { ...s, status: "aprobado" as const } : s
      )
    )
    setViewSolicitud(null)
  }

  const handleReject = (solicitud: Solicitud) => {
    setSolicitudes(
      solicitudes.map((s) =>
        s.id === solicitud.id ? { ...s, status: "rechazado" as const } : s
      )
    )
    setRejectDialog(null)
    setRejectReason("")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Solicitudes de Vendedores</h1>
          <p className="text-gray-500">Revisa y gestiona las solicitudes para ser vendedor</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{solicitudes.filter((s) => s.status === "pendiente").length}</p>
                <p className="text-xs text-gray-500">Pendientes</p>
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
                <p className="text-2xl font-bold">{solicitudes.filter((s) => s.status === "aprobado").length}</p>
                <p className="text-xs text-gray-500">Aprobados</p>
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
                <p className="text-2xl font-bold">{solicitudes.filter((s) => s.status === "rechazado").length}</p>
                <p className="text-xs text-gray-500">Rechazados</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Store className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{solicitudes.length}</p>
                <p className="text-xs text-gray-500">Total</p>
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
                placeholder="Buscar por negocio, propietario o ID..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="pendiente">Pendiente</SelectItem>
                <SelectItem value="aprobado">Aprobado</SelectItem>
                <SelectItem value="rechazado">Rechazado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Solicitudes Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">ID</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Negocio</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Propietario</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Ciudad</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Categoria</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Estado</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Fecha</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredSolicitudes.map((solicitud) => (
                  <tr key={solicitud.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <span className="font-mono text-sm text-orange-600">{solicitud.id}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                          <Store className="w-5 h-5 text-orange-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{solicitud.businessName}</p>
                          <p className="text-sm text-gray-500">{solicitud.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{solicitud.ownerName}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{solicitud.city}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{solicitud.category}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${statusConfig[solicitud.status].bg} ${statusConfig[solicitud.status].text}`}
                      >
                        {statusConfig[solicitud.status].icon}
                        {statusConfig[solicitud.status].label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{solicitud.requestDate}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {solicitud.status === "pendiente" && (
                          <>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
                              onClick={() => handleApprove(solicitud)}
                            >
                              <Check className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                              onClick={() => setRejectDialog(solicitud)}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0"
                          onClick={() => setViewSolicitud(solicitud)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-3 border-t">
            <p className="text-sm text-gray-500">
              Mostrando {filteredSolicitudes.length} de {solicitudes.length} solicitudes
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" className="bg-orange-500 text-white hover:bg-orange-600">
                1
              </Button>
              <Button variant="outline" size="sm">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* View Details Dialog */}
      {viewSolicitud && (
        <Dialog open={!!viewSolicitud} onOpenChange={() => setViewSolicitud(null)}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Solicitud {viewSolicitud.id}</DialogTitle>
              <DialogDescription>{viewSolicitud.businessName}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-2">
                  <Store className="w-4 h-4 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Negocio</p>
                    <p className="font-medium">{viewSolicitud.businessName}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <FileText className="w-4 h-4 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">RUC</p>
                    <p className="font-medium">{viewSolicitud.ruc}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Mail className="w-4 h-4 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{viewSolicitud.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Phone className="w-4 h-4 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Telefono</p>
                    <p className="font-medium">{viewSolicitud.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Ciudad</p>
                    <p className="font-medium">{viewSolicitud.city}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Calendar className="w-4 h-4 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Fecha</p>
                    <p className="font-medium">{viewSolicitud.requestDate}</p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Descripcion del negocio</p>
                <p className="text-gray-900">{viewSolicitud.description}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2">Documentos presentados</p>
                <div className="flex flex-wrap gap-2">
                  {viewSolicitud.documents.map((doc) => (
                    <span key={doc} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
                      {doc}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            {viewSolicitud.status === "pendiente" && (
              <DialogFooter>
                <Button variant="outline" onClick={() => { setRejectDialog(viewSolicitud); setViewSolicitud(null) }}>
                  Rechazar
                </Button>
                <Button className="bg-green-600 hover:bg-green-700" onClick={() => handleApprove(viewSolicitud)}>
                  Aprobar Vendedor
                </Button>
              </DialogFooter>
            )}
          </DialogContent>
        </Dialog>
      )}

      {/* Reject Dialog */}
      {rejectDialog && (
        <Dialog open={!!rejectDialog} onOpenChange={() => setRejectDialog(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Rechazar Solicitud</DialogTitle>
              <DialogDescription>
                Indica el motivo del rechazo para {rejectDialog.businessName}
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Textarea
                placeholder="Motivo del rechazo..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                rows={3}
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setRejectDialog(null)}>
                Cancelar
              </Button>
              <Button variant="destructive" onClick={() => handleReject(rejectDialog)} disabled={!rejectReason}>
                Rechazar Solicitud
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
