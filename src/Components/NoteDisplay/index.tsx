import abcjs from "abcjs";
import { FC, useEffect, useRef, useState } from "react";
import { useAudioProcessor } from "../../Hooks/useAudioProcessor";
import NoteUtils from "../../Utils/NoteUtils";
import { notes } from "./constants";

/**
 * 1. How quickly should the notes change? Interval
 * 2. What notes should be displayed? Aiolan major scale, western scale, a user can choose later which scale they want to practice
 */

const NoteDisplay: FC<{
  onChange: (note: string) => void;
}> = ({ onChange }) => {
  const { playedNote, deviation, initAudio } = useAudioProcessor(notes);

  const [randomNote, setRandomNote] = useState<string>("");
  const notationRef = useRef<HTMLDivElement>(null);

  const changeNote = () => {
    const random = NoteUtils.getRandomNote();
    setRandomNote(random);
    onChange(randomNote);

    if (notationRef.current) {
      const abcNotation = `X:1\nL:1/4\nK:C clef=treble\n${random}`;
      abcjs.renderAbc(notationRef.current, abcNotation, {
        responsive: "resize",
        scale: 3,
      });
    }
  };

  useEffect(() => {
    changeNote();
    const intervalId = setInterval(changeNote, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="p-12">
      <button onClick={initAudio}>Start</button>
      <h1>{playedNote.note}</h1>
      <p>Frequency: {playedNote.frequency.toFixed(2)} Hz</p>
      <div className="meter">
        <div
          className="meter-marker"
          style={{ left: `calc(50% + ${deviation}%)` }}
        ></div>
      </div>

      <div ref={notationRef} className="text-center mt-4" />

      <div>Played: {playedNote.note}</div>
      <div>Random: {randomNote}</div>
    </div>
  );
};

export default NoteDisplay;
