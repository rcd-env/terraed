"use client"

import type { Submission, VerificationReport, Quest } from "./types"
import { aiService } from "./ai-services"
import { TERRA_CONFIG } from "./constants"

export interface VerificationStep {
  name: string
  status: "pending" | "running" | "completed" | "failed"
  result?: any
  error?: string
  duration?: number
}

export interface VerificationPipeline {
  submissionId: string
  steps: VerificationStep[]
  overallStatus: "pending" | "running" | "completed" | "failed"
  finalReport?: VerificationReport
  startTime: number
  endTime?: number
}

export class VerificationService {
  private pipelines: Map<string, VerificationPipeline> = new Map()

  /**
   * Start verification pipeline for a submission
   */
  async startVerification(
    submission: Submission,
    quest: Quest,
  ): Promise<{ pipelineId: string; pipeline: VerificationPipeline }> {
    const pipelineId = `pipeline_${submission.id}_${Date.now()}`

    const pipeline: VerificationPipeline = {
      submissionId: submission.id,
      steps: [
        { name: "File Validation", status: "pending" },
        { name: "EXIF Analysis", status: "pending" },
        { name: "GPS Verification", status: "pending" },
        { name: "Duplicate Detection", status: "pending" },
        { name: "AI Image Analysis", status: "pending" },
        { name: "Content Moderation", status: "pending" },
        { name: "Final Decision", status: "pending" },
      ],
      overallStatus: "pending",
      startTime: Date.now(),
    }

    this.pipelines.set(pipelineId, pipeline)

    // Start async verification
    this.runVerificationPipeline(pipelineId, submission, quest)

    return { pipelineId, pipeline }
  }

  /**
   * Get pipeline status
   */
  getPipelineStatus(pipelineId: string): VerificationPipeline | null {
    return this.pipelines.get(pipelineId) || null
  }

  /**
   * Run the complete verification pipeline
   */
  private async runVerificationPipeline(pipelineId: string, submission: Submission, quest: Quest): Promise<void> {
    const pipeline = this.pipelines.get(pipelineId)
    if (!pipeline) return

    pipeline.overallStatus = "running"

    try {
      // Step 1: File Validation
      await this.runStep(pipeline, 0, () => this.validateFile(submission))

      // Step 2: EXIF Analysis
      await this.runStep(pipeline, 1, () => this.analyzeEXIF(submission))

      // Step 3: GPS Verification
      await this.runStep(pipeline, 2, () => this.verifyGPS(submission, quest))

      // Step 4: Duplicate Detection
      await this.runStep(pipeline, 3, () => this.detectDuplicates(submission))

      // Step 5: AI Image Analysis
      await this.runStep(pipeline, 4, () => this.analyzeImage(submission, quest))

      // Step 6: Content Moderation
      await this.runStep(pipeline, 5, () => this.moderateContent(submission))

      // Step 7: Final Decision
      await this.runStep(pipeline, 6, () => this.makeFinalDecision(pipeline))

      pipeline.overallStatus = "completed"
      pipeline.endTime = Date.now()
    } catch (error) {
      console.error("Verification pipeline failed:", error)
      pipeline.overallStatus = "failed"
      pipeline.endTime = Date.now()
    }
  }

  /**
   * Run a single verification step
   */
  private async runStep(
    pipeline: VerificationPipeline,
    stepIndex: number,
    stepFunction: () => Promise<any>,
  ): Promise<void> {
    const step = pipeline.steps[stepIndex]
    step.status = "running"

    const startTime = Date.now()

    try {
      step.result = await stepFunction()
      step.status = "completed"
      step.duration = Date.now() - startTime
    } catch (error) {
      step.status = "failed"
      step.error = error instanceof Error ? error.message : "Unknown error"
      step.duration = Date.now() - startTime
      throw error
    }
  }

  // Individual verification steps
  private async validateFile(submission: Submission): Promise<{
    valid: boolean
    fileSize?: number
    fileType?: string
    issues: string[]
  }> {
    const issues: string[] = []

    // Mock file validation
    const mockFileSize = Math.random() * 10 * 1024 * 1024 // 0-10MB
    const mockFileType = "image/jpeg"

    if (mockFileSize > TERRA_CONFIG.VERIFICATION.MAX_FILE_SIZE_MB * 1024 * 1024) {
      issues.push("file_too_large")
    }

    if (!TERRA_CONFIG.VERIFICATION.ALLOWED_IMAGE_TYPES.includes(mockFileType)) {
      issues.push("invalid_file_type")
    }

    return {
      valid: issues.length === 0,
      fileSize: mockFileSize,
      fileType: mockFileType,
      issues,
    }
  }

  private async analyzeEXIF(submission: Submission): Promise<{
    hasEXIF: boolean
    timestamp?: string
    camera?: string
    location?: { lat: number; lng: number }
    issues: string[]
  }> {
    const issues: string[] = []

    // Mock EXIF analysis
    const hasEXIF = Math.random() > 0.1 // 90% have EXIF
    const timestamp = new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString()

    // Check if image is too old
    const imageAge = Date.now() - new Date(timestamp).getTime()
    const maxAge = 7 * 24 * 60 * 60 * 1000 // 7 days

    if (imageAge > maxAge) {
      issues.push("image_too_old")
    }

    return {
      hasEXIF,
      timestamp: hasEXIF ? timestamp : undefined,
      camera: hasEXIF ? "Mock Camera Model" : undefined,
      location: submission.gpsCoords,
      issues,
    }
  }

