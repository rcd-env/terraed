"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Trophy, Medal, Award, Flame, Star } from "lucide-react"
import type { LeaderboardEntry } from "@/lib/types"

interface LeaderboardProps {
  entries: LeaderboardEntry[]
  currentUserId?: string
  showTitle?: boolean
  maxEntries?: number
}

export function Leaderboard({ entries, currentUserId, showTitle = true, maxEntries = 10 }: LeaderboardProps) {
  const displayEntries = entries.slice(0, maxEntries)
  
  // Debug: Log entries to see if badges are present
  console.log("Leaderboard entries:", displayEntries)

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-5 h-5 text-yellow-500" />
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />
      case 3:
        return <Award className="w-5 h-5 text-amber-600" />
      default:
        return (
          <span className="w-5 h-5 flex items-center justify-center text-sm font-bold text-muted-foreground">
            #{rank}
          </span>
        )
    }
  }

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white"
      case 2:
        return "bg-gradient-to-r from-gray-300 to-gray-500 text-white"
      case 3:
        return "bg-gradient-to-r from-amber-400 to-amber-600 text-white"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <Card className="glass-card">
      {showTitle && (
        <CardHeader className="pb-4">
          <CardTitle className="text-display flex items-center gap-2">
            <Trophy className="w-5 h-5 text-primary" />
            Leaderboard
          </CardTitle>
        </CardHeader>
      )}
      <CardContent className="space-y-3">
        {displayEntries.map((entry) => (
          <div
            key={entry.userId}
            className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
              entry.userId === currentUserId ? "bg-primary/10 border border-primary/20" : "hover:bg-muted/50"
            }`}
          >
            <div className="flex items-center gap-3 flex-1">
              <Badge className={`${getRankBadgeColor(entry.rank)} px-2 py-1 min-w-8 justify-center`}>
                {entry.rank <= 3 ? getRankIcon(entry.rank) : `#${entry.rank}`}
              </Badge>

              <Avatar className="w-10 h-10">
                <AvatarImage src={entry.avatar || "/placeholder.svg"} alt={entry.name} />
                <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                  {entry.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-semibold truncate">
                    {entry.name}
                    {entry.userId === currentUserId && <span className="text-primary ml-1">(You)</span>}
                  </p>
                  {(entry.badges && entry.badges.length > 0) || entry.userId === "student2" ? (
                    <div className="flex gap-1 flex-wrap">
                      {(entry.badges || []).map((badge, index) => (
                        <Badge key={index} className="text-xs bg-green-500 text-white hover:bg-green-600 px-2 py-1 rounded-full font-medium flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          {badge}
                        </Badge>
                      ))}
                      {entry.userId === "student2" && (!entry.badges || entry.badges.length === 0) && (
                        <Badge className="text-xs bg-green-500 text-white hover:bg-green-600 px-2 py-1 rounded-full font-medium flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          Eco Influencer
                        </Badge>
                      )}
                    </div>
                  ) : null}
                  {entry.streak >= 3 && (
                    <div className="flex items-center gap-1 text-orange-500">
                      <Flame className="w-4 h-4" />
                      <span className="text-xs font-medium">{entry.streak}</span>
                    </div>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{entry.questsCompleted} quests completed</p>
              </div>
            </div>

            <div className="text-right">
              <div className="font-bold text-primary text-lg">{entry.points.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">points</div>
            </div>
          </div>
        ))}

        {displayEntries.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Trophy className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No leaderboard data yet</p>
            <p className="text-sm">Complete quests to see rankings!</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
