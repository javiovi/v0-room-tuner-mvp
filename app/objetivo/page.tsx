"use client"

import Link from "next/link"

const objectives = [
  {
    id: "music",
    title: "Escuchar música",
    description: "Optimizar para disfrutar de la mejor calidad de audio musical",
  },
  {
    id: "instrument",
    title: "Tocar instrumento",
    description: "Crear un entorno ideal para la práctica instrumental",
  },
  {
    id: "work",
    title: "Trabajar / concentrarme",
    description: "Mejorar la claridad del sonido y reducir distracciones",
  },
]

export default function ObjetivoPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="max-w-xl w-full space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground text-pretty">¿Para qué querés optimizar tu sala?</h1>
          <p className="text-base text-muted-foreground">
            Elegí el objetivo principal. Después podrás ajustar detalles.
          </p>
        </div>

        <div className="space-y-3">
          {objectives.map((objective) => (
            <div
              key={objective.id}
              className="border border-border rounded-xl p-4 hover:bg-muted transition-colors cursor-pointer"
            >
              <h3 className="font-semibold text-foreground">{objective.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{objective.description}</p>
            </div>
          ))}
        </div>

        <Link
          href="/sala"
          className="block w-full bg-primary text-primary-foreground py-3 px-4 rounded-lg font-semibold text-center hover:opacity-90 transition-opacity active:opacity-75"
        >
          Continuar
        </Link>
      </div>
    </main>
  )
}
