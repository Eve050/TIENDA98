"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import VendorSidebar from "@/components/vendor-sidebar"
import Header from "@/components/header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChevronRight, Check, X } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"

export default function VendedorDetallesCuentaPage() {
  const { user, isAuthenticated, updateUser } = useAuth()
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: user?.name.split(" ")[0] || "",
    lastName: user?.name.split(" ").slice(1).join(" ") || "",
    username: user?.email.split("@")[0] || "", // Using email prefix as username for now
    email: user?.email || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [isSaving, setIsSaving] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        firstName: user.name.split(" ")[0] || "",
        lastName: user.name.split(" ").slice(1).join(" ") || "",
        email: user.email || "",
      }))
    }
  }, [user])

  useEffect(() => {
    if (!isAuthenticated || user?.type !== "seller") {
      router.push("/mi-cuenta")
    }
  }, [isAuthenticated, user, router])

  const handleSave = async () => {
    if (!formData.firstName || !formData.email) {
      alert("Por favor, completa los campos obligatorios.")
      return
    }

    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      alert("La nueva contraseña y la confirmación no coinciden.")
      return
    }

    setIsSaving(true)
    try {
      await updateUser({
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
      })
      setShowSuccessModal(true)
    } catch (error) {
      alert("Error al guardar los cambios.")
    } finally {
      setIsSaving(false)
    }
  }

  if (!isAuthenticated || user?.type !== "seller") {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FBFC]">
      <Header />
      <div className="flex flex-1">
        <VendorSidebar />
        <main className="flex-1 p-6 md:p-10">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => router.push("/vendedor/mi-cuenta")}
                className="hover:bg-slate-100"
              >
                <ChevronRight className="rotate-180 w-4 h-4 mr-2" />
                Volver
              </Button>
              <h1 className="text-3xl font-black text-[#2D3142] tracking-tight uppercase">Detalles de la cuenta</h1>
            </div>

            <Card className="border-none shadow-sm rounded-[32px] overflow-hidden">
              <CardContent className="p-8 space-y-8">
                <div className="space-y-4">
                  <h2 className="text-lg font-black text-[#2D3142] uppercase tracking-wider">Información Personal</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="username" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Nombre de usuario</Label>
                      <Input
                        id="username"
                        placeholder="usuario123"
                        className="rounded-xl border-slate-100 bg-slate-50 focus:bg-white transition-all h-12 font-medium"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      {/* Placeholder to maintain grid - or email could go here */}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Nombre</Label>
                      <Input
                        id="firstName"
                        placeholder="Juan"
                        className="rounded-xl border-slate-100 bg-slate-50 focus:bg-white transition-all h-12 font-medium"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Apellido</Label>
                      <Input
                        id="lastName"
                        placeholder="Pérez"
                        className="rounded-xl border-slate-100 bg-slate-50 focus:bg-white transition-all h-12 font-medium"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Correo electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="juan@ejemplo.com"
                    className="rounded-xl border-slate-100 bg-slate-50 focus:bg-white transition-all h-12 font-medium"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="border-t border-slate-100 pt-8 mt-4">
                  <h2 className="text-lg font-black text-[#2D3142] uppercase tracking-wider mb-6">Cambiar contraseña</h2>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Contraseña actual</Label>
                      <Input
                        id="currentPassword"
                        type="password"
                        placeholder="••••••••"
                        className="rounded-xl border-slate-100 bg-slate-50 focus:bg-white transition-all h-12"
                        value={formData.currentPassword}
                        onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="newPassword" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Nueva contraseña</Label>
                        <Input
                          id="newPassword"
                          type="password"
                          placeholder="••••••••"
                          className="rounded-xl border-slate-100 bg-slate-50 focus:bg-white transition-all h-12"
                          value={formData.newPassword}
                          onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Confirmar nueva contraseña</Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          placeholder="••••••••"
                          className="rounded-xl border-slate-100 bg-slate-50 focus:bg-white transition-all h-12"
                          value={formData.confirmPassword}
                          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="w-full h-14 bg-[#FF6B35] hover:bg-[#e85a2a] text-white font-black uppercase tracking-widest rounded-2xl shadow-lg shadow-orange-100 transition-all active:scale-[0.98] disabled:opacity-50"
                >
                  {isSaving ? "Guardando..." : "Guardar cambios"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      {/* ── SUCCESS MODAL ────────────────────────────────────────── */}
      <Dialog open={showSuccessModal} onOpenChange={() => {
        setShowSuccessModal(false)
        router.push("/vendedor/mi-cuenta")
      }}>
        <DialogContent className="max-w-sm p-0 overflow-hidden rounded-[32px] border-0 shadow-2xl">
          <div className="p-8 text-center bg-white">
            <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-green-500">
              <Check size={32} />
            </div>
            <h3 className="text-xl font-black text-[#2D3142] mb-2 uppercase tracking-tight">¡Guardado con éxito!</h3>
            <p className="text-slate-400 text-xs font-medium mb-8 leading-relaxed">
              Tus datos han sido actualizados correctamente. Los cambios ya son visibles en tu perfil.
            </p>
            <button
              onClick={() => {
                setShowSuccessModal(false)
                router.push("/vendedor/mi-cuenta")
              }}
              className="w-full py-4 bg-[#FF6B35] hover:bg-[#e85a2a] text-white text-[11px] font-black rounded-xl transition-all uppercase tracking-widest shadow-lg shadow-orange-100"
            >
              ENTENDIDO
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div >
  )
}
