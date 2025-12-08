"use client"

import Link from "next/link"

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="max-w-xl w-full space-y-6">
        <h1 className="text-4xl font-bold text-foreground text-pretty">
          Mejora la acústica de tu sala sin ser ingeniero de sonido
        </h1>

        <p className="text-lg text-muted-foreground leading-relaxed">
          Te guiamos paso a paso para entender tu sala y conseguir una escucha más cómoda para música, trabajo o
          práctica de instrumentos.
        </p>

        <Link
          href="/objetivo"
          className="block w-full bg-primary text-primary-foreground py-3 px-4 rounded-lg font-semibold text-center hover:opacity-90 transition-opacity active:opacity-75"
        >
          Empezar
        </Link>

        <p className="text-sm text-muted-foreground text-center">
          Toma menos de 5 minutos completar el primer análisis.
        </p>
      </div>
    </main>
  )
}
