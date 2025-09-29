"use client"

import type { Quest, Submission, LeaderboardEntry, ImpactStats, WalletTransaction, User } from "./types"

const API_BASE = "/api"

class ApiClient {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE}${endpoint}`
    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    }

    const response = await fetch(url, config)
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || "API request failed")
    }

    return data
  }

  // Authentication
  async login(email: string, password: string, userType: "student" | "teacher") {
    return this.request<{ success: boolean; token: string; user: User }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password, userType }),
    })
  }

  // Quests
  async getQuests(filters?: { category?: string; difficulty?: string; userId?: string }) {
    const params = new URLSearchParams()
    if (filters?.category) params.append("category", filters.category)
    if (filters?.difficulty) params.append("difficulty", filters.difficulty)
    if (filters?.userId) params.append("userId", filters.userId)

    return this.request<{ success: boolean; quests: Quest[]; total: number }>(`/quests?${params}`)
  }

  async getQuest(id: string) {
    return this.request<{ success: boolean; quest: Quest }>(`/quests/${id}`)
  }

  async createQuest(questData: Partial<Quest>) {
    return this.request<{ success: boolean; quest: Quest; message: string }>("/quests", {
      method: "POST",
      body: JSON.stringify(questData),
    })
  }

  // Submissions
  async getSubmissions(filters?: { userId?: string; status?: string }) {
    const params = new URLSearchParams()
    if (filters?.userId) params.append("userId", filters.userId)
    if (filters?.status) params.append("status", filters.status)

    return this.request<{ success: boolean; submissions: Submission[]; total: number }>(`/submissions?${params}`)
  }

  async createSubmission(submissionData: {
    questId: string
    userId: string
    imageUrl?: string
    caption: string
    gpsCoords?: { lat: number; lng: number }
    questPoints?: number
  }) {
    return this.request<{ success: boolean; submission: Submission; message: string }>("/submissions", {
      method: "POST",
      body: JSON.stringify(submissionData),
    })
  }

  async reviewSubmission(id: string, approved: boolean, reviewNotes?: string, reviewerId?: string) {
    return this.request<{ success: boolean; submission: Submission; message: string }>(`/submissions/${id}`, {
      method: "POST",
      body: JSON.stringify({ approved, reviewNotes, reviewerId }),
    })
  }

  // Leaderboard
  async getLeaderboard(limit = 10, timeframe = "all") {
    return this.request<{ success: boolean; leaderboard: LeaderboardEntry[]; timeframe: string; total: number }>(
      `/leaderboard?limit=${limit}&timeframe=${timeframe}`,
    )
  }

  // Impact
  async getImpactStats(userId: string) {
    return this.request<{ success: boolean; impact: ImpactStats }>(`/impact?userId=${userId}`)
  }

  // Wallet
  async getWalletTransactions(userId: string) {
    return this.request<{ success: boolean; transactions: WalletTransaction[]; total: number }>(
      `/wallet?userId=${userId}`,
    )
  }

  async redeemVoucher(userId: string, voucherType: string, pointsToRedeem: number) {
    return this.request<{
      success: boolean
      voucher: any
      transaction: WalletTransaction
      qrImageBase64: string
      message: string
    }>("/wallet/redeem", {
      method: "POST",
      body: JSON.stringify({ userId, voucherType, pointsToRedeem }),
    })
  }

  // AI Services
  async generateQuest(city: string, grade: number, topic: string, teacherId: string) {
    return this.request<{ success: boolean; quest: Omit<Quest, "id" | "createdAt">; message: string }>(
      "/ai/generate-quest",
      {
        method: "POST",
        body: JSON.stringify({ city, grade, topic, teacherId }),
      },
    )
  }

  async verifyImage(imageUrl: string, questCategory: string, expectedLabels: string[]) {
    return this.request<{
      success: boolean
      verification: {
        status: string
        confidence: number
        labels: string[]
        objects: any[]
        reasons: string[]
        duplicateScore: number
        processedAt: string
      }
    }>("/ai/verify-image", {
      method: "POST",
      body: JSON.stringify({ imageUrl, questCategory, expectedLabels }),
    })
  }
}

export const api = new ApiClient()
