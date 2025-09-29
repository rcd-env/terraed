"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Clock, AlertTriangle, X, Loader2, Eye } from "lucide-react"
import type { VerificationPipeline, VerificationStep } from "@/lib/verification-pipeline"

interface VerificationStatusProps {
  pipeline: VerificationPipeline
  onUpdate?: (pipeline: VerificationPipeline) => void
}

export function VerificationStatus({ pipeline, onUpdate }: VerificationStatusProps) {
  const [currentPipeline, setCurrentPipeline] = useState(pipeline)

  useEffect(() => {
    setCurrentPipeline(pipeline)
  }, [pipeline])

  const getStepIcon = (step: VerificationStep) => {
    switch (step.status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-success" />
      case "running":
        return <Loader2 className="w-4 h-4 text-primary animate-spin" />
      case "failed":
        return <X className="w-4 h-4 text-red-600" />
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />
    }
  }

  const getStepBadgeColor = (step: VerificationStep) => {
    switch (step.status) {
      case "completed":
        return "bg-success text-success-foreground"
      case "running":
        return "bg-primary text-primary-foreground"
      case "failed":
        return "bg-red-600 text-white"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getOverallProgress = () => {
    const completedSteps = currentPipeline.steps.filter((s) => s.status === "completed").length
    return (completedSteps / currentPipeline.steps.length) * 100
  }

  const getOverallStatusBadge = () => {
    switch (currentPipeline.overallStatus) {
      case "completed":
        return (
          <Badge className="bg-success text-success-foreground">
            <CheckCircle className="w-3 h-3 mr-1" />
            Verification Complete
          </Badge>
        )
      case "running":
        return (
          <Badge className="bg-primary text-primary-foreground">
            <Loader2 className="w-3 h-3 mr-1 animate-spin" />
            Verifying...
          </Badge>
        )
      case "failed":
        return (
          <Badge className="bg-red-600 text-white">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Verification Failed
          </Badge>
        )
      default:
        return (
          <Badge variant="secondary">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        )
    }
  }

  const getFinalDecisionBadge = () => {
    if (!currentPipeline.finalReport) return null

    const { autoDecision } = currentPipeline.finalReport

    switch (autoDecision) {
      case "pass":
        return (
          <Badge className="bg-success text-success-foreground">
            <CheckCircle className="w-3 h-3 mr-1" />
            Auto Approved
          </Badge>
        )
      case "review":
        return (
          <Badge className="bg-amber-500 text-white">
            <Eye className="w-3 h-3 mr-1" />
            Needs Review
          </Badge>
        )
      case "reject":
        return (
          <Badge className="bg-red-600 text-white">
            <X className="w-3 h-3 mr-1" />
            Rejected
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <Card className="glass-card">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-display">Verification Status</CardTitle>
          {getOverallStatusBadge()}
        </div>
        <div className="space-y-2">
          <Progress value={getOverallProgress()} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>
              {currentPipeline.steps.filter((s) => s.status === "completed").length} of {currentPipeline.steps.length}{" "}
              steps completed
            </span>
            {currentPipeline.endTime && (
              <span>Completed in {Math.round((currentPipeline.endTime - currentPipeline.startTime) / 1000)}s</span>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Verification Steps */}
        <div className="space-y-3">
          {currentPipeline.steps.map((step, index) => (
            <motion.div
              key={step.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-3 border border-border rounded-lg"
            >
              <div className="flex items-center gap-3">
                {getStepIcon(step)}
                <div>
                  <div className="font-medium text-sm">{step.name}</div>
                  {step.duration && <div className="text-xs text-muted-foreground">{step.duration}ms</div>}
                  {step.error && <div className="text-xs text-red-600">{step.error}</div>}
                </div>
              </div>
              <Badge className={getStepBadgeColor(step)} variant="secondary">
                {step.status}
              </Badge>
            </motion.div>
          ))}
        </div>

        {/* Final Results */}
        {currentPipeline.finalReport && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-muted/30 rounded-lg space-y-3"
          >
            <div className="flex items-center justify-between">
              <h4 className="font-semibold">Final Decision</h4>
              {getFinalDecisionBadge()}
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Confidence:</span>
                <span className="ml-2 font-medium">{Math.round(currentPipeline.finalReport.confidence * 100)}%</span>
              </div>
              <div>
                <span className="text-muted-foreground">Labels:</span>
                <span className="ml-2 font-medium">{currentPipeline.finalReport.labels.length}</span>
              </div>
            </div>

            {currentPipeline.finalReport.reasons.length > 0 && (
              <div>
                <span className="text-muted-foreground text-sm">Issues found:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {currentPipeline.finalReport.reasons.map((reason) => (
                    <Badge key={reason} variant="outline" className="text-xs">
                      {reason.replace(/_/g, " ")}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}
