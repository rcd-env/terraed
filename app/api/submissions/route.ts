import { type NextRequest, NextResponse } from "next/server"
import type { Submission, VerificationReport } from "@/lib/types"

// Mock in-memory storage - in production would use database
const submissions: Submission[] = []

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const status = searchParams.get("status")

    let filteredSubmissions = [...submissions]

    if (userId) {
      filteredSubmissions = filteredSubmissions.filter((s) => s.userId === userId)
    }

    if (status) {
      filteredSubmissions = filteredSubmissions.filter((s) => s.status === status)
    }

    return NextResponse.json({
      success: true,
      submissions: filteredSubmissions,
      total: filteredSubmissions.length,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch submissions" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const submissionData = await request.json()

    // Mock verification pipeline
    const verificationReport: VerificationReport = await mockVerification(submissionData)

    const newSubmission: Submission = {
      id: `sub${Date.now()}`,
      questId: submissionData.questId,
      userId: submissionData.userId,
      imageUrl: submissionData.imageUrl,
      caption: submissionData.caption,
      gpsCoords: submissionData.gpsCoords,
      status: verificationReport.autoDecision === "pass" ? "auto_pass" : verificationReport.autoDecision,
      verificationReport,
      pointsAwarded: verificationReport.autoDecision === "pass" ? submissionData.questPoints || 20 : 0,
      submittedAt: new Date().toISOString(),
    }

    submissions.push(newSubmission)

    return NextResponse.json({
      success: true,
      submission: newSubmission,
      message: "Submission created successfully",
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create submission" }, { status: 500 })
  }
}

async function mockVerification(submissionData: any): Promise<VerificationReport> {
  // Mock AI verification logic
  const mockLabels = ["plant", "sapling", "garden", "soil", "hands"]
  const confidence = 0.75 + Math.random() * 0.2 // Random confidence between 0.75-0.95

  const report: VerificationReport = {
    confidence,
    labels: mockLabels,
    reasons: [],
    pHashScore: Math.random() * 0.3, // Low similarity score (good)
    exifValid: true,
    gpsValid: !!submissionData.gpsCoords,
    duplicateCheck: true,
    autoDecision: "pass",
  }

  // Determine auto decision based on confidence
  if (confidence >= 0.75) {
    report.autoDecision = "pass"
  } else if (confidence >= 0.5) {
    report.autoDecision = "review"
    report.reasons.push("low_confidence")
  } else {
    report.autoDecision = "reject"
    report.reasons.push("very_low_confidence")
  }

  // Check for potential issues
  if (!submissionData.gpsCoords) {
    report.reasons.push("no_gps")
  }

  if (report.pHashScore && report.pHashScore > 0.9) {
    report.autoDecision = "review"
    report.reasons.push("potential_duplicate")
  }

  return report
}
