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
import { DollarSign, CreditCard } from "lucide-react"

export default function VendedorAjustesPagoPage() {
    const { user, isAuthenticated } = useAuth()
    const router = useRouter()
    const [formData, setFormData] = useState({
        method: "bank_transfer",
        bankName: "",
        accountNumber: "",
        accountName: "",
        paypalEmail: "",
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
        <div className="min-h-screen flex flex-col bg-[#F9FBFC]">
            <Header />
            <div className="flex flex-1">
                <VendorSidebar />
                <main className="flex-1 p-6 md:p-10">
                    <div className="max-w-4xl mx-auto space-y-8">
                        <div className="flex items-center justify-between">
                            <h1 className="text-2xl font-black text-[#2D3142] uppercase tracking-tight flex items-center gap-2">
                                <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center shadow-lg shadow-orange-100">
                                    <CreditCard className="w-5 h-5 text-white" />
                                </div>
                                AJUSTES DE PAGO
                            </h1>
                            <Button className="bg-[#2D3142] hover:bg-orange-600 font-bold transition-all">Guardar Cambios</Button>
                        </div>

                        <Card className="border-none shadow-sm rounded-[32px] overflow-hidden">
                            <CardContent className="p-8 space-y-8">
                                <div className="space-y-4">
                                    <h3 className="text-lg font-bold text-[#2D3142]">Método de retiro preferido</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <button
                                            onClick={() => setFormData({ ...formData, method: 'bank_transfer' })}
                                            className={`p-4 rounded-2xl border-2 transition-all text-left ${formData.method === 'bank_transfer' ? 'border-orange-500 bg-orange-50' : 'border-slate-100 hover:border-slate-200'}`}
                                        >
                                            <p className="font-bold text-sm mb-1">Transferencia Bancaria</p>
                                            <p className="text-[10px] text-slate-500">Recibe fondos directamente en tu cuenta.</p>
                                        </button>
                                        <button
                                            onClick={() => setFormData({ ...formData, method: 'paypal' })}
                                            className={`p-4 rounded-2xl border-2 transition-all text-left ${formData.method === 'paypal' ? 'border-orange-500 bg-orange-50' : 'border-slate-100 hover:border-slate-200'}`}
                                        >
                                            <p className="font-bold text-sm mb-1">PayPal</p>
                                            <p className="text-[10px] text-slate-500">Transferencia rápida a tu cuenta de PayPal.</p>
                                        </button>
                                    </div>
                                </div>

                                {formData.method === 'bank_transfer' ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-top-2 duration-300">
                                        <div className="space-y-2">
                                            <Label className="text-xs font-bold uppercase tracking-wider text-slate-400">Nombre del Banco</Label>
                                            <Input placeholder="Ej. Banco Pichincha" className="rounded-xl h-12" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-xs font-bold uppercase tracking-wider text-slate-400">Tipo de Cuenta</Label>
                                            <Input placeholder="Ahorros / Corriente" className="rounded-xl h-12" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-xs font-bold uppercase tracking-wider text-slate-400">Número de Cuenta</Label>
                                            <Input placeholder="0000000000" className="rounded-xl h-12" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-xs font-bold uppercase tracking-wider text-slate-400">Nombre del Titular</Label>
                                            <Input placeholder="Nombre Completo" className="rounded-xl h-12" />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                                        <Label className="text-xs font-bold uppercase tracking-wider text-slate-400">Email de PayPal</Label>
                                        <Input type="email" placeholder="tu@email.com" className="rounded-xl h-12" />
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
                            <div className="flex gap-4">
                                <DollarSign className="w-6 h-6 text-orange-500 shrink-0" />
                                <p className="text-sm text-orange-800 leading-relaxed font-medium">
                                    Los fondos se procesan dentro de las <span className="font-black">24-48 horas</span> hábiles posteriores a la solicitud de retiro. Asegúrate de que los datos bancarios sean correctos para evitar demoras.
                                </p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
