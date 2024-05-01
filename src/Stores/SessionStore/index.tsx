import { create } from "zustand";
import { SessionStore } from "./types";
import { EDifficulty } from "../../types";

const useSessionStore = create<SessionStore>()((set) => ({
  isEnded: false,
  isStarted: false,
  metrics: {
    difficulty: EDifficulty.easy,
    successfulNotes: 0,
    missedNotes: 0,
  },
  countdownTime: 120,
  startSession: (): void => {
    set((state) => ({
      ...state,
      isStarted: true,
      isEnded: false,
      countdownTime: 120,
      metrics: {
        difficulty: EDifficulty.easy,
        successfulNotes: 0,
        missedNotes: 0,
      },
    }));
  },
  endSession: (): void => {
    set((state) => ({
      ...state,
      isStarted: false,
      isEnded: true,
    }));
  },
  changeDifficulty: (newDifficulty: EDifficulty): void => {
    set((state) => ({
      ...state,
      metrics: {
        ...state.metrics,
        difficulty: newDifficulty,
      },
    }));
  },
  addSuccessfulNote: (): void => {
    set((state) => ({
      ...state,
      metrics: {
        ...state.metrics,
        successfulNotes: state.metrics.successfulNotes + 1,
      },
    }));
  },
  addMissedNote: (): void => {
    set((state) => ({
      ...state,
      metrics: {
        ...state.metrics,
        missedNotes: state.metrics.missedNotes + 1,
      },
    }));
  },
  setCountdownTime: (newTime: number) =>
    set((state) => ({ ...state, countdownTime: newTime })),
}));

export default useSessionStore;
