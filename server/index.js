import { Server } from "socket.io"
import sentences from "../app/lib/sentences.json" assert { type: "json" }

const io = new Server(3001, {
  cors: { origin: "*" },
})

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

// Obsługa połączenia klienta
io.on("connection", (socket) => {
  const { userId } = socket.handshake.query

  socket.emit("new-round", { sentence: currentSentence, endTime: roundEndTime })

  socket.on("typing-data", (data) => {
    players[data.userId] = data
    io.emit("leaderboard-update", Object.values(players))
  })

  // Rozłączenie gracza
  socket.on("disconnect", () => {
    delete players[userId]
    io.emit("leaderboard-update", Object.values(players))
  })
})
