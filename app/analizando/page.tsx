"use client"

import Link from "next/link"

const tips = [
  "La posición del punto de escucha puede cambiar muchísimo la percepción.",
  "Los muebles también ayudan a controlar reflexiones.",
  "Pequeños ajustes suelen generar grandes diferencias en el sonido.",
]

export default function AnalizandoPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="max-w-xl w-full space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-foreground text-pretty">Estamos analizando tu sala…</h1>
          <p className="text-base text-muted-foreground leading-relaxed">
            Usamos la información que compartiste para sugerirte cambios simples que puedan mejorar tu experiencia de
            escucha.
          </p>
        </div>

        {/* Loading spinner */}
        <div className="flex justify-center mt-6">
          <div className="w-12 h-12 border-4 border-muted border-t-primary rounded-full animate-spin"></div>
        </div>

        {/* Tips list */}
        <div className="bg-muted/30 rounded-xl p-5 space-y-3">
          <p className="text-sm font-semibold text-foreground">Mientras tanto, algunos datos útiles:</p>
          <ul className="space-y-2">
            {tips.map((tip, index) => (
              <li key={index} className="text-sm text-muted-foreground flex gap-2">
                <span className="text-primary font-bold">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        <Link
          href="/resultado"
          className="block w-full bg-primary text-primary-foreground py-3 px-4 rounded-lg font-semibold text-center hover:opacity-90 transition-opacity active:opacity-75"
        >
          Ver resultados
        </Link>
      </div>
    </main>
  )
}
