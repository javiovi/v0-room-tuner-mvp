"use client"

import type React from "react"

import Link from "next/link"
import { useState } from "react"

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
    <main className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="max-w-xl w-full space-y-6">
        <Link href="/sala" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          ← Volver
        </Link>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground text-pretty">
            ¿Dónde tenés tu equipo y tu punto de escucha?
          </h1>
          <p className="text-base text-muted-foreground">Elegí la opción que más se parezca a tu situación actual.</p>
        </div>

        <form className="space-y-6">
          <div className="space-y-3">
            <h2 className="text-sm font-medium text-foreground">Ubicación del equipo de sonido</h2>
            <div className="space-y-2">
              {["Frente a la pared larga", "Frente a la pared corta", "Todavía no lo definí"].map((option) => (
                <label
                  key={option}
                  className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-muted transition-colors"
                >
                  <input
                    type="radio"
                    name="ubicacionEquipo"
                    value={option}
                    checked={formData.ubicacionEquipo === option}
                    onChange={handleChange}
                    className="w-4 h-4 accent-primary"
                  />
                  <span className="text-sm text-foreground">{option}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-sm font-medium text-foreground">Dónde te sentás normalmente</h2>
            <div className="space-y-2">
              {["Cerca del centro de la sala", "Pegado a una pared", "En una esquina", "Voy cambiando bastante"].map(
                (option) => (
                  <label
                    key={option}
                    className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-muted transition-colors"
                  >
                    <input
                      type="radio"
                      name="dondeSientas"
                      value={option}
                      checked={formData.dondeSientas === option}
                      onChange={handleChange}
                      className="w-4 h-4 accent-primary"
                    />
                    <span className="text-sm text-foreground">{option}</span>
                  </label>
                ),
              )}
            </div>
          </div>
        </form>

        <Link
          href="/muebles"
          className="block w-full bg-primary text-primary-foreground py-3 px-4 rounded-lg font-semibold text-center hover:opacity-90 transition-opacity active:opacity-75"
        >
          Continuar
        </Link>
      </div>
    </main>
  )
}
