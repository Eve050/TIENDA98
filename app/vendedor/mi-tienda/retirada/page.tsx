"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import VendorSidebar from "@/components/vendor-sidebar"
import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DollarSign, History, ArrowUpRight, TrendingUp, Landmark, ShieldCheck, ChevronRight, Download, RefreshCcw, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function VendedorRetiradaPage() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const [isWithdrawalOpen, setIsWithdrawalOpen] = useState(false)
  const [isPaymentHistoryOpen, setIsPaymentHistoryOpen] = useState(false)

  useEffect(() => {
    if (!isAuthenticated || user?.type !== "seller") {
      router.push("/mi-cuenta")
    }
  }, [isAuthenticated, user, router])

  if (!isAuthenticated || user?.type !== "seller") {
    return null
  }

  const paymentHistory = [
    {
      id: 1,
      amount: "$28.50",
      date: "septiembre 13, 2023",
      method: "Transferencia bancaria",
      status: "Completado",
    },
    {
      id: 2,
      amount: "$45.00",
      date: "agosto 20, 2023",
      method: "Transferencia bancaria",
      status: "Completado",
    },
    {
      id: 3,
      amount: "$120.75",
      date: "julio 15, 2023",
      method: "Transferencia bancaria",
      status: "Completado",
    },
  ]

  const currentBalance = "$0.00"
  const minWithdraw = "$20.00"

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FBFC]">
      <Header />
      <div className="flex flex-1">
        <VendorSidebar />
        <main className="flex-1 p-6 md:p-10">
          <div className="max-w-5xl mx-auto space-y-10">
            {/* Header section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h1 className="text-3xl font-black text-[#2D3142] tracking-tight uppercase">SISTEMA DE RETIRADA</h1>
                <p className="text-slate-400 font-medium font-outfit">Gestiona tus ingresos y solicita tus pagos</p>
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={() => setIsPaymentHistoryOpen(true)}
                  className="bg-white text-[#2D3142] border border-slate-100 hover:bg-slate-50 font-black px-6 py-6 rounded-2xl shadow-sm transition-all active:scale-95"
                >
                  <History className="w-4 h-4 mr-2" />
                  Historial
                </Button>
                <Button className="bg-[#2D3142] hover:bg-black text-white font-black px-8 py-6 rounded-2xl shadow-lg shadow-slate-200 transition-all active:scale-95">
                  <RefreshCcw className="w-4 h-4 mr-2" />
                  Sincronizar
                </Button>
              </div>
            </div>

            {/* Main Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-8">
              {/* Left Column: Balance & Stats */}
              <div className="space-y-8">
                <Card className="border-none shadow-2xl rounded-[40px] bg-[#2D3142] text-white overflow-hidden relative group">
                  <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-110 transition-transform duration-700">
                    <DollarSign className="w-48 h-48" />
                  </div>
                  <CardContent className="p-12 relative z-10">
                    <div className="space-y-10">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-400 mb-2">SALDO DISPONIBLE</p>
                          <h2 className="text-6xl font-black tracking-tighter">$0.00</h2>
                        </div>
                        <div className="w-16 h-16 rounded-3xl bg-white/10 backdrop-blur-md flex items-center justify-center">
                          <TrendingUp className="w-8 h-8 text-orange-400" />
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-10 border-t border-white/10 pt-10">
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Mínimo Retiro</p>
                          <p className="text-xl font-black">$20.00</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Comisión Red</p>
                          <p className="text-xl font-black text-orange-400">0%</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Tiempo de Pago</p>
                          <p className="text-xl font-black">24h - 48h</p>
                        </div>
                      </div>

                      <Button
                        onClick={() => setIsWithdrawalOpen(true)}
                        className="w-full bg-orange-500 hover:bg-orange-600 text-[#2D3142] font-black text-sm uppercase tracking-widest py-8 rounded-[24px] shadow-xl shadow-orange-500/20 active:scale-95 transition-all"
                      >
                        SOLICITAR RETIRADA
                        <ArrowUpRight className="w-5 h-5 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-none shadow-sm rounded-[32px] bg-white p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center">
                        <Landmark className="w-6 h-6 text-[#2D3142]" />
                      </div>
                      <h3 className="font-black text-[#2D3142] text-sm uppercase tracking-tighter">Método de cobro</h3>
                    </div>
                    <p className="text-xs font-bold text-slate-500 leading-relaxed">Transferencia Bancaria Directa</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Configurado correctamente</p>
                  </Card>
                  <Card className="border-none shadow-sm rounded-[32px] bg-white p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center">
                        <ShieldCheck className="w-6 h-6 text-orange-600" />
                      </div>
                      <h3 className="font-black text-[#2D3142] text-sm uppercase tracking-tighter">Seguridad</h3>
                    </div>
                    <p className="text-xs font-bold text-slate-500 leading-relaxed">Verificación Biométrica</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Activa y protegida</p>
                  </Card>
                </div>
              </div>

              {/* Right Column: Last Payment */}
              <div className="space-y-8">
                <Card className="border-none shadow-sm rounded-[40px] bg-white overflow-hidden h-full flex flex-col">
                  <div className="p-10 border-b border-slate-50">
                    <h3 className="text-lg font-black text-[#2D3142] uppercase tracking-tighter">ÚLTIMO PAGO</h3>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Detalle del desembolso reciente</p>
                  </div>
                  <CardContent className="p-10 flex-1 flex flex-col justify-between space-y-10">
                    <div className="space-y-6">
                      <div className="flex justify-between items-center bg-slate-50 p-6 rounded-[24px]">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Monto</span>
                        <span className="text-2xl font-black text-[#2D3142]">$28.50</span>
                      </div>
                      <div className="space-y-4 px-2">
                        <div className="flex justify-between items-center text-xs font-bold px-2">
                          <span className="text-slate-400 uppercase tracking-widest">Fecha</span>
                          <span className="text-slate-600">13 Sep, 2023</span>
                        </div>
                        <div className="flex justify-between items-center text-xs font-bold px-2">
                          <span className="text-slate-400 uppercase tracking-widest">Método</span>
                          <span className="text-slate-600">Banco Pichincha</span>
                        </div>
                        <div className="flex justify-between items-center text-xs font-bold px-2">
                          <span className="text-slate-400 uppercase tracking-widest">Estado</span>
                          <Badge className="bg-green-100 text-green-600 border-none px-3 py-0.5 text-[9px] font-black uppercase">Completado</Badge>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => setIsPaymentHistoryOpen(true)}
                      className="w-full border-2 border-slate-100 bg-transparent text-[#2D3142] font-black text-xs uppercase tracking-widest py-8 rounded-[24px] hover:bg-slate-50 transition-all border-dashed"
                    >
                      VER TODO EL HISTORIAL
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>

      <Dialog open={isWithdrawalOpen} onOpenChange={setIsWithdrawalOpen}>
        <DialogContent className="max-w-md border-none rounded-[40px] p-0 overflow-hidden shadow-2xl">
          <div className="bg-[#2D3142] p-8 text-white relative">
            <h2 className="text-xl font-black uppercase tracking-tight">SOLICITAR RETIRADA</h2>
            <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mt-1">Transfiere tus fondos a tu cuenta</p>
            <button
              onClick={() => setIsWithdrawalOpen(false)}
              className="absolute top-8 right-8 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-8 space-y-6 bg-white">
            <div className="bg-slate-50 border border-slate-100 rounded-[24px] p-6 flex justify-between items-center">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Disponible</p>
                <p className="text-2xl font-black text-[#2D3142]">{currentBalance}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Mínimo</p>
                <p className="font-black text-[#2D3142]">{minWithdraw}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2 px-1">
                <Label htmlFor="withdraw-amount" className="text-[10px] font-black text-[#2D3142] uppercase tracking-widest">Monto a retirar *</Label>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    id="withdraw-amount"
                    type="number"
                    placeholder="0.00"
                    min="20"
                    step="0.01"
                    className="pl-10 h-14 rounded-2xl bg-slate-50 border-slate-100 focus:ring-[#2D3142] font-bold"
                  />
                </div>
              </div>

              <div className="space-y-2 px-1">
                <Label htmlFor="withdraw-method" className="text-[10px] font-black text-[#2D3142] uppercase tracking-widest">Método de pago *</Label>
                <Select defaultValue="bank-transfer">
                  <SelectTrigger id="withdraw-method" className="h-14 rounded-2xl bg-slate-50 border-slate-100 focus:ring-[#2D3142] font-bold text-xs uppercase">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl border-none shadow-xl">
                    <SelectItem value="bank-transfer">Transferencia Bancaria Directa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="bg-orange-50 border-l-4 border-orange-500 rounded-r-[24px] p-5">
              <p className="text-xs font-bold text-orange-800 leading-relaxed">
                Tu saldo actual ({currentBalance}) es menor que el monto mínimo de retiro ({minWithdraw}).
              </p>
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                className="flex-1 bg-[#2D3142] hover:bg-black text-white font-black py-8 rounded-[24px] transition-all active:scale-95 shadow-lg shadow-slate-200 uppercase tracking-widest text-xs"
                onClick={() => {
                  alert("Solicitud de retirada enviada")
                  setIsWithdrawalOpen(false)
                }}
              >
                CONFIRMAR
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-2 border-slate-100 bg-transparent text-[#2D3142] font-black py-8 rounded-[24px] hover:bg-slate-50 transition-all uppercase tracking-widest text-xs"
                onClick={() => setIsWithdrawalOpen(false)}
              >
                CANCELAR
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isPaymentHistoryOpen} onOpenChange={setIsPaymentHistoryOpen}>
        <DialogContent className="max-w-[1000px] w-[95vw] h-[80vh] overflow-hidden flex flex-col p-0 border-none rounded-[40px] shadow-2xl">
          <DialogHeader className="px-10 py-8 border-b border-slate-50">
            <DialogTitle className="text-2xl font-black text-[#2D3142] uppercase tracking-tight">HISTORIAL DE PAGOS</DialogTitle>
            <p className="text-slate-400 font-bold text-xs uppercase mt-1 tracking-widest">Registro histórico de desembolsos realizados</p>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto px-10 py-8 custom-scrollbar">
            <div className="bg-white rounded-[32px] border border-slate-50 overflow-hidden shadow-sm">
              <table className="w-full text-left">
                <thead className="bg-slate-50/50">
                  <tr>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-[#2D3142]">ID</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-[#2D3142]">Monto</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-[#2D3142]">Fecha</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-[#2D3142]">Método</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-[#2D3142] text-center">Estado</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-[#2D3142] text-right">Comprobante</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {paymentHistory.map((payment) => (
                    <tr key={payment.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-8 py-5 font-black text-[#2D3142] text-sm">#{payment.id}</td>
                      <td className="px-8 py-5 font-black text-lg text-orange-600">{payment.amount}</td>
                      <td className="px-8 py-5 font-bold text-slate-500 text-sm">{payment.date}</td>
                      <td className="px-8 py-5 font-bold text-[#2D3142] text-sm">{payment.method}</td>
                      <td className="px-8 py-5 text-center">
                        <Badge className="bg-green-100 text-green-600 border-none px-4 py-1 text-[10px] font-black uppercase">
                          {payment.status}
                        </Badge>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <button className="p-2 bg-slate-50 text-slate-400 hover:text-[#2D3142] rounded-xl transition-all">
                          <Download className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-10 flex justify-end">
              <Button
                onClick={() => setIsPaymentHistoryOpen(false)}
                className="bg-[#2D3142] hover:bg-black text-white font-black px-10 py-6 rounded-2xl shadow-lg transition-all active:scale-95 uppercase tracking-widest text-xs"
              >
                Cerrar Ventana
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
