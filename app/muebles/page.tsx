"use client"

import Link from "next/link"
import { useState } from "react"

const furniture = [
  { id: "sofa", label: "Sofá" },
  { id: "bed", label: "Cama" },
  { id: "desk", label: "Escritorio" },
  { id: "libraries", label: "Bibliotecas grandes" },
  { id: "other", label: "Otros muebles grandes" },
  { id: "none", label: "Casi no tengo muebles" },
]

export default function MueblesPage() {
  const [selected, setSelected] = useState<string[]>([])

  const toggleFurniture = (id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="max-w-xl w-full space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground text-pretty">Muebles principales de tu sala</h1>
          <p className="text-base text-muted-foreground">Marcá qué tenés en la sala. No hace falta ser exacto.</p>
        </div>

        <form className="space-y-4">
          {furniture.map((item) => (
            <label
              key={item.id}
              className="flex items-center gap-3 p-3 border border-border rounded-lg hover:bg-muted transition-colors cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selected.includes(item.id)}
                onChange={() => toggleFurniture(item.id)}
                className="w-5 h-5 rounded accent-primary cursor-pointer"
              />
              <span className="text-foreground font-medium">{item.label}</span>
            </label>
          ))}
        </form>

        <p className="text-sm text-muted-foreground">Más adelante podrás ajustar la posición con más detalle.</p>

        <Link
          href="/medicion"
          className="block w-full bg-primary text-primary-foreground py-3 px-4 rounded-lg font-semibold text-center hover:opacity-90 transition-opacity active:opacity-75"
        >
          Continuar
        </Link>

        <div className="text-center">
          <Link href="/disposicion" className="text-sm text-primary hover:underline">
            Volver
          </Link>
        </div>
      </div>
    </main>
  )
}
