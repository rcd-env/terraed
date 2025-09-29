import { type NextRequest, NextResponse } from "next/server"

// Mock in-memory storage - would be database in production
const submissions: any[] = []

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const submission = submissions.find((s) => s.id === params.id)

    if (!submission) {
      return NextResponse.json({ error: "Submission not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      submission,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch submission" }, { status: 500 })
  }
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { approved, reviewNotes, reviewerId } = await request.json()

    const submissionIndex = submissions.findIndex((s) => s.id === params.id)
    if (submissionIndex === -1) {
      return NextResponse.json({ error: "Submission not found" }, { status: 404 })
    }

    // Update submission status
    submissions[submissionIndex] = {
      ...submissions[submissionIndex],
      status: approved ? "approved" : "rejected",
      reviewedBy: reviewerId,
      reviewNotes,
      reviewedAt: new Date().toISOString(),
      pointsAwarded: approved ? submissions[submissionIndex].pointsAwarded : 0,
    }

    return NextResponse.json({
      success: true,
      submission: submissions[submissionIndex],
      message: `Submission ${approved ? "approved" : "rejected"} successfully`,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to review submission" }, { status: 500 })
  }
}
