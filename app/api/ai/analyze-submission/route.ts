import { type NextRequest, NextResponse } from "next/server"
import { aiService } from "@/lib/ai-services"

export async function POST(request: NextRequest) {
  try {
    const { questTitle, userCaption, verificationResults } = await request.json()

    const analysis = await aiService.analyzeSubmission({
      questTitle,
      userCaption,
      verificationResults,
    })

    return NextResponse.json({
      success: true,
      analysis,
      message: "Submission analyzed successfully",
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to analyze submission" }, { status: 500 })
  }
}
