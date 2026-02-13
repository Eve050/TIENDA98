import { Suspense } from "react"
import RastrearPedidoContent from "@/components/rastrear-pedido-content"

export default function RastrearPedidoPage() {
  return (
    <Suspense fallback={null}>
      <RastrearPedidoContent />
    </Suspense>
  )
}
