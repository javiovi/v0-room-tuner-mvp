"use client"

import Link from "next/link"
import { CenteredLayout } from "@/components/CenteredLayout"

export default function MedicionPage() {
  return (
    <CenteredLayout>
      <div className="space-y-3 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground text-balance">
          ¿Querés medir el ruido ambiente?
        </h1>
        <p className="text-base text-muted-foreground leading-relaxed">
          Podemos usar el micrófono de tu dispositivo para tener una idea del nivel de ruido. Si preferís, podés saltear
          este paso.
        </p>
      </div>

      <div className="space-y-4 pt-2">
        <Link
          href="/analizando"
          className="block w-full bg-primary text-primary-foreground py-4 px-6 rounded-full font-semibold text-center hover:opacity-90 transition-all active:scale-[0.98] shadow-sm"
        >
          Sí, medir ahora
        </Link>
        <Link
          href="/analizando"
          className="block w-full border-2 border-primary/20 bg-muted text-foreground py-4 px-6 rounded-full font-semibold text-center hover:bg-muted/80 transition-all active:scale-[0.98] shadow-sm"
        >
          No, saltear este paso
        </Link>
      </div>

      <div className="pt-2 text-center">
        <Link href="/muebles" className="text-sm text-primary hover:text-primary/80 transition-colors">
          Volver
        </Link>
      </div>
    </CenteredLayout>
  )
}
