import abcjs from "abcjs";
import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import { useAudioProcessor } from "../../Hooks/useAudioProcessor";
import NoteUtils, { notes } from "../../Utils/NoteUtils";

import { EDifficulty, INote } from "../../types";
import ListboxSelector from "../ListboxSelector";
import { Props, difficultyOptions } from "./types";
import IconMusikNote from "../Icons/IconMusikNote";
import useSessionTracker from "../../Hooks/useSessionTracker";
import IconDoorOpen from "../Icons/IconDoorOpen";

const NoteDisplay = ({ isStarted, setIsStarted }: Props) => {
  const { playedNote, initAudio, stopAudio } = useAudioProcessor(notes);
  const [isNoteCorrect, setIsNoteCorrect] = useState<boolean>(false);
  const { addMissedNote, addSuccessfulNote } = useSessionTracker();
  const { metrics, changeDifficulty, formatCountdown, endSession } =
    useSessionTracker();

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
          selectionColor: "white",
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
    endSession();
    setIsStarted(false);
  };

  return (
    <div className={classNames("flex flex-col items-center justify-center")}>
      <div className="flex items-center justify-between px-5 py-5 w-full">
        <button
          onClick={handleStop}
          className="bg-mutedSecondary hover:bg-[#353535] p-1 lg:p-2 rounded-lg flex flex-row items-center justify-center space-x-1 text-primary"
        >
          <IconDoorOpen className="w-7 h-7 " />
          <a className="hidden lg:block font-semibold">End Session</a>
        </button>

        <p className="text-xl font-bold text-gray-400">
          Remaining time: {formatCountdown()}
        </p>
        <div className="w-8 lg:w-32" />
      </div>

      <div className="px-5 w-full lg:w-72 pb-5">
        <ListboxSelector
          onChange={(value) => changeDifficulty(value)}
          buttonTitle="Change Difficulty"
          value={metrics.difficulty}
          options={difficultyOptions}
        />
      </div>

      <div className="space-y-5 py-5 w-full px-5 lg:w-96">
        <div className="text-center bg-muted py-2 rounded-lg">
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
      </div>

      <div className="w-[375px] sm:w-[400px] mt-10">
        <div
          ref={notationRef}
          className={isNoteCorrect ? "text-lime-500" : "text-white"}
        />
      </div>
    </div>
  );
};

export default NoteDisplay;
