import { useEffect, useState, useCallback } from "react"
import { io, Socket } from "socket.io-client"

export interface PlayerStats {
  userId: string
  username: string
  wpm: number
  accuracy: number
  progress: number
}

interface UseSocketOptions {
  userId: string
  username: string
}

export const useSocket = ({ userId, username }: UseSocketOptions) => {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const s = io("http://localhost:3001", { query: { userId, username } })
    setSocket(s)

    s.on("connect", () => setIsConnected(true))
    s.on("disconnect", () => setIsConnected(false))
    s.on("error", () => setIsConnected(false))

    return () => s.disconnect()
  }, [userId, username])

  const sendTypingData = useCallback(
    (data: PlayerStats) => socket?.emit("typing-data", data),
    [socket]
  )

  const onLeaderboardUpdate = useCallback(
    (callback: (data: PlayerStats[]) => void) =>
      socket?.on("leaderboard-update", callback),
    [socket]
  )

  const onNewRound = useCallback(
    (callback: (sentence: string, duration: number) => void) =>
      socket?.on("new-round", callback),
    [socket]
  )

  return { isConnected, sendTypingData, onLeaderboardUpdate, onNewRound }
}
