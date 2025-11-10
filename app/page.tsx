"use client";
import TypingRaceClient from "./components/typingRaceClient";
import Leaderboard from "./components/leatherboard";
import UsernameForm from "./components/userNameForm";
import { useUser } from "./context/userContext";

export default function Home() {
  const { user } = useUser();

  if (!user) return <UsernameForm />;

  return (
    <main className="p-8 w-full flex flex-col lg:flex-row gap-8 items-start">
      <div className="w-full flex-col gap-2">
        <TypingRaceClient userId={user.userId} username={user.username} />
      </div>
      <div className="flex-1/3">
        <Leaderboard userId={user.userId} username={user.username} />
      </div>
    </main>
  );
}
