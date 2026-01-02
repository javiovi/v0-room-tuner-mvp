// app/types/room.ts

export type RoomGoal = "music" | "instrument" | "work"

export interface RoomProject {
  goal: RoomGoal | null

  // Dimensiones
  lengthM?: number
  widthM?: number
  heightM?: number

  // Materiales
  floorType?: "madera" | "ceramico" | "alfombra" | "otro"
  wallType?: "desnudas" | "cuadros" | "bibliotecas" | "mixto"

  // Disposición
  equipmentPosition?: "pared_larga" | "pared_corta" | "indefinido"
  listeningPosition?: "centro" | "pared" | "esquina" | "variable"

  // Muebles
  furniture?: string[] // ej: ["sofa", "escritorio"]

  // Ruido
  noiseMeasurement?: {
    taken: boolean
    level?: "tranquilo" | "normal" | "ruidoso"
  }
}
