"use client"

import type React from "react"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

import { CenteredLayout } from "@/components/CenteredLayout"
import { PrimaryButton } from "@/components/PrimaryButton"

export default function SalaPage() {
  const router = useRouter()
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

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Save formData to global store
    router.push("/disposicion")
  }

  return (
    <CenteredLayout>
      <Link
        href="/objetivo"
        className="text-sm text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
      >
        ← Volver
      </Link>

      <div className="space-y-3">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground text-balance">Contanos sobre tu sala</h1>
        <p className="text-base text-muted-foreground">
          No hace falta que las medidas sean perfectas, aproximadas está bien.
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleContinue}>
        <div>
          <label htmlFor="largo" className="block text-sm font-medium text-foreground mb-2">
            Largo (m)
          </label>
          <input
            type="text"
            id="largo"
            name="largo"
            value={formData.largo}
            onChange={handleChange}
            placeholder="ej: 5"
            className="w-full border border-border/60 rounded-2xl px-4 py-3.5 text-base bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
          />
        </div>

        <div>
          <label htmlFor="ancho" className="block text-sm font-medium text-foreground mb-2">
            Ancho (m)
          </label>
          <input
            type="text"
            id="ancho"
            name="ancho"
            value={formData.ancho}
            onChange={handleChange}
            placeholder="ej: 4"
            className="w-full border border-border/60 rounded-2xl px-4 py-3.5 text-base bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
          />
        </div>

        <div>
          <label htmlFor="altura" className="block text-sm font-medium text-foreground mb-2">
            Altura (m)
          </label>
          <input
            type="text"
            id="altura"
            name="altura"
            value={formData.altura}
            onChange={handleChange}
            placeholder="ej: 2.7"
            className="w-full border border-border/60 rounded-2xl px-4 py-3.5 text-base bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
          />
        </div>

        <div>
          <label htmlFor="tipoPiso" className="block text-sm font-medium text-foreground mb-2">
            Tipo de piso
          </label>
          <select
            id="tipoPiso"
            name="tipoPiso"
            value={formData.tipoPiso}
            onChange={handleChange}
            className="w-full border border-border/60 rounded-2xl px-4 py-3.5 text-base bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm appearance-none"
          >
            <option value="">Selecciona una opción</option>
            <option value="madera">Madera</option>
            <option value="ceramico">Cerámico</option>
            <option value="alfombra">Alfombra</option>
            <option value="otro">Otro</option>
          </select>
        </div>

        <div>
          <label htmlFor="tipoParedes" className="block text-sm font-medium text-foreground mb-2">
            Tipo de paredes
          </label>
          <select
            id="tipoParedes"
            name="tipoParedes"
            value={formData.tipoParedes}
            onChange={handleChange}
            className="w-full border border-border/60 rounded-2xl px-4 py-3.5 text-base bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm appearance-none"
          >
            <option value="">Selecciona una opción</option>
            <option value="desnudas">Desnudas</option>
            <option value="cuadros">Con cuadros</option>
            <option value="bibliotecas">Con bibliotecas</option>
            <option value="mixto">Mixto</option>
          </select>
        </div>

        <PrimaryButton type="submit">Continuar</PrimaryButton>
      </form>
    </CenteredLayout>
  )
}
