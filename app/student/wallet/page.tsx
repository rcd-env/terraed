"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Gift, History, QrCode } from "lucide-react"
import Link from "next/link"
import { WalletBalance } from "@/components/wallet-balance"
import { RewardsGrid } from "@/components/rewards-grid"
import { MockWalletService, calculateUserLevel, type WalletData } from "@/lib/gamification"
import { toast } from "sonner"

export default function WalletPage() {
  const [walletData, setWalletData] = useState<WalletData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadWalletData()
  }, [])

  const loadWalletData = async () => {
    try {
      const data = await MockWalletService.getWalletData()
      setWalletData(data)
    } catch (error) {
      toast.error("Failed to load wallet data")
    } finally {
      setLoading(false)
    }
  }

  const handleRedemption = () => {
    // Reload wallet data after redemption
    loadWalletData()
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (!walletData) {
    return <div className="min-h-screen flex items-center justify-center">Failed to load wallet</div>
  }

  const totalEarned = walletData.transactions
    .filter((t) => t.type === "earned" || t.type === "bonus")
    .reduce((sum, t) => sum + t.amount, 0)
  const userLevel = calculateUserLevel(totalEarned)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-background">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/student/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <h1 className="text-xl font-bold text-display">My Wallet</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <WalletBalance
              balance={walletData.balance}
              monthlyEarned={walletData.monthlyEarned}
              monthlyLimit={walletData.monthlyLimit}
              level={userLevel}
            />

            <Tabs defaultValue="rewards" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="rewards" className="flex items-center gap-2">
                  <Gift className="w-4 h-4" />
                  Rewards
                </TabsTrigger>
                <TabsTrigger value="history" className="flex items-center gap-2">
                  <History className="w-4 h-4" />
                  History
                </TabsTrigger>
                <TabsTrigger value="vouchers" className="flex items-center gap-2">
                  <QrCode className="w-4 h-4" />
                  Vouchers
                </TabsTrigger>
              </TabsList>

              <TabsContent value="rewards" className="mt-6">
                <RewardsGrid
                  rewards={walletData.availableRewards}
                  userBalance={walletData.balance}
                  onRedemption={handleRedemption}
                />
              </TabsContent>

              <TabsContent value="history" className="mt-6">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="text-display">Transaction History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {walletData.transactions.map((transaction) => (
                        <div
                          key={transaction.id}
                          className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                transaction.type === "earned"
                                  ? "bg-primary/10"
                                  : transaction.type === "bonus"
                                    ? "bg-accent/10"
                                    : "bg-destructive/10"
                              }`}
                            >
                              {transaction.type === "earned" ? (
                                <Gift className="w-5 h-5 text-primary" />
                              ) : transaction.type === "bonus" ? (
                                <Gift className="w-5 h-5 text-accent" />
                              ) : (
                                <QrCode className="w-5 h-5 text-destructive" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium">{transaction.description}</p>
                              <p className="text-sm text-muted-foreground">
                                {new Date(transaction.timestamp).toLocaleDateString()}
                              </p>
                              {transaction.voucherCode && (
                                <p className="text-xs text-muted-foreground">Code: {transaction.voucherCode}</p>
                              )}
                            </div>
                          </div>
                          <div className={`font-bold ${transaction.amount > 0 ? "text-primary" : "text-destructive"}`}>
                            {transaction.amount > 0 ? "+" : ""}
                            {transaction.amount}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="vouchers" className="mt-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {walletData.vouchers.map((voucher) => (
                    <Card key={voucher.id} className="glass-card">
                      <CardContent className="p-6">
                        <div className="text-center">
                          <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                            <QrCode className="w-8 h-8 text-primary" />
                          </div>
                          <h3 className="font-semibold mb-2">{voucher.partner}</h3>
                          <p className="text-sm text-muted-foreground mb-3">{voucher.value}</p>
                          <div className="bg-muted/50 rounded-lg p-3 mb-4">
                            <p className="font-mono text-sm font-medium">{voucher.code}</p>
                          </div>
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>Status: {voucher.status}</span>
                            {voucher.expiresAt && (
                              <span>Expires: {new Date(voucher.expiresAt).toLocaleDateString()}</span>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {walletData.vouchers.length === 0 && (
                    <div className="col-span-full text-center py-12 text-muted-foreground">
                      <QrCode className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No vouchers yet</p>
                      <p className="text-sm">Redeem rewards to get vouchers</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
