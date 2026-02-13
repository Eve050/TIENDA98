import Header from "@/components/header"
import Footer from "@/components/footer"
import {
  Package,
  CheckCircle,
  Truck,
  Clock,
  Mail,
  Phone,
  Shield,
  CreditCard,
  RotateCcw,
  Headphones,
  MapPin,
  ArrowRight,
  Zap,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"

export default function InformacionPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero with background image */}
        <section className="relative h-72 md:h-96 overflow-hidden">
          <img
            src="/hero-informacion.jpg"
            alt="Envios a todo Ecuador"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a2e]/95 via-[#1a1a2e]/80 to-[#1a1a2e]/50" />
          <div className="relative z-10 container mx-auto px-4 md:px-6 lg:px-12 h-full flex flex-col justify-center">
            <nav className="flex items-center gap-1.5 text-sm text-white/60 mb-6">
              <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-white font-medium">Informacion</span>
            </nav>
            <span className="inline-flex items-center gap-2 bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full w-fit mb-4">
              <Truck className="w-3.5 h-3.5" />
              INFORMACION DE ENVIOS
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              Envios a todo{" "}
              <span className="text-orange-400">Ecuador</span>
            </h1>
            <p className="text-base md:text-lg text-white/70 max-w-xl mt-3 leading-relaxed">
              Entrega rapida y segura en todo el pais. Tu pedido llegara a tiempo, garantizado.
            </p>
          </div>
        </section>

        {/* Trust bar */}
        <section className="bg-white border-b border-gray-100 shadow-sm">
          <div className="container mx-auto px-4 md:px-6 lg:px-12">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
              {[
                { icon: Truck, label: "Envio gratis", sub: "En compras +$50" },
                { icon: Shield, label: "Compra segura", sub: "100% protegida" },
                { icon: RotateCcw, label: "Devoluciones", sub: "Hasta 30 dias" },
                { icon: Headphones, label: "Soporte 24/7", sub: "Siempre contigo" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3 py-5 px-4">
                  <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{item.label}</p>
                    <p className="text-xs text-gray-500">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Shipping Costs */}
        <section className="py-14 md:py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6 lg:px-12">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-3">Costos de Envio</h2>
              <p className="text-gray-500 max-w-lg mx-auto">Tarifas transparentes sin sorpresas. Envio gratis en compras mayores a $50.</p>
            </div>

            <div className="max-w-3xl mx-auto grid gap-4">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 p-6 md:p-8 text-white">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <Zap className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Compras sobre $50</h3>
                      <p className="text-white/80 text-sm">En todo el Ecuador</p>
                    </div>
                  </div>
                  <span className="text-3xl md:text-4xl font-black">GRATIS</span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-orange-300 hover:shadow-md transition-all">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                        <MapPin className="w-5 h-5 text-gray-700" />
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-1">Quito y Guayaquil</h3>
                      <p className="text-sm text-gray-500">Compras bajo $50</p>
                    </div>
                    <span className="text-2xl font-black text-foreground">$3.99</span>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-orange-300 hover:shadow-md transition-all">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                        <MapPin className="w-5 h-5 text-gray-700" />
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-1">Resto del pais</h3>
                      <p className="text-sm text-gray-500">Compras bajo $50</p>
                    </div>
                    <span className="text-2xl font-black text-foreground">$5.99</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section className="py-14 md:py-20 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6 lg:px-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-3">Como funciona</h2>
              <p className="text-gray-500 max-w-lg mx-auto">Un proceso simple de 4 pasos desde tu compra hasta la entrega.</p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-4 gap-6 relative">
                <div className="hidden md:block absolute top-8 left-[calc(12.5%+24px)] right-[calc(12.5%+24px)] h-0.5 bg-orange-200">
                  <div className="h-full w-full bg-gradient-to-r from-orange-500 via-orange-400 to-orange-300 rounded-full" />
                </div>
                {[
                  { icon: Package, step: "01", title: "Realiza tu pedido", desc: "Selecciona tus productos y completa tu compra en linea." },
                  { icon: CheckCircle, step: "02", title: "Procesamos", desc: "Preparamos tu pedido con cuidado y lo empaquetamos." },
                  { icon: Truck, step: "03", title: "Enviamos", desc: "Tu pedido es despachado con transportistas de confianza." },
                  { icon: CheckCircle, step: "04", title: "Recibes", desc: "Recibe tu pedido en la puerta de tu casa." },
                ].map((item) => (
                  <div key={item.step} className="text-center relative">
                    <div className="w-16 h-16 bg-white border-2 border-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm relative z-10">
                      <item.icon className="w-7 h-7 text-orange-500" />
                    </div>
                    <span className="text-[10px] font-bold text-orange-500 tracking-widest">PASO {item.step}</span>
                    <h3 className="text-base font-bold text-foreground mt-1 mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Delivery Times */}
        <section className="py-14 md:py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6 lg:px-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-3">Tiempos de entrega</h2>
              <p className="text-gray-500 max-w-lg mx-auto">Tiempos estimados segun tu ubicacion.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto">
              {[
                { city: "Quito y Guayaquil", time: "24-48h", desc: "Entrega express en las principales ciudades" },
                { city: "Ciudades principales", time: "3-5 dias", desc: "Cuenca, Ambato, Machala, Santo Domingo, etc." },
                { city: "Zonas rurales", time: "5-7 dias", desc: "Areas remotas y zonas rurales del pais" },
              ].map((item) => (
                <div key={item.city} className="group rounded-2xl p-6 text-center border-2 border-gray-200 bg-white transition-all hover:shadow-md hover:border-orange-500 hover:bg-orange-50 cursor-pointer">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 bg-gray-100 text-gray-700 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                    <Clock className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-foreground mb-1">{item.city}</h3>
                  <div className="text-3xl font-black my-3 text-foreground group-hover:text-orange-500 transition-colors">
                    {item.time}
                  </div>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Coverage */}
        <section className="py-14 md:py-20 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6 lg:px-12">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-3">Cobertura nacional</h2>
                <p className="text-gray-500">Llegamos a las principales ciudades y zonas del Ecuador.</p>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-10">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {[
                    "Quito", "Guayaquil", "Cuenca", "Ambato",
                    "Machala", "Santo Domingo", "Portoviejo", "Loja",
                    "Manta", "Riobamba", "Ibarra", "Esmeraldas",
                  ].map((city) => (
                    <div key={city} className="flex items-center gap-2 py-2.5 px-3 rounded-lg bg-gray-50">
                      <CheckCircle className="w-4 h-4 text-orange-500 flex-shrink-0" />
                      <span className="text-sm font-medium text-foreground">{city}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-400 text-center mt-6">Y muchas ciudades mas en todo el territorio ecuatoriano.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Payment Methods */}
        <section className="py-14 md:py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6 lg:px-12">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-3">Metodos de pago</h2>
              <p className="text-gray-500 max-w-lg mx-auto">Multiples opciones de pago para tu comodidad.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {[
                { icon: CreditCard, name: "Tarjeta de credito", sub: "Visa, Mastercard" },
                { icon: CreditCard, name: "Tarjeta de debito", sub: "Todas las tarjetas" },
                { icon: Phone, name: "Transferencia", sub: "Bancaria directa" },
                { icon: Shield, name: "PayPal", sub: "Pago seguro" },
              ].map((item) => (
                <div key={item.name} className="bg-white border border-gray-200 rounded-xl p-5 text-center hover:border-orange-300 hover:shadow-sm transition-all">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <item.icon className="w-5 h-5 text-gray-700" />
                  </div>
                  <h3 className="text-sm font-bold text-foreground">{item.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">{item.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Help CTA */}
        <section className="py-14 md:py-20 bg-[#1a1a2e]">
          <div className="container mx-auto px-4 md:px-6 lg:px-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">Necesitas ayuda?</h2>
              <p className="text-gray-400 mb-8 max-w-lg mx-auto">Nuestro equipo esta listo para ayudarte con cualquier duda sobre tu envio.</p>

              <div className="grid sm:grid-cols-2 gap-4 max-w-xl mx-auto">
                <a
                  href="https://wa.me/593999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-white/10 hover:bg-white/15 rounded-xl p-5 transition-colors text-left"
                >
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-bold">WhatsApp</p>
                    <p className="text-gray-400 text-sm">+593 99 999 9999</p>
                  </div>
                </a>

                <a
                  href="mailto:envios@tienda98.com"
                  className="flex items-center gap-4 bg-white/10 hover:bg-white/15 rounded-xl p-5 transition-colors text-left"
                >
                  <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-bold">Email</p>
                    <p className="text-gray-400 text-sm">envios@tienda98.com</p>
                  </div>
                </a>
              </div>

              <div className="mt-10">
                <Link
                  href="/rastrear-pedido"
                  className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 text-sm font-semibold transition-colors"
                >
                  Rastrear mi pedido
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
