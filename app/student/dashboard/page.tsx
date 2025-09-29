"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { QuestCard } from "@/components/quest-card"
import { ImpactChart } from "@/components/impact-chart"
import { Leaderboard } from "@/components/leaderboard"
import { PremiumStatsCard } from "@/components/premium-stats-card"
import { FloatingActionButton } from "@/components/floating-action-button"
import { ConfettiAnimation } from "@/components/confetti-animation"
import { Star, Flame, Trophy, Target, Calendar, Plus, Bell, Settings, LogOut, Sparkles, Award, MapPin } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import type { User, Quest, ImpactStats, LeaderboardEntry } from "@/lib/types"

export default function StudentDashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [activeQuests, setActiveQuests] = useState<Quest[]>([])
  const [seasonalQuests, setSeasonalQuests] = useState<Quest[]>([])
  const [impactStats, setImpactStats] = useState<ImpactStats | null>(null)
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [showConfetti, setShowConfetti] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Load user data from localStorage (mock auth)
    const userData = localStorage.getItem("terraed_user")
    if (userData) {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)

      // Load mock data
      loadMockData(parsedUser.id)

      const lastLogin = localStorage.getItem("terraed_last_login")
      const today = new Date().toDateString()
      if (lastLogin !== today && parsedUser.streak >= 3) {
        setShowConfetti(true)
      }
      localStorage.setItem("terraed_last_login", today)
    } else {
      router.push("/auth/login")
    }
  }, [router])

  const loadMockData = async (userId: string) => {
    // Mock API calls - in real app would fetch from backend
    const mockQuests: Quest[] = [
      {
        id: "q1",
        title: "Plant a Native Sapling",
        summary: "Plant a native sapling in your school garden",
        instructions: "Find a suitable location, dig a hole, plant the sapling, and document the process.",
        points: 25,
        proofTypes: ["photo"],
        locationHint: "School garden",
        expiry: "2025-03-15T00:00:00Z",
        aiGenerated: true,
        createdBy: "teacher1",
        category: "biodiversity",
        difficulty: "medium",
        estimatedTime: 45,
        imageUrl: "/student-planting-sapling-in-school-garden.jpg",
        createdAt: "2025-01-15T00:00:00Z",
      },
      {
        id: "q2",
        title: "Zero Waste Lunch Challenge",
        summary: "Pack a completely zero-waste lunch for one week",
        instructions: "Use reusable containers and avoid single-use packaging.",
        points: 20,
        proofTypes: ["photo"],
        locationHint: "School cafeteria",
        expiry: "2025-02-28T00:00:00Z",
        aiGenerated: false,
        createdBy: "teacher1",
        category: "waste",
        difficulty: "easy",
        estimatedTime: 30,
        imageUrl: "/zero-waste-lunch-in-reusable-containers.jpg",
        createdAt: "2025-01-10T00:00:00Z",
      },
    ]

    const mockSeasonalQuests: Quest[] = [
      {
        id: "seasonal-1",
        title: "Winter Bird Feeding Station",
        description: "Create a bird feeding station to help local birds survive the winter months",
        category: "Wildlife Conservation",
        difficulty: "Easy",
        points: 30,
        duration: "60min",
        location: "School grounds",
        image: "/placeholder.jpg",
        isActive: true,
        isCompleted: false,
        isSeasonal: true,
        seasonalEndDate: "2025-03-20T23:59:59Z",
        tags: ["Winter", "Wildlife", "Seasonal"],
        requirements: ["Bird feeder materials", "Bird seed", "Camera for documentation"],
        rewards: ["Winter Conservation Badge", "Wildlife Helper Certificate"],
      },
      {
        id: "seasonal-2",
        title: "Spring Garden Preparation",
        description: "Prepare the school garden for spring planting season",
        category: "Gardening",
        difficulty: "Medium",
        points: 40,
        duration: "90min",
        location: "School garden",
        image: "/placeholder.jpg",
        isActive: true,
        isCompleted: false,
        isSeasonal: true,
        seasonalEndDate: "2025-05-31T23:59:59Z",
        tags: ["Spring", "Gardening", "Seasonal"],
        requirements: ["Garden tools", "Compost", "Seeds"],
        rewards: ["Spring Gardener Badge", "Green Thumb Certificate"],
      },
      {
        id: "seasonal-3",
        title: "Summer Beach Cleanup",
        description: "Organize a beach cleanup to protect marine life during summer",
        category: "Waste Management",
        difficulty: "Easy",
        points: 35,
        duration: "120min",
        location: "Local beach",
        image: "/placeholder.jpg",
        isActive: true,
        isCompleted: false,
        isSeasonal: true,
        seasonalEndDate: "2025-08-31T23:59:59Z",
        tags: ["Summer", "Ocean", "Seasonal"],
        requirements: ["Trash bags", "Gloves", "Water bottles"],
        rewards: ["Ocean Protector Badge", "Summer Hero Certificate"],
      },
      {
        id: "seasonal-4",
        title: "Autumn Leaf Composting",
        description: "Create compost from fallen leaves to enrich soil for next year",
        category: "Waste Management",
        difficulty: "Medium",
        points: 25,
        duration: "75min",
        location: "School grounds",
        image: "/placeholder.jpg",
        isActive: true,
        isCompleted: false,
        isSeasonal: true,
        seasonalEndDate: "2025-11-30T23:59:59Z",
        tags: ["Autumn", "Composting", "Seasonal"],
        requirements: ["Rake", "Compost bin", "Leaves"],
        rewards: ["Compost Master Badge", "Autumn Steward Certificate"],
      },
    ]

    const mockImpact: ImpactStats = {
      userId,
      treesPlanted: 3,
      wasteCollected: 12.5,
      carbonSaved: 45.2,
      waterSaved: 150,
      energySaved: 25.8,
      lastUpdated: "2025-01-19T10:30:00Z",
    }

    const mockLeaderboard: LeaderboardEntry[] = [
      {
        userId: "student2",
        name: "Maya Patel",
        avatar: "/placeholder.svg?height=40&width=40",
        points: 189,
        rank: 1,
        streak: 3,
        questsCompleted: 8,
        badges: ["Eco Influencer"],
      },
      {
        userId: "student1",
        name: "Alex Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        points: 145,
        rank: 2,
        streak: 5,
        questsCompleted: 6,
        badges: [],
      },
      {
        userId: "student3",
        name: "Jordan Smith",
        avatar: "/placeholder.svg?height=40&width=40",
        points: 98,
        rank: 3,
        streak: 1,
        questsCompleted: 4,
        badges: [],
      },
    ]

    setActiveQuests(mockQuests)
    setSeasonalQuests(mockSeasonalQuests)
    setImpactStats(mockImpact)
    setLeaderboard(mockLeaderboard)
  }

  const handleStartQuest = (questId: string) => {
    router.push(`/student/quest/${questId}`)
  }

  const handleLogout = () => {
    localStorage.removeItem("terraed_user")
    localStorage.removeItem("terraed_last_login")
    router.push("/")
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
        />
      </div>
    )
  }

  const progressToNextLevel = ((user.points % 100) / 100) * 100
  const userLevel = Math.floor(user.points / 100) + 1
  const levelTitles = ["Eco Seedling", "Green Sprout", "Nature Guardian", "Earth Protector", "Climate Champion"]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/5 to-background">
      <ConfettiAnimation trigger={showConfetti} onComplete={() => setShowConfetti(false)} />

      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/95 sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <motion.div
                className="w-10 h-10 terra-gradient rounded-xl flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Star className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <span className="text-xl font-bold text-display">TerraEd</span>
                <div className="text-xs text-muted-foreground">Environmental Education</div>
              </div>
            </Link>

            <div className="flex items-center gap-3">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="w-4 h-4" />
                  <Badge className="absolute -top-1 -right-1 w-2 h-2 p-0 bg-accent"></Badge>
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="ghost" size="sm">
                  <Settings className="w-4 h-4" />
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="w-4 h-4" />
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 bg-primary/5 rounded-full p-1 pr-3"
              >
                <Avatar className="w-8 h-8">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <div className="font-medium">{user.name.split(" ")[0]}</div>
                  <div className="text-xs text-muted-foreground">Level {userLevel}</div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <motion.h1
                className="text-4xl font-bold text-display mb-2 bg-gradient-to-r from-primary to-success bg-clip-text text-transparent"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Welcome back, {user.name.split(" ")[0]}!
              </motion.h1>
              <motion.p
                className="text-muted-foreground text-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Ready to make an environmental impact today?
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex items-center gap-2 mt-3"
              >
                <Badge className="bg-primary/10 text-primary border-primary/20 flex items-center gap-1">
                  <Award className="w-3 h-3" />
                  {levelTitles[Math.min(userLevel - 1, levelTitles.length - 1)]}
                </Badge>
                {user.streak >= 3 && (
                  <Badge className="bg-accent/10 text-accent border-accent/20 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    {user.streak} Day Streak!
                  </Badge>
                )}
              </motion.div>
            </div>

            {/* Class and Section Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-right"
            >
              <div className="bg-gradient-to-br from-primary/5 to-success/5 rounded-xl p-4 border border-primary/10">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm font-medium text-muted-foreground">Academic Info</span>
                </div>
                <div className="space-y-1">
                  <div className="text-lg font-bold text-display">Class 9</div>
                  <div className="text-sm text-muted-foreground">Section A</div>
                </div>
                <div className="mt-2 text-xs text-muted-foreground">
                  Green Valley High School
                </div>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <PremiumStatsCard
              title="Total Points"
              value={user.points}
              icon={Star}
              color="text-primary"
              progress={progressToNextLevel}
              subtitle={`${100 - (user.points % 100)} points to next level`}
              delay={0}
            />

            <PremiumStatsCard
              title="Current Streak"
              value={user.streak}
              icon={Flame}
              color="text-orange-500"
              subtitle={user.streak >= 3 ? "Great streak! Keep it up!" : "Complete quests daily to build your streak"}
              delay={0.1}
            />

            <PremiumStatsCard
              title="Rank"
              value="#2"
              icon={Trophy}
              color="text-amber-500"
              subtitle="44 points behind #1"
              delay={0.2}
            />

            <PremiumStatsCard
              title="This Month"
              value={user.monthlyPoints}
              icon={Target}
              color="text-success"
              progress={(user.monthlyPoints / 200) * 100}
              subtitle={`${200 - user.monthlyPoints} points left this month`}
              delay={0.3}
            />
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Active Quests */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-display">Active Quests</h2>
                <Link href="/student/quests">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="hover:bg-primary/5 hover:border-primary/30 bg-transparent"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Browse All
                    </Button>
                  </motion.div>
                </Link>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {activeQuests.map((quest, index) => (
                  <motion.div
                    key={quest.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  >
                    <QuestCard quest={quest} onStartQuest={handleStartQuest} />
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Seasonal Quests */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold text-display">Seasonal Quests</h2>
                  <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1">
                    Limited Time
                  </Badge>
                </div>
                <Link href="/student/quests?filter=seasonal">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="hover:bg-primary/5 hover:border-primary/30 bg-transparent"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      View All Seasonal
                    </Button>
                  </motion.div>
                </Link>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {seasonalQuests.map((quest, index) => {
                  const endDate = new Date(quest.seasonalEndDate || "")
                  const now = new Date()
                  const daysLeft = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
                  
                  return (
                    <motion.div
                      key={quest.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                      className="relative"
                    >
                      <Card className="overflow-hidden border-2 border-gradient-to-r from-orange-200 to-red-200 hover:shadow-lg transition-all duration-300">
                        <div className="relative">
                          <div className="absolute top-3 left-3 z-10 flex gap-2">
                            <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs">
                              <Calendar className="w-3 h-3 mr-1" />
                              {daysLeft > 0 ? `${daysLeft} days left` : "Expired"}
                            </Badge>
                            <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
                              Seasonal
                            </Badge>
                          </div>
                          <div className="aspect-video bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center">
                            <div className="text-center">
                              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-400 rounded-full flex items-center justify-center mb-2 mx-auto">
                                <Award className="w-8 h-8 text-white" />
                              </div>
                              <p className="text-sm text-orange-700 font-medium">Seasonal Quest</p>
                            </div>
                          </div>
                        </div>
                        
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h3 className="font-bold text-lg mb-1">{quest.title}</h3>
                              <p className="text-muted-foreground text-sm mb-3">{quest.description}</p>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-primary">★{quest.points}</div>
                              <div className="text-xs text-muted-foreground">points</div>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Target className="w-4 h-4" />
                              {quest.difficulty}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {quest.duration}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {quest.location}
                            </div>
                          </div>

                          {quest.tags && quest.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-4">
                              {quest.tags.map((tag, tagIndex) => (
                                <Badge key={tagIndex} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}

                          <div className="flex items-center justify-between">
                            <div className="text-xs text-muted-foreground">
                              {quest.rewards && quest.rewards.length > 0 && (
                                <div>
                                  <span className="font-medium">Rewards: </span>
                                  {quest.rewards.join(", ")}
                                </div>
                              )}
                            </div>
                            <Button
                              onClick={() => handleStartQuest(quest.id)}
                              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                              size="sm"
                            >
                              Start Quest
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                })}
              </div>
            </motion.section>

            {/* Impact Chart */}
            {impactStats && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <ImpactChart stats={impactStats} />
              </motion.section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Leaderboard */}
            <motion.section
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Leaderboard entries={leaderboard} currentUserId={user.id} maxEntries={5} />
            </motion.section>

            {/* Quick Actions */}
            <motion.section
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <Card className="glass-card hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-display flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link href="/student/wallet">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        variant="outline"
                        className="w-full justify-start bg-transparent hover:bg-primary/5 hover:border-primary/30"
                      >
                        <Star className="w-4 h-4 mr-2" />
                        View Wallet ({user.points} points)
                      </Button>
                    </motion.div>
                  </Link>
                  <Link href="/student/submissions">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        variant="outline"
                        className="w-full justify-start bg-transparent hover:bg-accent/5 hover:border-accent/30"
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        My Submissions
                      </Button>
                    </motion.div>
                  </Link>
                  <Link href="/student/impact">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        variant="outline"
                        className="w-full justify-start bg-transparent hover:bg-success/5 hover:border-success/30"
                      >
                        <Trophy className="w-4 h-4 mr-2" />
                        Impact Timeline
                      </Button>
                    </motion.div>
                  </Link>
                </CardContent>
              </Card>
            </motion.section>
          </div>
        </div>
      </div>

      <FloatingActionButton />
    </div>
  )
}
