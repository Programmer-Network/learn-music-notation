import abcjs from "abcjs";
import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import { useAudioProcessor } from "../../Hooks/useAudioProcessor";
import NoteUtils, { notes } from "../../Utils/NoteUtils";

import { INote } from "../../types";
import Button from "../Button";
import { IconSaxophone } from "../Icons/IconSaxophone";
import "./style.css";

const NoteDisplay = () => {
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const { playedNote, initAudio } = useAudioProcessor(notes);

  const [randomNote, setRandomNote] = useState<INote>({
    frequency: 0,
    abcNote: "",
    note: "",
    difficulty: "easy",
  });
  const notationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const changeNote = () => {
      const random = NoteUtils.getRandomNote("easy");
      abcjs.renderAbc(
        notationRef.current!,
        NoteUtils.generateAbcNotation(random),
        {
          scale: 5,
          expandToWidest: true,
          paddingright: 0,
          paddingbottom: 0,
          paddingleft: 0,
          paddingtop: 0,
          minPadding: 0,
          wrap: {
            minSpacing: 0,
            maxSpacing: 0,
            preferredMeasuresPerLine: 1,
          },
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
  }, [isStarted]);

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

      <div className="w-full flex items-center justify-center">
        <div ref={notationRef} className="text-white" />
      </div>

      {isStarted && (
        <div className="text-center">
          <h2 className="text-4xl text-yellow-500">{playedNote.note}</h2>
          <h2 className="text-4xl text-yellow-500">{randomNote.note}</h2>
          <h2 className="text-4xl text-yellow-500">
            {playedNote.frequency.toFixed(2)}
          </h2>
        </div>
      )}
    </div>
  );
};

export default NoteDisplay;
