"use client"

import Link from "next/link"

export default function MedicionPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="max-w-xl w-full space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground text-pretty">¿Querés medir el ruido ambiente?</h1>
          <p className="text-base text-muted-foreground">
            Podemos usar el micrófono de tu dispositivo para tener una idea del nivel de ruido. Si preferís, podés
            saltear este paso.
          </p>
        </div>

        <div className="space-y-3 pt-4">
          <Link
            href="/analizando"
            className="block w-full bg-primary text-primary-foreground py-3 px-4 rounded-lg font-semibold text-center hover:opacity-90 transition-opacity active:opacity-75"
          >
            Sí, medir ahora
          </Link>
          <Link
            href="/analizando"
            className="block w-full border-2 border-primary text-primary py-3 px-4 rounded-lg font-semibold text-center hover:bg-muted transition-colors active:opacity-75"
          >
            No, saltear este paso
          </Link>
        </div>

        {/* Back navigation link */}
        <div className="pt-2">
          <Link href="/muebles" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Volver
          </Link>
        </div>
      </div>
    </main>
  )
}
