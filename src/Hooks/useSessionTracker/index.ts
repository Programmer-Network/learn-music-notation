import { useState, useEffect } from "react";

interface SessionMetrics {
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
  formatCountdown: () => string;
} => {
  const [isStarted, setIsStarted] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [metrics, setMetrics] = useState<SessionMetrics>({
    successfulNotes: 0,
    missedNotes: 0,
  });
  const [countdownTime, setCountdownTime] = useState<number>(120);

  const startSession = (): void => {
    setIsStarted(true);
    setStartTime(Date.now());
    setIsEnded(false);
    setCountdownTime(120);
  };

  const endSession = (): void => {
    setIsStarted(false);
    setEndTime(Date.now());
    setIsEnded(true);
  };

  const addSuccessfulNote = (): void => {
    setMetrics((prev) => ({
      ...prev,
      successfulNotes: prev.successfulNotes + 1,
    }));
  };

  const addMissedNote = (): void => {
    setMetrics((prev) => ({ ...prev, missedNotes: prev.missedNotes + 1 }));
  };

  const formatCountdown = (): string => {
    const minutes = Math.floor(countdownTime / 60);
    const seconds = countdownTime % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  useEffect(() => {
    if (isStarted && !isEnded && countdownTime >= 0) {
      const countdownTimer = setInterval(() => {
        setCountdownTime((prevTime) => {
          if (prevTime === 0) {
            setIsEnded(true);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
      return (): void => clearInterval(countdownTimer);
    }
  }, [isStarted, isEnded, countdownTime]);

  return {
    isStarted,
    isEnded,
    startSession,
    endSession,
    metrics,
    addSuccessfulNote,
    addMissedNote,
    countdownTime,
    formatCountdown,
  };
};

export default useSessionTracker;
