import Header from "@/components/header"
import Footer from "@/components/footer"
import { Package, Truck, CheckCircle, Clock, Phone, Mail, MapPin } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function EnviosPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="bg-gradient-to-br from-primary via-accent to-primary py-20">
          <div className="container mx-auto px-4 text-center text-primary-foreground">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm mb-6">
              <Package className="w-10 h-10" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">Envíos a Todo Ecuador</h1>
            <p className="text-xl opacity-95 max-w-2xl mx-auto font-medium">
              Entrega rápida y segura en todo el país. Tu pedido llegará a tiempo, garantizado.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* How it Works */}
          <section className="mb-16">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-bold mb-3 tracking-tight">¿Cómo Funciona?</h2>
              <div className="h-1 w-24 bg-gradient-to-r from-primary to-accent rounded-full mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                {
                  icon: Package,
                  title: "1. Realiza tu pedido",
                  desc: "Selecciona tus productos y completa tu compra en línea de forma segura.",
                },
                {
                  icon: CheckCircle,
                  title: "2. Procesamos",
                  desc: "Preparamos tu pedido con cuidado y lo empaquetamos de forma segura.",
                },
                {
                  icon: Truck,
                  title: "3. Enviamos",
                  desc: "Tu pedido es despachado con nuestros transportistas de confianza.",
                },
                {
                  icon: CheckCircle,
                  title: "4. Recibes",
                  desc: "Recibe tu pedido en la puerta de tu casa en el tiempo estimado.",
                },
              ].map((step, idx) => (
                <Card
                  key={idx}
                  className="border-2 border-primary/10 hover:border-primary/30 transition-all hover:shadow-xl"
                >
                  <CardHeader>
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-4">
                      <step.icon className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-bold mb-3 tracking-tight">Tiempos de Entrega</h2>
              <div className="h-1 w-24 bg-gradient-to-r from-primary to-accent rounded-full mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent hover:shadow-2xl transition-all">
                <CardHeader>
                  <Clock className="w-10 h-10 text-primary mb-3" />
                  <CardTitle className="text-xl">Quito y Guayaquil</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-3">
                    24-48h
                  </p>
                  <p className="text-muted-foreground font-medium">Entrega express en las principales ciudades</p>
                </CardContent>
              </Card>

              <Card className="border-2 border-accent/20 bg-gradient-to-br from-accent/5 to-transparent hover:shadow-2xl transition-all">
                <CardHeader>
                  <Clock className="w-10 h-10 text-accent mb-3" />
                  <CardTitle className="text-xl">Ciudades Principales</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-5xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent mb-3">
                    3-5 días
                  </p>
                  <p className="text-muted-foreground font-medium">Cuenca, Ambato, Machala, Santo Domingo, etc.</p>
                </CardContent>
              </Card>

              <Card className="border-2 border-primary/20 hover:shadow-2xl transition-all">
                <CardHeader>
                  <Clock className="w-10 h-10 text-primary mb-3" />
                  <CardTitle className="text-xl">Zonas Rurales</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-5xl font-bold text-primary mb-3">5-7 días</p>
                  <p className="text-muted-foreground font-medium">Áreas remotas y zonas rurales del país</p>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="mb-16 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 rounded-3xl p-10 border-2 border-primary/10">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold mb-3 tracking-tight">Costos de Envío</h2>
              <div className="h-1 w-24 bg-gradient-to-r from-primary to-accent rounded-full mx-auto"></div>
            </div>
            <div className="max-w-3xl mx-auto space-y-4">
              <div className="flex justify-between items-center p-6 bg-white rounded-2xl shadow-md border-2 border-accent/20 hover:shadow-xl transition-all">
                <div>
                  <p className="font-bold text-lg">Compras sobre $50</p>
                  <p className="text-sm text-muted-foreground font-medium">En todo el Ecuador</p>
                </div>
                <span className="text-3xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                  GRATIS
                </span>
              </div>
              <div className="flex justify-between items-center p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all">
                <div>
                  <p className="font-bold text-lg">Quito y Guayaquil</p>
                  <p className="text-sm text-muted-foreground font-medium">Compras bajo $50</p>
                </div>
                <span className="text-3xl font-bold text-primary">$3.99</span>
              </div>
              <div className="flex justify-between items-center p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all">
                <div>
                  <p className="font-bold text-lg">Resto del país</p>
                  <p className="text-sm text-muted-foreground font-medium">Compras bajo $50</p>
                </div>
                <span className="text-3xl font-bold text-primary">$5.99</span>
              </div>
            </div>
          </section>

          {/* Coverage Map */}
          <section className="mb-16">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-bold mb-3 tracking-tight">Cobertura Nacional</h2>
              <div className="h-1 w-24 bg-gradient-to-r from-primary to-accent rounded-full mx-auto"></div>
            </div>
            <Card className="max-w-5xl mx-auto border-2 border-primary/10 shadow-xl">
              <CardContent className="p-10">
                <div className="grid md:grid-cols-2 gap-10">
                  <div>
                    <h3 className="text-2xl font-bold mb-6 text-primary">Ciudades con Cobertura</h3>
                    <ul className="space-y-3">
                      {["Quito", "Guayaquil", "Cuenca", "Ambato", "Machala", "Santo Domingo", "Portoviejo", "Loja"].map(
                        (city) => (
                          <li
                            key={city}
                            className="flex items-center gap-3 p-3 bg-gradient-to-r from-primary/5 to-transparent rounded-xl"
                          >
                            <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                            <span className="font-medium text-lg">{city}</span>
                          </li>
                        ),
                      )}
                      <li className="text-sm mt-4 font-bold text-primary pl-3">Y muchas ciudades más...</li>
                    </ul>
                  </div>
                  <div className="flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8">
                    <MapPin className="w-48 h-48 text-primary/20" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <section>
            <div className="text-center mb-10">
              <h2 className="text-4xl font-bold mb-3 tracking-tight">¿Necesitas Ayuda con tu Envío?</h2>
              <div className="h-1 w-24 bg-gradient-to-r from-primary to-accent rounded-full mx-auto"></div>
            </div>
            <Card className="max-w-3xl mx-auto border-2 border-primary/10 shadow-xl">
              <CardContent className="p-10">
                <div className="space-y-6">
                  <div className="flex items-start gap-5 p-6 bg-gradient-to-r from-accent/5 to-transparent rounded-2xl border-2 border-accent/10">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-7 h-7 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">WhatsApp</h3>
                      <p className="text-xl font-bold text-accent">+593 99 999 9999</p>
                      <p className="text-sm text-muted-foreground mt-1 font-medium">
                        Lunes a Viernes: 8:00 AM - 6:00 PM
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-5 p-6 bg-gradient-to-r from-primary/5 to-transparent rounded-2xl border-2 border-primary/10">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Email</h3>
                      <p className="text-xl font-bold text-primary">envios@tienda98.com</p>
                      <p className="text-sm text-muted-foreground mt-1 font-medium">Respuesta en 24 horas</p>
                    </div>
                  </div>
                  <Button className="w-full mt-6 h-14 rounded-2xl text-lg font-bold bg-gradient-to-r from-primary via-accent to-primary bg-size-200 hover:bg-pos-100 transition-all duration-500">
                    CONTACTAR SOPORTE
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
