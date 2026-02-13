"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import {
  Search,
  Plus,
  Filter,
  Download,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Mail,
  ChevronLeft,
  ChevronRight,
  Users,
  UserCheck,
  UserX,
  Store,
  ShoppingBag,
  Ban,
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
import { Label } from "@/components/ui/label"
import Loading from "./loading"

const users = [
  {
    id: 1,
    name: "Juan Pérez",
    email: "juan@email.com",
    phone: "0991234567",
    role: "cliente",
    status: "activo",
    orders: 15,
    spent: 2450.00,
    registered: "2024-06-15",
    lastLogin: "2025-01-23",
  },
  {
    id: 2,
    name: "María García",
    email: "maria@email.com",
    phone: "0987654321",
    role: "cliente",
    status: "activo",
    orders: 8,
    spent: 890.50,
    registered: "2024-08-20",
    lastLogin: "2025-01-22",
  },
  {
    id: 3,
    name: "TechStore EC",
    email: "techstore@email.com",
    phone: "0998765432",
    role: "vendedor",
    status: "activo",
    orders: 0,
    spent: 0,
    registered: "2024-03-10",
    lastLogin: "2025-01-23",
    storeName: "TechStore EC",
    products: 156,
    sales: 45230.00,
  },
  {
    id: 4,
    name: "Carlos López",
    email: "carlos@email.com",
    phone: "0976543210",
    role: "cliente",
    status: "inactivo",
    orders: 3,
    spent: 350.00,
    registered: "2024-10-05",
    lastLogin: "2024-12-15",
  },
  {
    id: 5,
    name: "ModaStyle",
    email: "modastyle@email.com",
    phone: "0965432109",
    role: "vendedor",
    status: "activo",
    orders: 0,
    spent: 0,
    registered: "2024-05-22",
    lastLogin: "2025-01-21",
    storeName: "ModaStyle",
    products: 89,
    sales: 32100.00,
  },
  {
    id: 6,
    name: "Ana Martínez",
    email: "ana@email.com",
    phone: "0954321098",
    role: "admin",
    status: "activo",
    orders: 0,
    spent: 0,
    registered: "2024-01-01",
    lastLogin: "2025-01-23",
  },
  {
    id: 7,
    name: "Pedro Sánchez",
    email: "pedro@email.com",
    phone: "0943210987",
    role: "cliente",
    status: "bloqueado",
    orders: 1,
    spent: 50.00,
    registered: "2024-11-30",
    lastLogin: "2024-12-01",
  },
]

const roleColors: Record<string, { bg: string; text: string }> = {
  admin: { bg: "bg-purple-100", text: "text-purple-700" },
  vendedor: { bg: "bg-blue-100", text: "text-blue-700" },
  cliente: { bg: "bg-gray-100", text: "text-gray-700" },
}

const statusColors: Record<string, { bg: string; text: string }> = {
  activo: { bg: "bg-green-100", text: "text-green-700" },
  inactivo: { bg: "bg-yellow-100", text: "text-yellow-700" },
  bloqueado: { bg: "bg-red-100", text: "text-red-700" },
}

