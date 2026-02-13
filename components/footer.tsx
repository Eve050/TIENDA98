import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white mt-16">
      <div className="container mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-3">
            <h3 className="text-2xl font-bold tracking-tight text-white">
              {"TIENDA"}
              <span className="font-normal">{"98"}</span>
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              {"Tu tienda en línea de confianza. Todo lo que necesitas en un solo lugar."}
            </p>
          </div>

          {/* Comprar Section */}
          <div className="space-y-3">
            <h4 className="text-base font-bold uppercase tracking-wider">{"Comprar"}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/entrega-inmediata" className="hover:text-[#FF6B35] transition-colors">
                  {"Entrega Inmediata"}
                </Link>
              </li>
              <li>
                <Link href="/por-pedido" className="hover:text-[#FF6B35] transition-colors">
                  {"Por Pedido"}
                </Link>
              </li>
              <li>
                <Link href="/ofertas" className="hover:text-[#FF6B35] transition-colors">
                  {"Ofertas"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Ayuda Section */}
          <div className="space-y-3">
            <h4 className="text-base font-bold uppercase tracking-wider">{"Ayuda"}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/rastrear-pedido" className="hover:text-[#FF6B35] transition-colors">
                  {"Rastrear Pedido"}
                </Link>
              </li>
              <li>
                <Link href="/informacion" className="hover:text-[#FF6B35] transition-colors">
                  {"Envíos y Devoluciones"}
                </Link>
              </li>
              <li>
                <Link href="/preguntas" className="hover:text-[#FF6B35] transition-colors">
                  {"Preguntas Frecuentes"}
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="hover:text-[#FF6B35] transition-colors">
                  {"Contacto"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Empresa Section */}
          <div className="space-y-3">
            <h4 className="text-base font-bold uppercase tracking-wider">{"Empresa"}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/sobre-nosotros" className="hover:text-[#FF6B35] transition-colors">
                  {"Sobre Nosotros"}
                </Link>
              </li>
              <li>
                <Link href="/terminos" className="hover:text-[#FF6B35] transition-colors">
                  {"Términos y Condiciones"}
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-[#FF6B35] transition-colors">
                  {"Acceso Admin"}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-gray-800 text-center text-xs text-gray-500">
          <p>{"© 2025 TIENDA98. Todos los derechos reservados."}</p>
        </div>
      </div>
    </footer>
  )
}
