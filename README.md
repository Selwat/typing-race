# Typing Race - README

## Project Overview
Typing Race is a real-time typing game built with **Next.js**, **React**, and **TailwindCSS**. Players compete to type predefined sentences as quickly and accurately as possible. The application uses **WebSockets (Socket.IO)** for real-time synchronization of scores and leaderboard updates.

---

## Assumptions & Design Choices

- **Real-time gameplay**: Players type sentences simultaneously in timed rounds.
- **Round duration**: Each round lasts 60 seconds and contains one sentence.
- **Realtime sync**: Socket.IO handles leaderboard updates and new rounds.
- **Simplified feedback**: Instead of tracking every typed character live, we use a **progress/streak system** for performance metrics.
- **Data storage**:
  - Server: In-memory storage (no database).
  - Client: Stores only `username` and `userId` in component state.
- **UI/UX**: Clean, responsive design using TailwindCSS with modern rounded cards and progress indicators.

---

## Features

- Timed rounds with predefined sentences.
- Accuracy and WPM calculation in real-time.
- Progress bar and leaderboard updated in real-time.
- User-friendly input and focus management.
- Responsive layout for desktop and mobile.

---

## Technologies Used

- **Next.js 15**
- **React 19**
- **TailwindCSS 4**
- **TypeScript 5**
- **Socket.IO 4** (server + client)
- **Playwright** for end-to-end testing

---

## Running the Application

1. **Install dependencies**:
   npm install
2. **Start the development server:**
    npm run dev
3. **Open your browser:**
    http://localhost:3000


**Testing with Playwright**
End-to-end tests are implemented using Playwright.

1. **Ensure the development server is running:**
    npm run dev
2. **Run E2E tests:**
    npx playwright test

**Future Improvements**

-Persist leaderboard data in a database to survive server restarts.

-Add multiple difficulty levels or vary sentence lengths.

-Provide more detailed real-time feedback for typing accuracy and streaks.

-Improve handling of users joining or leaving mid-round.

-Enhance UI/UX for mobile devices.

-Add user authentication and persistent stats.

**Notes**

-The server uses in-memory storage, so all data is lost upon restart.

-Playwright tests cover basic gameplay and leaderboard functionality.