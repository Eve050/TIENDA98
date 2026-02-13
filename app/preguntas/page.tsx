"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

const faqs = [
  {
    category: "Pedidos y Compras",
    questions: [
      {
        q: "¿Cómo puedo realizar un pedido?",
        a: "Puedes realizar tu pedido directamente desde nuestra página web. Busca el producto que deseas, agrégalo al carrito y sigue los pasos para completar tu compra de forma segura.",
      },
      {
        q: "¿Qué métodos de pago aceptan?",
        a: "Aceptamos tarjetas de crédito y débito (Visa, Mastercard), transferencias bancarias, PayPal y pago contra entrega en zonas seleccionadas.",
      },
      {
        q: "¿Puedo cancelar mi pedido?",
        a: "Sí, puedes cancelar tu pedido antes de que sea despachado. Contacta a nuestro equipo de soporte lo antes posible para procesar la cancelación.",
      },
    ],
  },
  {
    category: "Envíos y Entregas",
    questions: [
      {
        q: "¿Cuánto tarda la entrega?",
        a: "Los tiempos varían según tu ubicación: 24-48h en Quito y Guayaquil, 3-5 días en ciudades principales, y 5-7 días en zonas rurales.",
      },
      {
        q: "¿Cuál es el costo de envío?",
        a: "El envío es GRATIS en compras sobre $50. Para compras menores, el costo es de $3.99 en Quito/Guayaquil y $5.99 en el resto del país.",
      },
      {
        q: "¿Hacen envíos internacionales?",
        a: "Actualmente solo realizamos envíos dentro de Ecuador. Estamos trabajando para expandir nuestro servicio internacionalmente pronto.",
      },
    ],
  },
  {
    category: "Devoluciones y Garantías",
    questions: [
      {
        q: "¿Cuál es la política de devoluciones?",
        a: "Tienes 30 días desde la recepción del producto para solicitar una devolución. El producto debe estar sin usar y en su empaque original.",
      },
      {
        q: "¿Los productos tienen garantía?",
        a: "Sí, todos nuestros productos cuentan con garantía del fabricante. Los plazos varían según el tipo de producto (generalmente 6 meses a 1 año).",
      },
      {
        q: "¿Cómo inicio una devolución?",
        a: "Contacta a nuestro servicio al cliente con tu número de pedido. Te guiaremos en el proceso y te enviaremos una etiqueta de envío de retorno.",
      },
    ],
  },
  {
    category: "Cuenta y Seguridad",
    questions: [
      {
        q: "¿Necesito crear una cuenta para comprar?",
        a: "No es obligatorio, pero crear una cuenta te permite rastrear pedidos, guardar direcciones y acceder a ofertas exclusivas.",
      },
      {
        q: "¿Es seguro comprar en Tienda98?",
        a: "Sí, utilizamos encriptación SSL y sistemas de pago seguros para proteger tu información personal y financiera.",
      },
      {
        q: "¿Olvidé mi contraseña, qué hago?",
        a: "Haz clic en 'Olvidé mi contraseña' en la página de inicio de sesión. Te enviaremos un enlace para restablecer tu contraseña por email.",
      },
    ],
  },
]

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-6 text-left hover:bg-muted transition-colors"
      >
        <span className="font-semibold text-lg pr-4">{question}</span>
        {isOpen ? <ChevronUp className="w-5 h-5 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 flex-shrink-0" />}
      </button>
      {isOpen && <div className="px-6 pb-6 text-muted-foreground leading-relaxed">{answer}</div>}
    </div>
  )
}

export default function PreguntasPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center">Preguntas Frecuentes</h1>
        <p className="text-lg text-muted-foreground mb-12 text-center">
          Encuentra respuestas a las preguntas más comunes sobre Tienda98
        </p>

        <div className="space-y-12">
          {faqs.map((category, idx) => (
            <div key={idx}>
              <h2 className="text-2xl font-bold mb-6 text-orange-600">{category.category}</h2>
              <div className="space-y-4">
                {category.questions.map((faq, qIdx) => (
                  <FAQItem key={qIdx} question={faq.q} answer={faq.a} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-orange-50 border border-orange-200 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-3">¿No encontraste lo que buscabas?</h3>
          <p className="text-muted-foreground mb-6">Nuestro equipo de soporte está listo para ayudarte</p>
          <a
            href="/contacto"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Contactar Soporte
          </a>
        </div>
      </div>
    </div>
  )
}
