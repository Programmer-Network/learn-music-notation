import { EDifficulty } from "../../types";

export interface SessionStore {
  isEnded: boolean;
  isStarted: boolean;
  metrics: SessionMetrics;
  countdownTime: number;
  setCountdownTime: (newTime: number) => void;
  startSession: () => void;
  endSession: () => void;
  addSuccessfulNote: () => void;
  changeDifficulty: (newDifficulty: EDifficulty) => void;
  addMissedNote: () => void;
}

export interface SessionMetrics {
  difficulty: EDifficulty;
  successfulNotes: number;
  missedNotes: number;
}
