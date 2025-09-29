import { type NextRequest, NextResponse } from "next/server"
import { users } from "@/data/mock-users"

export async function POST(request: NextRequest) {
  try {
    const { email, password, userType } = await request.json()

    // Mock authentication - in production would verify against secure database
    const user = users.find((u) => u.email === email && u.type === userType)

    if (!user || password !== "pass") {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // In production, would generate secure JWT token
    const token = `mock_token_${user.id}_${Date.now()}`

    return NextResponse.json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        type: user.type,
        avatar: user.avatar,
        school: user.school,
        grade: user.grade,
        points: user.points,
        streak: user.streak,
        monthlyPoints: user.monthlyPoints,
        consentGiven: user.consentGiven,
      },
    })
  } catch (error) {
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
  }
}
