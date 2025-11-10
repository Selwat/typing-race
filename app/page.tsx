"use client"
import { useState } from "react"

export default function Home() {
  const [user, setUser] = useState<{ userId: string; username: string } | null>(
    null
  )
  const [usernameInput, setUsernameInput] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!usernameInput.trim()) return
    setUser({ userId: crypto.randomUUID(), username: usernameInput.trim() })
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl mb-4">Witaj w Typing Race!</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 w-full max-w-xs"
        >
          <input
            type="text"
            placeholder="Podaj swój nick"
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
            className="p-2 border rounded"
            autoFocus
          />
          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Start
          </button>
        </form>
      </div>
    )
  }

  return (
    <main className="p-8 w-full flex flex-col lg:flex-row gap-8 items-start">
      test
    </main>
  )
}
