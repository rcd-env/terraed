"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Gift, Coins, ExternalLink } from "lucide-react"
import { MockWalletService, type Reward } from "@/lib/gamification"
import { toast } from "sonner"

interface RewardsGridProps {
  rewards: Reward[]
  userBalance: number
  onRedemption: () => void
}

export function RewardsGrid({ rewards, userBalance, onRedemption }: RewardsGridProps) {
  const [redeeming, setRedeeming] = useState<string | null>(null)

  const handleRedeem = async (rewardId: string) => {
    setRedeeming(rewardId)

    try {
      const result = await MockWalletService.redeemReward(rewardId)

      if (result.success && result.voucher) {
        toast.success(`Voucher redeemed! Code: ${result.voucher.code}`, {
          description: "Check your vouchers tab for details",
          duration: 5000,
        })
        onRedemption()
      } else {
        toast.error(result.error || "Failed to redeem reward")
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setRedeeming(null)
    }
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      education: "bg-blue-100 text-blue-800",
      lifestyle: "bg-green-100 text-green-800",
      environment: "bg-emerald-100 text-emerald-800",
      fashion: "bg-purple-100 text-purple-800",
    }
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {rewards.map((reward) => {
        const canAfford = userBalance >= reward.cost
        const isRedeeming = redeeming === reward.id

        return (
          <Card key={reward.id} className="p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Gift className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-1">{reward.name}</h3>
                <Badge className={getCategoryColor(reward.category)}>{reward.category}</Badge>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-4">{reward.description}</p>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <ExternalLink className="h-4 w-4" />
                {reward.partner}
              </div>
              <div className="flex items-center gap-1 font-semibold">
                <Coins className="h-4 w-4 text-primary" />
                {reward.cost}
              </div>
            </div>

            <Button
              onClick={() => handleRedeem(reward.id)}
              disabled={!canAfford || !reward.available || isRedeeming}
              className="w-full"
              variant={canAfford ? "default" : "secondary"}
            >
              {isRedeeming ? "Redeeming..." : canAfford ? "Redeem" : "Insufficient Points"}
            </Button>
          </Card>
        )
      })}
    </div>
  )
}
