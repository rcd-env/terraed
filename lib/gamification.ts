// Gamification rules and logic for TerraEd platform
export interface PointRules {
  easy: number
  medium: number
  hard: number
}

export interface GamificationConfig {
  pointRules: PointRules
  monthlyLimit: number
  streakBonus: number
  completionBonus: number
}

export const GAMIFICATION_CONFIG: GamificationConfig = {
  pointRules: {
    easy: 10,
    medium: 20,
    hard: 30,
  },
  monthlyLimit: 200,
  streakBonus: 5, // Extra points for consecutive days
  completionBonus: 10, // Bonus for completing all quests in a category
}

export interface WalletTransaction {
  id: string
  type: "earned" | "redeemed" | "bonus"
  amount: number
  description: string
  timestamp: string
  questId?: string
  voucherCode?: string
}

export interface Voucher {
  id: string
  code: string
  partner: string
  value: string
  status: "active" | "redeemed" | "expired"
  redeemedAt?: string
  expiresAt?: string
}

export interface Reward {
  id: string
  name: string
  description: string
  cost: number
  partner: string
  category: string
  available: boolean
}

export interface WalletData {
  balance: number
  monthlyEarned: number
  monthlyLimit: number
  transactions: WalletTransaction[]
  vouchers: Voucher[]
  availableRewards: Reward[]
}

// Calculate points for quest completion
export function calculateQuestPoints(difficulty: "easy" | "medium" | "hard", hasStreak = false): number {
  const basePoints = GAMIFICATION_CONFIG.pointRules[difficulty]
  const streakBonus = hasStreak ? GAMIFICATION_CONFIG.streakBonus : 0
  return basePoints + streakBonus
}

// Check if user can earn more points this month
export function canEarnPoints(currentMonthlyEarned: number, pointsToEarn: number): boolean {
  return currentMonthlyEarned + pointsToEarn <= GAMIFICATION_CONFIG.monthlyLimit
}

// Generate voucher code
export function generateVoucherCode(partnerId: string): string {
  const year = new Date().getFullYear()
  const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `TERRA-${year}-${partnerId}${randomSuffix}`
}

// Calculate user level based on total points
export function calculateUserLevel(totalPoints: number): { level: number; title: string; nextLevelPoints: number } {
  const levels = [
    { level: 1, title: "Eco Seedling", minPoints: 0, nextLevel: 50 },
    { level: 2, title: "Green Sprout", minPoints: 50, nextLevel: 150 },
    { level: 3, title: "Nature Guardian", minPoints: 150, nextLevel: 300 },
    { level: 4, title: "Earth Protector", minPoints: 300, nextLevel: 500 },
    { level: 5, title: "Climate Champion", minPoints: 500, nextLevel: 1000 },
    { level: 6, title: "Sustainability Master", minPoints: 1000, nextLevel: Number.POSITIVE_INFINITY },
  ]

  for (let i = levels.length - 1; i >= 0; i--) {
    if (totalPoints >= levels[i].minPoints) {
      return {
        level: levels[i].level,
        title: levels[i].title,
        nextLevelPoints: levels[i].nextLevel === Number.POSITIVE_INFINITY ? 0 : levels[i].nextLevel - totalPoints,
      }
    }
  }

  return levels[0]
}

// Mock wallet operations
export class MockWalletService {
  private static walletData: WalletData | null = null

  static async getWalletData(): Promise<WalletData> {
    if (!this.walletData) {
      // In a real app, this would fetch from an API
      const response = await fetch("/data/mock-wallet.json")
      this.walletData = await response.json()
    }
    return this.walletData!
  }

  static async addTransaction(transaction: Omit<WalletTransaction, "id" | "timestamp">): Promise<WalletTransaction> {
    const walletData = await this.getWalletData()

    const newTransaction: WalletTransaction = {
      ...transaction,
      id: `tx_${Date.now()}`,
      timestamp: new Date().toISOString(),
    }

    walletData.transactions.unshift(newTransaction)

    if (transaction.type === "earned") {
      walletData.balance += transaction.amount
      walletData.monthlyEarned += transaction.amount
    } else if (transaction.type === "redeemed") {
      walletData.balance += transaction.amount // amount is negative for redemptions
    }

    return newTransaction
  }

  static async redeemReward(rewardId: string): Promise<{ success: boolean; voucher?: Voucher; error?: string }> {
    const walletData = await this.getWalletData()
    const reward = walletData.availableRewards.find((r) => r.id === rewardId)

    if (!reward) {
      return { success: false, error: "Reward not found" }
    }

    if (!reward.available) {
      return { success: false, error: "Reward not available" }
    }

    if (walletData.balance < reward.cost) {
      return { success: false, error: "Insufficient points" }
    }

    // Create voucher
    const voucherCode = generateVoucherCode(reward.partner.substring(0, 2))
    const voucher: Voucher = {
      id: `voucher_${Date.now()}`,
      code: voucherCode,
      partner: reward.partner,
      value: reward.description,
      status: "active",
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
    }

    // Add transaction
    await this.addTransaction({
      type: "redeemed",
      amount: -reward.cost,
      description: `Redeemed: ${reward.name}`,
      voucherCode: voucherCode,
    })

    walletData.vouchers.push(voucher)

    return { success: true, voucher }
  }
}
