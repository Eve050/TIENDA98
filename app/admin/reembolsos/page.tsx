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
  DollarSign,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  Package,
  User,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
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

interface Reembolso {
  id: string
  orderId: string
  customer: string
  email: string
  product: string
  amount: number
  reason: string
  status: "pendiente" | "aprobado" | "rechazado" | "procesado"
  requestDate: string
  processDate?: string
}

export default function AdminReembolsosPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [viewReembolso, setViewReembolso] = useState<Reembolso | null>(null)
  const [rejectDialog, setRejectDialog] = useState<Reembolso | null>(null)
  const [rejectReason, setRejectReason] = useState("")

  const [reembolsos, setReembolsos] = useState<Reembolso[]>([
    {
      id: "REF-001",
      orderId: "#10985",
      customer: "Juan Perez",
      email: "juan@email.com",
      product: "iPhone 15 Pro Max",
      amount: 1299.00,
      reason: "Producto defectuoso - la pantalla llego con una linea muerta",
      status: "pendiente",
      requestDate: "2026-02-18",
    },
    {
      id: "REF-002",
      orderId: "#10972",
      customer: "Maria Garcia",
      email: "maria@email.com",
      product: "Nike Air Max 90",
      amount: 129.00,
      reason: "Talla incorrecta, solicite talla 38 y llego talla 40",
      status: "pendiente",
      requestDate: "2026-02-17",
    },
    {
      id: "REF-003",
      orderId: "#10960",
      customer: "Carlos Lopez",
      email: "carlos@email.com",
      product: "AirPods Pro 2da Gen",
      amount: 249.00,
      reason: "No funciona el cancelacion de ruido activo",
      status: "aprobado",
      requestDate: "2026-02-15",
      processDate: "2026-02-16",
    },
    {
      id: "REF-004",
      orderId: "#10948",
      customer: "Ana Martinez",
      email: "ana@email.com",
      product: "Sofa Moderno 3 Plazas",
      amount: 599.00,
      reason: "El color no corresponde al mostrado en la foto",
      status: "procesado",
      requestDate: "2026-02-12",
      processDate: "2026-02-14",
    },
    {
      id: "REF-005",
      orderId: "#10935",
      customer: "Luis Torres",
      email: "luis@email.com",
      product: "Kit de Frenos Delanteros",
      amount: 89.00,
      reason: "Pedi el modelo para Toyota Corolla 2020 y llego para modelo anterior",
      status: "rechazado",
      requestDate: "2026-02-10",
      processDate: "2026-02-11",
    },
  ])

  const statusConfig: Record<string, { bg: string; text: string; icon: React.ReactNode; label: string }> = {
    pendiente: { bg: "bg-yellow-100", text: "text-yellow-700", icon: <Clock className="w-4 h-4" />, label: "Pendiente" },
    aprobado: { bg: "bg-blue-100", text: "text-blue-700", icon: <CheckCircle className="w-4 h-4" />, label: "Aprobado" },
    procesado: { bg: "bg-green-100", text: "text-green-700", icon: <CheckCircle className="w-4 h-4" />, label: "Procesado" },
    rechazado: { bg: "bg-red-100", text: "text-red-700", icon: <XCircle className="w-4 h-4" />, label: "Rechazado" },
  }

  const filteredReembolsos = reembolsos.filter((r) => {
    const matchesSearch =
      r.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.product.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || r.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const totalPending = reembolsos
    .filter((r) => r.status === "pendiente")
    .reduce((acc, r) => acc + r.amount, 0)

  const handleApprove = (reembolso: Reembolso) => {
    setReembolsos(
      reembolsos.map((r) =>
        r.id === reembolso.id ? { ...r, status: "aprobado" as const, processDate: new Date().toISOString().split("T")[0] } : r
      )
    )
    setViewReembolso(null)
  }

  const handleReject = (reembolso: Reembolso) => {
    setReembolsos(
      reembolsos.map((r) =>
        r.id === reembolso.id ? { ...r, status: "rechazado" as const, processDate: new Date().toISOString().split("T")[0] } : r
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
          <h1 className="text-2xl font-bold text-gray-900">Reembolsos</h1>
          <p className="text-gray-500">Gestiona las solicitudes de reembolso de los clientes</p>
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
                <p className="text-2xl font-bold">{reembolsos.filter((r) => r.status === "pendiente").length}</p>
                <p className="text-xs text-gray-500">Pendientes</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">${totalPending.toLocaleString()}</p>
                <p className="text-xs text-gray-500">Por Reembolsar</p>
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
                <p className="text-2xl font-bold">{reembolsos.filter((r) => r.status === "procesado").length}</p>
                <p className="text-xs text-gray-500">Procesados</p>
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
                <p className="text-2xl font-bold">{reembolsos.filter((r) => r.status === "rechazado").length}</p>
                <p className="text-xs text-gray-500">Rechazados</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Alert */}
      {reembolsos.filter((r) => r.status === "pendiente").length > 0 && (
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              <p className="text-yellow-800">
                Tienes {reembolsos.filter((r) => r.status === "pendiente").length} solicitudes de reembolso pendientes por un total de ${totalPending.toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Buscar por cliente, ID o producto..."
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
                <SelectItem value="procesado">Procesado</SelectItem>
                <SelectItem value="rechazado">Rechazado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Reembolsos Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">ID</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Pedido</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Cliente</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Producto</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Monto</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Estado</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Fecha</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredReembolsos.map((reembolso) => (
                  <tr key={reembolso.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <span className="font-mono text-sm text-orange-600">{reembolso.id}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-mono text-sm text-gray-600">{reembolso.orderId}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-gray-500" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{reembolso.customer}</p>
                          <p className="text-xs text-gray-500">{reembolso.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-gray-700">{reembolso.product}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-semibold text-gray-900">${reembolso.amount.toFixed(2)}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${statusConfig[reembolso.status].bg} ${statusConfig[reembolso.status].text}`}
                      >
                        {statusConfig[reembolso.status].icon}
                        {statusConfig[reembolso.status].label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{reembolso.requestDate}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {reembolso.status === "pendiente" && (
                          <>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
                              onClick={() => handleApprove(reembolso)}
                            >
                              <Check className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                              onClick={() => setRejectDialog(reembolso)}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0"
                          onClick={() => setViewReembolso(reembolso)}
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
          <div className="flex items-center justify-between px-4 py-3 border-t">
            <p className="text-sm text-gray-500">
              Mostrando {filteredReembolsos.length} de {reembolsos.length} reembolsos
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
      {viewReembolso && (
        <Dialog open={!!viewReembolso} onOpenChange={() => setViewReembolso(null)}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Reembolso {viewReembolso.id}</DialogTitle>
              <DialogDescription>Pedido {viewReembolso.orderId}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Cliente</p>
                  <p className="font-medium">{viewReembolso.customer}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{viewReembolso.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Producto</p>
                  <p className="font-medium">{viewReembolso.product}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Monto</p>
                  <p className="font-semibold text-lg">${viewReembolso.amount.toFixed(2)}</p>
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Motivo del reembolso</p>
                <p className="text-gray-900">{viewReembolso.reason}</p>
              </div>
            </div>
            {viewReembolso.status === "pendiente" && (
              <DialogFooter>
                <Button variant="outline" onClick={() => { setRejectDialog(viewReembolso); setViewReembolso(null) }}>
                  Rechazar
                </Button>
                <Button className="bg-green-600 hover:bg-green-700" onClick={() => handleApprove(viewReembolso)}>
                  Aprobar Reembolso
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
              <DialogTitle>Rechazar Reembolso</DialogTitle>
              <DialogDescription>
                Indica el motivo del rechazo para el reembolso de {rejectDialog.customer}
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
                Rechazar Reembolso
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
