import { io, Socket } from "socket.io-client";

export interface UserTypingData {
  userId: string;
  username: string;
  wpm: number;
  accuracy: number;
  totalWords: number;
  totalErrors: number;
  timeElapsed: number;
  sentenceId: number;
  streak: number;
  progress: number;
}

export interface LeaderboardUser {
  userId: string;
  username: string;
  wpm: number;
  accuracy: number;
}

class RealtimeSocket {
  private socket: Socket | null = null;
  private connected = false;
  private currentUserId: string | null = null;
  private currentUsername: string | null = null;

  connect(userId: string, username: string) {
    if (this.socket && this.connected && this.currentUserId === userId && this.currentUsername === username) {
      return this.socket;
    }

    this.currentUserId = userId;
    this.currentUsername = username;

    this.socket = io("http://localhost:3001", {
      query: { userId, username },
    });

    this.socket.on("connect", () => {
      console.log(`Connected as ${username}`);
      this.connected = true;
      this.requestLeaderboard();
    });

    this.socket.on("disconnect", () => {
      console.log("Disconnected");
      this.connected = false;
    });

    this.socket.on("error", (err) => {
      console.error("Socket error:", err);
      this.connected = false;
    });

    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.connected = false;
      this.currentUserId = null;
      this.currentUsername = null;
    }
  }

  sendTypingData(data: UserTypingData) {
    if (this.socket && this.connected) {
      this.socket.emit("speed-test-result", data);
    }
  }

  onLeaderboardUpdate(callback: (data: LeaderboardUser[]) => void) {
    if (this.socket) {
      this.socket.on("leaderboard-update", callback);
    }
  }

  requestLeaderboard() {
    if (this.socket && this.connected) {
      this.socket.emit("request-leaderboard");
    }
  }

  isSocketActive() {
    return this.connected;
  }
}

export const socketManager = new RealtimeSocket();
