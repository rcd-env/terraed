"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { LucideIcon } from "lucide-react"

interface PremiumStatsCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  color: string
  progress?: number
  subtitle?: string
  trend?: "up" | "down" | "neutral"
  delay?: number
}

export function PremiumStatsCard({
  title,
  value,
  icon: Icon,
  color,
  progress,
  subtitle,
  trend = "neutral",
  delay = 0,
}: PremiumStatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
    >
      <Card className="glass-card hover:shadow-xl transition-all duration-300 border-l-4 border-l-transparent hover:border-l-primary group">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1">
              <p className="text-sm text-muted-foreground font-medium">{title}</p>
              <motion.p
                className={`text-3xl font-bold ${color} group-hover:scale-105 transition-transform duration-200`}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: delay + 0.1 }}
              >
                {value}
              </motion.p>
            </div>
            <motion.div
              className={`p-3 rounded-xl bg-gradient-to-br from-${color.replace("text-", "")}/10 to-${color.replace("text-", "")}/20 group-hover:scale-110 transition-transform duration-200`}
              whileHover={{ rotate: 5 }}
            >
              <Icon className={`w-6 h-6 ${color}`} />
            </motion.div>
          </div>

          {progress !== undefined && (
            <div className="space-y-2">
              <Progress value={progress} className="h-2 bg-muted/30" />
              <motion.p
                className="text-xs text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: delay + 0.2 }}
              >
                {subtitle}
              </motion.p>
            </div>
          )}

          {subtitle && progress === undefined && (
            <motion.p
              className="text-xs text-muted-foreground mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: delay + 0.2 }}
            >
              {subtitle}
            </motion.p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
