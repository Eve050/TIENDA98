import { Suspense } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ModaContent from "@/components/moda-content"

export default function ModaYAccesoriosPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Suspense fallback={<div className="min-h-screen" />}>
          <ModaContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
