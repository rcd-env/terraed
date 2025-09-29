export const TERRA_CONFIG = {
  POINTS: {
    MONTHLY_CAP: 200,
    STREAK_BONUS: 10,
    STREAK_REQUIRED_DAYS: 3,
    REDEMPTION_MINIMUM: 100,
    MAX_REDEMPTIONS_PER_WEEK: 2,
  },
  VERIFICATION: {
    AUTO_PASS_THRESHOLD: 0.75,
    REVIEW_THRESHOLD: 0.5,
    PHASH_DUPLICATE_THRESHOLD: 0.9,
    MAX_FILE_SIZE_MB: 5,
    ALLOWED_IMAGE_TYPES: ["image/jpeg", "image/png", "image/webp"],
    GPS_ACCURACY_METERS: 1000,
  },
  UI: {
    ANIMATION_DURATION: 150,
    CONFETTI_DURATION: 3000,
    TOAST_DURATION: 4000,
  },
} as const

export const QUEST_CATEGORIES = {
  waste: { label: "Waste Management", icon: "♻️", color: "bg-green-500" },
  energy: { label: "Energy Conservation", icon: "⚡", color: "bg-yellow-500" },
  water: { label: "Water Conservation", icon: "💧", color: "bg-blue-500" },
  biodiversity: { label: "Biodiversity", icon: "🌱", color: "bg-emerald-500" },
  transport: { label: "Sustainable Transport", icon: "🚲", color: "bg-purple-500" },
} as const

export const DIFFICULTY_LEVELS = {
  easy: { label: "Easy", points: 10, color: "bg-green-100 text-green-800" },
  medium: { label: "Medium", points: 20, color: "bg-yellow-100 text-yellow-800" },
  hard: { label: "Hard", points: 30, color: "bg-red-100 text-red-800" },
} as const

export const VOUCHER_TYPES = {
  canteen: { label: "Canteen Credit", icon: "🍽️", description: "Use at school canteen" },
  bookstore: { label: "Book Voucher", icon: "📚", description: "Redeem at bookstore" },
  transport: { label: "Transport Credit", icon: "🚌", description: "Public transport credit" },
} as const
