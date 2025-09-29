import { type NextRequest, NextResponse } from "next/server"
import type { Quest } from "@/lib/types"

export async function POST(request: NextRequest) {
  try {
    const { city, grade, topic, teacherId } = await request.json()

    // Mock AI quest generation - in production would call OpenAI API
    const questTemplates = {
      waste: {
        titles: ["Zero Waste Challenge", "Plastic-Free Week", "Compost Creation Project"],
        activities: ["reduce plastic usage", "create a compost bin", "organize a cleanup drive"],
      },
      energy: {
        titles: ["Energy Detective", "Solar Power Explorer", "LED Light Mission"],
        activities: ["audit energy usage", "build a solar cooker", "replace incandescent bulbs"],
      },
      water: {
        titles: ["Water Conservation Hero", "Rain Harvesting Project", "Leak Detection Mission"],
        activities: ["install water-saving devices", "create a rain collection system", "find and report leaks"],
      },
      biodiversity: {
        titles: ["Native Plant Guardian", "Pollinator Garden Creator", "Wildlife Habitat Builder"],
        activities: ["plant native species", "create a butterfly garden", "build bird houses"],
      },
      transport: {
        titles: ["Green Commute Champion", "Bike Week Challenge", "Public Transport Explorer"],
        activities: ["use sustainable transport", "organize a bike-to-school day", "map public transport routes"],
      },
    }

    const template = questTemplates[topic as keyof typeof questTemplates]
    const randomIndex = Math.floor(Math.random() * template.titles.length)

    const generatedQuest: Omit<Quest, "id" | "createdAt"> = {
      title: template.titles[randomIndex],
      summary: `Complete a ${template.activities[randomIndex]} activity in ${city} suitable for grade ${grade} students`,
      instructions: `This AI-generated quest is designed for grade ${grade} students in ${city}. ${template.activities[randomIndex]} and document your process with photos and a detailed description of what you learned.`,
      points: Math.floor(Math.random() * 20) + 15, // 15-35 points
      proofTypes: ["photo"],
      locationHint: city,
      locationRadiusM: 5000,
      safetyNotes: "Always ask for adult supervision when needed and follow all safety guidelines.",
      expiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
      aiGenerated: true,
      createdBy: teacherId,
      category: topic,
      difficulty: grade <= 6 ? "easy" : grade <= 9 ? "medium" : "hard",
      estimatedTime: Math.floor(Math.random() * 40) + 20, // 20-60 minutes
      imageUrl: `/placeholder.svg?height=200&width=300&query=${encodeURIComponent(template.titles[randomIndex])}`,
    }

    return NextResponse.json({
      success: true,
      quest: generatedQuest,
      message: "Quest generated successfully by AI",
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate quest" }, { status: 500 })
  }
}
