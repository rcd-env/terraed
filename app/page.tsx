"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Leaf, Zap, Users, Award, ArrowRight, Play, CheckCircle, Sparkles, Globe, Shield } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  const [email, setEmail] = useState("")

  const features = [
    {
      icon: Zap,
      title: "AI-Generated Quests",
      description: "Personalized environmental challenges created by advanced AI for your grade level and location",
      color: "from-primary to-primary/80",
    },
    {
      icon: Award,
      title: "Gamified Learning",
      description: "Earn points, climb leaderboards, and unlock rewards while making a real environmental impact",
      color: "from-accent to-accent/80",
    },
    {
      icon: CheckCircle,
      title: "Smart Verification",
      description: "Advanced computer vision and GPS verification ensures authentic environmental actions",
      color: "from-success to-success/80",
    },
    {
      icon: Users,
      title: "Community Impact",
      description: "Join thousands of students worldwide creating measurable environmental change",
      color: "from-secondary to-muted",
    },
  ]

  const stats = [
    { value: "10,000+", label: "Students Active", icon: Users },
    { value: "50,000+", label: "Trees Planted", icon: Leaf },
    { value: "2.5M kg", label: "CO₂ Saved", icon: Globe },
    { value: "500+", label: "Schools", icon: Shield },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/5 to-background">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/95 sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <motion.div className="flex items-center gap-3" whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
            <div className="w-10 h-10 terra-gradient rounded-xl flex items-center justify-center shadow-lg">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold text-display">TerraEd</span>
              <div className="text-xs text-muted-foreground">Environmental Education</div>
            </div>
          </motion.div>
          <div className="flex items-center gap-4">
            <Link href="/auth/login">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="ghost" className="hover:bg-primary/5">
                  Sign In
                </Button>
              </motion.div>
            </Link>
            <Link href="/auth/login">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="terra-gradient text-white shadow-lg hover:shadow-xl transition-all duration-200">
                  Get Started
                </Button>
              </motion.div>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 mt-16">
        <div className="text-center max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Badge className="mb-8 terra-gradient text-white px-6 py-3 text-base shadow-lg">
                <Sparkles className="w-4 h-4 mr-2" />
                AI-Powered Environmental Education
              </Badge>
            </motion.div>

            <motion.h1
              className="text-6xl md:text-7xl font-bold text-display mb-8 text-balance leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Learn, Act, and{" "}
              <span className="bg-gradient-to-r from-primary via-success to-accent bg-clip-text text-transparent">
                Save the Planet
              </span>
            </motion.h1>

            <motion.p
              className="text-xl text-muted-foreground mb-10 text-pretty max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Join the world's first AI-driven gamified environmental education platform. Complete real-world
              eco-quests, earn rewards, and make a measurable impact on our planet.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link href="/auth/login">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    className="terra-gradient text-white px-10 py-7 text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
                  >
                    Start Your Journey
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </motion.div>
              </Link>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="px-10 py-7 text-lg bg-transparent hover:bg-primary/5 border-2 hover:border-primary/30"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Watch Demo
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-24"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="text-center group"
              >
                <Card className="glass-card border-0 bg-gradient-to-br from-background/80 to-secondary/20 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-primary/10 to-primary/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                      <stat.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-3xl md:text-4xl font-bold text-display text-primary mb-2 group-hover:scale-105 transition-transform duration-200">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-24">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-display mb-6">How TerraEd Works</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
            Our AI-powered platform makes environmental education engaging, measurable, and rewarding
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="glass-card h-full hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-background/90 to-secondary/10 group-hover:border-primary/20">
                <CardHeader className="text-center pb-4">
                  <motion.div
                    className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    whileHover={{ rotate: 5 }}
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <CardTitle className="text-xl text-display group-hover:text-primary transition-colors duration-200">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center text-pretty leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-24">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <Card className="glass-card max-w-5xl mx-auto border-0 bg-gradient-to-br from-primary/5 via-background/90 to-accent/5 shadow-2xl">
            <CardContent className="p-16 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="w-20 h-20 terra-gradient rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-4xl font-bold text-display mb-6">Ready to Make an Impact?</h2>
                <p className="text-xl text-muted-foreground mb-10 text-pretty max-w-2xl mx-auto leading-relaxed">
                  Join thousands of students already making a difference. Start your environmental journey today.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
                  <Input
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 h-14 text-lg border-2 focus:border-primary/50"
                  />
                  <Link href="/auth/login">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button className="terra-gradient text-white px-8 h-14 text-lg shadow-lg hover:shadow-xl transition-all duration-200">
                        Join Now
                      </Button>
                    </motion.div>
                  </Link>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-gradient-to-r from-muted/20 via-background to-muted/20">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <motion.div className="flex items-center gap-3" whileHover={{ scale: 1.02 }}>
              <div className="w-8 h-8 terra-gradient rounded-lg flex items-center justify-center shadow">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-bold text-display">TerraEd</span>
                <div className="text-xs text-muted-foreground">Environmental Education Platform</div>
              </div>
            </motion.div>
            <p className="text-muted-foreground text-center">
              © 2025 TerraEd. Making environmental education engaging and impactful.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
