"use client"

import { useState } from "react"
import { useUser } from "../context/userContext"

export default function UsernameForm() {
  const { setUser } = useUser()
  const [usernameInput, setUsernameInput] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!usernameInput.trim()) return

    setUser({ userId: crypto.randomUUID(), username: usernameInput.trim() })
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-sm text-center">
        <h1 className="text-4xl font-bold mb-6 text-gray-900">
          Welcome to Typing Race!
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter your nickname"
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
            className="p-4 border-2 border-gray-300 text-gray-900 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg transition-all duration-200"
            autoFocus
          />
          <button
            type="submit"
            className="p-4 bg-blue-500 text-white font-semibold rounded-2xl hover:bg-blue-600 transition-all duration-200 cursor-pointer"
          >
            Start
          </button>
        </form>
      </div>
    </div>
  )
}
