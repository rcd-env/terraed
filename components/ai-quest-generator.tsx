"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Zap, Loader2, CheckCircle, AlertCircle, Sparkles } from "lucide-react"
import { aiService } from "@/lib/ai-services"
import type { Quest } from "@/lib/types"
import { QUEST_CATEGORIES } from "@/lib/constants"

interface AIQuestGeneratorProps {
  onQuestGenerated: (quest: Omit<Quest, "id" | "createdAt">) => void
  teacherId: string
}

export function AIQuestGenerator({ onQuestGenerated, teacherId }: AIQuestGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedQuest, setGeneratedQuest] = useState<Omit<Quest, "id" | "createdAt"> | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Form state
  const [city, setCity] = useState("New York")
  const [grade, setGrade] = useState(8)
  const [topic, setTopic] = useState<keyof typeof QUEST_CATEGORIES>("biodiversity")
  const [customPrompt, setCustomPrompt] = useState("")

  const handleGenerate = async () => {
    setIsGenerating(true)
    setError(null)
    setGeneratedQuest(null)

    try {
      const quest = await aiService.generateQuest({
        city,
        grade,
        topic,
        teacherId,
        customPrompt: customPrompt.trim() || undefined,
      })

      setGeneratedQuest(quest)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate quest")
    } finally {
      setIsGenerating(false)
    }
  }

  const handleAcceptQuest = () => {
    if (generatedQuest) {
      onQuestGenerated(generatedQuest)
      setGeneratedQuest(null)
    }
  }

  const handleRegenerate = () => {
    handleGenerate()
  }

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-display flex items-center gap-2">
          <Zap className="w-5 h-5 text-primary" />
          AI Quest Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Generation Form */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city">City/Location</Label>
            <Input
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name"
              disabled={isGenerating}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="grade">Grade Level</Label>
            <Select value={grade.toString()} onValueChange={(value) => setGrade(Number.parseInt(value))}>
              <SelectTrigger disabled={isGenerating}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 8 }, (_, i) => i + 5).map((gradeLevel) => (
                  <SelectItem key={gradeLevel} value={gradeLevel.toString()}>
                    Grade {gradeLevel}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="topic">Environmental Topic</Label>
          <Select value={topic} onValueChange={(value) => setTopic(value as keyof typeof QUEST_CATEGORIES)}>
            <SelectTrigger disabled={isGenerating}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(QUEST_CATEGORIES).map(([key, category]) => (
                <SelectItem key={key} value={key}>
                  {category.icon} {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="custom-prompt">Custom Requirements (Optional)</Label>
          <Textarea
            id="custom-prompt"
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            placeholder="Add any specific requirements or focus areas for the quest..."
            rows={3}
            disabled={isGenerating}
          />
        </div>

        <Button onClick={handleGenerate} disabled={isGenerating} className="w-full terra-gradient text-white">
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Generating Quest...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2" />
              Generate AI Quest
            </>
          )}
        </Button>

        {/* Error Display */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2"
          >
            <AlertCircle className="w-4 h-4 text-red-600" />
            <span className="text-red-800 text-sm">{error}</span>
          </motion.div>
        )}

        {/* Generated Quest Preview */}
        {generatedQuest && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <Separator />

            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-success" />
              <span className="font-semibold text-success">Quest Generated Successfully!</span>
              <Badge className="terra-gradient text-white">
                <Zap className="w-3 h-3 mr-1" />
                AI Generated
              </Badge>
            </div>

            <Card className="border-primary/20 bg-primary/5">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-display mb-2">{generatedQuest.title}</h3>
                    <p className="text-muted-foreground text-sm">{generatedQuest.summary}</p>
                  </div>
                  <div className="text-right">
                    <Badge className={`${QUEST_CATEGORIES[generatedQuest.category].color} text-white mb-2`}>
                      {QUEST_CATEGORIES[generatedQuest.category].icon} {QUEST_CATEGORIES[generatedQuest.category].label}
                    </Badge>
                    <div className="text-primary font-bold">{generatedQuest.points} points</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Instructions:</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{generatedQuest.instructions}</p>
                </div>

                {generatedQuest.safetyNotes && (
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <h4 className="font-medium text-amber-800 mb-1">Safety Notes:</h4>
                    <p className="text-sm text-amber-700">{generatedQuest.safetyNotes}</p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Difficulty:</span>
                    <span className="ml-2 font-medium capitalize">{generatedQuest.difficulty}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Time:</span>
                    <span className="ml-2 font-medium">~{generatedQuest.estimatedTime} min</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Location:</span>
                    <span className="ml-2 font-medium">{generatedQuest.locationHint}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Proof:</span>
                    <span className="ml-2 font-medium">Photo required</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-3">
              <Button
                onClick={handleRegenerate}
                variant="outline"
                className="flex-1 bg-transparent"
                disabled={isGenerating}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Another
              </Button>
              <Button onClick={handleAcceptQuest} className="flex-1 terra-gradient text-white">
                <CheckCircle className="w-4 h-4 mr-2" />
                Use This Quest
              </Button>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}
