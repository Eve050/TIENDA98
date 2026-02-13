"use client"

import React from "react"

import { useState } from "react"
import {
  Search,
  Filter,
  Download,
  MoreVertical,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  CreditCard,
  Building,
  ChevronLeft,
  ChevronRight,
  Eye,
  AlertTriangle,
  Check,
  X,
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
import { Textarea } from "@/components/ui/textarea"
import { AdminSidebar } from "@/components/admin-sidebar"
import { AdminHeader } from "@/components/admin-header"

interface Withdrawal {
  id: string
  vendor: {
    name: string
    email: string
    balance: number
  }
  amount: number
  method: "bank" | "paypal" | "payphone"
  bankDetails?: {
    bank: string
    account: string
    accountType: string
    holder: string
  }
  status: "pendiente" | "procesando" | "completado" | "rechazado"
  requestDate: string
  processDate?: string
  notes?: string
}

export default function AdminWithdrawalsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedWithdrawals, setSelectedWithdrawals] = useState<string[]>([])
  const [viewWithdrawal, setViewWithdrawal] = useState<Withdrawal | null>(null)
  const [approveDialog, setApproveDialog] = useState<Withdrawal | null>(null)
  const [rejectDialog, setRejectDialog] = useState<Withdrawal | null>(null)
  const [rejectReason, setRejectReason] = useState("")

  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([
    {
      id: "WD-001",
      vendor: { name: "TechStore EC", email: "techstore@email.com", balance: 4523.00 },
      amount: 2000.00,
      method: "bank",
      bankDetails: {
        bank: "Banco Pichincha",
        account: "2100123456",
        accountType: "Ahorros",
        holder: "Carlos Mendoza",
      },
      status: "pendiente",
      requestDate: "2026-01-23",
    },
    {
      id: "WD-002",
      vendor: { name: "ModaStyle", email: "modastyle@email.com", balance: 3210.00 },
      amount: 1500.00,
      method: "bank",
      bankDetails: {
        bank: "Banco Guayaquil",
        account: "3200654321",
        accountType: "Corriente",
        holder: "Maria Fernandez",
      },
      status: "pendiente",
      requestDate: "2026-01-22",
    },
    {
      id: "WD-003",
      vendor: { name: "AutoParts Pro", email: "autoparts@email.com", balance: 2850.00 },
      amount: 1000.00,
      method: "payphone",
      status: "procesando",
      requestDate: "2026-01-21",
    },
    {
      id: "WD-004",
      vendor: { name: "HomeDecor", email: "homedecor@email.com", balance: 1980.00 },
      amount: 500.00,
      method: "bank",
      bankDetails: {
        bank: "Produbanco",
        account: "1234567890",
        accountType: "Ahorros",
        holder: "Ana Lopez",
      },
      status: "completado",
      requestDate: "2026-01-20",
      processDate: "2026-01-21",
    },
    {
      id: "WD-005",
      vendor: { name: "Il Giornale", email: "ilgiornale@email.com", balance: 125.00 },
      amount: 100.00,
      method: "bank",
      bankDetails: {
        bank: "Banco del Pacifico",
        account: "9876543210",
        accountType: "Ahorros",
        holder: "Terry Mendieta",
      },
      status: "rechazado",
      requestDate: "2026-01-19",
      processDate: "2026-01-20",
      notes: "Balance insuficiente al momento del proceso",
    },
    {
      id: "WD-006",
      vendor: { name: "SportZone", email: "sportzone@email.com", balance: 890.00 },
      amount: 800.00,
      method: "paypal",
      status: "completado",
      requestDate: "2026-01-18",
      processDate: "2026-01-19",
    },
  ])

  const statusConfig: Record<string, { bg: string; text: string; icon: React.ReactNode }> = {
    pendiente: { bg: "bg-yellow-100", text: "text-yellow-700", icon: <Clock className="w-4 h-4" /> },
    procesando: { bg: "bg-blue-100", text: "text-blue-700", icon: <Clock className="w-4 h-4" /> },
    completado: { bg: "bg-green-100", text: "text-green-700", icon: <CheckCircle className="w-4 h-4" /> },
    rechazado: { bg: "bg-red-100", text: "text-red-700", icon: <XCircle className="w-4 h-4" /> },
  }

  const methodLabels: Record<string, string> = {
    bank: "Transferencia Bancaria",
    paypal: "PayPal",
    payphone: "PayPhone",
  }

  const filteredWithdrawals = withdrawals.filter((w) => {
    const matchesSearch = w.vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      w.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || w.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const totalPending = withdrawals
    .filter((w) => w.status === "pendiente" || w.status === "procesando")
    .reduce((acc, w) => acc + w.amount, 0)

  const handleApprove = (withdrawal: Withdrawal) => {
    setWithdrawals(withdrawals.map((w) =>
      w.id === withdrawal.id
        ? { ...w, status: "procesando" as const }
        : w
    ))
    setApproveDialog(null)
  }

  const handleReject = (withdrawal: Withdrawal) => {
    setWithdrawals(withdrawals.map((w) =>
      w.id === withdrawal.id
        ? { ...w, status: "rechazado" as const, notes: rejectReason, processDate: new Date().toISOString().split("T")[0] }
        : w
    ))
    setRejectDialog(null)
    setRejectReason("")
  }

  const handleMarkComplete = (withdrawal: Withdrawal) => {
    setWithdrawals(withdrawals.map((w) =>
      w.id === withdrawal.id
        ? { ...w, status: "completado" as const, processDate: new Date().toISOString().split("T")[0] }
        : w
    ))
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
              <h1 className="text-2xl font-bold text-gray-900">Solicitudes de Retiro</h1>
              <p className="text-gray-500">Gestiona los pagos a vendedores</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="gap-2 bg-transparent">
                <Download className="w-4 h-4" />
                Exportar
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{withdrawals.filter((w) => w.status === "pendiente").length}</p>
                    <p className="text-xs text-gray-500">Pendientes</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">${totalPending.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">Por Procesar</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{withdrawals.filter((w) => w.status === "completado").length}</p>
                    <p className="text-xs text-gray-500">Completados</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">$12,578</p>
                    <p className="text-xs text-gray-500">Balance Total Vendedores</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Pending Alert */}
          {withdrawals.filter((w) => w.status === "pendiente").length > 0 && (
            <Card className="border-0 shadow-sm mb-6 bg-yellow-50 border-yellow-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                  <p className="text-yellow-800">
                    Tienes {withdrawals.filter((w) => w.status === "pendiente").length} solicitudes pendientes de aprobacion
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Filters */}
          <Card className="border-0 shadow-sm mb-6">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Buscar por vendedor o ID..."
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
                    <SelectItem value="procesando">Procesando</SelectItem>
                    <SelectItem value="completado">Completado</SelectItem>
                    <SelectItem value="rechazado">Rechazado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Withdrawals Table */}
          <Card className="border-0 shadow-sm">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="w-12 px-4 py-3">
                        <Checkbox />
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">ID</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Vendedor</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Monto</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Metodo</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Estado</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Fecha</th>
                      <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {filteredWithdrawals.map((withdrawal) => (
                      <tr key={withdrawal.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <Checkbox />
                        </td>
                        <td className="px-4 py-3">
                          <span className="font-mono text-sm text-orange-600">{withdrawal.id}</span>
                        </td>
                        <td className="px-4 py-3">
                          <div>
                            <p className="font-medium text-gray-900">{withdrawal.vendor.name}</p>
                            <p className="text-sm text-gray-500">Balance: ${withdrawal.vendor.balance.toFixed(2)}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="font-semibold text-gray-900">${withdrawal.amount.toFixed(2)}</span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            {withdrawal.method === "bank" && <Building className="w-4 h-4 text-gray-400" />}
                            {withdrawal.method === "paypal" && <CreditCard className="w-4 h-4 text-blue-500" />}
                            {withdrawal.method === "payphone" && <CreditCard className="w-4 h-4 text-green-500" />}
                            <span className="text-sm text-gray-600">{methodLabels[withdrawal.method]}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${statusConfig[withdrawal.status].bg} ${statusConfig[withdrawal.status].text}`}>
                            {statusConfig[withdrawal.status].icon}
                            {withdrawal.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-sm text-gray-600">{withdrawal.requestDate}</span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-1">
                            {withdrawal.status === "pendiente" && (
                              <>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
                                  onClick={() => setApproveDialog(withdrawal)}
                                >
                                  <Check className="w-4 h-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                                  onClick={() => setRejectDialog(withdrawal)}
                                >
                                  <X className="w-4 h-4" />
                                </Button>
                              </>
                            )}
                            {withdrawal.status === "procesando" && (
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-8 px-2 text-green-600 hover:text-green-700 hover:bg-green-50"
                                onClick={() => handleMarkComplete(withdrawal)}
                              >
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Completar
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 p-0"
                              onClick={() => setViewWithdrawal(withdrawal)}
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
                  Mostrando {filteredWithdrawals.length} de {withdrawals.length} solicitudes
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
        </main>
      </div>

      {/* View Details Dialog */}
      {viewWithdrawal && (
        <Dialog open={!!viewWithdrawal} onOpenChange={() => setViewWithdrawal(null)}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Detalles del Retiro {viewWithdrawal.id}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Vendedor</p>
                  <p className="font-medium">{viewWithdrawal.vendor.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{viewWithdrawal.vendor.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Monto Solicitado</p>
                  <p className="font-semibold text-lg">${viewWithdrawal.amount.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Balance Actual</p>
                  <p className="font-medium">${viewWithdrawal.vendor.balance.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Metodo de Pago</p>
                  <p className="font-medium">{methodLabels[viewWithdrawal.method]}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Fecha de Solicitud</p>
                  <p className="font-medium">{viewWithdrawal.requestDate}</p>
                </div>
              </div>

              {viewWithdrawal.bankDetails && (
                <div className="p-4 bg-gray-50 rounded-lg space-y-2">
                  <p className="font-medium text-gray-900 flex items-center gap-2">
                    <Building className="w-4 h-4" />
                    Datos Bancarios
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-500">Banco:</span> {viewWithdrawal.bankDetails.bank}
                    </div>
                    <div>
                      <span className="text-gray-500">Cuenta:</span> {viewWithdrawal.bankDetails.account}
                    </div>
                    <div>
                      <span className="text-gray-500">Tipo:</span> {viewWithdrawal.bankDetails.accountType}
                    </div>
                    <div>
                      <span className="text-gray-500">Titular:</span> {viewWithdrawal.bankDetails.holder}
                    </div>
                  </div>
                </div>
              )}

              {viewWithdrawal.notes && (
                <div className="p-4 bg-red-50 rounded-lg">
                  <p className="text-sm text-red-700">{viewWithdrawal.notes}</p>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Approve Dialog */}
      {approveDialog && (
        <Dialog open={!!approveDialog} onOpenChange={() => setApproveDialog(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Aprobar Retiro</DialogTitle>
              <DialogDescription>
                Estas a punto de aprobar el retiro de ${approveDialog.amount.toFixed(2)} para {approveDialog.vendor.name}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setApproveDialog(null)}>
                Cancelar
              </Button>
              <Button className="bg-green-600 hover:bg-green-700" onClick={() => handleApprove(approveDialog)}>
                Aprobar Retiro
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Reject Dialog */}
      {rejectDialog && (
        <Dialog open={!!rejectDialog} onOpenChange={() => setRejectDialog(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Rechazar Retiro</DialogTitle>
              <DialogDescription>
                Por favor indica el motivo del rechazo para {rejectDialog.vendor.name}
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
              <Button 
                variant="destructive" 
                onClick={() => handleReject(rejectDialog)}
                disabled={!rejectReason}
              >
                Rechazar Retiro
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
