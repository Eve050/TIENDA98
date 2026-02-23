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
import { Upload, Check, Store, X, Image as ImageIcon, Loader2 } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

export default function VendedorAjustesTiendaPage() {
  const { user, isAuthenticated, updateUser } = useAuth()
  const router = useRouter()
  const [isUpdating, setIsUpdating] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [bannerImage, setBannerImage] = useState<string | null>(user?.storeData?.banner || null)
  const [profileImage, setProfileImage] = useState<string | null>(user?.storeData?.profilePicture || null)

  const [formData, setFormData] = useState({
    storeName: user?.storeData?.storeName || "",
    street: user?.storeData?.address?.street || "",
    street2: user?.storeData?.address?.street2 || "",
    city: user?.storeData?.address?.city || "",
    postalCode: user?.storeData?.address?.postalCode || "",
    country: user?.storeData?.address?.country || "Ecuador",
    region: user?.storeData?.address?.region || "",
    phone: user?.storeData?.phone || "",
    showEmail: user?.storeData?.settings?.showEmail ?? true,
    showTerms: user?.storeData?.settings?.showTerms ?? false,
    showSchedule: user?.storeData?.settings?.showSchedule ?? false,
    biography: user?.storeData?.biography || "",
  })

  useEffect(() => {
    if (user?.storeData) {
      setFormData({
        storeName: user.storeData.storeName || "",
        street: user.storeData.address?.street || "",
        street2: user.storeData.address?.street2 || "",
        city: user.storeData.address?.city || "",
        postalCode: user.storeData.address?.postalCode || "",
        country: user.storeData.address?.country || "Ecuador",
        region: user.storeData.address?.region || "",
        phone: user.storeData.phone || "",
        showEmail: user.storeData.settings?.showEmail ?? true,
        showTerms: user.storeData.settings?.showTerms ?? false,
        showSchedule: user.storeData.settings?.showSchedule ?? false,
        biography: user.storeData.biography || "",
      })
      setBannerImage(user.storeData.banner || null)
      setProfileImage(user.storeData.profilePicture || null)
    }
  }, [user])

  const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setBannerImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleProfileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUpdateSettings = async () => {
    setIsUpdating(true)
    try {
      await updateUser({
        storeData: {
          storeName: formData.storeName,
          storeUrl: user?.storeData?.storeUrl || "",
          phone: formData.phone,
          banner: bannerImage || undefined,
          profilePicture: profileImage || undefined,
          address: {
            street: formData.street,
            street2: formData.street2,
            city: formData.city,
            postalCode: formData.postalCode,
            country: formData.country,
            region: formData.region,
          },
          biography: formData.biography,
          settings: {
            showEmail: formData.showEmail,
            showTerms: formData.showTerms,
            showSchedule: formData.showSchedule,
          }
        }
      })
      setShowSuccessModal(true)
    } catch (error) {
      alert("Error al actualizar los ajustes.")
    } finally {
      setIsUpdating(false)
    }
  }

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
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white rounded-2xl shadow-sm">
                <Store className="w-6 h-6 text-orange-500" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Ajustes de tienda</p>
                <h1 className="text-2xl font-black text-[#2D3142] uppercase tracking-tight">Personalización</h1>
              </div>
              <Button
                onClick={handleUpdateSettings}
                className="bg-[#1a1d2e] hover:bg-black text-white px-8 rounded-xl h-12 font-bold transition-all shadow-lg active:scale-95"
                disabled={isUpdating}
              >
                {isUpdating ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Check className="w-4 h-4 mr-2" />}
                Actualizar Ajustes
              </Button>
            </div>

            {/* Banner Image */}
            <div className="group relative overflow-hidden rounded-[32px] bg-white shadow-sm border border-slate-100 transition-all hover:shadow-md">
              <div
                className={cn(
                  "w-full h-72 flex items-center justify-center transition-all relative overflow-hidden",
                  !bannerImage ? "bg-slate-50 border-b-4 border-dashed border-slate-100 m-6 rounded-[24px]" : ""
                )}
              >
                {bannerImage ? (
                  <img src={bannerImage} alt="Banner" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4">
                      <ImageIcon className="w-8 h-8 text-slate-300" />
                    </div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Banner de la tienda</p>
                  </div>
                )}
                <label className="absolute inset-0 cursor-pointer flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-all">
                  <input type="file" className="hidden" accept="image/*" onChange={handleBannerUpload} />
                  <div className="opacity-0 group-hover:opacity-100 bg-white text-black px-6 py-3 rounded-xl font-bold text-xs flex items-center gap-2 transition-all transform translate-y-4 group-hover:translate-y-0">
                    <Upload className="w-4 h-4" />
                    Cargar Banner
                  </div>
                </label>
              </div>
            </div>

            {/* Profile Photo */}
            <div className="flex items-center gap-8 bg-white p-8 rounded-[32px] shadow-sm border border-slate-100">
              <div className="relative group/photo">
                <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden bg-slate-50 flex items-center justify-center">
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <Upload className="w-10 h-10 text-slate-300" />
                  )}
                </div>
                <label className="absolute inset-x-0 bottom-0 top-0 cursor-pointer flex flex-col items-center justify-center bg-black/0 group-hover/photo:bg-black/40 rounded-full transition-all">
                  <input type="file" className="hidden" accept="image/*" onChange={handleProfileUpload} />
                  <Upload className="w-6 h-6 text-white opacity-0 group-hover/photo:opacity-100" />
                  <span className="text-[10px] text-white font-bold uppercase tracking-wider opacity-0 group-hover/photo:opacity-100 mt-1">Cambiar</span>
                </label>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-black text-[#2D3142] uppercase tracking-tight mb-2">Logo de la Tienda</h3>
                <p className="text-xs text-slate-400 font-medium leading-relaxed max-w-sm">
                  Esta imagen aparecerá en los listados de tiendas y en tu perfil público de vendedor. Se recomienda una imagen cuadrada.
                </p>
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

            <Button
              onClick={handleUpdateSettings}
              disabled={isUpdating}
              className="w-full h-16 bg-[#FF6B35] hover:bg-[#e85a2a] text-white font-black uppercase tracking-widest rounded-2xl shadow-lg shadow-orange-100 transition-all active:scale-[0.98] disabled:opacity-50"
            >
              {isUpdating ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Check className="w-5 h-5 mr-2" />}
              Actualizar Los Ajustes
            </Button>
          </div>
        </main>
      </div>

      {/* ── SUCCESS MODAL ────────────────────────────────────────── */}
      <Dialog open={showSuccessModal} onOpenChange={() => setShowSuccessModal(false)}>
        <DialogContent className="max-w-sm p-0 overflow-hidden rounded-[32px] border-0 shadow-2xl">
          <div className="p-8 text-center bg-white">
            <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-green-500">
              <Check size={32} />
            </div>
            <h3 className="text-xl font-black text-[#2D3142] mb-2 uppercase tracking-tight">¡Ajustes Guardados!</h3>
            <p className="text-slate-400 text-xs font-medium mb-8 leading-relaxed">
              La información de tu tienda ha sido actualizada correctamente y los cambios ya son públicos.
            </p>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="w-full py-4 bg-[#FF6B35] hover:bg-[#e85a2a] text-white text-[11px] font-black rounded-xl transition-all uppercase tracking-widest shadow-lg shadow-orange-100"
            >
              ENTENDIDO
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
