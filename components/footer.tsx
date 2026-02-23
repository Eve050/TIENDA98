import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white mt-16">
      <div className="container mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-8 text-center sm:text-left">
          {/* Brand Section */}
          <div className="space-y-5">
            <h3 className="text-3xl font-bold tracking-tight text-white">
              {"TIENDA"}
              <span className="font-light text-primary">{"98"}</span>
            </h3>
            <p className="text-base text-gray-400 leading-relaxed max-w-xs mx-auto sm:mx-0">
              {"Tu marketplace en línea de confianza en Ecuador. Encuentra todo lo que necesitas al mejor precio y con total seguridad."}
            </p>
          </div>

          {/* Comprar Section */}
          <div className="space-y-5">
            <h4 className="text-lg font-bold uppercase tracking-widest text-primary">{"Comprar"}</h4>
            <ul className="space-y-3 text-base text-gray-400">
              <li>
                <Link href="/entrega-inmediata" className="hover:text-primary transition-colors">
                  {"Entrega Inmediata"}
                </Link>
              </li>
              <li>
                <Link href="/por-pedido" className="hover:text-primary transition-colors">
                  {"Por Pedido"}
                </Link>
              </li>
              <li>
                <Link href="/ofertas" className="hover:text-primary transition-colors">
                  {"Ofertas Especiales"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Ayuda Section */}
          <div className="space-y-5">
            <h4 className="text-lg font-bold uppercase tracking-widest text-primary">{"Ayuda"}</h4>
            <ul className="space-y-3 text-base text-gray-400">
              <li>
                <Link href="/rastrear-pedido" className="hover:text-primary transition-colors">
                  {"Rastrear Pedido"}
                </Link>
              </li>
              <li>
                <Link href="/informacion" className="hover:text-primary transition-colors">
                  {"Envíos y Devoluciones"}
                </Link>
              </li>
              <li>
                <Link href="/preguntas" className="hover:text-primary transition-colors">
                  {"Preguntas Frecuentes"}
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="hover:text-primary transition-colors">
                  {"Centro de Contacto"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Empresa Section */}
          <div className="space-y-5">
            <h4 className="text-lg font-bold uppercase tracking-widest text-primary">{"Empresa"}</h4>
            <ul className="space-y-3 text-base text-gray-400">
              <li>
                <Link href="/sobre-nosotros" className="hover:text-primary transition-colors">
                  {"Sobre Nosotros"}
                </Link>
              </li>
              <li>
                <Link href="/terminos" className="hover:text-primary transition-colors">
                  {"Términos y Condiciones"}
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-primary transition-colors">
                  {"Portal Administrativo"}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-white/5 text-center">
          <p className="text-sm text-gray-500">
            {"© 2026 TIENDA98. Desarrollado con ❤️ para Ecuador."}
          </p>
        </div>
      </div>
    </footer>
  )
}
