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
    <div className="p-6 bg-white rounded-3xl shadow-xl border border-gray-200 w-full max-w-sm text-gray-800">
      <h2 className="text-3xl font-bold mb-4 text-center text-gray-900">
        Leaderboard
      </h2>
      <ul className="space-y-3 max-h-[200px] overflow-y-auto">
        {players.map((p, i) => (
          <li key={p.userId} className="flex flex-col">
            <div className="flex justify-between items-center mb-1">
              <span className="font-medium text-gray-900">
                {i + 1}. {p.username}
              </span>
              <div className="flex gap-3 items-center">
                <span className="font-mono text-blue-600">{p.wpm} WPM</span>
                <span className="text-gray-500 text-sm">
                  {p.accuracy.toFixed(0)}%
                </span>
              </div>
            </div>
            <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-300"
                style={{ width: `${p.progress}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