export default function AdminUsersPage() {
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRole, setSelectedRole] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedUsers, setSelectedUsers] = useState<number[]>([])
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [viewUser, setViewUser] = useState<typeof users[0] | null>(null)

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = selectedRole === "all" || user.role === selectedRole
    const matchesStatus = selectedStatus === "all" || user.status === selectedStatus
    return matchesSearch && matchesRole && matchesStatus
  })

  const toggleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([])
    } else {
      setSelectedUsers(filteredUsers.map((u) => u.id))
    }
  }

  const toggleSelectUser = (id: number) => {
    if (selectedUsers.includes(id)) {
      setSelectedUsers(selectedUsers.filter((u) => u !== id))
    } else {
      setSelectedUsers([...selectedUsers, id])
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Usuarios</h1>
          <p className="text-gray-500">Gestiona todos los usuarios de la plataforma</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2 bg-transparent">
            <Download className="w-4 h-4" />
            Exportar
          </Button>
          <Button className="bg-orange-500 hover:bg-orange-600 gap-2" onClick={() => setCreateDialogOpen(true)}>
            <Plus className="w-4 h-4" />
            Añadir Usuario
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">2,451</p>
                <p className="text-sm text-gray-500">Total</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <UserCheck className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">2,103</p>
                <p className="text-sm text-gray-500">Activos</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Store className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">48</p>
                <p className="text-sm text-gray-500">Vendedores</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <UserX className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-gray-500">Bloqueados</p>
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
                placeholder="Buscar por nombre o email..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Rol" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los roles</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="vendedor">Vendedor</SelectItem>
                <SelectItem value="cliente">Cliente</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="activo">Activo</SelectItem>
                <SelectItem value="inactivo">Inactivo</SelectItem>
                <SelectItem value="bloqueado">Bloqueado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="w-12 px-4 py-3">
                    <Checkbox
                      checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                      onCheckedChange={toggleSelectAll}
                    />
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Usuario</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Rol</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Estado</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Pedidos</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Gastado</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Registrado</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Último acceso</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <Checkbox
                        checked={selectedUsers.includes(user.id)}
                        onCheckedChange={() => toggleSelectUser(user.id)}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                          <span className="text-orange-600 font-medium">
                            {user.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${roleColors[user.role].bg} ${roleColors[user.role].text}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${statusColors[user.status].bg} ${statusColors[user.status].text}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-gray-600">{user.orders}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-medium">${user.spent.toFixed(2)}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-gray-600">{user.registered}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-gray-600">{user.lastLogin}</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setViewUser(user)}>
                            <Eye className="w-4 h-4 mr-2" />
                            Ver detalles
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="w-4 h-4 mr-2" />
                            Enviar email
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {user.status !== "bloqueado" ? (
                            <DropdownMenuItem className="text-red-600">
                              <Ban className="w-4 h-4 mr-2" />
                              Bloquear
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem className="text-green-600">
                              <UserCheck className="w-4 h-4 mr-2" />
                              Desbloquear
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem className="text-red-600">
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
              Mostrando {filteredUsers.length} de {users.length} usuarios
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" className="bg-orange-500 text-white hover:bg-orange-600">
                1
              </Button>
              <Button variant="outline" size="sm">2</Button>
              <Button variant="outline" size="sm">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Create User Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Añadir Usuario</DialogTitle>
            <DialogDescription>
              Crea un nuevo usuario en la plataforma
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Nombre completo</Label>
              <Input placeholder="Juan Pérez" />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" placeholder="juan@email.com" />
            </div>
            <div className="space-y-2">
              <Label>Teléfono</Label>
              <Input placeholder="0991234567" />
            </div>
            <div className="space-y-2">
              <Label>Contraseña</Label>
              <Input type="password" placeholder="••••••••" />
            </div>
            <div className="space-y-2">
              <Label>Rol</Label>
              <Select defaultValue="cliente">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cliente">Cliente</SelectItem>
                  <SelectItem value="vendedor">Vendedor</SelectItem>
                  <SelectItem value="admin">Administrador</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
              Cancelar
            </Button>
            <Button className="bg-orange-500 hover:bg-orange-600">
              Crear Usuario
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View User Dialog */}
      {viewUser && (
        <Dialog open={!!viewUser} onOpenChange={() => setViewUser(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Detalles del Usuario</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-6 py-4">
              <div className="col-span-2 flex items-center gap-4 pb-4 border-b">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl text-orange-600 font-bold">
                    {viewUser.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">{viewUser.name}</h3>
                  <p className="text-gray-500">{viewUser.email}</p>
                  <div className="flex gap-2 mt-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${roleColors[viewUser.role].bg} ${roleColors[viewUser.role].text}`}>
                      {viewUser.role}
                    </span>
                    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${statusColors[viewUser.status].bg} ${statusColors[viewUser.status].text}`}>
                      {viewUser.status}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Teléfono</p>
                <p className="font-medium">{viewUser.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Registrado</p>
                <p className="font-medium">{viewUser.registered}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Último acceso</p>
                <p className="font-medium">{viewUser.lastLogin}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total gastado</p>
                <p className="font-medium text-green-600">${viewUser.spent.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Pedidos realizados</p>
                <p className="font-medium">{viewUser.orders}</p>
              </div>
              {viewUser.role === "vendedor" && (
                <>
                  <div>
                    <p className="text-sm text-gray-500">Productos</p>
                    <p className="font-medium">{(viewUser as any).products}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Ventas totales</p>
                    <p className="font-medium text-green-600">${(viewUser as any).sales?.toFixed(2)}</p>
                  </div>
                </>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setViewUser(null)}>
                Cerrar
              </Button>
              <Button className="bg-orange-500 hover:bg-orange-600">
                Editar Usuario
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
