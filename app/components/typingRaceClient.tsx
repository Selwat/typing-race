"use client"

import { useState, useEffect, useRef } from "react"
import { useSocket } from "../hooks/useSocket"

interface TypingRaceProps {
  userId: string
  username: string
}

export default function TypingRaceClient({
  userId,
  username,
}: TypingRaceProps) {
  const [sentence, setSentence] = useState("")
  const [userInput, setUserInput] = useState("")
  const [startTime, setStartTime] = useState<number | null>(null)
  const [timeLeft, setTimeLeft] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const { sendTypingData, onNewRound } = useSocket({ userId, username })

  // Obsługa nowej rundy od serwera
  useEffect(() => {
    const unsubscribe = onNewRound(({ sentence: newSentence, endTime }) => {
      setSentence(newSentence)
      setUserInput("")
      setStartTime(null)

      const updateTime = () => {
        const t = Math.max(Math.floor((endTime - Date.now()) / 1000), 0)
        setTimeLeft(t)
      }

      updateTime() // ustaw początkowy czas
      const interval = setInterval(updateTime, 500)
      inputRef.current?.focus()

      return () => clearInterval(interval)
    })

    return () => {
      unsubscribe?.()
    }
  }, [onNewRound])

  // Obsługa inputu gracza
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setUserInput(value)
    if (!startTime) setStartTime(Date.now())

    // Obliczamy poprawne słowa
    const sentenceWords = sentence.split(" ")
    const typedWords = value.split(" ")
    let correctWords = 0
    typedWords.forEach((w, i) => {
      if (w === sentenceWords[i]) correctWords++
    })

    // Dokładność w znakach
    const correctChars = Array.from(value).reduce(
      (acc, char, i) => (char === sentence[i] ? acc + 1 : acc),
      0
    )

    const accuracy = value.length ? (correctChars / value.length) * 100 : 100
    const timeElapsed = startTime ? (Date.now() - startTime) / 1000 : 0
    const wpm = timeElapsed ? Math.round((correctWords / timeElapsed) * 60) : 0
    const progress = Math.min((value.length / sentence.length) * 100, 100)

    // Wysyłamy dane na serwer
    sendTypingData({ userId, username, wpm, accuracy, progress })
  }

  // Renderowanie liter w kolorach (zielone = poprawne, czerwone = błędne)
  const renderColoredSentence = () =>
    Array.from(sentence).map((c, i) => (
      <span
        key={i}
        className={
          i < userInput.length
            ? c === userInput[i]
              ? "text-green-500"
              : "text-red-500"
            : ""
        }
      >
        {c}
      </span>
    ))

  return (
    <div className="w-full max-w-xl p-6 bg-white rounded-2xl shadow-lg border border-gray-200 text-gray-800">
      <h2 className="text-2xl font-bold mb-4">Typing Race</h2>
      <div className="mb-2 text-sm text-gray-500">
        Czas do końca rundy: {timeLeft}s
      </div>
      <div className="mb-4 p-4 bg-gray-100 rounded font-mono text-lg tracking-wide min-h-[3rem]">
        {renderColoredSentence()}
      </div>
      <input
        ref={inputRef}
        type="text"
        value={userInput}
        onChange={handleChange}
        placeholder="Start typing..."
        className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 font-mono text-lg"
      />
    </div>
  )
}
