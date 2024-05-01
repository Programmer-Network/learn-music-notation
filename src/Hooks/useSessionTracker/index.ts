import { useEffect } from "react";
import useSessionStore from "../../Stores/SessionStore";
import { EDifficulty } from "../../types";

interface SessionMetrics {
  difficulty: EDifficulty;
  successfulNotes: number;
  missedNotes: number;
}

const useSessionTracker = (): {
  isStarted: boolean;
  isEnded: boolean;
  startSession: () => void;
  endSession: () => void;
  metrics: SessionMetrics;
  addSuccessfulNote: () => void;
  addMissedNote: () => void;
  countdownTime: number;
  changeDifficulty: (newDifficulty: EDifficulty) => void;
  formatCountdown: () => string;
} => {
  const {
    countdownTime,
    endSession,
    isEnded,
    isStarted,
    metrics,
    startSession,
    addMissedNote,
    setCountdownTime,
    changeDifficulty,
    addSuccessfulNote,
  } = useSessionStore();

  const formatCountdown = (): string => {
    const minutes = Math.floor(countdownTime / 60);
    const seconds = countdownTime % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  useEffect(() => {
    if (isStarted && !isEnded) {
      const countdownTimer = setInterval(() => {
        setCountdownTime(countdownTime - 1);
        if (countdownTime <= 0) {
          endSession();
        }
      }, 1000);
      return () => {
        if (countdownTimer) {
          clearInterval(countdownTimer);
        }
      };
    }
  }, [isStarted, isEnded, countdownTime, endSession, setCountdownTime]);

  return {
    isStarted,
    isEnded,
    startSession,
    endSession,
    metrics,
    addSuccessfulNote,
    addMissedNote,
    changeDifficulty,
    countdownTime,
    formatCountdown,
  };
};

export default useSessionTracker;
