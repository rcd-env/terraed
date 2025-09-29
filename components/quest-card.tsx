"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, MapPin, Star, Zap } from "lucide-react"
import type { Quest } from "@/lib/types"
import { QUEST_CATEGORIES, DIFFICULTY_LEVELS } from "@/lib/constants"

interface QuestCardProps {
  quest: Quest
  onStartQuest?: (questId: string) => void
  showProgress?: boolean
  completed?: boolean
}

export function QuestCard({ quest, onStartQuest, showProgress = false, completed = false }: QuestCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const category = QUEST_CATEGORIES[quest.category]
  const difficulty = DIFFICULTY_LEVELS[quest.difficulty]

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="glass-card overflow-hidden h-full">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className={`${category.color} text-white`}>
                  {category.icon} {category.label}
                </Badge>
                {quest.aiGenerated && (
                  <Badge variant="outline" className="text-xs">
                    <Zap className="w-3 h-3 mr-1" />
                    AI Generated
                  </Badge>
                )}
              </div>
              <h3 className="font-semibold text-lg text-display leading-tight text-balance">{quest.title}</h3>
              <p className="text-sm text-muted-foreground mt-1 text-pretty">{quest.summary}</p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <Badge className={difficulty.color}>{difficulty.label}</Badge>
              <div className="flex items-center gap-1 text-primary font-semibold">
                <Star className="w-4 h-4 fill-current" />
                <span>{quest.points}</span>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pb-3">
          <div className="space-y-3">
            {quest.imageUrl && (
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={quest.imageUrl || "/placeholder.svg"}
                  alt={quest.title}
                  className="w-full h-32 object-cover transition-transform duration-300"
                  style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
                />
                {completed && (
                  <div className="absolute inset-0 bg-success/20 flex items-center justify-center">
                    <Badge className="bg-success text-success-foreground">✓ Completed</Badge>
                  </div>
                )}
              </div>
            )}

            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{quest.estimatedTime}min</span>
              </div>
              {quest.locationHint && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span className="truncate max-w-24">{quest.locationHint}</span>
                </div>
              )}
            </div>

            {showProgress && (
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full transition-all duration-300" style={{ width: "60%" }} />
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="pt-0">
          <Button
            onClick={() => onStartQuest?.(quest.id)}
            className="w-full terra-gradient text-white font-semibold"
            disabled={completed}
          >
            {completed ? "Completed" : "Start Quest"}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
