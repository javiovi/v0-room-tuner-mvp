/**
 * PDF Report Document
 * Generates a downloadable PDF version of the room analysis report
 * Styled to match the retro orange brutalist theme
 */

import React from 'react'
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Link,
  Svg,
  Rect,
  Circle,
} from '@react-pdf/renderer'
import type { EnhancedAnalysisResponse, RoomProject } from '@/app/types/room'

// Register fonts (using system fonts)
// Note: For custom fonts, you'd need to register them here

// Retro orange color palette matching the web theme
const colors = {
  primary: '#FF8C42',      // Retro orange
  accent: '#FFB366',       // Lighter orange
  background: '#0A0A0A',   // Near black
  card: '#1A1A1A',         // Dark gray
  foreground: '#E5E5E5',   // Light gray text
  muted: '#6B7280',        // Muted gray
  destructive: '#EF4444',  // Red for critical
}

// PDF Styles matching retro theme
const styles = StyleSheet.create({
  // Page layout
  page: {
    backgroundColor: '#FFFFFF',
    padding: 40,
    fontFamily: 'Courier',
  },

  // Cover page
  coverPage: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  coverTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 10,
  },
  coverSubtitle: {
    fontSize: 14,
    color: colors.muted,
    marginBottom: 40,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  coverInfo: {
    fontSize: 12,
    color: colors.foreground,
    marginBottom: 8,
  },

  // Section headers
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
    marginTop: 20,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
    borderBottomWidth: 3,
    borderBottomColor: colors.primary,
    borderBottomStyle: 'solid',
    paddingBottom: 6,
  },

  // Content sections
  section: {
    marginBottom: 16,
  },

  // Text styles
  heading: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 8,
  },
  subheading: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.accent,
    marginBottom: 6,
  },
  body: {
    fontSize: 10,
    color: '#1A1A1A',
    lineHeight: 1.6,
    marginBottom: 8,
  },
  small: {
    fontSize: 9,
    color: colors.muted,
    lineHeight: 1.5,
  },

  // Boxes and cards
  card: {
    borderWidth: 3,
    borderColor: colors.primary,
    borderStyle: 'solid',
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#FAFAFA',
  },

  // Badges and labels
  badge: {
    padding: '4px 8px',
    fontSize: 8,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginRight: 8,
    marginBottom: 4,
  },
  badgeCritical: {
    backgroundColor: '#FEE2E2',
    color: colors.destructive,
    borderWidth: 2,
    borderColor: colors.destructive,
    borderStyle: 'solid',
  },
  badgeWarning: {
    backgroundColor: '#FEF3C7',
    color: '#D97706',
    borderWidth: 2,
    borderColor: '#D97706',
    borderStyle: 'solid',
  },
  badgeInfo: {
    backgroundColor: '#FFF7ED',
    color: colors.primary,
    borderWidth: 2,
    borderColor: colors.primary,
    borderStyle: 'solid',
  },

  // Lists
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 6,
    fontSize: 10,
  },
  bullet: {
    marginRight: 8,
    color: colors.primary,
    fontWeight: 'bold',
  },

  // Tables
  table: {
    width: '100%',
    marginBottom: 12,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: '1px solid #E5E5E5',
    paddingVertical: 6,
  },
  tableHeader: {
    backgroundColor: '#FFF7ED',
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
    borderBottomStyle: 'solid',
    fontWeight: 'bold',
  },
  tableCell: {
    fontSize: 9,
    padding: 4,
  },

  // Footer
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: 'center',
    fontSize: 8,
    color: colors.muted,
    borderTop: '1px solid #E5E5E5',
    paddingTop: 10,
  },

  // Metrics grid
  metricsGrid: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  metricBox: {
    flex: '1 1 45%',
    borderWidth: 2,
    borderColor: colors.primary,
    borderStyle: 'solid',
    padding: 8,
    backgroundColor: '#FAFAFA',
    margin: 4,
  },
  metricLabel: {
    fontSize: 8,
    color: colors.muted,
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  metricValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.primary,
  },

  // Links
  link: {
    color: colors.primary,
    textDecoration: 'underline',
  },

  // Diagram
  diagramContainer: {
    width: '100%',
    height: 400,
    marginVertical: 20,
    borderWidth: 2,
    borderColor: colors.primary,
    borderStyle: 'solid',
    backgroundColor: '#FAFAFA',
    padding: 20,
  },
  diagramLegend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    gap: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  legendText: {
    fontSize: 8,
    color: '#1A1A1A',
  },
})

