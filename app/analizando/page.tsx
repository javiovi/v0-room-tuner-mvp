"use client"

import Link from "next/link"
import { CenteredLayout } from "@/components/CenteredLayout"

const tips = [
  "La posición del punto de escucha puede cambiar muchísimo la percepción.",
  "Los muebles también ayudan a controlar reflexiones.",
  "Pequeños ajustes suelen generar grandes diferencias en el sonido.",
]

export default function AnalizandoPage() {
  return (
    <CenteredLayout>
      <div className="space-y-3 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground text-balance">Estamos analizando tu sala…</h1>
        <p className="text-base text-muted-foreground leading-relaxed">
          Usamos la información que compartiste para sugerirte cambios simples que puedan mejorar tu experiencia de
          escucha.
        </p>
      </div>

      <div className="flex justify-center py-4">
        <div className="w-16 h-16 border-4 border-muted border-t-primary rounded-full animate-spin"></div>
      </div>

      <div className="bg-muted/40 rounded-3xl p-6 space-y-4 shadow-sm border border-border/30">
        <p className="text-base font-semibold text-foreground">Mientras tanto, algunos datos útiles:</p>
        <ul className="space-y-3">
          {tips.map((tip, index) => (
            <li key={index} className="text-sm text-muted-foreground flex gap-3">
              <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
              <span className="leading-relaxed">{tip}</span>
            </li>
          ))}
        </ul>
      </div>

      <Link
        href="/resultado"
        className="block w-full bg-primary text-primary-foreground py-4 px-6 rounded-full font-semibold text-center hover:opacity-90 transition-all active:scale-[0.98] shadow-sm"
      >
        Ver resultados
      </Link>
    </CenteredLayout>
  )
}
