import abcjs from "abcjs";
import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import { useAudioProcessor } from "../../Hooks/useAudioProcessor";
import NoteUtils, { notes } from "../../Utils/NoteUtils";

import { EDifficulty, INote } from "../../types";
import ListboxSelector from "../ListboxSelector";
import { Props, difficultyOptions } from "./types";
import Button from "../Button";
import IconMusikNote from "../Icons/IconMusikNote";
import useSessionTracker from "../../Hooks/useSessionTracker";
import useSessionStore from "../../Stores/SessionStore";

const NoteDisplay = ({ isStarted, setIsStarted }: Props) => {
  const { playedNote, initAudio, stopAudio } = useAudioProcessor(notes);
  const [isNoteCorrect, setIsNoteCorrect] = useState<boolean>(false);
  const { addMissedNote, addSuccessfulNote } = useSessionTracker();
  const { metrics, changeDifficulty } = useSessionStore();

  const [randomNote, setRandomNote] = useState<INote>({
    frequency: 0,
    abcNote: "",
    note: "",
    difficulty: metrics.difficulty,
  });

  useEffect(() => {
    if (isStarted) initAudio();
  }, [isStarted]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsNoteCorrect(playedNote.note === randomNote.note);

      if (playedNote.note === randomNote.note) {
        addSuccessfulNote();
      } else {
        addMissedNote();
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [playedNote.note, randomNote.note]);

  const notationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const changeNote = () => {
      const random = NoteUtils.getRandomNote(randomNote, metrics.difficulty);
      abcjs.renderAbc(
        notationRef.current!,
        NoteUtils.generateAbcNotation(random),
        {
          responsive: "resize",
          staffwidth: 120,
        }
      );

      setRandomNote(random);
      setIsNoteCorrect(false);
    };

    if (!isStarted || !notationRef.current) {
      return;
    }

    changeNote();
    const intervalId = setInterval(
      changeNote,
      metrics.difficulty === EDifficulty.easy ? 5000 : 4000
    );

    return () => {
      clearInterval(intervalId);
    };
  }, [isStarted, metrics.difficulty]);

  const handleStop = () => {
    stopAudio();
    setIsStarted(false);
  };

  return (
    <div className={classNames("flex flex-col items-center justify-center")}>
      <div className="mb-14 lg:mb-5 absolute left-5 top-5">
        <Button onClick={handleStop}>Stop practicing</Button>
      </div>
      <div className="space-y-5 py-5">
        <div className="text-center bg-muted py-2 rounded-lg px-3 lg:w-96">
          <div className="flex flex-row items-center justify-center space-x-1 text-2xl">
            <h2 className="text-white font-semibold">Performed</h2>
            <IconMusikNote className="w-6 h-6 text-primary" />
            <a className=" text-slate-600">•</a>
            <h2 className="text-primary font-semibold">
              {playedNote.note ? playedNote.note : "No note played"}
            </h2>
          </div>

          <div className="flex flex-row items-center justify-center space-x-1 text-2xl">
            <h2 className="text-white font-semibold">Difficulty</h2>
            <a className=" text-slate-600">•</a>
            <h2 className="text-primary font-semibold capitalize">
              {metrics.difficulty}
            </h2>
          </div>
        </div>

        <div className="space-y-2 flex items-center justify-center flex-col w-full">
          <ListboxSelector
            className="w-72"
            onChange={(value) => changeDifficulty(value)}
            buttonTitle="Change Difficulty"
            value={metrics.difficulty}
            options={difficultyOptions}
          />
        </div>
      </div>

      <div className="w-[375px] sm:w-[400px]">
        <div
          ref={notationRef}
          className={isNoteCorrect ? "text-lime-500" : "text-white"}
        />
      </div>
    </div>
  );
};

export default NoteDisplay;
