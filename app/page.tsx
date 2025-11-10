"use client"
import TypingRaceClient from "./components/typingRaceClient"
import Leaderboard from "./components/leatherboard"
import UsernameForm from "./components/userNameForm"
import { useUser } from "./context/userContext"

export default function Home() {
  const { user } = useUser()

  if (!user) return <UsernameForm />

  return (
    <main className="p-8 w-full flex flex-col gap-8 items-start">
      <div className="flex w-full max-lg:justify-center justify-end">
        <Leaderboard userId={user.userId} username={user.username} />
      </div>
      <div className="w-full flex items-center justify-center gap-2">
        <TypingRaceClient userId={user.userId} username={user.username} />
      </div>
    </main>
  )
}
