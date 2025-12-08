"use client"

import Link from "next/link"
import { useState } from "react"
import { CenteredLayout } from "@/components/CenteredLayout"

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
    <CenteredLayout>
      <div className="space-y-3">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground text-balance">Muebles principales de tu sala</h1>
        <p className="text-base text-muted-foreground">Marcá qué tenés en la sala. No hace falta ser exacto.</p>
      </div>

      <form className="space-y-3">
        {furniture.map((item) => (
          <label
            key={item.id}
            className="flex items-center gap-4 p-4 border border-border/60 rounded-2xl bg-card hover:bg-muted/50 transition-all cursor-pointer shadow-sm"
          >
            <input
              type="checkbox"
              checked={selected.includes(item.id)}
              onChange={() => toggleFurniture(item.id)}
              className="w-5 h-5 rounded-lg accent-primary cursor-pointer"
            />
            <span className="text-foreground font-medium text-base">{item.label}</span>
          </label>
        ))}
      </form>

      <p className="text-sm text-muted-foreground text-center">
        Más adelante podrás ajustar la posición con más detalle.
      </p>

      <Link
        href="/medicion"
        className="block w-full bg-primary text-primary-foreground py-4 px-6 rounded-full font-semibold text-center hover:opacity-90 transition-all active:scale-[0.98] shadow-sm"
      >
        Continuar
      </Link>

      <div className="text-center">
        <Link href="/disposicion" className="text-sm text-primary hover:text-primary/80 transition-colors">
          Volver
        </Link>
      </div>
    </CenteredLayout>
  )
}
