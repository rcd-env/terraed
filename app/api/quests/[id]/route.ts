import { type NextRequest, NextResponse } from "next/server"
import { quests } from "@/data/mock-quests"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const quest = quests.find((q) => q.id === params.id)

    if (!quest) {
      return NextResponse.json({ error: "Quest not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      quest,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch quest" }, { status: 500 })
  }
}
