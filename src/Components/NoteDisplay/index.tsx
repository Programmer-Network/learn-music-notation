import abcjs from "abcjs";
import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import { useAudioProcessor } from "../../Hooks/useAudioProcessor";
import NoteUtils, { notes } from "../../Utils/NoteUtils";

import { EDifficulty, INote } from "../../types";
import ListboxSelector from "../ListboxSelector";
import { Props, difficultyOptions } from "./types";

const NoteDisplay = ({ isStarted }: Props) => {
  const { playedNote, initAudio } = useAudioProcessor(notes);
  const [difficulty, setDifficulty] = useState<EDifficulty>(EDifficulty.easy);
  const [isNoteCorrect, setIsNoteCorrect] = useState<boolean>(false);

  const [randomNote, setRandomNote] = useState<INote>({
    frequency: 0,
    abcNote: "",
    note: "",
    difficulty,
  });

  useEffect(() => {
    initAudio();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!playedNote || !randomNote) return;
      if (playedNote.note === randomNote.note) {
        setIsNoteCorrect(true);
      } else {
        setIsNoteCorrect(false);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [playedNote, randomNote]);

  const notationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const changeNote = () => {
      const random = NoteUtils.getRandomNote(difficulty);
      abcjs.renderAbc(
        notationRef.current!,
        NoteUtils.generateAbcNotation(random),
        {
          scale: 4,
          expandToWidest: true,
          staffwidth: 400,
        }
      );

      setRandomNote(random);
      setIsNoteCorrect(false);
    };

    if (!isStarted || !notationRef.current) {
      return;
    }

    changeNote();
    const intervalId = setInterval(changeNote, 4000);

    return () => {
      clearInterval(intervalId);
    };
  }, [isStarted, difficulty]);

  return (
    <div
      className={classNames(
        "flex flex-col items-center justify-center w-full h-full"
      )}
    >
      <div className="space-y-5 py-5">
        <div className="space-y-2 flex items-center justify-center flex-col w-full">
          <h2 className="text-slate-700 font-bold uppercase">
            Current Difficulty: {difficulty}
          </h2>
          <ListboxSelector
            className="w-72"
            onChange={(value) => setDifficulty(value)}
            buttonTitle="Choose Difficulty"
            value={difficulty}
            options={difficultyOptions}
          />
        </div>
        <div className="text-center bg-slate-800 py-2 rounded-lg w-96">
          <h2 className="text-4xl text-yellow-500">{playedNote.note}</h2>
          <h2 className="text-4xl text-yellow-500">
            Played Note correct: {isNoteCorrect ? "✓" : "✕"}
          </h2>

          <h2 className="text-4xl text-yellow-500">{randomNote.note}</h2>
          <h2 className="text-4xl text-yellow-500">
            {playedNote.frequency.toFixed(2)}
          </h2>
        </div>
      </div>

      <div className="bg-slate-700 rounded-lg">
        <div
          ref={notationRef}
          className={isNoteCorrect ? "text-lime-500" : "text-white"}
        />
      </div>
    </div>
  );
};

export default NoteDisplay;
