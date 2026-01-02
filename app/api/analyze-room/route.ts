import { NextResponse } from "next/server"
import type { RoomProject } from "@/app/types/room"
import type { AnalyzeRoomResponse } from "@/lib/roomStore"

const N8N_URL = process.env.N8N_ANALYZE_ROOM_WEBHOOK_URL

const FALLBACK_ANALYSIS: AnalyzeRoomResponse = {
  summary:
    "No pudimos contactar al motor externo de análisis. Este es un diagnóstico genérico de respaldo.",
  roomCharacter: "viva",
  freeChanges: {
    title: "Cambios sin gastar dinero",
    items: [
      "Alejá el punto de escucha al menos 30–50 cm de la pared trasera.",
      "Evitá colocar los parlantes pegados a las esquinas.",
    ],
  },
  lowBudgetChanges: {
    title: "Cambios con bajo presupuesto",
    items: [
      "Colocá una alfombra entre vos y los parlantes.",
      "Agregá cortinas más pesadas a las ventanas principales.",
    ],
  },
  advancedChanges: {
    title: "Para llevar la sala al siguiente nivel",
    items: [
      "Instalá paneles absorbentes en los puntos de primeras reflexiones.",
      "Sumá trampas de graves en las esquinas traseras.",
    ],
  },
}

export async function POST(req: Request) {
  const body = (await req.json()) as RoomProject

  if (!N8N_URL) {
    console.error("N8N_ANALYZE_ROOM_WEBHOOK_URL no configurada")
    // devolvemos fallback en vez de 500
    return NextResponse.json(FALLBACK_ANALYSIS)
  }

  try {
    const n8nRes = await fetch(N8N_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...body,
        locale: "es-AR",
        source: "web-mvp",
        version: "0.1.0",
      }),
    })

    if (!n8nRes.ok) {
      const text = await n8nRes.text()
      console.error("n8n error:", text)
      return NextResponse.json(FALLBACK_ANALYSIS)
    }

    const data = (await n8nRes.json()) as AnalyzeRoomResponse
    return NextResponse.json(data)
  } catch (err) {
    console.error("Error llamando a n8n:", err)
    return NextResponse.json(FALLBACK_ANALYSIS)
  }
}
