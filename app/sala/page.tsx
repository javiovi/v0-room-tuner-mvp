"use client"

import type React from "react"

import Link from "next/link"
import { useState } from "react"

export default function SalaPage() {
  const [formData, setFormData] = useState({
    largo: "",
    ancho: "",
    altura: "",
    tipoPiso: "",
    tipoParedes: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="max-w-xl w-full space-y-6">
        <Link href="/objetivo" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          ← Volver
        </Link>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground text-pretty">Contanos sobre tu sala</h1>
          <p className="text-base text-muted-foreground">
            No hace falta que las medidas sean perfectas, aproximadas está bien.
          </p>
        </div>

        <form className="space-y-4">
          <div>
            <label htmlFor="largo" className="block text-sm font-medium text-foreground mb-1">
              Largo (m)
            </label>
            <input
              type="text"
              id="largo"
              name="largo"
              value={formData.largo}
              onChange={handleChange}
              placeholder="ej: 5"
              className="w-full border border-input rounded-lg px-3 py-2 text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div>
            <label htmlFor="ancho" className="block text-sm font-medium text-foreground mb-1">
              Ancho (m)
            </label>
            <input
              type="text"
              id="ancho"
              name="ancho"
              value={formData.ancho}
              onChange={handleChange}
              placeholder="ej: 4"
              className="w-full border border-input rounded-lg px-3 py-2 text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div>
            <label htmlFor="altura" className="block text-sm font-medium text-foreground mb-1">
              Altura (m)
            </label>
            <input
              type="text"
              id="altura"
              name="altura"
              value={formData.altura}
              onChange={handleChange}
              placeholder="ej: 2.7"
              className="w-full border border-input rounded-lg px-3 py-2 text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div>
            <label htmlFor="tipoPiso" className="block text-sm font-medium text-foreground mb-1">
              Tipo de piso
            </label>
            <select
              id="tipoPiso"
              name="tipoPiso"
              value={formData.tipoPiso}
              onChange={handleChange}
              className="w-full border border-input rounded-lg px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Selecciona una opción</option>
              <option value="madera">Madera</option>
              <option value="ceramico">Cerámico</option>
              <option value="alfombra">Alfombra</option>
              <option value="otro">Otro</option>
            </select>
          </div>

          <div>
            <label htmlFor="tipoParedes" className="block text-sm font-medium text-foreground mb-1">
              Tipo de paredes
            </label>
            <select
              id="tipoParedes"
              name="tipoParedes"
              value={formData.tipoParedes}
              onChange={handleChange}
              className="w-full border border-input rounded-lg px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Selecciona una opción</option>
              <option value="desnudas">Desnudas</option>
              <option value="cuadros">Con cuadros</option>
              <option value="bibliotecas">Con bibliotecas</option>
              <option value="mixto">Mixto</option>
            </select>
          </div>
        </form>

        <Link
          href="/disposicion"
          className="block w-full bg-primary text-primary-foreground py-3 px-4 rounded-lg font-semibold text-center hover:opacity-90 transition-opacity active:opacity-75"
        >
          Continuar
        </Link>
      </div>
    </main>
  )
}
