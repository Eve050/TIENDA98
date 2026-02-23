"use client"

import { useState } from "react"
import { AccountLayout } from "@/components/account-layout"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Pencil, Plus, MapPin, Phone, Mail, User } from "lucide-react"

interface Address {
  firstName: string
  lastName: string
  company?: string
  identification?: string
  address: string
  city: string
  province: string
  zipCode: string
  phone: string
  email: string
}

export default function DireccionesPage() {
  const [billingAddress, setBillingAddress] = useState<Address | null>(null)
  const [shippingAddress, setShippingAddress] = useState<Address | null>(null)
  const [isSameAsBilling, setIsSameAsBilling] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [editingType, setEditingType] = useState<"billing" | "shipping" | null>(null)
  const [formData, setFormData] = useState<Address>({
    firstName: "",
    lastName: "",
    company: "",
    identification: "",
    address: "",
    city: "",
    province: "",
    zipCode: "",
    phone: "",
    email: "",
  })

  const handleEdit = (type: "billing" | "shipping") => {
    setEditingType(type)
    const currentAddress = type === "billing" ? billingAddress : shippingAddress
    if (currentAddress) {
      setFormData(currentAddress)
    } else {
      setFormData({
        firstName: "",
        lastName: "",
        company: "",
        identification: "",
        address: "",
        city: "",
        province: "",
        zipCode: "",
        phone: "",
        email: "",
      })
    }
    setIsOpen(true)
  }

  const handleSave = () => {
    if (editingType === "billing") {
      setBillingAddress(formData)
      if (isSameAsBilling) {
        setShippingAddress(formData)
      }
    } else {
      setShippingAddress(formData)
    }
    setIsOpen(false)
    setEditingType(null)
  }

  const AddressCard = ({ type, address }: { type: "billing" | "shipping"; address: Address | null }) => (
    <div className="flex flex-col h-full">
      <h3 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wide">
        Dirección de {type === "billing" ? "facturación" : "envío"}
      </h3>
      {address ? (
        <div className="bg-orange-50/50 rounded-xl p-6 border border-orange-100 flex-1 relative group hover:shadow-md transition-all">
          <button
            onClick={() => handleEdit(type)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white shadow-sm border border-gray-100 text-gray-600 hover:text-orange-500 hover:border-orange-200 transition-all opacity-0 group-hover:opacity-100"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <User className="w-5 h-5 text-orange-500 mt-0.5" />
              <div>
                <p className="font-bold text-gray-900">{address.firstName} {address.lastName}</p>
                {address.company && <p className="text-sm text-gray-600">{address.company}</p>}
                {address.identification && <p className="text-sm text-gray-500 mt-1">ID: {address.identification}</p>}
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-orange-500 mt-0.5" />
              <div>
                <p className="text-sm text-gray-700 leading-relaxed">{address.address}</p>
                <p className="text-sm text-gray-700">{address.city}, {address.province} {address.zipCode}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 pt-2 border-t border-orange-100/50">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Phone className="w-4 h-4 text-orange-400" />
                <span>{address.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Mail className="w-4 h-4 text-orange-400" />
                <span className="truncate">{address.email}</span>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleEdit(type)}
            className="mt-6 w-full text-orange-600 hover:text-orange-700 hover:bg-orange-100/50 rounded-lg lg:hidden"
          >
            Editar Dirección
          </Button>
        </div>
      ) : (
        <button
          onClick={() => handleEdit(type)}
          className="border-2 border-dashed border-gray-200 rounded-xl p-10 flex flex-col items-center justify-center gap-3 text-gray-400 hover:border-orange-300 hover:text-orange-500 hover:bg-orange-50/30 transition-all group flex-1 h-[280px]"
        >
          <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-orange-100 group-hover:scale-110 transition-all">
            <Plus className="w-6 h-6" />
          </div>
          <span className="font-semibold text-gray-600 group-hover:text-orange-600">
            Añadir Dirección de {type === "billing" ? "facturación" : "envío"}
          </span>
          <p className="text-sm text-gray-400 max-w-[200px] text-center">
            Aún no has configurado este tipo de dirección.
          </p>
        </button>
      )}
    </div>
  )

  return (
    <AccountLayout>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Mis Direcciones</h2>
            <p className="text-sm text-gray-500">
              Gestiona tus direcciones para un proceso de pago más rápido.
            </p>
          </div>

          <div className="bg-gray-50/80 rounded-xl p-4 md:p-6 mb-10 border border-gray-100 italic text-gray-600 text-sm md:text-base leading-relaxed">
            "Las siguientes direcciones se utilizarán por defecto en la página de pago. Puedes tener diferentes direcciones para facturar y enviar tus pedidos."
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12">
            <AddressCard type="billing" address={billingAddress} />
            <AddressCard type="shipping" address={shippingAddress} />
          </div>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900">
              {editingType === "billing" ? "Dirección de Facturación" : "Dirección de Envío"}
            </DialogTitle>
            <DialogDescription>
              Completa los campos para guardar tu dirección. Estos datos se usarán para tus futuros pedidos.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Nombre *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  placeholder="Evelyn"
                  className="rounded-xl border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Apellido *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  placeholder="Valverde"
                  className="rounded-xl border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company">Empresa (Opcional)</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="Nombre de la empresa"
                  className="rounded-xl border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="identification">CI / RUC *</Label>
                <Input
                  id="identification"
                  value={formData.identification}
                  onChange={(e) => setFormData({ ...formData, identification: e.target.value })}
                  placeholder="17xxxxxxxx"
                  className="rounded-xl border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Dirección completa *</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Calle principal, secundaria y número de casa"
                className="rounded-xl border-gray-200 focus:border-orange-500 focus:ring-orange-500"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">Ciudad *</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="Quito"
                  className="rounded-xl border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="province">Provincia *</Label>
                <Input
                  id="province"
                  value={formData.province}
                  onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                  placeholder="Pichincha"
                  className="rounded-xl border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zipCode">Cod. Postal</Label>
                <Input
                  id="zipCode"
                  value={formData.zipCode}
                  onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                  placeholder="170101"
                  className="rounded-xl border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="09xxxxxxxx"
                  className="rounded-xl border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="ejemplo@correo.com"
                  className="rounded-xl border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
            </div>

            {editingType === "billing" && (
              <div className="flex items-center space-x-2 pt-2">
                <Checkbox
                  id="sameAsBilling"
                  checked={isSameAsBilling}
                  onCheckedChange={(checked) => setIsSameAsBilling(checked as boolean)}
                />
                <Label htmlFor="sameAsBilling" className="text-sm text-gray-600 font-medium cursor-pointer">
                  Usar esta dirección como mi dirección de envío predeterminada
                </Label>
              </div>
            )}
          </div>

          <DialogFooter className="gap-2 sm:gap-0 mt-4">
            <Button variant="outline" onClick={() => setIsOpen(false)} className="rounded-xl px-8">
              Cancelar
            </Button>
            <Button onClick={handleSave} className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl px-8 shadow-lg shadow-orange-500/20 transition-all font-bold">
              Guardar Dirección
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AccountLayout>
  )
}
