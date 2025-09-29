"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { Camera, Upload, MapPin, CheckCircle, X, Loader2 } from "lucide-react"
import type { Quest } from "@/lib/types"

interface SubmissionModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: () => void
  quest: Quest
}

export function SubmissionModal({ isOpen, onClose, onSubmit, quest }: SubmissionModalProps) {
  const [step, setStep] = useState(1)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [caption, setCaption] = useState("")
  const [gpsEnabled, setGpsEnabled] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
      setStep(2)
    }
  }

  const handleSubmit = async () => {
    if (!selectedImage || !caption.trim()) return

    setIsSubmitting(true)
    setStep(3)

    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i)
      await new Promise((resolve) => setTimeout(resolve, 100))
    }

    // Simulate processing
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setStep(4)
    setTimeout(() => {
      onSubmit()
      handleClose()
    }, 2000)
  }

  const handleClose = () => {
    setStep(1)
    setSelectedImage(null)
    setImagePreview(null)
    setCaption("")
    setGpsEnabled(true)
    setIsSubmitting(false)
    setUploadProgress(0)
    onClose()
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 terra-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Upload Your Proof</h3>
              <p className="text-muted-foreground text-sm">Take or upload a photo showing your completed quest</p>
            </div>

            <div className="space-y-4">
              <Button
                onClick={() => fileInputRef.current?.click()}
                className="w-full terra-gradient text-white h-12"
                size="lg"
              >
                <Upload className="w-5 h-5 mr-2" />
                Choose Photo
              </Button>

              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageSelect} className="hidden" />

              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Include GPS location</span>
                </div>
                <Switch checked={gpsEnabled} onCheckedChange={setGpsEnabled} />
              </div>

              <p className="text-xs text-muted-foreground text-center">
                Photos are automatically verified using AI. Make sure your image clearly shows the completed quest.
              </p>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Add Details</h3>
              <p className="text-muted-foreground text-sm">Describe what you did and any challenges you faced</p>
            </div>

            {imagePreview && (
              <div className="relative">
                <img
                  src={imagePreview || "/placeholder.svg"}
                  alt="Selected proof"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setStep(1)}
                  className="absolute top-2 right-2 bg-background/80 hover:bg-background"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="caption">Description *</Label>
              <Textarea
                id="caption"
                placeholder="Describe what you did, where you did it, and any interesting observations..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                rows={4}
                className="resize-none"
              />
              <p className="text-xs text-muted-foreground">{caption.length}/500 characters</p>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                Back
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!caption.trim() || caption.length > 500}
                className="flex-1 terra-gradient text-white"
              >
                Submit Quest
              </Button>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Processing Submission</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Uploading your proof and running verification checks...
              </p>
              <Progress value={uploadProgress} className="w-full" />
              <p className="text-xs text-muted-foreground mt-2">{uploadProgress}% complete</p>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.6 }}
              className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto"
            >
              <CheckCircle className="w-8 h-8 text-success" />
            </motion.div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-success">Submission Complete!</h3>
              <p className="text-muted-foreground text-sm">
                Your quest submission has been received and is being reviewed. You'll be notified once it's approved.
              </p>
            </div>
            <Badge className="terra-gradient text-white px-4 py-2">+{quest.points} points pending approval</Badge>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-display flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              {quest.category}
            </Badge>
            {quest.title}
          </DialogTitle>
        </DialogHeader>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>

        {step < 3 && (
          <div className="flex justify-center mt-4">
            <div className="flex gap-2">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-colors ${i <= step ? "bg-primary" : "bg-muted"}`}
                />
              ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
