"use client"

import { useState } from "react"
import {
  Settings,
  Store,
  Globe,
  CreditCard,
  Truck,
  Bell,
  Shield,
  Palette,
  Mail,
  Save,
  Upload,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState("general")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Configuración</h1>
        <p className="text-gray-500">Administra la configuración general de la tienda</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="bg-white border p-1 h-auto flex-wrap">
          <TabsTrigger value="general" className="gap-2 data-[state=active]:bg-orange-500 data-[state=active]:text-white">
            <Store className="w-4 h-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="pagos" className="gap-2 data-[state=active]:bg-orange-500 data-[state=active]:text-white">
            <CreditCard className="w-4 h-4" />
            Pagos
          </TabsTrigger>
          <TabsTrigger value="envios" className="gap-2 data-[state=active]:bg-orange-500 data-[state=active]:text-white">
            <Truck className="w-4 h-4" />
            Envíos
          </TabsTrigger>
          <TabsTrigger value="notificaciones" className="gap-2 data-[state=active]:bg-orange-500 data-[state=active]:text-white">
            <Bell className="w-4 h-4" />
            Notificaciones
          </TabsTrigger>
          <TabsTrigger value="seguridad" className="gap-2 data-[state=active]:bg-orange-500 data-[state=active]:text-white">
            <Shield className="w-4 h-4" />
            Seguridad
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Información de la Tienda</CardTitle>
              <CardDescription>Configura la información básica de tu tienda</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Nombre de la tienda</Label>
                  <Input defaultValue="Tienda98" />
                </div>
                <div className="space-y-2">
                  <Label>Email de contacto</Label>
                  <Input type="email" defaultValue="contacto@tienda98.com" />
                </div>
                <div className="space-y-2">
                  <Label>Teléfono</Label>
                  <Input defaultValue="+593 98 123 4567" />
                </div>
                <div className="space-y-2">
                  <Label>WhatsApp</Label>
                  <Input defaultValue="+593 98 123 4567" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Dirección</Label>
                  <Input defaultValue="Quito, Ecuador" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Descripción de la tienda</Label>
                  <Textarea
                    rows={3}
                    defaultValue="Tu tienda online de confianza en Ecuador. Productos de calidad con envío a todo el país."
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button className="bg-orange-500 hover:bg-orange-600 gap-2">
                  <Save className="w-4 h-4" />
                  Guardar Cambios
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Logo y Branding</CardTitle>
              <CardDescription>Personaliza la apariencia de tu tienda</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Logo</Label>
                  <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">Arrastra o haz clic para subir</p>
                    <p className="text-xs text-gray-400 mt-1">PNG, JPG hasta 2MB</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Favicon</Label>
                  <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">Arrastra o haz clic para subir</p>
                    <p className="text-xs text-gray-400 mt-1">ICO, PNG 32x32px</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label>Color primario</Label>
                  <div className="flex gap-2">
                    <Input type="color" defaultValue="#f97316" className="w-12 h-10 p-1" />
                    <Input defaultValue="#f97316" className="flex-1" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Color secundario</Label>
                  <div className="flex gap-2">
                    <Input type="color" defaultValue="#1f2937" className="w-12 h-10 p-1" />
                    <Input defaultValue="#1f2937" className="flex-1" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Color de acento</Label>
                  <div className="flex gap-2">
                    <Input type="color" defaultValue="#10b981" className="w-12 h-10 p-1" />
                    <Input defaultValue="#10b981" className="flex-1" />
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <Button className="bg-orange-500 hover:bg-orange-600 gap-2">
                  <Save className="w-4 h-4" />
                  Guardar Cambios
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Configuración Regional</CardTitle>
              <CardDescription>Define la moneda, idioma y formato de fecha</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label>Moneda</Label>
                  <Select defaultValue="usd">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usd">USD - Dólar estadounidense</SelectItem>
                      <SelectItem value="eur">EUR - Euro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Idioma</Label>
                  <Select defaultValue="es">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Zona horaria</Label>
                  <Select defaultValue="america_guayaquil">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="america_guayaquil">America/Guayaquil (UTC-5)</SelectItem>
                      <SelectItem value="america_bogota">America/Bogota (UTC-5)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end">
                <Button className="bg-orange-500 hover:bg-orange-600 gap-2">
                  <Save className="w-4 h-4" />
                  Guardar Cambios
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment Settings */}
        <TabsContent value="pagos" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Métodos de Pago</CardTitle>
              <CardDescription>Configura los métodos de pago disponibles</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { name: "Transferencia Bancaria", enabled: true, icon: "🏦" },
                { name: "PayPhone", enabled: true, icon: "📱" },
                { name: "Tarjeta de Crédito/Débito", enabled: true, icon: "💳" },
                { name: "PayPal", enabled: false, icon: "🅿️" },
                { name: "Pago contra entrega", enabled: true, icon: "💵" },
              ].map((method) => (
                <div key={method.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{method.icon}</span>
                    <div>
                      <p className="font-medium">{method.name}</p>
                      <p className="text-sm text-gray-500">
                        {method.enabled ? "Habilitado" : "Deshabilitado"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Button variant="outline" size="sm">Configurar</Button>
                    <Switch defaultChecked={method.enabled} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Comisiones de Vendedores</CardTitle>
              <CardDescription>Define las comisiones por defecto para vendedores</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Comisión por defecto (%)</Label>
                  <Input type="number" defaultValue="5" />
                </div>
                <div className="space-y-2">
                  <Label>Monto mínimo de retiro</Label>
                  <Input type="number" defaultValue="20" />
                </div>
              </div>
              <div className="flex justify-end">
                <Button className="bg-orange-500 hover:bg-orange-600 gap-2">
                  <Save className="w-4 h-4" />
                  Guardar Cambios
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Shipping Settings */}
        <TabsContent value="envios" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Zonas de Envío</CardTitle>
              <CardDescription>Configura las zonas y tarifas de envío</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { zone: "Quito", price: 3.00, time: "1-2 días" },
                { zone: "Guayaquil", price: 5.00, time: "2-3 días" },
                { zone: "Costa", price: 6.00, time: "3-4 días" },
                { zone: "Sierra", price: 5.00, time: "2-3 días" },
                { zone: "Oriente", price: 8.00, time: "4-5 días" },
              ].map((zone) => (
                <div key={zone.zone} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{zone.zone}</p>
                    <p className="text-sm text-gray-500">Tiempo estimado: {zone.time}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-medium">${zone.price.toFixed(2)}</span>
                    <Button variant="outline" size="sm">Editar</Button>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full bg-transparent">+ Añadir zona de envío</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Envío Gratis</CardTitle>
              <CardDescription>Configura las condiciones para envío gratuito</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Habilitar envío gratis</p>
                  <p className="text-sm text-gray-500">Ofrecer envío gratis según condiciones</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="space-y-2">
                <Label>Monto mínimo para envío gratis</Label>
                <Input type="number" defaultValue="50" />
              </div>
              <div className="flex justify-end">
                <Button className="bg-orange-500 hover:bg-orange-600 gap-2">
                  <Save className="w-4 h-4" />
                  Guardar Cambios
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Settings */}
        <TabsContent value="notificaciones" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notificaciones por Email</CardTitle>
              <CardDescription>Configura qué emails enviar automáticamente</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { name: "Nuevo pedido", description: "Notificar al admin cuando hay un nuevo pedido", enabled: true },
                { name: "Pedido completado", description: "Notificar al cliente cuando su pedido está listo", enabled: true },
                { name: "Pedido enviado", description: "Notificar al cliente cuando su pedido fue enviado", enabled: true },
                { name: "Nuevo usuario", description: "Notificar al admin cuando hay un nuevo registro", enabled: false },
                { name: "Nuevo vendedor", description: "Notificar al admin sobre solicitudes de vendedor", enabled: true },
                { name: "Stock bajo", description: "Alertar cuando un producto tiene stock bajo", enabled: true },
              ].map((notification) => (
                <div key={notification.name} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{notification.name}</p>
                    <p className="text-sm text-gray-500">{notification.description}</p>
                  </div>
                  <Switch defaultChecked={notification.enabled} />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Plantillas de Email</CardTitle>
              <CardDescription>Personaliza las plantillas de email</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Bienvenida",
                  "Confirmación de pedido",
                  "Pedido enviado",
                  "Restablecer contraseña",
                  "Aprobación de vendedor",
                  "Rechazo de vendedor",
                ].map((template) => (
                  <Button key={template} variant="outline" className="justify-between bg-transparent">
                    {template}
                    <Mail className="w-4 h-4" />
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="seguridad" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Seguridad de la Cuenta</CardTitle>
              <CardDescription>Configura las opciones de seguridad</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Autenticación de dos factores</p>
                  <p className="text-sm text-gray-500">Requiere verificación adicional al iniciar sesión</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Bloqueo por intentos fallidos</p>
                  <p className="text-sm text-gray-500">Bloquea la cuenta después de 5 intentos fallidos</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Notificar inicio de sesión sospechoso</p>
                  <p className="text-sm text-gray-500">Envía email cuando se detecta actividad inusual</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cambiar Contraseña</CardTitle>
              <CardDescription>Actualiza la contraseña de administrador</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Contraseña actual</Label>
                <Input type="password" />
              </div>
              <div className="space-y-2">
                <Label>Nueva contraseña</Label>
                <Input type="password" />
              </div>
              <div className="space-y-2">
                <Label>Confirmar nueva contraseña</Label>
                <Input type="password" />
              </div>
              <div className="flex justify-end">
                <Button className="bg-orange-500 hover:bg-orange-600">
                  Cambiar Contraseña
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
