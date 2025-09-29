"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { SubmissionModal } from "@/components/submission-modal"
import { ArrowLeft, Clock, MapPin, Star, AlertTriangle, Camera, CheckCircle, Zap } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import type { Quest } from "@/lib/types"
import { QUEST_CATEGORIES, DIFFICULTY_LEVELS } from "@/lib/constants"

export default function QuestDetailPage() {
  const params = useParams()
  const questId = params.id as string
  const [quest, setQuest] = useState<Quest | null>(null)
  const [showSubmissionModal, setShowSubmissionModal] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    // Mock quest data - in real app would fetch from API
    const mockQuest: Quest = {
      id: questId,
      title: "Plant a Native Sapling",
      summary: "Plant a native sapling in your school garden or local park and document the process",
      instructions:
        "Find a suitable location in your school garden or a nearby park. Dig a hole that is twice the width of the sapling's root ball and just as deep. Carefully remove the sapling from its container and place it in the hole. Fill the hole with soil and water thoroughly. Take before and after photos showing your work and the planted sapling.",
      points: 25,
      proofTypes: ["photo"],
      locationHint: "School garden or local park",
      locationRadiusM: 1000,
      safetyNotes:
        "Always wear gloves when handling soil and plants. Ask for adult supervision when using gardening tools. Make sure you have permission before planting in public spaces.",
      expiry: "2025-03-15T00:00:00Z",
      aiGenerated: true,
      createdBy: "teacher1",
      category: "biodiversity",
      difficulty: "medium",
      estimatedTime: 45,
      imageUrl: "/students-planting-native-sapling-in-school-garden-.jpg",
      createdAt: "2025-01-15T00:00:00Z",
    }

    setQuest(mockQuest)
  }, [questId])

  const handleSubmissionComplete = () => {
    setIsSubmitted(true)
    setShowSubmissionModal(false)
  }

  if (!quest) {
    return <div className="min-h-screen flex items-center justify-center">Loading quest...</div>
  }

  const category = QUEST_CATEGORIES[quest.category]
  const difficulty = DIFFICULTY_LEVELS[quest.difficulty]
  const expiryDate = new Date(quest.expiry)
  const daysLeft = Math.ceil((expiryDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-background">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/student/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="flex items-center gap-2">
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
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            {/* Quest Header */}
            <div className="mb-8">
              <div className="flex items-start justify-between gap-6 mb-6">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-display mb-3 text-balance">{quest.title}</h1>
                  <p className="text-lg text-muted-foreground text-pretty">{quest.summary}</p>
                </div>
                <div className="flex flex-col items-end gap-3">
                  <Badge className={difficulty.color}>{difficulty.label}</Badge>
                  <div className="flex items-center gap-1 text-primary font-bold text-xl">
                    <Star className="w-5 h-5 fill-current" />
                    <span>{quest.points} points</span>
                  </div>
                </div>
              </div>

              {/* Quest Image */}
              {quest.imageUrl && (
                <div className="relative overflow-hidden rounded-xl mb-6">
                  <img
                    src={quest.imageUrl || "/placeholder.svg"}
                    alt={quest.title}
                    className="w-full h-64 object-cover"
                  />
                  {isSubmitted && (
                    <div className="absolute inset-0 bg-success/20 flex items-center justify-center">
                      <Badge className="bg-success text-success-foreground text-lg px-4 py-2">
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Submitted for Review
                      </Badge>
                    </div>
                  )}
                </div>
              )}

              {/* Quest Meta */}
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>~{quest.estimatedTime} minutes</span>
                </div>
                {quest.locationHint && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{quest.locationHint}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Camera className="w-4 h-4" />
                  <span>Photo required</span>
                </div>
              </div>

              {/* Expiry Warning */}
              {daysLeft <= 7 && (
                <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg mb-6">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                  <span className="text-amber-800 font-medium">
                    {daysLeft > 0 ? `${daysLeft} days left to complete` : "Quest expires today!"}
                  </span>
                </div>
              )}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Instructions */}
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="text-display">Instructions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed text-pretty">{quest.instructions}</p>
                  </CardContent>
                </Card>

                {/* Safety Notes */}
                {quest.safetyNotes && (
                  <Card className="glass-card border-amber-200 bg-amber-50/50">
                    <CardHeader>
                      <CardTitle className="text-display flex items-center gap-2 text-amber-800">
                        <AlertTriangle className="w-5 h-5" />
                        Safety Guidelines
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-amber-700 leading-relaxed text-pretty">{quest.safetyNotes}</p>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Action Card */}
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="text-display">Ready to Start?</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {!isSubmitted ? (
                      <>
                        <p className="text-sm text-muted-foreground">
                          Complete this quest and upload your proof to earn {quest.points} points!
                        </p>
                        <Button
                          onClick={() => setShowSubmissionModal(true)}
                          className="w-full terra-gradient text-white"
                          size="lg"
                        >
                          <Camera className="w-4 h-4 mr-2" />
                          Submit Proof
                        </Button>
                      </>
                    ) : (
                      <>
                        <div className="text-center py-4">
                          <CheckCircle className="w-12 h-12 text-success mx-auto mb-3" />
                          <p className="font-semibold text-success">Submission Complete!</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Your submission is being reviewed. You'll be notified once it's approved.
                          </p>
                        </div>
                        <Link href="/student/submissions">
                          <Button variant="outline" className="w-full bg-transparent">
                            View My Submissions
                          </Button>
                        </Link>
                      </>
                    )}
                  </CardContent>
                </Card>

                {/* Quest Details */}
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="text-display">Quest Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Category</span>
                        <span className="font-medium">{category.label}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Difficulty</span>
                        <span className="font-medium">{difficulty.label}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Points</span>
                        <span className="font-medium text-primary">{quest.points}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Expires</span>
                        <span className="font-medium">{expiryDate.toLocaleDateString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Submission Modal */}
      <SubmissionModal
        isOpen={showSubmissionModal}
        onClose={() => setShowSubmissionModal(false)}
        onSubmit={handleSubmissionComplete}
        quest={quest}
      />
    </div>
  )
}
