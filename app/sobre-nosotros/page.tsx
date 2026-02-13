import { Store, Users, Truck, Shield } from "lucide-react"

export default function SobreNosotrosPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Sobre Nosotros</h1>

        <div className="prose max-w-none">
          <p className="text-lg text-muted-foreground mb-8">
            TIENDA98 es el marketplace ecuatoriano líder en comercio electrónico, dedicado a conectar a compradores con
            una amplia variedad de productos de calidad.
          </p>

          <div className="my-12">
            <h2 className="text-3xl font-bold mb-6">Nuestra Historia</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Fundada en 2020, TIENDA98 nació con la misión de democratizar el comercio electrónico en Ecuador y hacer
              que las compras en línea sean accesibles para todos los ecuatorianos.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Desde entonces, hemos crecido hasta convertirnos en una de las plataformas de e-commerce más confiables
              del país, sirviendo a miles de clientes satisfechos en todo Ecuador.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 my-12">
            <div className="bg-card border rounded-lg p-6">
              <Store className="w-12 h-12 text-orange-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Miles de Productos</h3>
              <p className="text-muted-foreground">
                Ofrecemos una amplia selección de productos en categorías de tecnología, moda, hogar y más.
              </p>
            </div>

            <div className="bg-card border rounded-lg p-6">
              <Users className="w-12 h-12 text-orange-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Clientes Satisfechos</h3>
              <p className="text-muted-foreground">
                Más de 50,000 clientes confían en nosotros para sus compras en línea.
              </p>
            </div>

            <div className="bg-card border rounded-lg p-6">
              <Truck className="w-12 h-12 text-orange-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Envíos a Todo Ecuador</h3>
              <p className="text-muted-foreground">
                Cobertura nacional con entregas rápidas y seguras en todo el país.
              </p>
            </div>

            <div className="bg-card border rounded-lg p-6">
              <Shield className="w-12 h-12 text-orange-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Compra Segura</h3>
              <p className="text-muted-foreground">
                Protección del comprador y pagos seguros en todas las transacciones.
              </p>
            </div>
          </div>

          <div className="my-12">
            <h2 className="text-3xl font-bold mb-6">Nuestra Misión</h2>
            <p className="text-muted-foreground leading-relaxed">
              Hacer que las compras en línea sean fáciles, seguras y accesibles para todos los ecuatorianos, ofreciendo
              productos de calidad a precios justos con un servicio al cliente excepcional.
            </p>
          </div>

          <div className="my-12">
            <h2 className="text-3xl font-bold mb-6">Nuestra Visión</h2>
            <p className="text-muted-foreground leading-relaxed">
              Ser el marketplace líder en Ecuador, reconocido por nuestra excelencia en servicio, variedad de productos
              y compromiso con la satisfacción del cliente.
            </p>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-8 my-12">
            <h3 className="text-2xl font-bold mb-4">Valores que nos definen</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-orange-500 font-bold">•</span>
                <span>
                  <strong>Confianza:</strong> Construimos relaciones duraderas basadas en la transparencia y honestidad
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-500 font-bold">•</span>
                <span>
                  <strong>Calidad:</strong> Nos comprometemos a ofrecer solo productos de la más alta calidad
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-500 font-bold">•</span>
                <span>
                  <strong>Innovación:</strong> Constantemente mejoramos nuestra plataforma para ofrecer la mejor
                  experiencia
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-500 font-bold">•</span>
                <span>
                  <strong>Servicio:</strong> El cliente siempre es nuestra prioridad número uno
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
