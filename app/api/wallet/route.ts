import { type NextRequest, NextResponse } from "next/server"
import type { WalletTransaction } from "@/lib/types"

// Mock in-memory storage
const transactions: WalletTransaction[] = [
  {
    id: "t1",
    userId: "student1",
    type: "earned",
    amount: 25,
    description: "Plant a Native Sapling quest completed",
    questId: "q1",
    createdAt: "2025-01-18T10:30:00Z",
  },
  {
    id: "t2",
    userId: "student1",
    type: "earned",
    amount: 20,
    description: "Zero Waste Lunch Challenge completed",
    questId: "q2",
    createdAt: "2025-01-17T14:20:00Z",
  },
  {
    id: "t3",
    userId: "student1",
    type: "bonus",
    amount: 10,
    description: "3-day streak bonus",
    createdAt: "2025-01-16T09:00:00Z",
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 })
    }

    const userTransactions = transactions.filter((t) => t.userId === userId)

    return NextResponse.json({
      success: true,
      transactions: userTransactions,
      total: userTransactions.length,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch wallet data" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const transactionData = await request.json()

    const newTransaction: WalletTransaction = {
      id: `t${Date.now()}`,
      userId: transactionData.userId,
      type: transactionData.type,
      amount: transactionData.amount,
      description: transactionData.description,
      questId: transactionData.questId,
      voucherCode: transactionData.voucherCode,
      createdAt: new Date().toISOString(),
    }

    transactions.push(newTransaction)

    return NextResponse.json({
      success: true,
      transaction: newTransaction,
      message: "Transaction recorded successfully",
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to record transaction" }, { status: 500 })
  }
}
