"use client"

import React from "react"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

import { useState } from "react"
import {
  Search,
  Filter,
  Download,
  MoreVertical,
  Edit,
  Eye,
  ChevronLeft,
  ChevronRight,
  Store,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  Package,
  Star,
  TrendingUp,
  Ban,
  Check,
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
import Link from "next/link"

const vendors = [
  {
    id: 1,
    name: "TechStore EC",
    owner: "Carlos Mendoza",
    email: "techstore@email.com",
    phone: "0998765432",
    status: "activo",
    products: 156,
    sales: 45230.00,
    balance: 4523.00,
    commission: 5,
    rating: 4.9,
    reviews: 234,
    registered: "2024-03-10",
    verified: true,
  },
  {
    id: 2,
    name: "ModaStyle",
    owner: "María Fernández",
    email: "modastyle@email.com",
    phone: "0965432109",
    status: "activo",
    products: 89,
    sales: 32100.00,
    balance: 3210.00,
    commission: 5,
    rating: 4.7,
    reviews: 156,
    registered: "2024-05-22",
    verified: true,
  },
  {
    id: 3,
    name: "AutoParts Pro",
    owner: "Roberto García",
    email: "autoparts@email.com",
    phone: "0954321098",
    status: "activo",
    products: 234,
    sales: 28500.00,
    balance: 2850.00,
    commission: 5,
    rating: 4.8,
    reviews: 89,
    registered: "2024-04-15",
    verified: true,
  },
  {
    id: 4,
    name: "HomeDecor",
    owner: "Ana López",
    email: "homedecor@email.com",
    phone: "0943210987",
    status: "activo",
    products: 67,
    sales: 19800.00,
    balance: 1980.00,
    commission: 5,
    rating: 4.5,
    reviews: 67,
    registered: "2024-06-01",
    verified: true,
  },
  {
    id: 5,
    name: "Il Giornale",
    owner: "Terry Mendieta",
    email: "ilgiornale@email.com",
    phone: "0981990203",
    status: "activo",
    products: 11,
    sales: 1250.00,
    balance: 125.00,
    commission: 5,
    rating: 4.6,
    reviews: 12,
    registered: "2024-12-01",
    verified: true,
  },
  {
    id: 6,
    name: "GadgetWorld",
    owner: "Pedro Sánchez",
    email: "gadgetworld@email.com",
    phone: "0932109876",
    status: "pendiente",
    products: 0,
    sales: 0,
    balance: 0,
    commission: 5,
    rating: 0,
    reviews: 0,
    registered: "2025-01-20",
    verified: false,
  },
  {
    id: 7,
    name: "SportZone",
    owner: "Luis Martínez",
    email: "sportzone@email.com",
    phone: "0921098765",
    status: "suspendido",
    products: 45,
    sales: 8900.00,
    balance: 890.00,
    commission: 5,
    rating: 3.2,
    reviews: 23,
    registered: "2024-08-10",
    verified: true,
  },
]

const pendingRequests = [
  {
    id: 101,
    name: "TechWorld",
    owner: "Juan Pérez",
    email: "techworld@email.com",
    phone: "0912345678",
    category: "Tecnología",
    requestDate: "2025-01-22",
    documents: true,
  },
  {
    id: 102,
    name: "FashionHub",
    owner: "Laura García",
    email: "fashionhub@email.com",
    phone: "0923456789",
    category: "Moda",
    requestDate: "2025-01-21",
    documents: true,
  },
  {
    id: 103,
    name: "EcoProducts",
    owner: "Miguel Torres",
    email: "ecoproducts@email.com",
    phone: "0934567890",
    category: "Hogar",
    requestDate: "2025-01-20",
    documents: false,
  },
]

const statusColors: Record<string, { bg: string; text: string; icon: React.ReactNode }> = {
  activo: { bg: "bg-green-100", text: "text-green-700", icon: <CheckCircle className="w-4 h-4" /> },
  pendiente: { bg: "bg-yellow-100", text: "text-yellow-700", icon: <Clock className="w-4 h-4" /> },
  suspendido: { bg: "bg-red-100", text: "text-red-700", icon: <XCircle className="w-4 h-4" /> },
}

function Loading() {
  return null
}

export default function AdminVendorsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedVendors, setSelectedVendors] = useState<number[]>([])
  const [viewVendor, setViewVendor] = useState<typeof vendors[0] | null>(null)
  const [approveDialog, setApproveDialog] = useState<typeof pendingRequests[0] | null>(null)

  const filteredVendors = vendors.filter((vendor) => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || vendor.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Vendedores</h1>
          <p className="text-gray-500">Gestiona todos los vendedores de la plataforma</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2 bg-transparent">
            <Download className="w-4 h-4" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Store className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">48</p>
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
                <p className="text-2xl font-bold">42</p>
                <p className="text-sm text-gray-500">Activos</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">3</p>
                <p className="text-sm text-gray-500">Pendientes</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">$12.5k</p>
                <p className="text-sm text-gray-500">Por pagar</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Requests */}
      {pendingRequests.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-yellow-600" />
              Solicitudes Pendientes ({pendingRequests.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {pendingRequests.map((request) => (
                <div key={request.id} className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                      <Store className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{request.name}</p>
                      <p className="text-sm text-gray-500">{request.owner}</p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1 mb-4">
                    <p>Categoría: {request.category}</p>
                    <p>Fecha: {request.requestDate}</p>
                    <p className={request.documents ? "text-green-600" : "text-red-600"}>
                      Documentos: {request.documents ? "Completos" : "Pendientes"}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="flex-1 bg-green-600 hover:bg-green-700"
                      onClick={() => setApproveDialog(request)}
                    >
                      <Check className="w-4 h-4 mr-1" />
                      Aprobar
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 text-red-600 hover:text-red-700 bg-transparent">
                      <XCircle className="w-4 h-4 mr-1" />
                      Rechazar
                    </Button>
                  </div>
                </div>
              ))}
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
                placeholder="Buscar por nombre, propietario o email..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="activo">Activo</SelectItem>
                <SelectItem value="pendiente">Pendiente</SelectItem>
                <SelectItem value="suspendido">Suspendido</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Vendors Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="w-12 px-4 py-3">
                    <Checkbox />
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Tienda</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Estado</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Productos</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Ventas</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Balance</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Rating</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Comisión</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredVendors.map((vendor) => (
                  <tr key={vendor.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <Checkbox />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                          <Store className="w-5 h-5 text-orange-600" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-gray-900">{vendor.name}</p>
                            {vendor.verified && (
                              <CheckCircle className="w-4 h-4 text-blue-500" />
                            )}
                          </div>
                          <p className="text-sm text-gray-500">{vendor.owner}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${statusColors[vendor.status].bg} ${statusColors[vendor.status].text}`}>
                        {statusColors[vendor.status].icon}
                        {vendor.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-gray-600">{vendor.products}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-medium text-green-600">${vendor.sales.toFixed(2)}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-medium">${vendor.balance.toFixed(2)}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="font-medium">{vendor.rating}</span>
                        <span className="text-gray-500 text-sm">({vendor.reviews})</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-gray-600">{vendor.commission}%</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setViewVendor(vendor)}>
                            <Eye className="w-4 h-4 mr-2" />
                            Ver detalles
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <DollarSign className="w-4 h-4 mr-2" />
                            Cambiar comisión
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {vendor.status === "activo" ? (
                            <DropdownMenuItem className="text-red-600">
                              <Ban className="w-4 h-4 mr-2" />
                              Suspender
                            </DropdownMenuItem>
                          ) : vendor.status === "suspendido" && (
                            <DropdownMenuItem className="text-green-600">
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Reactivar
                            </DropdownMenuItem>
                          )}
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
              Mostrando {filteredVendors.length} de {vendors.length} vendedores
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

      {/* View Vendor Dialog */}
      {viewVendor && (
        <Dialog open={!!viewVendor} onOpenChange={() => setViewVendor(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Detalles del Vendedor</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-6 py-4">
              <div className="col-span-2 flex items-center gap-4 pb-4 border-b">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                  <Store className="w-8 h-8 text-orange-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold">{viewVendor.name}</h3>
                    {viewVendor.verified && <CheckCircle className="w-5 h-5 text-blue-500" />}
                  </div>
                  <p className="text-gray-500">{viewVendor.owner}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="font-medium">{viewVendor.rating}</span>
                    <span className="text-gray-500 text-sm">({viewVendor.reviews} reviews)</span>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{viewVendor.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Teléfono</p>
                <p className="font-medium">{viewVendor.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Productos</p>
                <p className="font-medium">{viewVendor.products}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Ventas totales</p>
                <p className="font-medium text-green-600">${viewVendor.sales.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Balance actual</p>
                <p className="font-medium">${viewVendor.balance.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Comisión</p>
                <p className="font-medium">{viewVendor.commission}%</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Registrado</p>
                <p className="font-medium">{viewVendor.registered}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Estado</p>
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${statusColors[viewVendor.status].bg} ${statusColors[viewVendor.status].text}`}>
                  {statusColors[viewVendor.status].icon}
                  {viewVendor.status}
                </span>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setViewVendor(null)}>
                Cerrar
              </Button>
              <Link href={`/tiendas/${viewVendor.id}`}>
                <Button className="bg-orange-500 hover:bg-orange-600">
                  Ver Tienda
                </Button>
              </Link>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Approve Dialog */}
      <Dialog open={!!approveDialog} onOpenChange={() => setApproveDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Aprobar Vendedor</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas aprobar a "{approveDialog?.name}" como vendedor?
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-gray-600">
              Una vez aprobado, el vendedor podrá:
            </p>
            <ul className="list-disc list-inside text-sm text-gray-600 mt-2 space-y-1">
              <li>Publicar productos en la tienda</li>
              <li>Recibir pedidos de clientes</li>
              <li>Acceder al panel de vendedor</li>
              <li>Solicitar retiros de fondos</li>
            </ul>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setApproveDialog(null)}>
              Cancelar
            </Button>
            <Button className="bg-green-600 hover:bg-green-700">
              Aprobar Vendedor
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export { Loading }
