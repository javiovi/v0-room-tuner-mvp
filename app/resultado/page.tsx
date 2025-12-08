"use client"

import Link from "next/link"

export default function ResultadoPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="max-w-xl w-full space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground text-pretty">Resultados iniciales para tu sala</h1>
          <p className="text-base text-muted-foreground">
            Este es un primer diagnóstico basado en los datos que ingresaste.
          </p>
        </div>

        {/* Quick summary section */}
        <div className="bg-muted rounded-lg p-4 space-y-2">
          <p className="text-foreground font-medium">
            Tu sala parece estar: bastante viva / con algunas reflexiones fuertes.
          </p>
          <p className="text-sm text-muted-foreground">Objetivo seleccionado: Escuchar música</p>
        </div>

        {/* Free changes section */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">Cambios sin gastar dinero</h2>
          <ul className="space-y-2">
            <li className="flex gap-3">
              <span className="text-primary mt-1.5">•</span>
              <span className="text-foreground leading-relaxed">
                Probá mover el punto de escucha unos 30–50 cm hacia adelante desde la pared trasera.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary mt-1.5">•</span>
              <span className="text-foreground leading-relaxed">
                Separá los parlantes al menos 30 cm de la pared si es posible.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary mt-1.5">•</span>
              <span className="text-foreground leading-relaxed">
                Intentá formar un triángulo equilátero entre vos y los parlantes.
              </span>
            </li>
          </ul>
        </div>

        {/* Low budget changes section */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">Cambios con bajo presupuesto</h2>
          <ul className="space-y-2">
            <li className="flex gap-3">
              <span className="text-primary mt-1.5">•</span>
              <span className="text-foreground leading-relaxed">
                Agregar una alfombra entre vos y los parlantes para reducir reflexiones del piso.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary mt-1.5">•</span>
              <span className="text-foreground leading-relaxed">
                Usar cortinas más gruesas en las ventanas para absorber frecuencias medias y altas.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary mt-1.5">•</span>
              <span className="text-foreground leading-relaxed">
                Colocar estanterías con libros en las paredes laterales para difusión del sonido.
              </span>
            </li>
          </ul>
        </div>

        {/* Room diagram placeholder */}
        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
          <p className="text-muted-foreground">
            Aquí más adelante mostraremos un esquema de tu sala con posiciones sugeridas.
          </p>
        </div>

        {/* Action buttons */}
        <div className="space-y-3">
          <button className="w-full bg-primary text-primary-foreground py-3 px-4 rounded-lg font-semibold hover:opacity-90 transition-opacity active:opacity-75">
            Guardar este proyecto
          </button>

          <Link
            href="/"
            className="block text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </main>
  )
}
