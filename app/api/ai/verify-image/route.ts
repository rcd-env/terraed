import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { imageUrl, questCategory, expectedLabels } = await request.json()

    // Mock AI image verification - in production would call Vision API
    const mockVerificationResult = {
      labels: ["plant", "sapling", "soil", "hands", "garden"],
      confidence: 0.85 + Math.random() * 0.1, // 0.85-0.95
      objects: [
        { name: "plant", confidence: 0.92, boundingBox: { x: 100, y: 150, width: 200, height: 300 } },
        { name: "hands", confidence: 0.88, boundingBox: { x: 50, y: 100, width: 150, height: 200 } },
      ],
      inappropriate: false,
      duplicateScore: Math.random() * 0.3, // Low duplicate score
    }

    // Determine verification status
    let status = "approved"
    const reasons: string[] = []

    if (mockVerificationResult.confidence < 0.75) {
      status = "review"
      reasons.push("low_confidence")
    }

    if (mockVerificationResult.duplicateScore > 0.9) {
      status = "review"
      reasons.push("potential_duplicate")
    }

    if (mockVerificationResult.inappropriate) {
      status = "rejected"
      reasons.push("inappropriate_content")
    }

    return NextResponse.json({
      success: true,
      verification: {
        status,
        confidence: mockVerificationResult.confidence,
        labels: mockVerificationResult.labels,
        objects: mockVerificationResult.objects,
        reasons,
        duplicateScore: mockVerificationResult.duplicateScore,
        processedAt: new Date().toISOString(),
      },
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to verify image" }, { status: 500 })
  }
}
