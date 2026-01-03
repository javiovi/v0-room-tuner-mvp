"use client"

import type { ProductRecommendationBlock } from "@/app/types/room"

interface ProductTableProps {
  recommendations: ProductRecommendationBlock
  title?: string
}

export function ProductTable({ recommendations, title }: ProductTableProps) {
  const { items, totalEstimatedCost } = recommendations

  if (!items || items.length === 0) {
    return null
  }

  // Group by category
  const grouped = items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = []
    }
    acc[item.category].push(item)
    return acc
  }, {} as Record<string, typeof items>)

  const categoryLabels: Record<string, string> = {
    absorber: "Paneles Absorbentes",
    bass_trap: "Trampas de Graves",
    diffuser: "Difusores",
    rug: "Alfombras",
    curtain: "Cortinas",
    misc: "Otros",
  }

  const impactColors = {
    high: "text-destructive",
    medium: "text-accent",
    low: "text-muted-foreground",
  }

  const impactLabels = {
    high: "Alta",
    medium: "Media",
    low: "Baja",
  }

  const installationIcons = {
    easy: "✓",
    moderate: "⚡",
    professional: "⚠",
  }

  return (
    <div
      className="border-primary/50 bg-card p-5 space-y-4"
      style={{ borderWidth: "3px", borderStyle: "solid" }}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <h2 className="text-sm font-bold text-accent uppercase tracking-wide">
          {title || recommendations.title}
        </h2>
        <div className="text-right">
          <div className="text-[10px] text-muted-foreground uppercase tracking-wide">
            Costo estimado
          </div>
          <div className="text-lg font-bold text-primary font-mono">
            {totalEstimatedCost.currency === "USD" ? "$" : "ARS $"}
            {totalEstimatedCost.min.toLocaleString()} -{" "}
            {totalEstimatedCost.max.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Products by category */}
      <div className="space-y-4">
        {Object.entries(grouped).map(([category, products]) => (
          <div key={category} className="space-y-2">
            {/* Category header */}
            <div className="border-b border-primary/30 pb-1">
              <h3 className="text-xs font-bold text-primary uppercase tracking-wide">
                {categoryLabels[category] || category}
              </h3>
            </div>

            {/* Products */}
            <div className="space-y-2">
              {products.map((product, idx) => (
                <div
                  key={idx}
                  className="border border-muted-foreground/20 bg-muted/10 p-3 hover:border-primary/50 transition-colors"
                >
                  {/* Product name and quantity */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-accent text-[10px] font-bold">
                          [{String(idx + 1).padStart(2, "0")}]
                        </span>
                        <h4 className="text-xs font-semibold text-foreground">
                          {product.product}
                        </h4>
                      </div>
                      {product.link && (
                        <a
                          href={product.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] text-accent hover:text-primary transition-colors mt-1 inline-block"
                        >
                          {product.supplier} →
                        </a>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-bold text-primary font-mono">
                        {product.currency === "USD" ? "$" : "ARS $"}
                        {product.totalPrice.toLocaleString()}
                      </div>
                      <div className="text-[10px] text-muted-foreground">
                        {product.quantity}x {product.currency === "USD" ? "$" : "ARS $"}
                        {product.unitPrice.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {/* Placement */}
                  <div className="text-[10px] text-muted-foreground mb-2">
                    📍 {product.placement}
                  </div>

                  {/* Badges */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {/* Impact */}
                    <div
                      className={`text-[10px] font-bold uppercase tracking-wide ${impactColors[product.impactLevel]}`}
                    >
                      Impacto: {impactLabels[product.impactLevel]}
                    </div>

                    {/* Installation difficulty */}
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wide">
                      {installationIcons[product.installation]} Instalación:{" "}
                      {product.installation === "easy"
                        ? "Fácil"
                        : product.installation === "moderate"
                          ? "Moderada"
                          : "Profesional"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Total */}
      <div
        className="border-t-2 border-primary pt-3 flex items-center justify-between"
      >
        <div className="text-xs text-muted-foreground uppercase tracking-wide">
          Total de {items.length} productos
        </div>
        <div className="text-right">
          <div className="text-[10px] text-muted-foreground uppercase">Rango de inversión</div>
          <div className="text-xl font-bold text-primary font-mono">
            {totalEstimatedCost.currency === "USD" ? "$" : "ARS $"}
            {totalEstimatedCost.min.toLocaleString()} -{" "}
            {totalEstimatedCost.currency === "USD" ? "$" : "ARS $"}
            {totalEstimatedCost.max.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Note */}
      <div className="p-3 border border-accent/30 bg-accent/5 text-[10px] text-muted-foreground">
        <span className="text-accent font-bold">Nota:</span> Los precios son estimados y pueden variar según proveedor y ubicación.
        Considera comenzar con los ítems de impacto alto antes de invertir en toda la lista.
      </div>
    </div>
  )
}
