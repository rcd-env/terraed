"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface ConfettiAnimationProps {
  trigger: boolean
  onComplete?: () => void
}

export function ConfettiAnimation({ trigger, onComplete }: ConfettiAnimationProps) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; delay: number; color: string }>>([])

  useEffect(() => {
    if (trigger) {
      const newParticles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 0.5,
        color: ["#0b6e4f", "#ffb703", "#10b981", "#e6f4ee"][Math.floor(Math.random() * 4)],
      }))
      setParticles(newParticles)

      const timer = setTimeout(() => {
        setParticles([])
        onComplete?.()
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [trigger, onComplete])

  if (!trigger || particles.length === 0) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 rounded-full"
          style={{
            backgroundColor: particle.color,
            left: `${particle.x}%`,
            top: "100%",
          }}
          initial={{ y: 0, rotate: 0, opacity: 1 }}
          animate={{
            y: -window.innerHeight - 100,
            rotate: 720,
            opacity: 0,
          }}
          transition={{
            duration: 3,
            delay: particle.delay,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  )
}
