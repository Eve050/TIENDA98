"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function RegistroPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [userType, setUserType] = useState<"customer" | "seller">("customer")
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden")
      return
    }
    setLoading(true)
    try {
      await register(name, email, password, userType)
      router.push("/")
    } catch (error) {
      console.error("Registration error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-secondary/30 py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center">Crear Cuenta</CardTitle>
              <CardDescription className="text-center">Únete a TIENDA98 y empieza a comprar o vender</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre Completo</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Juan Pérez"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>

                <div className="space-y-3">
                  <Label>Tipo de Cuenta</Label>
                  <RadioGroup value={userType} onValueChange={(value) => setUserType(value as "customer" | "seller")}>
                    <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-orange-50 hover:border-orange-500 transition-colors">
                      <RadioGroupItem
                        value="customer"
                        id="customer"
                        className="data-[state=checked]:border-orange-500 data-[state=checked]:bg-orange-500"
                      />
                      <Label htmlFor="customer" className="flex-1 cursor-pointer">
                        <div>
                          <p className="font-semibold">Comprador</p>
                          <p className="text-sm text-muted-foreground">Quiero comprar productos</p>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-orange-50 hover:border-orange-500 transition-colors">
                      <RadioGroupItem
                        value="seller"
                        id="seller"
                        className="data-[state=checked]:border-orange-500 data-[state=checked]:bg-orange-500"
                      />
                      <Label htmlFor="seller" className="flex-1 cursor-pointer">
                        <div>
                          <p className="font-semibold">Vendedor</p>
                          <p className="text-sm text-muted-foreground">
                            Quiero vender mis productos (Membresía $1/mes)
                          </p>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                  size="lg"
                  disabled={loading}
                >
                  {loading ? "Creando cuenta..." : "Crear Cuenta"}
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                  ¿Ya tienes cuenta?{" "}
                  <a href="/" className="text-orange-500 hover:underline">
                    Inicia sesión aquí
                  </a>
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
