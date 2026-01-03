"use client"

import type { RoomDiagram as RoomDiagramType } from "@/app/types/room"

interface RoomDiagramProps {
  diagram: RoomDiagramType
}

export function RoomDiagram({ diagram }: RoomDiagramProps) {
  const { floorPlan, treatmentPlan } = diagram
  const { width, length, speakerPositions, listeningPosition } = floorPlan

  // SVG dimensions
  const padding = 40
  const scale = 50 // pixels per meter
  const svgWidth = width * scale + padding * 2
  const svgHeight = length * scale + padding * 2

  // Convert normalized positions (0-1) to SVG coordinates
  const toSvgX = (normalizedX: number) => normalizedX * width * scale + padding
  const toSvgY = (normalizedY: number) => normalizedY * length * scale + padding

  const treatmentColors = {
    absorber: "#ff9500",
    diffuser: "#ffcc00",
    bass_trap: "#ff3366",
  }

  const priorityOpacity = {
    high: 1,
    medium: 0.7,
    low: 0.4,
  }

  return (
    <div
      className="border-primary/50 bg-card p-5 space-y-3"
      style={{ borderWidth: "3px", borderStyle: "solid" }}
    >
      <h2 className="text-sm font-bold text-accent uppercase tracking-wide">
        [DIAGRAMA DE SALA - VISTA SUPERIOR]
      </h2>

      <p className="text-[10px] text-muted-foreground">
        Posiciones recomendadas de parlantes, punto de escucha y tratamiento acústico.
      </p>

      {/* SVG Diagram */}
      <div className="w-full overflow-x-auto">
        <svg
          width={svgWidth}
          height={svgHeight}
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="mx-auto"
          style={{ maxWidth: "100%" }}
        >
          {/* Room outline */}
          <rect
            x={padding}
            y={padding}
            width={width * scale}
            height={length * scale}
            fill="#0b1120"
            stroke="#ff9500"
            strokeWidth="3"
            opacity="0.3"
          />

          {/* Grid lines */}
          <g stroke="#1e293b" strokeWidth="1">
            {Array.from({ length: Math.ceil(width) + 1 }).map((_, i) => (
              <line
                key={`v${i}`}
                x1={padding + i * scale}
                y1={padding}
                x2={padding + i * scale}
                y2={padding + length * scale}
              />
            ))}
            {Array.from({ length: Math.ceil(length) + 1 }).map((_, i) => (
              <line
                key={`h${i}`}
                x1={padding}
                y1={padding + i * scale}
                x2={padding + width * scale}
                y2={padding + i * scale}
              />
            ))}
          </g>

          {/* Dimensions labels */}
          <text
            x={padding + (width * scale) / 2}
            y={padding - 10}
            textAnchor="middle"
            fill="#64748b"
            fontSize="12"
            fontFamily="monospace"
          >
            {width.toFixed(1)}m
          </text>
          <text
            x={padding - 10}
            y={padding + (length * scale) / 2}
            textAnchor="middle"
            fill="#64748b"
            fontSize="12"
            fontFamily="monospace"
            transform={`rotate(-90, ${padding - 10}, ${padding + (length * scale) / 2})`}
          >
            {length.toFixed(1)}m
          </text>

          {/* Treatment positions */}
          {treatmentPlan.map((treatment, idx) => {
            const x = toSvgX(treatment.position.x)
            const y = toSvgY(treatment.position.y)
            const color = treatmentColors[treatment.type]
            const opacity = priorityOpacity[treatment.priority]

            return (
              <g key={idx}>
                <circle
                  cx={x}
                  cy={y}
                  r={8}
                  fill={color}
                  opacity={opacity}
                  stroke="#000"
                  strokeWidth="1"
                />
                <text
                  x={x}
                  y={y + 3}
                  textAnchor="middle"
                  fill="#000"
                  fontSize="10"
                  fontWeight="bold"
                >
                  {treatment.type === "bass_trap" ? "B" : treatment.type === "absorber" ? "A" : "D"}
                </text>
              </g>
            )
          })}

          {/* Speakers */}
          {speakerPositions.map((speaker, idx) => {
            const x = toSvgX(speaker.x)
            const y = toSvgY(speaker.y)

            return (
              <g key={idx}>
                {/* Speaker cone */}
                <polygon
                  points={`${x},${y - 15} ${x - 10},${y + 10} ${x + 10},${y + 10}`}
                  fill="#ff9500"
                  stroke="#000"
                  strokeWidth="2"
                />
                {/* Label */}
                <text
                  x={x}
                  y={y + 5}
                  textAnchor="middle"
                  fill="#000"
                  fontSize="12"
                  fontWeight="bold"
                >
                  {idx === 0 ? "L" : "R"}
                </text>
              </g>
            )
          })}

          {/* Listening position */}
          <g>
            {/* Head circle */}
            <circle
              cx={toSvgX(listeningPosition.x)}
              cy={toSvgY(listeningPosition.y)}
              r={12}
              fill="#ffcc00"
              stroke="#000"
              strokeWidth="2"
            />
            {/* Ears */}
            <circle
              cx={toSvgX(listeningPosition.x) - 8}
              cy={toSvgY(listeningPosition.y)}
              r={3}
              fill="#000"
            />
            <circle
              cx={toSvgX(listeningPosition.x) + 8}
              cy={toSvgY(listeningPosition.y)}
              r={3}
              fill="#000"
            />
            {/* Label */}
            <text
              x={toSvgX(listeningPosition.x)}
              y={toSvgY(listeningPosition.y) + 30}
              textAnchor="middle"
              fill="#ffcc00"
              fontSize="11"
              fontWeight="bold"
              fontFamily="monospace"
            >
              ESCUCHA
            </text>
          </g>

          {/* Stereo triangle (visual guide) */}
          <path
            d={`M ${toSvgX(speakerPositions[0].x)},${toSvgY(speakerPositions[0].y)}
                L ${toSvgX(speakerPositions[1].x)},${toSvgY(speakerPositions[1].y)}
                L ${toSvgX(listeningPosition.x)},${toSvgY(listeningPosition.y)} Z`}
            fill="none"
            stroke="#ffcc00"
            strokeWidth="1"
            strokeDasharray="4 4"
            opacity="0.5"
          />
        </svg>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 pt-3 border-t border-muted-foreground/30 text-[10px]">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-primary border-2 border-black"></div>
          <span className="text-muted-foreground">Parlantes (L/R)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-accent border-2 border-black rounded-full"></div>
          <span className="text-muted-foreground">Punto escucha</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-destructive border border-black rounded-full"></div>
          <span className="text-muted-foreground">B: Bass Trap</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-primary border border-black rounded-full"></div>
          <span className="text-muted-foreground">A: Absorber</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-accent border border-black rounded-full"></div>
          <span className="text-muted-foreground">D: Diffuser</span>
        </div>
      </div>

      {/* Instructions */}
      <div className="p-3 border border-primary/30 bg-primary/5 text-[10px] text-muted-foreground space-y-1">
        <p><span className="text-primary font-bold">Interpretar el diagrama:</span></p>
        <ul className="list-disc list-inside space-y-0.5 ml-2">
          <li>Los parlantes (L/R) deben formar triángulo equilátero con punto de escucha</li>
          <li>Bass Traps (B) en las esquinas controlan modos de graves</li>
          <li>Absorbers (A) en puntos de primera reflexión (paredes laterales)</li>
          <li>Diffusers (D) en pared trasera para dispersión natural</li>
          <li>Opacidad indica prioridad: más opaco = más importante</li>
        </ul>
      </div>
    </div>
  )
}
