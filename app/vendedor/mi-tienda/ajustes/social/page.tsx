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
import { Instagram, Facebook, Twitter, Chrome, Layout } from "lucide-react"

export default function VendedorAjustesSocialPage() {
    const { user, isAuthenticated } = useAuth()
    const router = useRouter()

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
                                <div className="w-10 h-10 bg-[#FF6B35] rounded-lg flex items-center justify-center shadow-lg shadow-orange-100">
                                    <Layout className="w-5 h-5 text-white" />
                                </div>
                                PERFIL SOCIAL
                            </h1>
                            <Button className="bg-[#2D3142] hover:bg-orange-600 font-bold transition-all">Actualizar Perfil</Button>
                        </div>

                        <Card className="border-none shadow-sm rounded-[32px] overflow-hidden">
                            <CardContent className="p-8 space-y-6">
                                <div className="space-y-2">
                                    <Label className="text-xs font-bold uppercase tracking-wider text-slate-400">Facebook</Label>
                                    <div className="relative">
                                        <Facebook className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-600" />
                                        <Input placeholder="https://facebook.com/tu-tienda" className="pl-12 rounded-xl h-12 bg-slate-50 border-slate-100" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-xs font-bold uppercase tracking-wider text-slate-400">Instagram</Label>
                                    <div className="relative">
                                        <Instagram className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-pink-600" />
                                        <Input placeholder="https://instagram.com/tu-tienda" className="pl-12 rounded-xl h-12 bg-slate-50 border-slate-100" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-xs font-bold uppercase tracking-wider text-slate-400">Twitter / X</Label>
                                    <div className="relative">
                                        <Twitter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-sky-500" />
                                        <Input placeholder="https://twitter.com/tu-tienda" className="pl-12 rounded-xl h-12 bg-slate-50 border-slate-100" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-xs font-bold uppercase tracking-wider text-slate-400">Sitio Web Externo</Label>
                                    <div className="relative">
                                        <Chrome className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                        <Input placeholder="https://tutienda.com" className="pl-12 rounded-xl h-12 bg-slate-50 border-slate-100" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="text-center font-medium text-slate-400 text-sm italic">
                            * El perfil social se mostrará públicamente en la página de tu tienda para generar confianza con tus clientes.
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