  private async verifyGPS(
    submission: Submission,
    quest: Quest,
  ): Promise<{
    hasGPS: boolean
    withinRadius: boolean
    distance?: number
    issues: string[]
  }> {
    const issues: string[] = []

    if (!submission.gpsCoords) {
      issues.push("no_gps_data")
      return { hasGPS: false, withinRadius: false, issues }
    }

    // Mock GPS verification - assume quest location is school
    const questLocation = { lat: 40.7128, lng: -74.006 } // Mock school location
    const distance = this.calculateDistance(submission.gpsCoords, questLocation)

    const withinRadius = quest.locationRadiusM ? distance <= quest.locationRadiusM : true

    if (!withinRadius) {
      issues.push("outside_allowed_radius")
    }

    return {
      hasGPS: true,
      withinRadius,
      distance,
      issues,
    }
  }

  private async detectDuplicates(submission: Submission): Promise<{
    isDuplicate: boolean
    similarityScore: number
    matchedSubmissions: string[]
    issues: string[]
  }> {
    const issues: string[] = []

    // Mock duplicate detection using perceptual hashing
    const similarityScore = Math.random() * 0.4 // Usually low similarity

    const isDuplicate = similarityScore > TERRA_CONFIG.VERIFICATION.PHASH_DUPLICATE_THRESHOLD

    if (isDuplicate) {
      issues.push("potential_duplicate")
    }

    return {
      isDuplicate,
      similarityScore,
      matchedSubmissions: isDuplicate ? [`sub_${Date.now() - 1000}`] : [],
      issues,
    }
  }

  private async analyzeImage(
    submission: Submission,
    quest: Quest,
  ): Promise<{
    confidence: number
    labels: string[]
    objects: any[]
    appropriate: boolean
    issues: string[]
  }> {
    const issues: string[] = []

    if (!submission.imageUrl) {
      issues.push("no_image_provided")
      return { confidence: 0, labels: [], objects: [], appropriate: false, issues }
    }

    // Use AI service for image analysis
    const verificationResult = await aiService.verifyImage({
      imageUrl: submission.imageUrl,
      questCategory: quest.category,
      questTitle: quest.title,
      expectedElements: this.getExpectedElements(quest),
      userCaption: submission.caption,
    })

    if (verificationResult.confidence < TERRA_CONFIG.VERIFICATION.REVIEW_THRESHOLD) {
      issues.push("low_confidence")
    }

    return {
      confidence: verificationResult.confidence,
      labels: verificationResult.labels,
      objects: [], // Would contain bounding boxes in real implementation
      appropriate: true, // Assume appropriate unless flagged
      issues,
    }
  }

  private async moderateContent(submission: Submission): Promise<{
    appropriate: boolean
    flags: string[]
    issues: string[]
  }> {
    const issues: string[] = []
    const flags: string[] = []

    // Mock content moderation
    const inappropriate = Math.random() < 0.02 // 2% chance of inappropriate content

    if (inappropriate) {
      flags.push("inappropriate_content")
      issues.push("content_moderation_failed")
    }

    return {
      appropriate: !inappropriate,
      flags,
      issues,
    }
  }

  private async makeFinalDecision(pipeline: VerificationPipeline): Promise<VerificationReport> {
    const allIssues: string[] = []
    let confidence = 1.0

    // Collect all issues and calculate overall confidence
    pipeline.steps.forEach((step) => {
      if (step.result?.issues) {
        allIssues.push(...step.result.issues)
      }
      if (step.result?.confidence !== undefined) {
        confidence = Math.min(confidence, step.result.confidence)
      }
    })

    // Determine auto decision
    let autoDecision: "pass" | "review" | "reject" = "pass"

    if (allIssues.includes("inappropriate_content") || allIssues.includes("invalid_file_type")) {
      autoDecision = "reject"
    } else if (
      confidence < TERRA_CONFIG.VERIFICATION.AUTO_PASS_THRESHOLD ||
      allIssues.includes("potential_duplicate") ||
      allIssues.includes("outside_allowed_radius")
    ) {
      autoDecision = "review"
    }

    const finalReport: VerificationReport = {
      confidence,
      labels: pipeline.steps[4]?.result?.labels || [],
      reasons: allIssues,
      pHashScore: pipeline.steps[3]?.result?.similarityScore || 0,
      exifValid: pipeline.steps[1]?.result?.hasEXIF || false,
      gpsValid: pipeline.steps[2]?.result?.hasGPS || false,
      duplicateCheck: !allIssues.includes("potential_duplicate"),
      autoDecision,
    }

    pipeline.finalReport = finalReport
    return finalReport
  }

  // Helper methods
  private getExpectedElements(quest: Quest): string[] {
    const categoryElements = {
      waste: ["container", "reusable", "recycling", "compost"],
      energy: ["appliance", "meter", "solar", "LED"],
      water: ["faucet", "shower", "rain", "conservation"],
      biodiversity: ["plant", "sapling", "garden", "wildlife"],
      transport: ["bicycle", "bus", "walking", "sustainable"],
    }

    return categoryElements[quest.category] || ["environmental", "action"]
  }

  private calculateDistance(coord1: { lat: number; lng: number }, coord2: { lat: number; lng: number }): number {
    // Haversine formula for distance calculation
    const R = 6371e3 // Earth's radius in meters
    const φ1 = (coord1.lat * Math.PI) / 180
    const φ2 = (coord2.lat * Math.PI) / 180
    const Δφ = ((coord2.lat - coord1.lat) * Math.PI) / 180
    const Δλ = ((coord2.lng - coord1.lng) * Math.PI) / 180

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    return R * c
  }
}

// Export singleton instance
export const verificationService = new VerificationService()
