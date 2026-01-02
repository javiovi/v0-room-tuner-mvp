"use client"

import Link from "next/link"
import { CenteredLayout } from "@/components/CenteredLayout"
import { PrimaryButton } from "@/components/PrimaryButton"
import { useRoomStore } from "@/lib/roomStore"

export default function ResultadoPage() {
  const analysis = useRoomStore((s) => s.analysis)
  const project = useRoomStore((s) => s.project)

  // 🛡️ Si no hay análisis, mostramos un fallback en vez de explotar
  if (!analysis) {
    return (
      <CenteredLayout>
        <div className="space-y-4 text-center">
          <h1 className="text-lg md:text-xl font-bold text-primary glow-text font-mono">
            {"> "}Aún no hay análisis
          </h1>
          <p className="text-sm text-muted-foreground">
            No pudimos cargar el resultado de tu sala. Probá volver a ejecutar el análisis o regresar al inicio.
          </p>
          <div className="pt-2">
            <Link
              href="/"
              className="text-xs text-accent hover:text-primary transition-colors uppercase tracking-wide"
            >
              {"<"} VOLVER AL INICIO
            </Link>
          </div>
        </div>
      </CenteredLayout>
    )
  }

  const { freeChanges, lowBudgetChanges } = analysis

  return (
    <CenteredLayout>
      <div className="space-y-2 text-center">
        <h1 className="text-lg md:text-xl font-bold text-primary glow-text font-mono">
          {"> "}Resultados iniciales
        </h1>
        <p className="text-xs text-muted-foreground uppercase tracking-wide">
          {"// "}Diagnóstico basado en los datos ingresados
        </p>
      </div>

      <div
        className="border-primary bg-card p-4 space-y-3 glow-border"
        style={{ borderWidth: "3px", borderStyle: "solid" }}
      >
        <h2 className="text-sm font-semibold text-accent uppercase tracking-wide">[DIAGNÓSTICO GENERAL]</h2>
        <p className="text-foreground text-sm leading-relaxed">{analysis.summary}</p>
        <p className="text-xs text-muted-foreground border-t border-muted-foreground/30 pt-2 mt-2">
          Objetivo:{" "}
          <span className="text-accent">
            {project.goal === "music"
              ? "Escuchar música"
              : project.goal === "instrument"
                ? "Tocar instrumento"
                : project.goal === "work"
                  ? "Trabajar / concentrarme"
                  : "Sin objetivo definido"}
          </span>
        </p>
      </div>

      <div className="space-y-4">
        {/* Bloque cambios sin gastar */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-primary uppercase tracking-wide">
            {">"} {freeChanges?.title ?? "Cambios sin gastar dinero"}
          </h3>
          <div
            className="border-primary/30 bg-card p-4 space-y-2"
            style={{ borderWidth: "2px", borderStyle: "solid" }}
          >
            {(freeChanges?.items ?? []).map((tip, index) => (
              <div key={index} className="flex gap-2">
                <span className="text-accent text-xs font-bold">
                  [{String(index + 1).padStart(2, "0")}]
                </span>
                <span className="text-foreground text-xs leading-relaxed">{tip}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bloque cambios bajo presupuesto */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-yellow-400 uppercase tracking-wide">
            {">"} {lowBudgetChanges?.title ?? "Cambios con bajo presupuesto"}
          </h3>
          <div
            className="border-yellow-400/30 bg-card p-4 space-y-2"
            style={{ borderWidth: "2px", borderStyle: "solid" }}
          >
            {(lowBudgetChanges?.items ?? []).map((tip, index) => (
              <div key={index} className="flex gap-2">
                <span className="text-yellow-400 text-xs font-bold">
                  [{String(index + 1).padStart(2, "0")}]
                </span>
                <span className="text-foreground text-xs leading-relaxed">{tip}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className="border-dashed border-muted-foreground/50 p-8 text-center bg-muted/20"
        style={{ borderWidth: "3px" }}
      >
        <p className="text-muted-foreground text-xs uppercase tracking-wide">
          {"// "}Esquema de sala [PRÓXIMAMENTE]
        </p>
      </div>

      <div className="space-y-3 pt-2">
        <PrimaryButton type="button">[GUARDAR PROYECTO]</PrimaryButton>

        <div className="text-center pt-2">
          <Link
            href="/"
            className="text-xs text-accent hover:text-primary transition-colors uppercase tracking-wide"
          >
            {"<"} VOLVER AL INICIO
          </Link>
        </div>
      </div>
    </CenteredLayout>
  )
}
