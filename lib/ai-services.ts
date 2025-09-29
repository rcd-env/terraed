"use client"

import type { Quest, VerificationReport } from "./types"

// AI Service Configuration
const AI_CONFIG = {
  OPENAI_MODEL: "gpt-4o-mini",
  VISION_MODEL: "gpt-4o-vision-preview",
  CONFIDENCE_THRESHOLDS: {
    AUTO_PASS: 0.75,
    REVIEW: 0.5,
    REJECT: 0.5,
  },
  MAX_RETRIES: 3,
  TIMEOUT: 30000, // 30 seconds
}

export class AIService {
  private useStubs = true

  constructor() {
    this.useStubs = true // Always use stubs in client-side demo mode
  }

  /**
   * Generate an educational quest using AI
   */
  async generateQuest(params: {
    city: string
    grade: number
    topic: "waste" | "energy" | "water" | "biodiversity" | "transport"
    teacherId: string
    customPrompt?: string
  }): Promise<Omit<Quest, "id" | "createdAt">> {
    if (this.useStubs) {
      return this.generateQuestStub(params)
    }

    try {
      // In production, this would call a server action that handles the API key securely
      const response = await fetch("/api/ai/generate-quest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      })

      if (!response.ok) {
        throw new Error("Server request failed")
      }

      return await response.json()
    } catch (error) {
      console.error("AI quest generation failed, falling back to stub:", error)
      return this.generateQuestStub(params)
    }
  }

  /**
   * Verify image submission using computer vision
   */
  async verifyImage(params: {
    imageUrl: string
    questCategory: string
    questTitle: string
    expectedElements: string[]
    userCaption: string
  }): Promise<VerificationReport> {
    if (this.useStubs) {
      return this.verifyImageStub(params)
    }

    try {
      const response = await fetch("/api/ai/verify-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      })

      if (!response.ok) {
        throw new Error("Server request failed")
      }

      return await response.json()
    } catch (error) {
      console.error("AI image verification failed, falling back to stub:", error)
      return this.verifyImageStub(params)
    }
  }

  /**
   * Generate educational content for quests
   */
  async generateEducationalContent(params: {
    topic: string
    grade: number
    contentType: "instructions" | "safety_notes" | "learning_objectives"
  }): Promise<string> {
    if (this.useStubs) {
      return this.generateContentStub(params)
    }

    try {
      const response = await fetch("/api/ai/generate-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      })

      if (!response.ok) {
        throw new Error("Server request failed")
      }

      const data = await response.json()
      return data.content || ""
    } catch (error) {
      console.error("AI content generation failed, falling back to stub:", error)
      return this.generateContentStub(params)
    }
  }

  /**
   * Analyze submission for educational insights
   */
  async analyzeSubmission(params: {
    questTitle: string
    userCaption: string
    verificationResults: any
  }): Promise<{
    insights: string[]
    suggestions: string[]
    encouragement: string
  }> {
    if (this.useStubs) {
      return this.analyzeSubmissionStub(params)
    }

    try {
      const response = await fetch("/api/ai/analyze-submission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      })

      if (!response.ok) {
        throw new Error("Server request failed")
      }

      return await response.json()
    } catch (error) {
      console.error("AI submission analysis failed, falling back to stub:", error)
      return this.analyzeSubmissionStub(params)
    }
  }

  // Stub implementations for demo/fallback
  private generateQuestStub(params: {
    city: string
    grade: number
    topic: string
    teacherId: string
  }): Omit<Quest, "id" | "createdAt"> {
    const questTemplates = {
      waste: {
        title: "Zero Waste Lunch Challenge",
        summary: "Pack and eat a completely zero-waste lunch for one week",
        activity: "eliminate single-use packaging",
      },
      energy: {
        title: "Home Energy Detective",
        summary: "Conduct an energy audit of your home and identify savings",
        activity: "audit energy usage",
      },
      water: {
        title: "Water Conservation Hero",
        summary: "Install water-saving devices and track usage",
        activity: "conserve water",
      },
      biodiversity: {
        title: "Native Plant Guardian",
        summary: "Plant native species in your school or community garden",
        activity: "plant native species",
      },
      transport: {
        title: "Green Commute Champion",
        summary: "Use sustainable transport for a full week",
        activity: "use eco-friendly transport",
      },
    }

    const template = questTemplates[params.topic as keyof typeof questTemplates]
    const difficulty = params.grade <= 6 ? "easy" : params.grade <= 9 ? "medium" : "hard"
    const points = difficulty === "easy" ? 15 : difficulty === "medium" ? 25 : 35

    return {
      title: template.title,
      summary: `${template.summary} - designed for grade ${params.grade} students in ${params.city}`,
      instructions: `This quest is designed for grade ${params.grade} students. ${template.activity} and document your process with clear photos and detailed descriptions. Make sure to follow all safety guidelines and ask for adult help when needed.`,
      points,
      proofTypes: ["photo"],
      locationHint: params.city,
      locationRadiusM: 2000,
      safetyNotes: "Always follow safety guidelines and ask for adult supervision when needed.",
      expiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      aiGenerated: true,
      createdBy: params.teacherId,
      category: params.topic as any,
      difficulty: difficulty as any,
      estimatedTime: 45,
      imageUrl: `/placeholder.svg?height=200&width=300&query=${encodeURIComponent(template.title)}`,
    }
  }

  private verifyImageStub(params: {
    imageUrl: string
    questCategory: string
    questTitle: string
    expectedElements: string[]
  }): VerificationReport {
    // Simulate realistic verification results
    const confidence = 0.75 + Math.random() * 0.2 // 0.75-0.95
    const mockLabels = params.expectedElements.slice(0, 3).concat(["authentic", "educational"])

    return {
      confidence,
      labels: mockLabels,
      reasons: confidence < 0.8 ? ["moderate_confidence"] : [],
      pHashScore: Math.random() * 0.3, // Low duplicate score
      exifValid: true,
      gpsValid: true,
      duplicateCheck: true,
      autoDecision: confidence >= AI_CONFIG.CONFIDENCE_THRESHOLDS.AUTO_PASS ? "pass" : "review",
    }
  }

  private generateContentStub(params: {
    topic: string
    grade: number
    contentType: string
  }): string {
    const contentTemplates = {
      instructions: `Follow these steps to complete your ${params.topic} quest. Take your time and be thorough in documenting your work.`,
      safety_notes: `Always ask for adult supervision when needed. Wear appropriate safety gear and follow all guidelines.`,
      learning_objectives: `Learn about ${params.topic} and its impact on the environment while developing practical skills.`,
    }

    return contentTemplates[params.contentType as keyof typeof contentTemplates] || "Educational content"
  }

  private analyzeSubmissionStub(params: {
    questTitle: string
    userCaption: string
  }): {
    insights: string[]
    suggestions: string[]
    encouragement: string
  } {
    return {
      insights: [
        "Great job documenting your environmental action!",
        "Your detailed description shows good understanding of the impact.",
      ],
      suggestions: [
        "Consider sharing your experience with classmates to inspire others.",
        "Think about how you can make this a regular habit.",
      ],
      encouragement:
        "Excellent work! You're making a real difference for our planet. Keep up the great environmental stewardship!",
    }
  }
}

// Export singleton instance
export const aiService = new AIService()
