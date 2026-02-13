"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  ShoppingBag,
  CreditCard,
  Truck,
  Shield,
  Lock,
  ChevronRight,
  Check,
  MapPin,
  Clock,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function CheckoutPage() {
  const { items, total, itemCount, clearCart } = useCart()
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [orderPlaced, setOrderPlaced] = useState(false)

  const [shipping, setShipping] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
    notes: "",
  })

  const [payment, setPayment] = useState({
    method: "card" as "card" | "transfer" | "cash",
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  })

  const shippingCost = total >= 50 ? 0 : 5.99
  const tax = total * 0.12
  const grandTotal = total + shippingCost + tax

  const handleShippingChange = (field: string, value: string) => {
    setShipping((prev) => ({ ...prev, [field]: value }))
  }

  const handlePaymentChange = (field: string, value: string) => {
    setPayment((prev) => ({ ...prev, [field]: value }))
  }

  const isShippingValid =
    shipping.firstName &&
    shipping.lastName &&
    shipping.email &&
    shipping.phone &&
    shipping.address &&
    shipping.city &&
    shipping.province

  const isPaymentValid =
    payment.method === "cash" ||
    payment.method === "transfer" ||
    (payment.cardNumber && payment.cardName && payment.expiry && payment.cvv)

  const handlePlaceOrder = () => {
    setOrderPlaced(true)
    clearCart()
  }

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center py-12">
          <div className="text-center max-w-md px-4">
            <ShoppingBag className="w-20 h-20 mx-auto text-gray-300 mb-6" />
            <h1 className="text-2xl font-bold text-foreground mb-3">Tu carrito esta vacio</h1>
            <p className="text-gray-500 mb-6">Agrega productos antes de proceder al pago</p>
            <Link href="/productos">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">Ver productos</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center py-12">
          <div className="text-center max-w-lg px-4">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-3">Pedido realizado con exito</h1>
            <p className="text-gray-500 mb-2">Tu numero de pedido es:</p>
            <p className="text-2xl font-bold text-orange-500 mb-6">
              #TDA-{Math.floor(Math.random() * 900000 + 100000)}
            </p>
            <div className="bg-gray-50 rounded-xl p-5 mb-6 text-left space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Truck className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <span className="text-gray-700">Tiempo estimado de entrega: 2-5 dias habiles</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <span className="text-gray-700">Recibirás un correo con los detalles del envio</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Clock className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <span className="text-gray-700">Puedes rastrear tu pedido desde tu cuenta</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/productos">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white w-full sm:w-auto">Seguir comprando</Button>
              </Link>
              <Link href="/rastrear-pedido">
                <Button variant="outline" className="bg-transparent border-orange-500 text-orange-500 hover:bg-orange-50 w-full sm:w-auto">
                  Rastrear pedido
                </Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-6 md:py-8 lg:px-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-orange-500 transition-colors">Inicio</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/carrito" className="hover:text-orange-500 transition-colors">Carrito</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-foreground font-medium">Checkout</span>
          </nav>

          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Finalizar compra</h1>

          {/* Steps indicator */}
          <div className="flex items-center gap-2 mb-8">
            {[
              { num: 1, label: "Envio" },
              { num: 2, label: "Pago" },
              { num: 3, label: "Confirmar" },
            ].map((s) => (
              <div key={s.num} className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (s.num < step) setStep(s.num)
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    step === s.num
                      ? "bg-orange-500 text-white"
                      : step > s.num
                        ? "bg-green-100 text-green-700 cursor-pointer"
                        : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {step > s.num ? <Check className="w-4 h-4" /> : <span>{s.num}</span>}
                  <span className="hidden sm:inline">{s.label}</span>
                </button>
                {s.num < 3 && <ChevronRight className="w-4 h-4 text-gray-300" />}
              </div>
            ))}
          </div>

          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Left - Form */}
            <div className="lg:flex-1">
              {/* Step 1: Shipping */}
              {step === 1 && (
                <div className="bg-white rounded-xl border border-gray-200 p-5 md:p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <Truck className="w-5 h-5 text-orange-500" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-foreground">Informacion de envio</h2>
                      <p className="text-sm text-gray-500">Ingresa los datos para la entrega</p>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="firstName" className="text-sm font-medium text-foreground">Nombre *</Label>
                      <Input
                        id="firstName"
                        placeholder="Juan"
                        value={shipping.firstName}
                        onChange={(e) => handleShippingChange("firstName", e.target.value)}
                        className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="lastName" className="text-sm font-medium text-foreground">Apellido *</Label>
                      <Input
                        id="lastName"
                        placeholder="Perez"
                        value={shipping.lastName}
                        onChange={(e) => handleShippingChange("lastName", e.target.value)}
                        className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="email" className="text-sm font-medium text-foreground">Correo electronico *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="juan@correo.com"
                        value={shipping.email}
                        onChange={(e) => handleShippingChange("email", e.target.value)}
                        className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="phone" className="text-sm font-medium text-foreground">Telefono *</Label>
                      <Input
                        id="phone"
                        placeholder="09X XXX XXXX"
                        value={shipping.phone}
                        onChange={(e) => handleShippingChange("phone", e.target.value)}
                        className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                      />
                    </div>
                    <div className="space-y-1.5 sm:col-span-2">
                      <Label htmlFor="address" className="text-sm font-medium text-foreground">Direccion *</Label>
                      <Input
                        id="address"
                        placeholder="Calle principal y secundaria, numero"
                        value={shipping.address}
                        onChange={(e) => handleShippingChange("address", e.target.value)}
                        className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="city" className="text-sm font-medium text-foreground">Ciudad *</Label>
                      <Input
                        id="city"
                        placeholder="Quito"
                        value={shipping.city}
                        onChange={(e) => handleShippingChange("city", e.target.value)}
                        className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="province" className="text-sm font-medium text-foreground">Provincia *</Label>
                      <Input
                        id="province"
                        placeholder="Pichincha"
                        value={shipping.province}
                        onChange={(e) => handleShippingChange("province", e.target.value)}
                        className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="postalCode" className="text-sm font-medium text-foreground">Codigo postal</Label>
                      <Input
                        id="postalCode"
                        placeholder="170150"
                        value={shipping.postalCode}
                        onChange={(e) => handleShippingChange("postalCode", e.target.value)}
                        className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="notes" className="text-sm font-medium text-foreground">Referencia</Label>
                      <Input
                        id="notes"
                        placeholder="Cerca de..."
                        value={shipping.notes}
                        onChange={(e) => handleShippingChange("notes", e.target.value)}
                        className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                      />
                    </div>
                  </div>

                  <Button
                    onClick={() => setStep(2)}
                    disabled={!isShippingValid}
                    className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white h-11 text-sm font-semibold rounded-lg disabled:opacity-50"
                  >
                    Continuar al pago
                  </Button>
                </div>
              )}

              {/* Step 2: Payment */}
              {step === 2 && (
                <div className="bg-white rounded-xl border border-gray-200 p-5 md:p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-orange-500" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-foreground">Metodo de pago</h2>
                      <p className="text-sm text-gray-500">Selecciona como deseas pagar</p>
                    </div>
                  </div>

                  {/* Payment method selection */}
                  <div className="space-y-3 mb-6">
                    {[
                      { key: "card" as const, label: "Tarjeta de credito / debito", desc: "Visa, Mastercard, American Express", icon: CreditCard },
                      { key: "transfer" as const, label: "Transferencia bancaria", desc: "Banco Pichincha, Guayaquil, Pacifico", icon: MapPin },
                      { key: "cash" as const, label: "Pago contra entrega", desc: "Paga en efectivo al recibir tu pedido", icon: ShoppingBag },
                    ].map((m) => (
                      <button
                        key={m.key}
                        onClick={() => handlePaymentChange("method", m.key)}
                        className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all ${
                          payment.method === m.key
                            ? "border-orange-500 bg-orange-50"
                            : "border-gray-200 hover:border-orange-300"
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                          payment.method === m.key ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-500"
                        }`}>
                          <m.icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-foreground">{m.label}</p>
                          <p className="text-xs text-gray-500">{m.desc}</p>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                          payment.method === m.key ? "border-orange-500" : "border-gray-300"
                        }`}>
                          {payment.method === m.key && <div className="w-2.5 h-2.5 bg-orange-500 rounded-full" />}
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Card form */}
                  {payment.method === "card" && (
                    <div className="space-y-4 p-4 bg-gray-50 rounded-xl">
                      <div className="space-y-1.5">
                        <Label htmlFor="cardNumber" className="text-sm font-medium text-foreground">Numero de tarjeta</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={payment.cardNumber}
                          onChange={(e) => handlePaymentChange("cardNumber", e.target.value)}
                          className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 bg-white"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="cardName" className="text-sm font-medium text-foreground">Nombre en la tarjeta</Label>
                        <Input
                          id="cardName"
                          placeholder="JUAN PEREZ"
                          value={payment.cardName}
                          onChange={(e) => handlePaymentChange("cardName", e.target.value)}
                          className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 bg-white"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label htmlFor="expiry" className="text-sm font-medium text-foreground">Vencimiento</Label>
                          <Input
                            id="expiry"
                            placeholder="MM/AA"
                            value={payment.expiry}
                            onChange={(e) => handlePaymentChange("expiry", e.target.value)}
                            className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 bg-white"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="cvv" className="text-sm font-medium text-foreground">CVV</Label>
                          <Input
                            id="cvv"
                            type="password"
                            placeholder="***"
                            value={payment.cvv}
                            onChange={(e) => handlePaymentChange("cvv", e.target.value)}
                            className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 bg-white"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {payment.method === "transfer" && (
                    <div className="p-4 bg-gray-50 rounded-xl space-y-3">
                      <p className="text-sm font-semibold text-foreground">Datos para transferencia:</p>
                      <div className="space-y-2 text-sm text-gray-700">
                        <p><span className="font-medium">Banco:</span> Banco Pichincha</p>
                        <p><span className="font-medium">Tipo de cuenta:</span> Corriente</p>
                        <p><span className="font-medium">Numero:</span> 2100123456</p>
                        <p><span className="font-medium">Nombre:</span> Tienda98 S.A.</p>
                        <p><span className="font-medium">RUC:</span> 1790012345001</p>
                      </div>
                      <p className="text-xs text-gray-500">Envia el comprobante de pago a pagos@tienda98.com</p>
                    </div>
                  )}

                  {payment.method === "cash" && (
                    <div className="p-4 bg-gray-50 rounded-xl space-y-2">
                      <p className="text-sm font-semibold text-foreground">Pago contra entrega</p>
                      <p className="text-sm text-gray-600">
                        Pagaras el monto total al momento de recibir tu pedido. Asegurate de tener el monto exacto.
                      </p>
                      <p className="text-xs text-gray-500">Aplica un cargo adicional de $1.99 por manejo.</p>
                    </div>
                  )}

                  <div className="flex gap-3 mt-6">
                    <Button
                      onClick={() => setStep(1)}
                      variant="outline"
                      className="flex-1 h-11 bg-transparent border-gray-300 text-foreground hover:bg-gray-50"
                    >
                      Volver
                    </Button>
                    <Button
                      onClick={() => setStep(3)}
                      disabled={!isPaymentValid}
                      className="flex-1 h-11 bg-orange-500 hover:bg-orange-600 text-white font-semibold disabled:opacity-50"
                    >
                      Revisar pedido
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Confirm */}
              {step === 3 && (
                <div className="bg-white rounded-xl border border-gray-200 p-5 md:p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <Check className="w-5 h-5 text-orange-500" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-foreground">Confirmar pedido</h2>
                      <p className="text-sm text-gray-500">Revisa los datos antes de confirmar</p>
                    </div>
                  </div>

                  {/* Shipping summary */}
                  <div className="bg-gray-50 rounded-xl p-4 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-semibold text-foreground">Direccion de envio</h3>
                      <button onClick={() => setStep(1)} className="text-xs text-orange-500 hover:underline">Editar</button>
                    </div>
                    <div className="text-sm text-gray-600 space-y-0.5">
                      <p className="font-medium text-foreground">{shipping.firstName} {shipping.lastName}</p>
                      <p>{shipping.address}</p>
                      <p>{shipping.city}, {shipping.province} {shipping.postalCode}</p>
                      <p>{shipping.phone}</p>
                      <p>{shipping.email}</p>
                    </div>
                  </div>

                  {/* Payment summary */}
                  <div className="bg-gray-50 rounded-xl p-4 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-semibold text-foreground">Metodo de pago</h3>
                      <button onClick={() => setStep(2)} className="text-xs text-orange-500 hover:underline">Editar</button>
                    </div>
                    <p className="text-sm text-gray-600">
                      {payment.method === "card" && `Tarjeta terminada en ${payment.cardNumber.slice(-4) || "****"}`}
                      {payment.method === "transfer" && "Transferencia bancaria"}
                      {payment.method === "cash" && "Pago contra entrega"}
                    </p>
                  </div>

                  {/* Products summary */}
                  <div className="bg-gray-50 rounded-xl p-4 mb-6">
                    <h3 className="text-sm font-semibold text-foreground mb-3">Productos ({itemCount})</h3>
                    <div className="space-y-3">
                      {items.map((item) => (
                        <div key={item.id} className="flex items-center gap-3">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded-lg border border-gray-200"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
                            <p className="text-xs text-gray-500">Cant: {item.quantity}</p>
                          </div>
                          <span className="text-sm font-semibold text-foreground">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={() => setStep(2)}
                      variant="outline"
                      className="flex-1 h-11 bg-transparent border-gray-300 text-foreground hover:bg-gray-50"
                    >
                      Volver
                    </Button>
                    <Button
                      onClick={handlePlaceOrder}
                      className="flex-1 h-12 bg-orange-500 hover:bg-orange-600 text-white font-bold text-base rounded-lg"
                    >
                      <Lock className="w-4 h-4 mr-2" />
                      Realizar pedido
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Right - Order Summary */}
            <div className="lg:w-[340px] flex-shrink-0">
              <div className="bg-white rounded-xl border border-gray-200 p-5 lg:sticky lg:top-24">
                <h2 className="text-lg font-bold text-foreground mb-4">Resumen del pedido</h2>

                {/* Items */}
                <div className="space-y-3 mb-4 max-h-[280px] overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="relative flex-shrink-0">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-14 h-14 object-cover rounded-lg border border-gray-200"
                        />
                        <span className="absolute -top-1.5 -right-1.5 bg-orange-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
                        <p className="text-xs text-gray-500">{item.store}</p>
                      </div>
                      <span className="text-sm font-semibold text-foreground">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <hr className="border-gray-100 mb-4" />

                {/* Totals */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({itemCount} productos)</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Envio</span>
                    <span className={shippingCost === 0 ? "text-green-600 font-semibold" : ""}>
                      {shippingCost === 0 ? "GRATIS" : `$${shippingCost.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>IVA (12%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  {payment.method === "cash" && (
                    <div className="flex justify-between text-gray-600">
                      <span>Cargo por manejo</span>
                      <span>$1.99</span>
                    </div>
                  )}
                  <hr className="border-gray-100" />
                  <div className="flex justify-between items-center pt-1">
                    <span className="text-base font-bold text-foreground">Total</span>
                    <span className="text-xl font-bold text-orange-500">
                      ${(grandTotal + (payment.method === "cash" ? 1.99 : 0)).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Trust signals */}
                <div className="mt-5 pt-4 border-t border-gray-100 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Shield className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                    <span>Compra protegida por Tienda98</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Lock className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                    <span>Pago 100% seguro y encriptado</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Truck className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                    <span>Envio gratis en compras sobre $50</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
