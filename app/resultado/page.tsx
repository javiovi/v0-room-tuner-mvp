"use client"

import Link from "next/link"
import { CenteredLayout } from "@/components/CenteredLayout"
import { PrimaryButton } from "@/components/PrimaryButton"

export default function ResultadoPage() {
  return (
    <CenteredLayout>
      <div className="space-y-2 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground text-balance">Resultados iniciales</h1>
        <p className="text-base text-muted-foreground">Primer diagnóstico basado en los datos que ingresaste</p>
      </div>

      <div className="bg-card rounded-3xl p-6 space-y-3 shadow-sm border border-border/60">
        <h2 className="text-lg font-semibold text-foreground">Diagnóstico general</h2>
        <p className="text-foreground text-base leading-relaxed">
          Tu sala parece estar <span className="font-semibold">bastante viva</span> con algunas reflexiones fuertes.
        </p>
        <p className="text-sm text-muted-foreground">
          Objetivo seleccionado: <span className="font-medium text-foreground">Escuchar música</span>
        </p>
      </div>

      <div className="space-y-6">
        {/* Free changes */}
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-foreground">Cambios sin gastar dinero</h3>
          <div className="bg-card/50 rounded-2xl p-5 border border-border/40 space-y-3">
            <div className="flex gap-3">
              <span className="text-primary text-lg font-bold leading-none mt-0.5">•</span>
              <span className="text-foreground leading-relaxed text-sm">
                Probá mover el punto de escucha unos 30–50 cm hacia adelante desde la pared trasera.
              </span>
            </div>
            <div className="flex gap-3">
              <span className="text-primary text-lg font-bold leading-none mt-0.5">•</span>
              <span className="text-foreground leading-relaxed text-sm">
                Separá los parlantes al menos 30 cm de la pared si es posible.
              </span>
            </div>
            <div className="flex gap-3">
              <span className="text-primary text-lg font-bold leading-none mt-0.5">•</span>
              <span className="text-foreground leading-relaxed text-sm">
                Intentá formar un triángulo equilátero entre vos y los parlantes.
              </span>
            </div>
          </div>
        </div>

        {/* Low budget changes */}
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-foreground">Cambios con bajo presupuesto</h3>
          <div className="bg-card/50 rounded-2xl p-5 border border-border/40 space-y-3">
            <div className="flex gap-3">
              <span className="text-primary text-lg font-bold leading-none mt-0.5">•</span>
              <span className="text-foreground leading-relaxed text-sm">
                Agregar una alfombra entre vos y los parlantes para reducir reflexiones del piso.
              </span>
            </div>
            <div className="flex gap-3">
              <span className="text-primary text-lg font-bold leading-none mt-0.5">•</span>
              <span className="text-foreground leading-relaxed text-sm">
                Usar cortinas más gruesas en las ventanas para absorber frecuencias medias y altas.
              </span>
            </div>
            <div className="flex gap-3">
              <span className="text-primary text-lg font-bold leading-none mt-0.5">•</span>
              <span className="text-foreground leading-relaxed text-sm">
                Colocar estanterías con libros en las paredes laterales para difusión del sonido.
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-2 border-dashed border-border/60 rounded-3xl p-12 text-center bg-muted/20">
        <p className="text-muted-foreground text-sm leading-relaxed">
          Aquí más adelante mostraremos un esquema de tu sala con posiciones sugeridas
        </p>
      </div>

      <div className="space-y-4 pt-2">
        <PrimaryButton type="button">Guardar este proyecto</PrimaryButton>

        <div className="text-center pt-2">
          <Link href="/" className="text-sm text-primary hover:text-primary/80 transition-colors font-medium">
            Volver al inicio
          </Link>
        </div>
      </div>
    </CenteredLayout>
  )
}
