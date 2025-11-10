"use client"
import { useState, useEffect } from "react"
import { useSocket, PlayerStats } from "../hooks/useSocket"

interface LeaderboardProps {
  userId: string
  username: string
}

export default function Leaderboard({ userId, username }: LeaderboardProps) {
  const [players, setPlayers] = useState<PlayerStats[]>([])
  const { onLeaderboardUpdate } = useSocket({ userId, username })

  useEffect(() => {
    onLeaderboardUpdate((data) =>
      setPlayers(data.sort((a, b) => b.wpm - a.wpm))
    )
  }, [onLeaderboardUpdate])

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg border border-gray-200 w-full max-w-sm text-gray-800">
      <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
      <ul className="space-y-3">
        {players.map((p, i) => (
          <li key={p.userId} className="flex flex-col">
            <div className="flex justify-between items-center mb-1">
              <span className="font-medium">
                {i + 1}. {p.username}
              </span>
              <div className="flex gap-2 items-center">
                <span className="font-mono">{p.wpm} WPM</span>
                <span className="text-gray-500 text-sm">
                  {p.accuracy.toFixed(0)}%
                </span>
              </div>
            </div>
            <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 transition-all duration-300"
                style={{ width: `${p.progress}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
