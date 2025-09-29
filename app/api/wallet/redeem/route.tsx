import { type NextRequest, NextResponse } from "next/server"
import type { Voucher, WalletTransaction } from "@/lib/types"
import { VOUCHER_TYPES } from "@/lib/constants"

// Mock in-memory storage
const vouchers: Voucher[] = []
const transactions: WalletTransaction[] = []

export async function POST(request: NextRequest) {
  try {
    const { userId, voucherType, pointsToRedeem } = await request.json()

    // Validate voucher type
    if (!VOUCHER_TYPES[voucherType as keyof typeof VOUCHER_TYPES]) {
      return NextResponse.json({ error: "Invalid voucher type" }, { status: 400 })
    }

    // Check minimum redemption amount
    if (pointsToRedeem < 100) {
      return NextResponse.json({ error: "Minimum redemption is 100 points" }, { status: 400 })
    }

    // Generate voucher code
    const voucherCode = `TERRA-${voucherType.toUpperCase()}-${Date.now()}`

    // Create voucher
    const newVoucher: Voucher = {
      code: voucherCode,
      userId,
      value: pointsToRedeem,
      type: voucherType,
      used: false,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
      createdAt: new Date().toISOString(),
    }

    vouchers.push(newVoucher)

    // Create transaction record
    const transaction: WalletTransaction = {
      id: `t${Date.now()}`,
      userId,
      type: "redeemed",
      amount: -pointsToRedeem,
      description: `${VOUCHER_TYPES[voucherType as keyof typeof VOUCHER_TYPES].label} redeemed`,
      voucherCode,
      createdAt: new Date().toISOString(),
    }

    transactions.push(transaction)

    // Generate QR code data (mock)
    const qrData = {
      code: voucherCode,
      type: voucherType,
      value: pointsToRedeem,
      userId,
      expiresAt: newVoucher.expiresAt,
    }

    // Mock QR code image (in production would generate actual QR code)
    const qrImageBase64 = `data:image/svg+xml;base64,${Buffer.from(
      `<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="200" fill="white"/>
        <text x="100" y="100" text-anchor="middle" font-family="monospace" font-size="12">
          ${voucherCode}
        </text>
      </svg>`,
    ).toString("base64")}`

    return NextResponse.json({
      success: true,
      voucher: newVoucher,
      transaction,
      qrImageBase64,
      message: "Voucher redeemed successfully",
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to redeem voucher" }, { status: 500 })
  }
}
