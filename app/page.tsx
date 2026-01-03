"use client"

import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container max-w-4xl mx-auto px-4 py-12 md:py-20">
        <div className="text-center space-y-6">
          {/* Badge */}
          <div className="flex justify-center">
            <span className="inline-flex items-center bg-black text-primary px-3 py-1 text-[10px] uppercase tracking-[0.2em] border-2 border-primary">
              BETA // ANÁLISIS ACÚSTICO
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl md:text-5xl font-bold text-primary glow-text leading-tight font-mono">
            {"> "}Optimizá la acústica
            <br />
            de tu sala
          </h1>

          {/* Subtitle */}
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Análisis profesional en <span className="text-accent font-bold">5 minutos</span>. Sin registro, sin
            tarjeta, sin spam.
            <br />
            Descubrí qué le falta a tu sala para sonar mejor y cuánto te costaría arreglarlo.
          </p>

          {/* Primary CTA */}
          <div className="pt-4">
            <Link
              href="/objetivo"
              className="inline-flex items-center justify-center bg-primary text-primary-foreground py-4 px-8 font-bold uppercase text-sm tracking-wide border-black hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all"
              style={{
                borderWidth: "3px",
                borderStyle: "solid",
                boxShadow: "4px 4px 0 0 rgba(0,0,0,1)",
              }}
            >
              [ANALIZAR MI SALA GRATIS]
            </Link>
            <p className="text-[11px] text-muted-foreground mt-3">100% gratis • Sin registro • 5 minutos</p>
          </div>

          {/* Visual Preview */}
          <div className="pt-8">
            <div
              className="border-primary/50 bg-card p-4 max-w-2xl mx-auto"
              style={{ borderWidth: "3px", borderStyle: "solid" }}
            >
              <div className="aspect-video bg-muted/30 border-2 border-muted-foreground/20 flex items-center justify-center">
                <span className="text-muted-foreground text-xs uppercase tracking-wide">
                  [Preview del informe aquí]
                </span>
              </div>
              <p className="text-[10px] text-muted-foreground text-center mt-2">
                Ejemplo de análisis completo con métricas reales
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container max-w-4xl mx-auto px-4 py-12 border-t border-muted-foreground/20">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-primary font-mono mb-2">[¿CÓMO FUNCIONA?]</h2>
          <p className="text-sm text-muted-foreground">Tres pasos simples para optimizar tu sala</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="border-2 border-accent/30 bg-card p-6 space-y-3">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-accent text-black font-bold text-xl border-2 border-black">
              01
            </div>
            <h3 className="text-lg font-bold text-accent uppercase tracking-wide">Medí tu sala</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Dimensiones aproximadas (no hace falta ser exacto). Podés usar pasos o medir con el celu.
            </p>
          </div>

          {/* Step 2 */}
          <div className="border-2 border-accent/30 bg-card p-6 space-y-3">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-accent text-black font-bold text-xl border-2 border-black">
              02
            </div>
            <h3 className="text-lg font-bold text-accent uppercase tracking-wide">Respondé</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              5 preguntas sobre materiales, ubicación de equipos y muebles. Toma menos de 3 minutos.
            </p>
          </div>

          {/* Step 3 */}
          <div className="border-2 border-accent/30 bg-card p-6 space-y-3">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-accent text-black font-bold text-xl border-2 border-black">
              03
            </div>
            <h3 className="text-lg font-bold text-accent uppercase tracking-wide">Obtenés</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Análisis completo con cálculos acústicos reales, diagrama interactivo y recomendaciones.
            </p>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="container max-w-4xl mx-auto px-4 py-12 border-t border-muted-foreground/20">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-primary font-mono mb-2">[QUÉ VAS A OBTENER]</h2>
          <p className="text-sm text-muted-foreground">Tu informe personalizado incluye</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex gap-3 items-start">
            <span className="text-primary font-bold text-lg flex-shrink-0">[✓]</span>
            <div>
              <h4 className="text-sm font-bold text-foreground">Análisis acústico profesional</h4>
              <p className="text-xs text-muted-foreground">RT60, modos de sala, respuesta de frecuencia</p>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <span className="text-primary font-bold text-lg flex-shrink-0">[✓]</span>
            <div>
              <h4 className="text-sm font-bold text-foreground">Diagrama interactivo 2D</h4>
              <p className="text-xs text-muted-foreground">Arrastrá parlantes y optimizá tu setup</p>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <span className="text-primary font-bold text-lg flex-shrink-0">[✓]</span>
            <div>
              <h4 className="text-sm font-bold text-foreground">Recomendaciones personalizadas</h4>
              <p className="text-xs text-muted-foreground">Cambios gratis, bajo presupuesto y avanzados</p>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <span className="text-primary font-bold text-lg flex-shrink-0">[✓]</span>
            <div>
              <h4 className="text-sm font-bold text-foreground">Precios reales en ARS/USD</h4>
              <p className="text-xs text-muted-foreground">Productos reales con links y presupuesto estimado</p>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <span className="text-primary font-bold text-lg flex-shrink-0">[✓]</span>
            <div>
              <h4 className="text-sm font-bold text-foreground">Plan de acción priorizado</h4>
              <p className="text-xs text-muted-foreground">Qué hacer primero para máximo impacto</p>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <span className="text-primary font-bold text-lg flex-shrink-0">[✓]</span>
            <div>
              <h4 className="text-sm font-bold text-foreground">Exportable a PDF</h4>
              <p className="text-xs text-muted-foreground">Guardá e imprimí tu análisis completo</p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="container max-w-4xl mx-auto px-4 py-12 border-t border-muted-foreground/20">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-primary font-mono mb-2">[PARA QUÉ SIRVE]</h2>
          <p className="text-sm text-muted-foreground">Optimizá tu sala según tu uso</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {/* Music */}
          <div className="border-2 border-primary/30 bg-card p-5 space-y-2 text-center">
            <div className="text-4xl">🎵</div>
            <h3 className="text-sm font-bold text-primary uppercase">Escuchar Música</h3>
            <p className="text-xs text-muted-foreground">
              Balance stereo perfecto, control de graves, sweet spot optimizado
            </p>
          </div>

          {/* Instrument */}
          <div className="border-2 border-primary/30 bg-card p-5 space-y-2 text-center">
            <div className="text-4xl">🎸</div>
            <h3 className="text-sm font-bold text-primary uppercase">Tocar Instrumento</h3>
            <p className="text-xs text-muted-foreground">
              Acústica viva pero controlada, sin ecos molestos, monitoreo claro
            </p>
          </div>

          {/* Work */}
          <div className="border-2 border-primary/30 bg-card p-5 space-y-2 text-center">
            <div className="text-4xl">💼</div>
            <h3 className="text-sm font-bold text-primary uppercase">Trabajar/Estudiar</h3>
            <p className="text-xs text-muted-foreground">
              Sala seca para concentración, control de ruido, calls más claras
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container max-w-4xl mx-auto px-4 py-16 border-t border-muted-foreground/20">
        <div
          className="border-primary bg-card p-8 md:p-12 text-center space-y-6"
          style={{ borderWidth: "3px", borderStyle: "solid" }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-primary font-mono">
            [LISTO PARA OPTIMIZAR TU SALA?]
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto">
            Empezá ahora y en 5 minutos tenés tu análisis completo. Sin costos ocultos, sin trucos.
          </p>
          <div>
            <Link
              href="/objetivo"
              className="inline-flex items-center justify-center bg-primary text-primary-foreground py-4 px-8 font-bold uppercase text-sm tracking-wide border-black hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all"
              style={{
                borderWidth: "3px",
                borderStyle: "solid",
                boxShadow: "4px 4px 0 0 rgba(0,0,0,1)",
              }}
            >
              [EMPEZAR ANÁLISIS GRATIS]
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-xs text-muted-foreground pt-4">
            <span className="flex items-center gap-1">
              <span className="text-accent">✓</span> Sin registro
            </span>
            <span className="flex items-center gap-1">
              <span className="text-accent">✓</span> Sin tarjeta
            </span>
            <span className="flex items-center gap-1">
              <span className="text-accent">✓</span> 5 minutos
            </span>
            <span className="flex items-center gap-1">
              <span className="text-accent">✓</span> 100% gratis
            </span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container max-w-4xl mx-auto px-4 py-8 border-t border-muted-foreground/20">
        <div className="text-center space-y-2">
          <p className="text-xs text-muted-foreground">
            RoomTuner • Análisis acústico interactivo
          </p>
          <p className="text-[10px] text-muted-foreground/70">
            Beta experimental. Los cálculos son estimaciones basadas en fórmulas acústicas estándar.
          </p>
        </div>
      </footer>
    </div>
  )
}