interface ReportPDFDocumentProps {
  project: RoomProject
  analysis: EnhancedAnalysisResponse
}

export function ReportPDFDocument({ project, analysis }: ReportPDFDocumentProps) {
  const {
    summary,
    roomCharacter,
    priorityScore,
    roomMetrics,
    frequencyResponse,
    freeChanges,
    lowBudgetChanges,
    advancedChanges,
    generatedAt,
  } = analysis

  const totalIssues = priorityScore.critical + priorityScore.improvements

  return (
    <Document>
      {/* Cover Page */}
      <Page size="A4" style={styles.page}>
        <View style={styles.coverPage}>
          <Text style={styles.coverTitle}>{"> ROOMTUNER"}</Text>
          <Text style={styles.coverSubtitle}>ANÁLISIS ACÚSTICO COMPLETO</Text>

          <View style={{ marginTop: 40 }}>
            <Text style={styles.coverInfo}>
              Espacio: {project.lengthM}m × {project.widthM}m × {project.heightM}m
            </Text>
            <Text style={styles.coverInfo}>
              Volumen: {roomMetrics.volume.toFixed(1)} m³
            </Text>
            <Text style={styles.coverInfo}>
              Carácter: {roomCharacter.toUpperCase()}
            </Text>
            <Text style={styles.coverInfo}>
              Fecha: {new Date(generatedAt).toLocaleDateString('es-AR')}
            </Text>
          </View>

          {totalIssues > 0 && (
            <View style={{ marginTop: 30 }}>
              <Text style={[styles.body, { textAlign: 'center' }]}>
                {totalIssues} punto{totalIssues > 1 ? 's' : ''} detectado{totalIssues > 1 ? 's' : ''}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.footer}>
          <Text>Generado con RoomTuner MVP • roomtuner.app</Text>
        </View>
      </Page>

      {/* Executive Summary */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.sectionHeader}>[RESUMEN EJECUTIVO]</Text>

        {/* Priority Badges */}
        <View style={{ flexDirection: 'row', marginBottom: 12 }}>
          {priorityScore.critical > 0 && (
            <View style={[styles.badge, styles.badgeCritical]}>
              <Text>{priorityScore.critical} CRÍTICO{priorityScore.critical > 1 ? 'S' : ''}</Text>
            </View>
          )}
          {priorityScore.improvements > 0 && (
            <View style={[styles.badge, styles.badgeWarning]}>
              <Text>{priorityScore.improvements} MEJORA{priorityScore.improvements > 1 ? 'S' : ''}</Text>
            </View>
          )}
          {priorityScore.optimizations > 0 && (
            <View style={[styles.badge, styles.badgeInfo]}>
              <Text>{priorityScore.optimizations} OPTIMIZACION{priorityScore.optimizations > 1 ? 'ES' : ''}</Text>
            </View>
          )}
        </View>

        {/* Summary Text */}
        <View style={styles.card}>
          <Text style={styles.body}>{summary}</Text>
        </View>

        {/* Room Metrics */}
        <Text style={styles.heading}>MÉTRICAS DEL ESPACIO</Text>
        <View style={styles.metricsGrid}>
          <View style={styles.metricBox}>
            <Text style={styles.metricLabel}>Volumen</Text>
            <Text style={styles.metricValue}>{roomMetrics.volume.toFixed(1)} m³</Text>
          </View>
          <View style={styles.metricBox}>
            <Text style={styles.metricLabel}>Área Superficie</Text>
            <Text style={styles.metricValue}>{roomMetrics.surfaceArea.toFixed(1)} m²</Text>
          </View>
          <View style={styles.metricBox}>
            <Text style={styles.metricLabel}>Área Piso</Text>
            <Text style={styles.metricValue}>{roomMetrics.floorArea.toFixed(1)} m²</Text>
          </View>
          <View style={styles.metricBox}>
            <Text style={styles.metricLabel}>Absorción Total</Text>
            <Text style={styles.metricValue}>{roomMetrics.totalAbsorption.toFixed(1)} sabins</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text>Página 2 • Análisis estimado para referencia</Text>
        </View>
      </Page>

      {/* Room Analysis */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.sectionHeader}>[ANÁLISIS ACÚSTICO]</Text>

        {/* RT60 Estimates */}
        <Text style={styles.heading}>TIEMPO DE REVERBERACIÓN (RT60)</Text>
        <View style={styles.card}>
          <View style={styles.listItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.body}>
              Graves (63-250 Hz): {roomMetrics.rt60Estimate.low.toFixed(2)}s {roomMetrics.rt60Estimate.low > 0.6 ? '⚠️ ALTO' : '✓'}
            </Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.body}>
              Medios (500-2k Hz): {roomMetrics.rt60Estimate.mid.toFixed(2)}s {roomMetrics.rt60Estimate.mid > 0.5 ? '⚠️ ALTO' : '✓'}
            </Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.body}>
              Agudos (4k-16k Hz): {roomMetrics.rt60Estimate.high.toFixed(2)}s {roomMetrics.rt60Estimate.high > 0.4 ? '⚠️ ALTO' : '✓'}
            </Text>
          </View>
        </View>

        {/* Room Modes */}
        <Text style={styles.heading}>MODOS DE SALA (RESONANCIAS)</Text>
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={[styles.tableCell, { flex: 1 }]}>Frecuencia</Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>Tipo</Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>Dimensión</Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>Severidad</Text>
          </View>
          {roomMetrics.roomModes.slice(0, 10).map((mode, idx) => (
            <View key={idx} style={styles.tableRow}>
              <Text style={[styles.tableCell, { flex: 1 }]}>{mode.frequency.toFixed(0)} Hz</Text>
              <Text style={[styles.tableCell, { flex: 1 }]}>{mode.type}</Text>
              <Text style={[styles.tableCell, { flex: 1 }]}>{mode.dimension}</Text>
              <Text style={[styles.tableCell, { flex: 1 }]}>
                {mode.severity === 'high' ? '🔴 Alta' : mode.severity === 'medium' ? '🟡 Media' : '🟢 Baja'}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.footer}>
          <Text>Página 3 • Los primeros 10 modos más significativos</Text>
        </View>
      </Page>

      {/* Room Diagram 2D */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.sectionHeader}>[DIAGRAMA DE POSICIONES 2D]</Text>

        <Text style={styles.body}>
          Vista superior de tu espacio con posiciones optimizadas:
        </Text>

        <View style={styles.diagramContainer}>
          <Svg width="100%" height="350" viewBox="0 0 400 350">
            {/* Room outline */}
            <Rect
              x="50"
              y="50"
              width="300"
              height="250"
              fill="none"
              stroke={colors.foreground}
              strokeWidth="2"
            />

            {/* Dimension labels */}
            <Text x="200" y="35" fontSize="10" textAnchor="middle" fill={colors.muted}>
              {project.lengthM}m
            </Text>
            <Text x="365" y="175" fontSize="10" textAnchor="start" fill={colors.muted}>
              {project.widthM}m
            </Text>

            {/* Speakers */}
            {analysis.roomDiagram?.floorPlan?.speakerPositions?.map((speaker, idx) => {
              const x = 50 + (speaker.x / project.widthM) * 300
              const y = 50 + (speaker.y / project.lengthM) * 250
              return (
                <React.Fragment key={`speaker-${idx}`}>
                  <Rect
                    x={x - 8}
                    y={y - 8}
                    width="16"
                    height="16"
                    fill={colors.primary}
                    stroke="#000"
                    strokeWidth="1"
                  />
                  <Text x={x} y={y - 15} fontSize="8" textAnchor="middle" fill={colors.primary}>
                    S{idx + 1}
                  </Text>
                </React.Fragment>
              )
            })}

            {/* Listening Position */}
            {analysis.roomDiagram?.floorPlan?.listeningPosition && (() => {
              const lp = analysis.roomDiagram.floorPlan.listeningPosition
              const x = 50 + (lp.x / project.widthM) * 300
              const y = 50 + (lp.y / project.lengthM) * 250
              return (
                <React.Fragment>
                  <Circle
                    cx={x}
                    cy={y}
                    r="10"
                    fill={colors.accent}
                    stroke="#000"
                    strokeWidth="1"
                  />
                  <Text x={x} y={y - 18} fontSize="8" textAnchor="middle" fill={colors.accent}>
                    SWEET SPOT
                  </Text>
                </React.Fragment>
              )
            })()}

            {/* Treatment positions */}
            {analysis.roomDiagram?.treatmentPlan?.slice(0, 4).map((treatment, idx) => {
              const x = 50 + treatment.position.x * 300
              const y = 50 + treatment.position.y * 250
              return (
                <Circle
                  key={`treatment-${idx}`}
                  cx={x}
                  cy={y}
                  r="6"
                  fill={treatment.type === 'bass_trap' ? '#EF4444' : '#10B981'}
                  opacity="0.7"
                />
              )
            })}
          </Svg>
        </View>

        {/* Legend */}
        <View style={styles.diagramLegend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: colors.primary }]} />
            <Text style={styles.legendText}>Parlantes (S1, S2)</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: colors.accent }]} />
            <Text style={styles.legendText}>Posición de escucha óptima</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#EF4444' }]} />
            <Text style={styles.legendText}>Trampas de graves (esquinas)</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#10B981' }]} />
            <Text style={styles.legendText}>Paneles absorbentes</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.small}>
            💡 Tip: El "sweet spot" es la posición ideal de escucha. Evitá el centro exacto de la sala (50%)
            para minimizar problemas de modos de sala. La posición óptima suele estar entre 36-42% de la profundidad.
          </Text>
        </View>

        <View style={styles.footer}>
          <Text>Página 4 • Diagrama simplificado para referencia</Text>
        </View>
      </Page>

      {/* Free Recommendations */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.sectionHeader}>[CAMBIOS GRATUITOS]</Text>
        <Text style={styles.body}>
          Implementá estos cambios esta semana sin gastar dinero:
        </Text>

        <View style={styles.section}>
          {freeChanges.items.map((item, idx) => (
            <View key={idx} style={styles.listItem}>
              <Text style={styles.bullet}>[{idx + 1}]</Text>
              <Text style={styles.body}>{item}</Text>
            </View>
          ))}
        </View>

        <View style={styles.footer}>
          <Text>Página 5 • Comenzá con los cambios más accesibles</Text>
        </View>
      </Page>

      {/* Product Recommendations */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.sectionHeader}>[PRODUCTOS RECOMENDADOS]</Text>

        {/* Low Budget */}
        <Text style={styles.heading}>{lowBudgetChanges.title}</Text>
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={[styles.tableCell, { flex: 2 }]}>Producto</Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>Cant.</Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>Precio</Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>Total</Text>
          </View>
          {lowBudgetChanges.items.slice(0, 8).map((item, idx) => (
            <View key={idx} style={styles.tableRow}>
              {item.link ? (
                <Link src={item.link} style={[styles.tableCell, styles.link, { flex: 2 }]}>
                  <Text>{item.product}</Text>
                </Link>
              ) : (
                <Text style={[styles.tableCell, { flex: 2 }]}>{item.product}</Text>
              )}
              <Text style={[styles.tableCell, { flex: 1 }]}>{item.quantity}</Text>
              <Text style={[styles.tableCell, { flex: 1 }]}>
                ${item.unitPrice.toLocaleString()}
              </Text>
              <Text style={[styles.tableCell, { flex: 1 }]}>
                ${item.totalPrice.toLocaleString()}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.body}>
            Presupuesto estimado: ${lowBudgetChanges.totalEstimatedCost.min.toLocaleString()} -
            ${lowBudgetChanges.totalEstimatedCost.max.toLocaleString()} {lowBudgetChanges.totalEstimatedCost.currency}
          </Text>
        </View>

        <View style={styles.footer}>
          <Text>Página 6 • Hacé click en los productos para ver precios actualizados</Text>
        </View>
      </Page>

      {/* Advanced Recommendations */}
      {advancedChanges.items.length > 0 && (
        <Page size="A4" style={styles.page}>
          <Text style={styles.sectionHeader}>[TRATAMIENTO AVANZADO]</Text>

          <Text style={styles.heading}>{advancedChanges.title}</Text>
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={[styles.tableCell, { flex: 2 }]}>Producto</Text>
              <Text style={[styles.tableCell, { flex: 1 }]}>Cant.</Text>
              <Text style={[styles.tableCell, { flex: 1 }]}>Precio</Text>
              <Text style={[styles.tableCell, { flex: 1 }]}>Total</Text>
            </View>
            {advancedChanges.items.slice(0, 8).map((item, idx) => (
              <View key={idx} style={styles.tableRow}>
                {item.link ? (
                  <Link src={item.link} style={[styles.tableCell, styles.link, { flex: 2 }]}>
                    <Text>{item.product}</Text>
                  </Link>
                ) : (
                  <Text style={[styles.tableCell, { flex: 2 }]}>{item.product}</Text>
                )}
                <Text style={[styles.tableCell, { flex: 1 }]}>{item.quantity}</Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>
                  ${item.unitPrice.toLocaleString()}
                </Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>
                  ${item.totalPrice.toLocaleString()}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.card}>
            <Text style={styles.body}>
              Presupuesto estimado: ${advancedChanges.totalEstimatedCost.min.toLocaleString()} -
              ${advancedChanges.totalEstimatedCost.max.toLocaleString()} {advancedChanges.totalEstimatedCost.currency}
            </Text>
          </View>

          <View style={styles.footer}>
            <Text>Página 7 • Para resultados profesionales</Text>
          </View>
        </Page>
      )}

      {/* Action Plan */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.sectionHeader}>[PLAN DE ACCIÓN]</Text>

        <Text style={styles.heading}>SEMANA 1 - QUICK WINS</Text>
        <View style={styles.card}>
          <View style={styles.listItem}>
            <Text style={styles.bullet}>[1]</Text>
            <Text style={styles.body}>Optimizar posición de escucha (38% de profundidad)</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.bullet}>[2]</Text>
            <Text style={styles.body}>Añadir alfombras gruesas en centro de sala</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.bullet}>[3]</Text>
            <Text style={styles.body}>Reorganizar muebles para difusión</Text>
          </View>
        </View>

        <Text style={styles.heading}>MES 1-3 - MEJORAS GRADUALES</Text>
        <View style={styles.card}>
          <View style={styles.listItem}>
            <Text style={styles.bullet}>[4]</Text>
            <Text style={styles.body}>Instalar paneles absorbentes en primeros reflejos</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.bullet}>[5]</Text>
            <Text style={styles.body}>Agregar trampas de graves en esquinas</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.bullet}>[6]</Text>
            <Text style={styles.body}>Cortinas gruesas en ventanas</Text>
          </View>
        </View>

        <Text style={styles.heading}>6+ MESES - OPTIMIZACIÓN FINAL</Text>
        <View style={styles.card}>
          <View style={styles.listItem}>
            <Text style={styles.bullet}>[7]</Text>
            <Text style={styles.body}>Tratamiento completo first reflection points</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.bullet}>[8]</Text>
            <Text style={styles.body}>Difusores en pared trasera</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.bullet}>[9]</Text>
            <Text style={styles.body}>Medición con micrófono profesional</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text>Página 8 • Implementación gradual recomendada</Text>
        </View>
      </Page>

      {/* Final Page */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.sectionHeader}>[DISCLAIMER & RECURSOS]</Text>

        <View style={styles.card}>
          <Text style={styles.heading}>IMPORTANTE</Text>
          <Text style={styles.body}>
            Este análisis es una estimación basada en cálculos acústicos estándar.
            Para resultados profesionales, se recomienda realizar mediciones con equipamiento
            especializado (micrófono de medición + software REW).
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.heading}>RECURSOS RECOMENDADOS</Text>
          <View style={styles.listItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.body}>REW (Room EQ Wizard) - Software gratuito de medición</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.body}>Micrófono UMIK-1 - Medición calibrada económica</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.body}>MercadoLibre Argentina - Productos acústicos locales</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.heading}>PRÓXIMOS PASOS</Text>
          <Text style={styles.body}>
            1. Comenzá con los cambios gratuitos{'\n'}
            2. Comprá productos de forma gradual{'\n'}
            3. Implementá cambios y escuchá los resultados{'\n'}
            4. Ajustá según necesites{'\n'}
            5. Considerá medición profesional para fine-tuning
          </Text>
        </View>

        <View style={{ marginTop: 40, alignItems: 'center' }}>
          <Text style={[styles.body, { textAlign: 'center', color: colors.primary }]}>
            ¿Preguntas o feedback?
          </Text>
          <Text style={[styles.small, { textAlign: 'center', marginTop: 8 }]}>
            roomtuner.app • Hecho con ❤️ en Argentina
          </Text>
        </View>

        <View style={styles.footer}>
          <Text>Fin del reporte • RoomTuner MVP v1.0</Text>
        </View>
      </Page>
    </Document>
  )
}
