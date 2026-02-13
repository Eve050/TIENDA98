"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import VendorSidebar from "@/components/vendor-sidebar"
import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <VendorSidebar />
        <main className="flex-1 bg-gray-50 p-8">
          <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold">Retirada</h1>

            {/* Balance Section */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Saldo</h2>
                    <div className="space-y-2">
                      <div className="flex items-baseline gap-2">
                        <span className="text-sm text-gray-600">Tu saldo:</span>
                        <span className="text-2xl font-bold">$0.00</span>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-sm text-gray-600">Minimum Withdraw Amount:</span>
                        <span className="text-lg font-semibold">$20.00</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => setIsWithdrawalOpen(true)}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6"
                  >
                    Solicitar Retirada
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Last Payment Details */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Detalles del pago</h2>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-600">Último pago</p>
                      <div className="flex items-baseline gap-2">
                        <span className="font-semibold text-lg">$28.50</span>
                        <span className="text-sm text-gray-600">on</span>
                        <span className="text-sm italic text-gray-500">septiembre 13, 2023</span>
                        <span className="text-sm text-gray-600">to</span>
                        <span className="text-sm font-medium">Transferencia bancaria</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => setIsPaymentHistoryOpen(true)}
                    variant="outline"
                    className="border-purple-600 text-purple-600 hover:bg-purple-50 bg-transparent"
                  >
                    Ver Los Pagos
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Métodos de pago</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">Transferencia bancaria</p>
                      <p className="text-sm text-gray-600">
                        Los fondos se transfieren directamente a tu cuenta bancaria. Por favor configura los detalles de
                        tu cuenta bancaria en la sección de ajustes de pago.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      <Dialog open={isWithdrawalOpen} onOpenChange={setIsWithdrawalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Solicitar Retirada</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="bg-blue-50 border border-blue-200 rounded p-3 text-sm text-blue-800">
              <p>
                <strong>Saldo disponible:</strong> $0.00
              </p>
              <p>
                <strong>Mínimo para retirar:</strong> $20.00
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="withdraw-amount">Monto a retirar *</Label>
              <Input id="withdraw-amount" type="number" placeholder="0.00" min="20" step="0.01" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="withdraw-method">Método de pago *</Label>
              <Select defaultValue="bank-transfer">
                <SelectTrigger id="withdraw-method">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bank-transfer">Transferencia bancaria</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded p-3 text-sm text-yellow-800">
              <p>Tu saldo actual ($0.00) es menor que el monto mínimo de retiro ($20.00).</p>
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                className="flex-1 bg-purple-600 hover:bg-purple-700"
                onClick={() => {
                  alert("Solicitud de retirada enviada")
                  setIsWithdrawalOpen(false)
                }}
              >
                Solicitar Retirada
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setIsWithdrawalOpen(false)}>
                Cancelar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isPaymentHistoryOpen} onOpenChange={setIsPaymentHistoryOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Historial de Pagos</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="bg-white rounded-lg border overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold">ID</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">MONTO</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">FECHA</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">MÉTODO</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">ESTADO</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentHistory.map((payment) => (
                    <tr key={payment.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-4 text-sm">#{payment.id}</td>
                      <td className="px-4 py-4 text-sm font-semibold">{payment.amount}</td>
                      <td className="px-4 py-4 text-sm">{payment.date}</td>
                      <td className="px-4 py-4 text-sm">{payment.method}</td>
                      <td className="px-4 py-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {payment.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex justify-end">
              <Button variant="outline" onClick={() => setIsPaymentHistoryOpen(false)}>
                Cerrar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
