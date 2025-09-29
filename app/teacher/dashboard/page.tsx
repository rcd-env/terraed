"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Users,
  Target,
  Clock,
  TrendingUp,
  CheckCircle,
  Plus,
  Eye,
  MessageSquare,
  BarChart3,
  Leaf,
  Droplets,
  Zap,
  Recycle,
  Star,
  Bell,
  Settings,
  LogOut,
} from "lucide-react"
import {
  teacherClassStats,
  teacherStudentProgress,
  teacherQuestAnalytics,
  pendingSubmissions,
  classImpactMetrics,
} from "@/data/mock-teacher-data"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function TeacherDashboard() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("terraed_user")
    if (userData) {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
    } else {
      router.push("/auth/login")
    }
  }, [router])

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

  const stats = [
    {
      title: "Total Students",
      value: teacherClassStats.totalStudents,
      icon: Users,
      change: `+${teacherClassStats.monthlyGrowth}%`,
      color: "text-blue-600",
    },
    {
      title: "Active Quests",
      value: teacherClassStats.activeQuests,
      icon: Target,
      change: "+2 this week",
      color: "text-green-600",
    },
    {
      title: "Pending Reviews",
      value: teacherClassStats.pendingSubmissions,
      icon: Clock,
      change: "3 urgent",
      color: "text-orange-600",
    },
    {
      title: "Class Engagement",
      value: `${teacherClassStats.averageEngagement}%`,
      icon: TrendingUp,
      change: "+5%",
      color: "text-purple-600",
    },
  ]

  const impactMetrics = [
    {
      title: "Trees Planted",
      value: classImpactMetrics.totalTreesPlanted,
      icon: Leaf,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Water Saved",
      value: `${classImpactMetrics.totalWaterSaved}L`,
      icon: Droplets,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Waste Collected",
      value: `${classImpactMetrics.totalWasteCollected}kg`,
      icon: Recycle,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Energy Saved",
      value: `${classImpactMetrics.totalEnergyConserved}kWh`,
      icon: Zap,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
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
                      .map((n: string) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <div className="font-medium">{user.name.split(" ")[0]}</div>
                  <div className="text-xs text-muted-foreground">Teacher</div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <h1 className="text-4xl font-bold text-display mb-2">Teacher Dashboard</h1>
            <p className="text-muted-foreground">Sister Nivedita University</p>
          </motion.div>

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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Quick Actions</span>
                      <Button size="sm" className="terra-gradient text-white">
                        <Plus className="w-4 h-4 mr-2" />
                        Create Quest
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent">
                        <Eye className="w-5 h-5 text-blue-600" />
                        <span className="text-sm">Review Submissions</span>
                        <Badge variant="secondary">{pendingSubmissions.length} pending</Badge>
                      </Button>
                      <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent">
                        <MessageSquare className="w-5 h-5 text-green-600" />
                        <span className="text-sm">Send Announcement</span>
                      </Button>
                      <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent">
                        <BarChart3 className="w-5 h-5 text-purple-600" />
                        <span className="text-sm">View Analytics</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>Quest Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {teacherQuestAnalytics.map((quest) => (
                        <div key={quest.questId} className="p-4 rounded-lg bg-secondary/20">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold">{quest.title}</h4>
                            <Badge variant="outline">{quest.completionRate}% complete</Badge>
                          </div>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">Assigned:</span>
                              <span className="ml-2 font-medium">{quest.assigned}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Completed:</span>
                              <span className="ml-2 font-medium text-green-600">{quest.completed}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Pending:</span>
                              <span className="ml-2 font-medium text-orange-600">{quest.pending}</span>
                            </div>
                          </div>
                          <div className="w-full bg-secondary/20 rounded-full h-2 mt-3">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${quest.completionRate}%` }}
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

              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>Class Environmental Impact</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {impactMetrics.map((metric) => (
                        <div key={metric.title} className={`p-4 rounded-lg ${metric.bgColor} text-center`}>
                          <div className="flex items-center justify-center mb-2">
                            <metric.icon className={`w-6 h-6 ${metric.color}`} />
                          </div>
                          <p className="text-2xl font-bold text-display">{metric.value}</p>
                          <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 text-center">
                      <Badge className="terra-gradient text-white px-4 py-2 text-base">
                        🌍 {classImpactMetrics.totalCarbonSaved} kg CO₂ saved by your class
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <div className="space-y-6">
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-orange-600" />
                      Pending Reviews
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {pendingSubmissions.map((submission) => (
                        <div key={submission.id} className="p-3 rounded-lg bg-secondary/20">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-sm">{submission.studentName}</span>
                            <Badge variant="outline" className="text-xs">
                              {submission.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{submission.questTitle}</p>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="flex-1 text-xs bg-transparent">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Approve
                            </Button>
                            <Button size="sm" variant="outline" className="flex-1 text-xs bg-transparent">
                              <Eye className="w-3 h-3 mr-1" />
                              Review
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full mt-4 bg-transparent" size="sm">
                      View All Submissions
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-blue-600" />
                      Top Performers
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {teacherStudentProgress.slice(0, 5).map((student, index) => (
                        <div key={student.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/20">
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
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
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                            <AvatarFallback className="text-xs">
                              {student.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{student.name}</p>
                            <p className="text-xs text-muted-foreground">Grade {student.grade}</p>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {student.points} pts
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
