import { type NextRequest, NextResponse } from "next/server"
import { quests } from "@/data/mock-quests"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const difficulty = searchParams.get("difficulty")
    const userId = searchParams.get("userId")

    let filteredQuests = [...quests]

    // Filter by category
    if (category && category !== "all") {
      filteredQuests = filteredQuests.filter((q) => q.category === category)
    }

    // Filter by difficulty
    if (difficulty && difficulty !== "all") {
      filteredQuests = filteredQuests.filter((q) => q.difficulty === difficulty)
    }

    // Filter out expired quests
    const now = new Date()
    filteredQuests = filteredQuests.filter((q) => new Date(q.expiry) > now)

    return NextResponse.json({
      success: true,
      quests: filteredQuests,
      total: filteredQuests.length,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch quests" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const questData = await request.json()

    // Mock quest creation - in production would save to database
    const newQuest = {
      id: `q${Date.now()}`,
      ...questData,
      createdAt: new Date().toISOString(),
      aiGenerated: questData.aiGenerated || false,
    }

    return NextResponse.json({
      success: true,
      quest: newQuest,
      message: "Quest created successfully",
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create quest" }, { status: 500 })
  }
}
