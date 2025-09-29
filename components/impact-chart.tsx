"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Leaf, Droplets, Zap, Trash2 } from "lucide-react"
import type { ImpactStats } from "@/lib/types"

interface ImpactChartProps {
  stats: ImpactStats
  showTitle?: boolean
}

export function ImpactChart({ stats, showTitle = true }: ImpactChartProps) {
  const impactItems = [
    {
      icon: Leaf,
      label: "Trees Planted",
      value: stats.treesPlanted,
      unit: "trees",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: Trash2,
      label: "Waste Collected",
      value: stats.wasteCollected,
      unit: "kg",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: Droplets,
      label: "Water Saved",
      value: stats.waterSaved,
      unit: "L",
      color: "text-cyan-600",
      bgColor: "bg-cyan-50",
    },
    {
      icon: Zap,
      label: "Energy Saved",
      value: stats.energySaved,
      unit: "kWh",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
  ]

  const totalCarbonSaved = stats.carbonSaved

  return (
    <Card className="glass-card">
      {showTitle && (
        <CardHeader className="pb-4">
          <CardTitle className="text-display flex items-center gap-2">
            <Leaf className="w-5 h-5 text-primary" />
            Your Environmental Impact
          </CardTitle>
        </CardHeader>
      )}
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {impactItems.map((item) => (
            <div key={item.label} className="text-center">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${item.bgColor} mb-2`}>
                <item.icon className={`w-6 h-6 ${item.color}`} />
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-display">{item.value.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">{item.unit}</div>
                <div className="text-sm font-medium text-pretty">{item.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-border">
          <div className="text-center">
            <Badge className="terra-gradient text-white px-4 py-2 text-base">
              🌍 {totalCarbonSaved.toFixed(1)} kg CO₂ saved
            </Badge>
            <p className="text-xs text-muted-foreground mt-2">
              Equivalent to planting {Math.round(totalCarbonSaved / 22)} trees
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
