import { Server } from "socket.io"
import sentences from "../app/lib/sentences.json" assert { type: "json" }

const PORT = process.env.PORT || 3001

const io = new Server(PORT, { cors: { origin: "*" } })

console.log(`Socket.io running on port ${PORT}`)

let players = {}
let currentSentence = sentences[Math.floor(Math.random() * sentences.length)]
const ROUND_DURATION = 60
let roundEndTime = Date.now() + ROUND_DURATION * 1000

const startNewRound = () => {
  currentSentence = sentences[Math.floor(Math.random() * sentences.length)]
  players = {}
  roundEndTime = Date.now() + ROUND_DURATION * 1000
  io.emit("new-round", { sentence: currentSentence, endTime: roundEndTime })
}

setInterval(startNewRound, ROUND_DURATION * 1000)

// Client connection support
io.on("connection", (socket) => {
  const { userId } = socket.handshake.query

  socket.emit("new-round", { sentence: currentSentence, endTime: roundEndTime })

  socket.on("typing-data", (data) => {
    players[data.userId] = data
    io.emit("leaderboard-update", Object.values(players))
  })

  // Player disconnection
  socket.on("disconnect", () => {
    delete players[userId]
    io.emit("leaderboard-update", Object.values(players))
  })
})
