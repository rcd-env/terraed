"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Plus, Camera, FileText, MapPin, X } from "lucide-react"
import Link from "next/link"

export function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false)

  const actions = [
    {
      icon: Camera,
      label: "Quick Submit",
      href: "/student/submit",
      color: "bg-primary hover:bg-primary/90",
    },
    {
      icon: FileText,
      label: "Browse Quests",
      href: "/student/quests",
      color: "bg-accent hover:bg-accent/90",
    },
    {
      icon: MapPin,
      label: "Nearby Quests",
      href: "/student/nearby",
      color: "bg-success hover:bg-success/90",
    },
  ]

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute bottom-16 right-0 space-y-3"
          >
            {actions.map((action, index) => (
              <motion.div
                key={action.label}
                initial={{ opacity: 0, x: 20, y: 10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={{ opacity: 0, x: 20, y: 10 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={action.href}>
                  <Button
                    size="sm"
                    className={`${action.color} text-white shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2`}
                  >
                    <action.icon className="w-4 h-4" />
                    {action.label}
                  </Button>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
        <Button
          size="lg"
          className="rounded-full w-14 h-14 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-200"
          onClick={() => setIsOpen(!isOpen)}
        >
          <motion.div animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.2 }}>
            {isOpen ? <X className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
          </motion.div>
        </Button>
      </motion.div>
    </div>
  )
}
