import abcjs from "abcjs";
import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import { useAudioProcessor } from "../../Hooks/useAudioProcessor";
import NoteUtils, { notes } from "../../Utils/NoteUtils";

import { EDifficulty, INote } from "../../types";
import Button from "../Button";
import { IconSaxophone } from "../Icons/IconSaxophone";
import ListboxSelector from "../ListboxSelector";
import { difficultyOptions } from "./types";

const NoteDisplay = () => {
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const { playedNote, initAudio } = useAudioProcessor(notes);
  const [difficulty, setDifficulty] = useState<EDifficulty>(EDifficulty.easy);

  const [randomNote, setRandomNote] = useState<INote>({
    frequency: 0,
    abcNote: "",
    note: "",
    difficulty,
  });
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
    };

    if (!isStarted || !notationRef.current) {
      return;
    }

    changeNote();
    const intervalId = setInterval(changeNote, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, [isStarted, difficulty]);

  const handleStart = () => {
    initAudio();
    setIsStarted(true);
  };

  return (
    <div
      className={classNames(
        "flex flex-col items-center justify-center w-full h-full"
      )}
    >
      {!isStarted && (
        <Button onClick={handleStart}>
          <IconSaxophone className="w-5" /> Practice
        </Button>
      )}
      {isStarted && (
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
          <div className="text-center bg-slate-800 py-2 rounded-lg w-72">
            <h2 className="text-4xl text-yellow-500">{playedNote.note}</h2>
            <h2 className="text-4xl text-yellow-500">{randomNote.note}</h2>
            <h2 className="text-4xl text-yellow-500">
              {playedNote.frequency.toFixed(2)}
            </h2>
          </div>
        </div>
      )}

      <div className="bg-slate-700 rounded-lg">
        <div ref={notationRef} className="text-white" />
      </div>
    </div>
  );
};

export default NoteDisplay;
