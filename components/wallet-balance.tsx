"use client"

import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Coins, TrendingUp, Calendar } from "lucide-react"

interface WalletBalanceProps {
  balance: number
  monthlyEarned: number
  monthlyLimit: number
  level: { level: number; title: string; nextLevelPoints: number }
}

export function WalletBalance({ balance, monthlyEarned, monthlyLimit, level }: WalletBalanceProps) {
  const monthlyProgress = (monthlyEarned / monthlyLimit) * 100
  const remainingPoints = monthlyLimit - monthlyEarned

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {/* Current Balance */}
      <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Coins className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Current Balance</p>
            <p className="text-2xl font-bold text-primary">{balance}</p>
          </div>
        </div>
      </Card>

      {/* Monthly Progress */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-accent/10 rounded-lg">
            <Calendar className="h-5 w-5 text-accent" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">This Month</p>
            <p className="text-lg font-semibold">
              {monthlyEarned} / {monthlyLimit}
            </p>
          </div>
        </div>
        <Progress value={monthlyProgress} className="h-2" />
        <p className="text-xs text-muted-foreground mt-2">{remainingPoints} points remaining this month</p>
      </Card>

      {/* User Level */}
      <Card className="p-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-secondary/10 rounded-lg">
            <TrendingUp className="h-5 w-5 text-secondary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Level {level.level}</p>
            <p className="font-semibold text-secondary">{level.title}</p>
            {level.nextLevelPoints > 0 && (
              <p className="text-xs text-muted-foreground">{level.nextLevelPoints} to next level</p>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}
