"use client"

import { AccountLayout } from "@/components/account-layout"

export default function DireccionesPage() {
  return (
    <AccountLayout>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <p className="text-gray-600 mb-8">Las siguientes direcciones se utilizarán por defecto en la página de pago.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Billing Address */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">DIRECCIÓN DE FACTURACIÓN</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <button className="text-gray-600 hover:text-[#FF6B35] font-medium transition-colors">
                Añadir Dirección de facturación
              </button>
              <p className="text-sm text-gray-500 mt-2">Aún no has configurado este tipo de dirección.</p>
            </div>
          </div>

          {/* Shipping Address */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">DIRECCIÓN DE ENVÍO</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <button className="text-gray-600 hover:text-[#FF6B35] font-medium transition-colors">
                Añadir Dirección de envío
              </button>
              <p className="text-sm text-gray-500 mt-2">Aún no has configurado este tipo de dirección.</p>
            </div>
          </div>
        </div>
      </div>
    </AccountLayout>
  )
}
