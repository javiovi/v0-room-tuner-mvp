import { NextResponse } from 'next/server'
import { renderToStream } from '@react-pdf/renderer'
import { ReportPDFDocument } from '@/components/report/pdf/ReportPDFDocument'
import type { RoomProject, EnhancedAnalysisResponse } from '@/app/types/room'

/**
 * PDF Generation API
 * Renders the room analysis report as a downloadable PDF
 */
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { project, analysis } = body as {
      project: RoomProject
      analysis: EnhancedAnalysisResponse
    }

    // Validate required data
    if (!project || !analysis) {
      return NextResponse.json(
        { error: 'Missing project or analysis data' },
        { status: 400 }
      )
    }

    // Generate filename with timestamp
    const timestamp = new Date().toISOString().split('T')[0]
    const filename = `roomtuner-reporte-${timestamp}.pdf`

    // Render PDF document
    const stream = await renderToStream(
      ReportPDFDocument({ project, analysis })
    )

    // Convert stream to buffer
    const chunks: Uint8Array[] = []
    const reader = stream.getReader()

    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      if (value) chunks.push(value)
    }

    const buffer = Buffer.concat(chunks)

    // Return PDF as downloadable file
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': buffer.length.toString(),
      },
    })
  } catch (error) {
    console.error('[PDF Generation] Error:', error)
    return NextResponse.json(
      {
        error: 'Failed to generate PDF',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
