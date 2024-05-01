import { useState } from "react";
import Button from "./Components/Button";
import Modal from "./Components/Modal";
import NoteDisplay from "./Components/NoteDisplay";
import { IconSaxophone } from "./Components/Icons/IconSaxophone";
import useSessionTracker from "./Hooks/useSessionTracker";

function App() {
  const [isStarted, setIsStarted] = useState(false);
  const { startSession, isEnded, metrics } = useSessionTracker();

  return (
    <div className="dark:bg-background min-h-screen">
      {!isStarted ? (
        <div className="flex flex-col items-center justify-center h-screen">
          <Modal
            descriptionElement={
              <p className="text-sm font-medium text-gray-400">
                After clicking{" "}
                <a className="font-bold text-gray-300">Continue</a>, random
                notes will appear every{" "}
                <a className="font-bold text-gray-300">4</a> seconds. Within
                this timeframe, your task is to play each note for a minimum of{" "}
                <a className="font-bold text-gray-300">1.5</a> seconds.
                <br /> <br />
                Once you've achieved this, the note will turn green.
              </p>
            }
            title={"Note Mastery Challenge"}
            openButton={
              <Button>
                <IconSaxophone className="w-5" /> Practice
              </Button>
            }
            successButton={
              <Button
                bgFill
                onClick={() => {
                  setIsStarted(true);
                  startSession();
                }}
              >
                Continue
              </Button>
            }
          />
        </div>
      ) : !isEnded ? (
        <NoteDisplay isStarted={isStarted} setIsStarted={setIsStarted} />
      ) : (
        <div className="flex flex-col items-center justify-center h-screen px-4 w-full space-y-5">
          <div className="flex items-center justify-center">
            <a className="text-white text-lg font-bold">Session has ended!</a>
          </div>

          <div className="py-5 px-5 w-full lg:w-[400px] bg-muted rounded-lg flex flex-col">
            <div className="flex items-center justify-center pb-4">
              <a className="text-white text-lg font-bold">
                Results of the session
              </a>
            </div>
            <div className="flex items-center justify-between">
              <a className="text-gray-200 font-medium lg:font-semibold">
                Successful Notes
              </a>
              <a className="text-lime-400">{metrics.successfulNotes}</a>
            </div>
            <div className="flex items-center justify-between">
              <a className="text-gray-200 font-medium lg:font-semibold">
                Missed Notes
              </a>
              <a className="text-red-400">{metrics.missedNotes}</a>
            </div>
          </div>

          <Button
            onClick={() => {
              setIsStarted(true);
              startSession();
            }}
          >
            Restart Session
          </Button>
        </div>
      )}
    </div>
  );
}

export default App;
