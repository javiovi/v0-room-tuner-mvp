"use client"

import type { EnhancedAnalysisResponse } from "@/app/types/room"

interface RoomMetricsCardProps {
  metrics: EnhancedAnalysisResponse["roomMetrics"]
  roomCharacter: "viva" | "equilibrada" | "seca"
}

export function RoomMetricsCard({ metrics, roomCharacter }: RoomMetricsCardProps) {
  const characterColors = {
    viva: "text-yellow-400",
    equilibrada: "text-primary",
    seca: "text-blue-400",
  }

  const characterLabels = {
    viva: "VIVA (Reverberante)",
    equilibrada: "EQUILIBRADA",
    seca: "SECA (Absorbente)",
  }

  return (
    <div
      className="border-primary bg-card p-5 space-y-4"
      style={{ borderWidth: "3px", borderStyle: "solid" }}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold text-accent uppercase tracking-wide">
          [MÉTRICAS DE SALA]
        </h2>
        <span className={`text-xs font-bold uppercase tracking-wide ${characterColors[roomCharacter]}`}>
          {characterLabels[roomCharacter]}
        </span>
      </div>

      {/* Dimensiones y Volumen */}
      <div className="grid grid-cols-2 gap-3">
        <MetricItem label="Volumen" value={`${metrics.volume.toFixed(1)} m³`} />
        <MetricItem label="Área de piso" value={`${metrics.floorArea.toFixed(1)} m²`} />
        <MetricItem label="Área de paredes" value={`${metrics.wallArea.toFixed(1)} m²`} />
        <MetricItem label="Área total" value={`${metrics.surfaceArea.toFixed(1)} m²`} />
      </div>

      {/* RT60 */}
      <div
        className="border-t border-muted-foreground/30 pt-3 mt-3 space-y-2"
      >
        <h3 className="text-xs font-semibold text-foreground uppercase tracking-wide">
          Tiempo de Reverberación (RT60)
        </h3>
        <div className="grid grid-cols-3 gap-2">
          <RT60Badge label="Graves" value={metrics.rt60Estimate.low} />
          <RT60Badge label="Medios" value={metrics.rt60Estimate.mid} />
          <RT60Badge label="Agudos" value={metrics.rt60Estimate.high} />
        </div>
        <EvaluationBadge evaluation={metrics.rt60Evaluation} />
      </div>

      {/* Ratios */}
      <div
        className="border-t border-muted-foreground/30 pt-3 mt-3 space-y-2"
      >
        <h3 className="text-xs font-semibold text-foreground uppercase tracking-wide">
          Proporciones
        </h3>
        <div className="grid grid-cols-3 gap-2 text-[10px]">
          <div className="text-center">
            <div className="text-muted-foreground">L:W</div>
            <div className="text-primary font-bold font-mono">{metrics.ratios.lengthWidth.toFixed(2)}</div>
          </div>
          <div className="text-center">
            <div className="text-muted-foreground">L:H</div>
            <div className="text-primary font-bold font-mono">{metrics.ratios.lengthHeight.toFixed(2)}</div>
          </div>
          <div className="text-center">
            <div className="text-muted-foreground">W:H</div>
            <div className="text-primary font-bold font-mono">{metrics.ratios.widthHeight.toFixed(2)}</div>
          </div>
        </div>
        <div className={`text-[10px] text-center mt-2 ${
          metrics.ratios.rating === "good" ? "text-primary" :
          metrics.ratios.rating === "acceptable" ? "text-yellow-400" :
          "text-destructive"
        }`}>
          {metrics.ratios.message}
        </div>
      </div>

      {/* Modos problemáticos */}
      {metrics.roomModes.filter(m => m.severity === "high" && m.frequency < 300).length > 0 && (
        <div
          className="border-t border-muted-foreground/30 pt-3 mt-3 space-y-2"
        >
          <h3 className="text-xs font-semibold text-destructive uppercase tracking-wide">
            ⚠ Modos Problemáticos
          </h3>
          <div className="space-y-1">
            {metrics.roomModes
              .filter(m => m.severity === "high" && m.frequency < 300)
              .slice(0, 5)
              .map((mode, i) => (
                <div key={i} className="flex items-center justify-between text-[10px]">
                  <span className="text-muted-foreground">{mode.description}</span>
                  <span className="text-destructive font-bold font-mono">
                    {mode.frequency.toFixed(0)} Hz
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Helper components
function MetricItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <div className="text-[10px] text-muted-foreground uppercase tracking-wide">{label}</div>
      <div className="text-lg font-bold text-primary font-mono">{value}</div>
    </div>
  )
}

function RT60Badge({ label, value }: { label: string; value: number }) {
  // Color code based on RT60 value
  const getColor = (rt60: number) => {
    if (rt60 < 0.2) return "text-blue-400" // Too dead
    if (rt60 < 0.3) return "text-primary" // Good for work
    if (rt60 < 0.6) return "text-primary" // Good for music
    if (rt60 < 0.8) return "text-yellow-400" // A bit live
    return "text-destructive" // Too live
  }

  return (
    <div className="text-center space-y-1">
      <div className="text-[10px] text-muted-foreground uppercase">{label}</div>
      <div className={`text-sm font-bold font-mono ${getColor(value)}`}>
        {value.toFixed(2)}s
      </div>
    </div>
  )
}

function EvaluationBadge({
  evaluation
}: {
  evaluation: { rating: string; message: string }
}) {
  const colors = {
    good: "border-primary text-primary",
    acceptable: "border-yellow-400 text-yellow-400",
    problematic: "border-destructive text-destructive",
  }

  const icons = {
    good: "✓",
    acceptable: "!",
    problematic: "⚠",
  }

  const colorClass = colors[evaluation.rating as keyof typeof colors] || colors.acceptable

  return (
    <div
      className={`border-2 ${colorClass} p-2 text-center text-[10px] uppercase tracking-wide`}
    >
      <span className="mr-1">{icons[evaluation.rating as keyof typeof icons]}</span>
      {evaluation.message}
    </div>
  )
}
