"use client";

import { useState } from "react";
import { useUser } from "../context/userContext";

export default function UsernameForm() {
  const { setUser } = useUser();
  const [usernameInput, setUsernameInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!usernameInput.trim()) return;

    setUser({ userId: crypto.randomUUID(), username: usernameInput.trim() });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm text-center">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Witaj w Typing Race!
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Podaj swój nick"
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
            className="p-3 border-2 border-gray-300 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
            autoFocus
          />
          <button
            type="submit"
            className="p-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition cursor-pointer"
          >
            Start
          </button>
        </form>
      </div>
    </div>
  );
}
