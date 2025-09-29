"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Leaf, User, GraduationCap, Building2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [userType, setUserType] = useState<"student" | "teacher" | "institution">("student")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate brief loading for better UX
    await new Promise((resolve) => setTimeout(resolve, 500))

    if (userType === "student") {
      localStorage.setItem(
        "terraed_user",
        JSON.stringify({
          id: "student1",
          email: "student@demo.com",
          name: "Alex Chen",
          type: "student",
        }),
      )
      router.push("/student/dashboard")
    } else if (userType === "teacher") {
      localStorage.setItem(
        "terraed_user",
        JSON.stringify({
          id: "teacher1",
          email: "teacher@demo.com",
          name: "Ms. Sarah Johnson",
          type: "teacher",
        }),
      )
      router.push("/teacher/dashboard")
    } else {
      localStorage.setItem(
        "terraed_user",
        JSON.stringify({
          id: "institution1",
          email: "institution@demo.com",
          name: "Green Valley University",
          type: "institution",
        }),
      )
      router.push("/institution/dashboard")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 terra-gradient rounded-lg flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-display">TerraEd</span>
          </Link>
          <h1 className="text-2xl font-bold text-display mb-2">Welcome to TerraEd</h1>
          <p className="text-muted-foreground">Choose your role to start your environmental journey</p>
        </div>

        <Card className="glass-card">
          <CardHeader className="pb-4">
            <CardTitle className="text-center">Demo Access</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <Tabs
                value={userType}
                onValueChange={(value) => setUserType(value as "student" | "teacher" | "institution")}
              >
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="student" className="flex items-center gap-2 transition-all hover:scale-105">
                    <User className="w-4 h-4" />
                    Student
                  </TabsTrigger>
                  <TabsTrigger value="teacher" className="flex items-center gap-2 transition-all hover:scale-105">
                    <GraduationCap className="w-4 h-4" />
                    Teacher
                  </TabsTrigger>
                  <TabsTrigger value="institution" className="flex items-center gap-2 transition-all hover:scale-105">
                    <Building2 className="w-4 h-4" />
                    Institution
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <Button
                type="submit"
                className="w-full terra-gradient text-white text-lg py-6 transition-all hover:scale-105 active:scale-95"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Entering...
                  </div>
                ) : (
                  `Enter as ${userType === "student" ? "Student" : userType === "teacher" ? "Teacher" : "Institution"}`
                )}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground text-center mb-2">🚀 Instant Demo Access</p>
              <p className="text-xs text-center text-muted-foreground">
                No credentials required - just select your role and dive in!
              </p>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Exploring TerraEd's environmental education platform
        </p>
      </motion.div>
    </div>
  )
}
