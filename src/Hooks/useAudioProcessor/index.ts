import { useCallback, useEffect, useState } from "react";
import { AudioUtils } from "../../Utils/AudioUtils";
import { AudioProcessorReturn, INote } from "../../types";

export const useAudioProcessor = (notes: INote[]): AudioProcessorReturn => {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const [deviation, setDeviation] = useState<number>(0);
  const [playedNote, setPlayedNote] = useState<INote>({
    note: "",
    frequency: 0,
  });

  const initAudio = useCallback(async () => {
    const { audioContext, analyser } = await AudioUtils.initAudio();
    setAudioContext(audioContext);
    setAnalyser(analyser);
  }, []);

  const onNoteDetected = useCallback((note: INote, freqDeviation: number) => {
    setPlayedNote(note);
    setDeviation(freqDeviation);
  }, []);

  useEffect(() => {
    if (analyser && audioContext) {
      AudioUtils.calculateFrequency(
        analyser,
        notes,
        audioContext.sampleRate,
        5,
        onNoteDetected
      );
      return () => {
        audioContext.close();
      };
    }
  }, [analyser, audioContext, notes, onNoteDetected]);

  return {
    playedNote,
    deviation,
    initAudio,
  };
};
