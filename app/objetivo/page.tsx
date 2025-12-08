"use client"

import { useState } from "react"
import Link from "next/link"
import { CenteredLayout } from "@/components/CenteredLayout"

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
  const [selectedObjectiveId, setSelectedObjectiveId] = useState<string | null>(null)

  return (
    <CenteredLayout>
      <div className="space-y-3 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground text-balance">
          ¿Para qué querés optimizar tu sala?
        </h1>
        <p className="text-base text-muted-foreground">Elegí el objetivo principal. Después podrás ajustar detalles.</p>
      </div>

      <div className="space-y-3">
        {objectives.map((objective) => (
          <button
            key={objective.id}
            type="button"
            onClick={() => setSelectedObjectiveId(objective.id)}
            className={`w-full text-left rounded-3xl p-6 transition-all cursor-pointer relative ${
              selectedObjectiveId === objective.id
                ? "border-2 border-primary bg-primary/5 shadow-md"
                : "border border-border/60 bg-card hover:bg-muted/50 shadow-sm"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-foreground text-lg">{objective.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">{objective.description}</p>
              </div>
              {selectedObjectiveId === objective.id && (
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-primary-foreground"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      <Link
        href="/sala"
        className={`block w-full py-3.5 px-6 rounded-full font-semibold text-center transition-all ${
          selectedObjectiveId
            ? "bg-primary text-primary-foreground hover:opacity-90 active:scale-[0.98] shadow-sm"
            : "bg-muted text-muted-foreground cursor-not-allowed pointer-events-none"
        }`}
      >
        Continuar
      </Link>
    </CenteredLayout>
  )
}
