"use client"

import { useState } from "react"
import { DndContext, DragEndEvent, useDraggable, useDroppable } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"
import type { RoomDiagram as RoomDiagramType } from "@/app/types/room"

interface InteractiveRoomDiagramProps {
  diagram: RoomDiagramType
  onPositionsChange?: (positions: {
    speakers: { x: number; y: number }[]
    listeningPosition: { x: number; y: number }
  }) => void
}

interface DraggableItemProps {
  id: string
  x: number
  y: number
  children: React.ReactNode
}

function DraggableItem({ id, x, y, children }: DraggableItemProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
  })

  const style = {
    transform: CSS.Translate.toString(transform),
    cursor: isDragging ? "grabbing" : "grab",
    opacity: isDragging ? 0.8 : 1,
  }

  return (
    <g
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      {children}
    </g>
  )
}

export function InteractiveRoomDiagram({ diagram, onPositionsChange }: InteractiveRoomDiagramProps) {
  const { floorPlan, treatmentPlan } = diagram
  const { width, length } = floorPlan

  // State for draggable positions (normalized 0-1)
  const [speakerPositions, setSpeakerPositions] = useState(floorPlan.speakerPositions)
  const [listeningPosition, setListeningPosition] = useState(floorPlan.listeningPosition)

  // SVG dimensions
  const padding = 40
  const scale = 50 // pixels per meter
  const svgWidth = width * scale + padding * 2
  const svgHeight = length * scale + padding * 2

  // Convert normalized positions (0-1) to SVG coordinates
  const toSvgX = (normalizedX: number) => normalizedX * width * scale + padding
  const toSvgY = (normalizedY: number) => normalizedY * length * scale + padding

  // Convert SVG coordinates to normalized (0-1)
  const toNormalizedX = (svgX: number) => Math.max(0, Math.min(1, (svgX - padding) / (width * scale)))
  const toNormalizedY = (svgY: number) => Math.max(0, Math.min(1, (svgY - padding) / (length * scale)))

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event
    const id = active.id as string

    if (id === "speaker-left") {
      const newPos = {
        x: toNormalizedX(toSvgX(speakerPositions[0].x) + delta.x),
        y: toNormalizedY(toSvgY(speakerPositions[0].y) + delta.y),
      }
      const newSpeakers = [newPos, speakerPositions[1]]
      setSpeakerPositions(newSpeakers)
      onPositionsChange?.({ speakers: newSpeakers, listeningPosition })
    } else if (id === "speaker-right") {
      const newPos = {
        x: toNormalizedX(toSvgX(speakerPositions[1].x) + delta.x),
        y: toNormalizedY(toSvgY(speakerPositions[1].y) + delta.y),
      }
      const newSpeakers = [speakerPositions[0], newPos]
      setSpeakerPositions(newSpeakers)
      onPositionsChange?.({ speakers: newSpeakers, listeningPosition })
    } else if (id === "listening-position") {
      const newPos = {
        x: toNormalizedX(toSvgX(listeningPosition.x) + delta.x),
        y: toNormalizedY(toSvgY(listeningPosition.y) + delta.y),
      }
      setListeningPosition(newPos)
      onPositionsChange?.({ speakers: speakerPositions, listeningPosition: newPos })
    }
  }

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
      <div className="flex items-start justify-between gap-2">
        <div>
          <h2 className="text-sm font-bold text-accent uppercase tracking-wide">
            [DIAGRAMA INTERACTIVO - VISTA SUPERIOR]
          </h2>
          <p className="text-[10px] text-muted-foreground mt-1">
            Arrastrá los parlantes y el punto de escucha para optimizar tu setup
          </p>
        </div>
        <div className="px-2 py-1 bg-primary text-primary-foreground text-[10px] font-bold border-2 border-black flex-shrink-0">
          EDITABLE
        </div>
      </div>

      {/* SVG Diagram */}
      <DndContext onDragEnd={handleDragEnd}>
        <div className="w-full overflow-x-auto touch-manipulation">
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

            {/* Treatment positions (non-draggable) */}
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

            {/* Draggable Speakers */}
            {speakerPositions.map((speaker, idx) => {
              const x = toSvgX(speaker.x)
              const y = toSvgY(speaker.y)

              return (
                <DraggableItem key={`speaker-${idx}`} id={idx === 0 ? "speaker-left" : "speaker-right"} x={x} y={y}>
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
                    pointerEvents="none"
                  >
                    {idx === 0 ? "L" : "R"}
                  </text>
                  {/* Drag hint */}
                  <circle
                    cx={x}
                    cy={y}
                    r={20}
                    fill="transparent"
                    stroke="#ff9500"
                    strokeWidth="1"
                    strokeDasharray="2 2"
                    opacity="0.3"
                  />
                </DraggableItem>
              )
            })}

            {/* Draggable Listening position */}
            <DraggableItem id="listening-position" x={toSvgX(listeningPosition.x)} y={toSvgY(listeningPosition.y)}>
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
                pointerEvents="none"
              />
              <circle
                cx={toSvgX(listeningPosition.x) + 8}
                cy={toSvgY(listeningPosition.y)}
                r={3}
                fill="#000"
                pointerEvents="none"
              />
              {/* Drag hint */}
              <circle
                cx={toSvgX(listeningPosition.x)}
                cy={toSvgY(listeningPosition.y)}
                r={20}
                fill="transparent"
                stroke="#ffcc00"
                strokeWidth="1"
                strokeDasharray="2 2"
                opacity="0.3"
              />
            </DraggableItem>

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
      </DndContext>

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
        <p>
          <span className="text-primary font-bold">Cómo usar el diagrama interactivo:</span>
        </p>
        <ul className="list-disc list-inside space-y-0.5 ml-2">
          <li>Arrastrá los parlantes (L/R) para cambiar su posición</li>
          <li>Mové el punto de escucha (cabeza amarilla) donde te sentás</li>
          <li>El triángulo equilátero es la configuración ideal de stereo</li>
          <li>Los tratamientos recomendados se actualizan automáticamente</li>
        </ul>
      </div>
    </div>
  )
}
