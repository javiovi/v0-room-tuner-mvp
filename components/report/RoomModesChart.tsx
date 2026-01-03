"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import type { RoomMode } from "@/app/types/room"

interface RoomModesChartProps {
  modes: RoomMode[]
}

export function RoomModesChart({ modes }: RoomModesChartProps) {
  // Only show modes below 300Hz (most problematic for small rooms)
  const displayModes = modes
    .filter(m => m.frequency < 300)
    .slice(0, 15) // Limit to first 15 modes for readability

  // Color code by severity
  const getColor = (severity: RoomMode["severity"]) => {
    switch (severity) {
      case "high":
        return "#ff3366" // destructive
      case "medium":
        return "#ffcc00" // accent/yellow
      case "low":
        return "#ff9500" // primary
      default:
        return "#ff9500"
    }
  }

  return (
    <div
      className="border-primary/50 bg-card p-5 space-y-3"
      style={{ borderWidth: "3px", borderStyle: "solid" }}
    >
      <h2 className="text-sm font-bold text-accent uppercase tracking-wide">
        [MODOS DE SALA]
      </h2>

      <p className="text-[10px] text-muted-foreground">
        Frecuencias donde la sala resuena naturalmente. Modos problemáticos causan picos y valles en graves.
      </p>

      <div className="w-full h-64 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={displayModes}
            margin={{ top: 5, right: 20, left: 0, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis
              dataKey="frequency"
              stroke="#64748b"
              style={{
                fontSize: '10px',
                fontFamily: 'monospace',
                fill: '#64748b',
              }}
              label={{
                value: 'Frecuencia (Hz)',
                position: 'insideBottom',
                offset: -15,
                style: { fontSize: '10px', fill: '#64748b' }
              }}
              tickFormatter={(value) => Math.round(value).toString()}
            />
            <YAxis
              stroke="#64748b"
              style={{
                fontSize: '10px',
                fontFamily: 'monospace',
                fill: '#64748b',
              }}
              label={{
                value: 'Intensidad',
                angle: -90,
                position: 'insideLeft',
                style: { fontSize: '10px', fill: '#64748b' }
              }}
              domain={[0, 3]}
              ticks={[0, 1, 2, 3]}
              tickFormatter={(value) => {
                const labels = ["", "Baja", "Media", "Alta"]
                return labels[value] || ""
              }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#1e293b' }} />
            <Bar dataKey="severityValue" radius={[4, 4, 0, 0]}>
              {displayModes.map((mode, index) => (
                <Cell key={`cell-${index}`} fill={getColor(mode.severity)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 text-[10px] text-muted-foreground pt-2 border-t border-muted-foreground/30">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-destructive"></div>
          <span>Alta severidad</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-accent"></div>
          <span>Media severidad</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-primary"></div>
          <span>Baja severidad</span>
        </div>
      </div>

      {/* Mode type breakdown */}
      <div className="grid grid-cols-3 gap-2 mt-3">
        {(['length', 'width', 'height'] as const).map((dimension) => {
          const count = displayModes.filter(m => m.dimension === dimension).length
          const labels = {
            length: 'Longitudinales',
            width: 'Transversales',
            height: 'Verticales'
          }
          return (
            <div
              key={dimension}
              className="text-center p-2 border border-muted-foreground/30 bg-muted/20"
            >
              <div className="text-[10px] text-muted-foreground uppercase">{labels[dimension]}</div>
              <div className="text-lg font-bold text-primary font-mono">{count}</div>
            </div>
          )
        })}
      </div>

      {/* Critical modes warning */}
      {displayModes.filter(m => m.severity === "high").length > 0 && (
        <div className="mt-3 p-3 border-2 border-destructive/30 bg-destructive/5">
          <h3 className="text-[10px] font-bold text-destructive uppercase tracking-wide mb-2">
            ⚠ Modos críticos (requieren tratamiento):
          </h3>
          <div className="space-y-1">
            {displayModes
              .filter(m => m.severity === "high")
              .map((mode, i) => (
                <div key={i} className="flex items-center justify-between text-[10px]">
                  <span className="text-muted-foreground">{mode.description}</span>
                  <span className="text-destructive font-bold font-mono">
                    {mode.frequency.toFixed(0)} Hz
                  </span>
                </div>
              ))}
          </div>
          <p className="text-[10px] text-muted-foreground mt-2">
            Solución: Trampas de graves en esquinas y tratamiento de bajas frecuencias.
          </p>
        </div>
      )}
    </div>
  )
}

// Transform severity to numeric value for chart
function severityToValue(severity: RoomMode["severity"]): number {
  switch (severity) {
    case "high":
      return 3
    case "medium":
      return 2
    case "low":
      return 1
    default:
      return 1
  }
}

// Add severityValue to modes for charting
const modesWithValue = (modes: RoomMode[]) =>
  modes.map(m => ({
    ...m,
    severityValue: severityToValue(m.severity)
  }))

// Custom tooltip
function CustomTooltip({ active, payload }: any) {
  if (!active || !payload || !payload[0]) return null

  const mode = payload[0].payload as RoomMode

  const severityLabels = {
    high: "Alta",
    medium: "Media",
    low: "Baja"
  }

  const dimensionLabels = {
    length: "Longitudinal",
    width: "Transversal",
    height: "Vertical",
    mixed: "Mixto"
  }

  return (
    <div className="bg-card border-2 border-primary p-3 shadow-lg space-y-1">
      <p className="text-xs font-bold text-primary font-mono">
        {mode.frequency.toFixed(1)} Hz
      </p>
      <p className="text-[10px] text-foreground">
        {mode.description}
      </p>
      <p className="text-[10px] text-muted-foreground">
        Tipo: {dimensionLabels[mode.dimension]}
      </p>
      <p className={`text-[10px] font-bold ${
        mode.severity === "high" ? "text-destructive" :
        mode.severity === "medium" ? "text-accent" :
        "text-primary"
      }`}>
        Severidad: {severityLabels[mode.severity]}
      </p>
    </div>
  )
}
