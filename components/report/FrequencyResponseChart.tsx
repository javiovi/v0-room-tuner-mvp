"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts"
import type { FrequencyPoint } from "@/app/types/room"

interface FrequencyResponseChartProps {
  data: FrequencyPoint[]
}

export function FrequencyResponseChart({ data }: FrequencyResponseChartProps) {
  return (
    <div
      className="border-primary/50 bg-card p-5 space-y-3"
      style={{ borderWidth: "3px", borderStyle: "solid" }}
    >
      <h2 className="text-sm font-bold text-accent uppercase tracking-wide">
        [RESPUESTA DE FRECUENCIA ESTIMADA]
      </h2>

      <p className="text-[10px] text-muted-foreground">
        Estimación basada en dimensiones y materiales. Picos y valles indican resonancias y cancelaciones.
      </p>

      <div className="w-full h-64 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis
              dataKey="frequency"
              type="number"
              scale="log"
              domain={[20, 20000]}
              ticks={[20, 50, 100, 200, 500, 1000, 2000, 5000, 10000, 20000]}
              tickFormatter={(value) => {
                if (value >= 1000) return `${value / 1000}k`
                return value.toString()
              }}
              stroke="#64748b"
              style={{
                fontSize: '10px',
                fontFamily: 'monospace',
                fill: '#64748b',
              }}
              label={{
                value: 'Frecuencia (Hz)',
                position: 'insideBottom',
                offset: -5,
                style: { fontSize: '10px', fill: '#64748b' }
              }}
            />
            <YAxis
              domain={[-12, 12]}
              ticks={[-12, -6, 0, 6, 12]}
              stroke="#64748b"
              style={{
                fontSize: '10px',
                fontFamily: 'monospace',
                fill: '#64748b',
              }}
              label={{
                value: 'dB',
                angle: -90,
                position: 'insideLeft',
                style: { fontSize: '10px', fill: '#64748b' }
              }}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: '#ff9500', strokeWidth: 1 }}
            />
            {/* Reference line at 0dB */}
            <ReferenceLine y={0} stroke="#ff9500" strokeDasharray="3 3" strokeWidth={1} />
            {/* Problem threshold lines */}
            <ReferenceLine y={6} stroke="#facc15" strokeDasharray="2 2" strokeWidth={1} opacity={0.3} />
            <ReferenceLine y={-6} stroke="#facc15" strokeDasharray="2 2" strokeWidth={1} opacity={0.3} />

            <Line
              type="monotone"
              dataKey="response"
              stroke="#ff9500"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: '#ff9500' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 text-[10px] text-muted-foreground pt-2 border-t border-muted-foreground/30">
        <div className="flex items-center gap-2">
          <div className="w-4 h-0.5 bg-primary"></div>
          <span>Respuesta estimada</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-0.5 bg-primary border-t-2 border-dashed"></div>
          <span>Respuesta plana (0dB)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-0.5 bg-yellow-400 border-t-2 border-dashed opacity-50"></div>
          <span>±6dB (umbral problema)</span>
        </div>
      </div>

      {/* Problem frequencies */}
      {data.filter(d => d.issue).length > 0 && (
        <div className="mt-3 p-3 border-2 border-destructive/30 bg-destructive/5">
          <h3 className="text-[10px] font-bold text-destructive uppercase tracking-wide mb-2">
            Frecuencias problemáticas detectadas:
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {data
              .filter(d => d.issue)
              .slice(0, 6)
              .map((point, i) => (
                <div key={i} className="text-[10px] text-muted-foreground">
                  <span className="font-mono text-destructive font-bold">
                    {point.frequency >= 1000
                      ? `${(point.frequency / 1000).toFixed(1)}kHz`
                      : `${point.frequency}Hz`}
                  </span>
                  : {point.description}
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Custom tooltip component
function CustomTooltip({ active, payload }: any) {
  if (!active || !payload || !payload[0]) return null

  const data = payload[0].payload as FrequencyPoint

  return (
    <div className="bg-card border-2 border-primary p-2 shadow-lg">
      <p className="text-[10px] font-bold text-primary font-mono">
        {data.frequency >= 1000
          ? `${(data.frequency / 1000).toFixed(1)} kHz`
          : `${data.frequency} Hz`}
      </p>
      <p className="text-[10px] text-foreground font-mono">
        {data.response > 0 ? '+' : ''}{data.response.toFixed(1)} dB
      </p>
      {data.issue && data.description && (
        <p className="text-[10px] text-destructive mt-1">
          {data.description}
        </p>
      )}
    </div>
  )
}
