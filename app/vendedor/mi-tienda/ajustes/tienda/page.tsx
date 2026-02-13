"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import VendorSidebar from "@/components/vendor-sidebar"
import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload } from "lucide-react"

export default function VendedorAjustesTiendaPage() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const [formData, setFormData] = useState({
    storeName: "",
    street: "",
    street2: "",
    city: "",
    postalCode: "",
    country: "Ecuador",
    region: "",
    phone: "",
    showEmail: true,
    showTerms: false,
    showSchedule: false,
    biography: "",
  })

  useEffect(() => {
    if (!isAuthenticated || user?.type !== "seller") {
      router.push("/mi-cuenta")
    }
  }, [isAuthenticated, user, router])

  if (!isAuthenticated || user?.type !== "seller") {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <VendorSidebar />
        <main className="flex-1 bg-gray-50 p-8">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">AJUSTES → VISITAR TIENDA</h1>
              <Button className="bg-black hover:bg-black/90">Actualizar Los Ajustes</Button>
            </div>

            {/* Banner Image */}
            <div className="border-4 border-dashed border-gray-300 rounded-lg p-12 text-center">
              <div className="w-full h-64 bg-gray-200 rounded flex items-center justify-center mb-4">
                <p className="text-gray-400">Banner de la tienda</p>
              </div>
            </div>

            {/* Profile Photo */}
            <div className="space-y-2">
              <Label>Foto de perfil</Label>
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                  <Upload className="w-8 h-8 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Store Name */}
            <div className="space-y-2">
              <Label htmlFor="storeName">Nombre de la tienda</Label>
              <Input
                id="storeName"
                value={formData.storeName}
                onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                placeholder="NINE-X"
              />
            </div>

            {/* Address */}
            <div className="space-y-4">
              <div>
                <Label>Dirección</Label>
                <p className="text-sm text-gray-600 mb-2">Calle</p>
                <Input
                  value={formData.street}
                  onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                  placeholder="Dirección"
                />
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2">Calle 2</p>
                <Input
                  value={formData.street2}
                  onChange={(e) => setFormData({ ...formData, street2: e.target.value })}
                  placeholder="Apartamento, habitación, unidad, etc (opcional)"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Ciudad</p>
                  <Input
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Loja"
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">Código Postal</p>
                  <Input
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    placeholder="Código postal"
                  />
                </div>
              </div>

              <div>
                <Label>
                  País <span className="text-red-500">*</span>
                </Label>
                <Input value={formData.country} disabled className="bg-gray-100" />
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2">Región/Provincia</p>
                <Input
                  value={formData.region}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                  placeholder="Loja"
                />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone">Número de teléfono</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+593980921768"
              />
            </div>

            {/* Checkboxes */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="showEmail"
                  checked={formData.showEmail}
                  onChange={(e) => setFormData({ ...formData, showEmail: e.target.checked })}
                  className="w-4 h-4"
                />
                <Label htmlFor="showEmail" className="font-normal">
                  Mostrar la dirección de correo electrónico en la tienda
                </Label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="showTerms"
                  checked={formData.showTerms}
                  onChange={(e) => setFormData({ ...formData, showTerms: e.target.checked })}
                  className="w-4 h-4"
                />
                <Label htmlFor="showTerms" className="font-normal">
                  Mostrar los términos y condiciones en la página de tienda
                </Label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="showSchedule"
                  checked={formData.showSchedule}
                  onChange={(e) => setFormData({ ...formData, showSchedule: e.target.checked })}
                  className="w-4 h-4"
                />
                <Label htmlFor="showSchedule" className="font-normal">
                  La tienda tiene horario de apertura
                </Label>
              </div>
            </div>

            {/* Biography */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Biography</Label>
                <Button variant="outline" size="sm">
                  Añadir Medios
                </Button>
              </div>
              <Textarea
                value={formData.biography}
                onChange={(e) => setFormData({ ...formData, biography: e.target.value })}
                rows={6}
                placeholder="Qué chch es UNO?"
              />
            </div>

            <Button className="w-full bg-black hover:bg-black/90">Actualizar Los Ajustes</Button>
          </div>
        </main>
      </div>
    </div>
  )
}
