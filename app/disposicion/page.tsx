"use client"

import type React from "react"

import Link from "next/link"
import { useState } from "react"
import { CenteredLayout } from "@/components/CenteredLayout"

export default function DisposicionPage() {
  const [formData, setFormData] = useState({
    ubicacionEquipo: "",
    dondeSientas: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <CenteredLayout>
      <Link
        href="/sala"
        className="text-sm text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
      >
        ← Volver
      </Link>

      <div className="space-y-3">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground text-balance">
          ¿Dónde tenés tu equipo y tu punto de escucha?
        </h1>
        <p className="text-base text-muted-foreground">Elegí la opción que más se parezca a tu situación actual.</p>
      </div>

      <form className="space-y-8">
        <div className="space-y-4">
          <h2 className="text-base font-semibold text-foreground">Ubicación del equipo de sonido</h2>
          <div className="space-y-3">
            {["Frente a la pared larga", "Frente a la pared corta", "Todavía no lo definí"].map((option) => (
              <label
                key={option}
                className="flex items-center gap-4 cursor-pointer p-4 rounded-2xl border border-border/60 bg-card hover:bg-muted/50 transition-all shadow-sm"
              >
                <input
                  type="radio"
                  name="ubicacionEquipo"
                  value={option}
                  checked={formData.ubicacionEquipo === option}
                  onChange={handleChange}
                  className="w-5 h-5 accent-primary cursor-pointer"
                />
                <span className="text-base text-foreground">{option}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-base font-semibold text-foreground">Dónde te sentás normalmente</h2>
          <div className="space-y-3">
            {["Cerca del centro de la sala", "Pegado a una pared", "En una esquina", "Voy cambiando bastante"].map(
              (option) => (
                <label
                  key={option}
                  className="flex items-center gap-4 cursor-pointer p-4 rounded-2xl border border-border/60 bg-card hover:bg-muted/50 transition-all shadow-sm"
                >
                  <input
                    type="radio"
                    name="dondeSientas"
                    value={option}
                    checked={formData.dondeSientas === option}
                    onChange={handleChange}
                    className="w-5 h-5 accent-primary cursor-pointer"
                  />
                  <span className="text-base text-foreground">{option}</span>
                </label>
              ),
            )}
          </div>
        </div>
      </form>

      <Link
        href="/muebles"
        className="block w-full bg-primary text-primary-foreground py-4 px-6 rounded-full font-semibold text-center hover:opacity-90 transition-all active:scale-[0.98] shadow-sm"
      >
        Continuar
      </Link>
    </CenteredLayout>
  )
}
