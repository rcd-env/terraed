import { type NextRequest, NextResponse } from "next/server"
import { users } from "@/data/mock-users" // Updated import path to use TypeScript file instead of JSON
import type { LeaderboardEntry } from "@/lib/types"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const timeframe = searchParams.get("timeframe") || "all" // all, monthly, weekly

    // Filter students only
    const students = users.filter((u) => u.type === "student")

    // Create leaderboard entries
    const leaderboardEntries: LeaderboardEntry[] = students
      .map((user, index) => ({
        userId: user.id,
        name: user.name,
        avatar: user.avatar,
        points: timeframe === "monthly" ? user.monthlyPoints : user.points,
        rank: 0, // Will be set after sorting
        streak: user.streak,
        questsCompleted: Math.floor(user.points / 20), // Estimate based on average points per quest
        badges: user.id === "student2" ? ["Eco Influencer"] : [], // Maya Patel gets the Eco Influencer badge
      }))
      .sort((a, b) => b.points - a.points)
      .slice(0, limit)
      .map((entry, index) => ({
        ...entry,
        rank: index + 1,
      }))

    return NextResponse.json({
      success: true,
      leaderboard: leaderboardEntries,
      timeframe,
      total: leaderboardEntries.length,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch leaderboard" }, { status: 500 })
  }
}
