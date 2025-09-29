"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Target, Trophy, TrendingUp, Leaf, Droplets, Recycle, Globe } from "lucide-react"
import { institutionLeaderboard } from "@/data/mock-institution-leaderboard"
import { institutionImpact } from "@/data/mock-institution-impact"
import { questParticipation } from "@/data/mock-quest-participation"
import { motion } from "framer-motion"

export default function InstitutionDashboard() {
  const stats = [
    {
      title: "Total Students",
      value: "1,247",
      icon: Users,
      change: "+12%",
      color: "text-blue-600",
    },
    {
      title: "Quests Assigned",
      value: "24",
      icon: Target,
      change: "+3",
      color: "text-green-600",
    },
    {
      title: "Points Earned",
      value: "15,420",
      icon: Trophy,
      change: "+8%",
      color: "text-yellow-600",
    },
    {
      title: "Monthly Engagement",
      value: "73%",
      icon: TrendingUp,
      change: "+5%",
      color: "text-purple-600",
    },
  ]

  const impactMetrics = [
    {
      title: "Trees Planted",
      value: institutionImpact.trees,
      icon: Leaf,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Water Saved",
      value: `${institutionImpact.water_saved_liters}L`,
      icon: Droplets,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Waste Recycled",
      value: `${institutionImpact.waste_recycled_kg}kg`,
      icon: Recycle,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Carbon Reduced",
      value: `${institutionImpact.carbon_saved_kg}kg`,
      icon: Globe,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <h1 className="text-4xl font-bold text-display mb-2">Institution Dashboard</h1>
          <p className="text-muted-foreground">Sister Nivedita University Impact Overview</p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <Card key={stat.title} className="glass-card hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold text-display">{stat.value}</p>
                    <Badge variant="secondary" className="mt-2">
                      {stat.change}
                    </Badge>
                  </div>
                  <div className={`p-3 rounded-lg bg-secondary/20 ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Institution Leaderboard */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-600" />
                  Top Students
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {institutionLeaderboard.map((student, index) => (
                    <div
                      key={student.name}
                      className="flex items-center justify-between p-3 rounded-lg bg-secondary/20"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                            index === 0
                              ? "bg-yellow-100 text-yellow-800"
                              : index === 1
                                ? "bg-gray-100 text-gray-800"
                                : index === 2
                                  ? "bg-orange-100 text-orange-800"
                                  : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {index + 1}
                        </div>
                        <span className="font-medium">{student.name}</span>
                      </div>
                      <Badge variant="outline">{student.points} pts</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Impact Metrics */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Environmental Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {impactMetrics.map((metric) => (
                    <div key={metric.title} className={`p-4 rounded-lg ${metric.bgColor}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <metric.icon className={`w-5 h-5 ${metric.color}`} />
                        <span className="text-sm font-medium">{metric.title}</span>
                      </div>
                      <p className="text-2xl font-bold text-display">{metric.value}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Quest Participation */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Quest Participation Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {questParticipation.map((quest) => (
                  <div key={quest.quest} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{quest.quest}</span>
                      <Badge variant="secondary">{quest.completion_percent}%</Badge>
                    </div>
                    <div className="w-full bg-secondary/20 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${quest.completion_percent}%` }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="terra-gradient h-2 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
