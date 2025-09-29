import { type NextRequest, NextResponse } from "next/server"
import type { ImpactStats } from "@/lib/types"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 })
    }

    // Mock impact calculation based on user activity
    const mockImpactStats: ImpactStats = {
      userId,
      treesPlanted: Math.floor(Math.random() * 10) + 1,
      wasteCollected: Math.floor(Math.random() * 50) + 5,
      carbonSaved: Math.floor(Math.random() * 100) + 20,
      waterSaved: Math.floor(Math.random() * 500) + 100,
      energySaved: Math.floor(Math.random() * 100) + 10,
      lastUpdated: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      impact: mockImpactStats,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch impact data" }, { status: 500 })
  }
}
