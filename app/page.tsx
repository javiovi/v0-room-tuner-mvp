"use client"

import Link from "next/link"
import { CenteredLayout } from "@/components/CenteredLayout"

export default function HomePage() {
  return (
    <CenteredLayout>
      <div className="flex justify-center">
        <span className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
          MVP • Experimentos de acústica casera
        </span>
      </div>

      <div className="space-y-6 text-center pt-4 pb-2">
        <h1 className="text-3xl md:text-4xl font-semibold text-foreground text-balance leading-tight">
          Mejora la acústica de tu sala sin ser ingeniero de sonido
        </h1>

        <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-md mx-auto">
          Te guiamos paso a paso para entender tu espacio y conseguir una escucha más cómoda, ya sea para música,
          trabajo o práctica de instrumentos.
        </p>
      </div>

      <Link
        href="/objetivo"
        className="block w-full bg-primary text-primary-foreground py-3.5 px-6 rounded-full font-semibold text-center hover:opacity-90 transition-all active:scale-[0.98] shadow-sm"
      >
        Empezar
      </Link>

      <p className="text-sm text-muted-foreground text-center">Toma menos de 5 minutos completar el primer análisis.</p>
    </CenteredLayout>
  )
}
