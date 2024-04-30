import { useState } from "react";
import Button from "./Components/Button";
import Modal from "./Components/Modal";
import NoteDisplay from "./Components/NoteDisplay";
import { IconSaxophone } from "./Components/Icons/IconSaxophone";
import useSessionTracker from "./Hooks/useSessionTracker";

function App() {
  const [isStarted, setIsStarted] = useState(false);
  const { startSession, formatCountdown, isEnded } = useSessionTracker();

  return (
    <div className="dark:bg-primary min-h-screen">
      <div className="flex flex-col items-center justify-center h-screen w-full">
        {!isStarted ? (
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
                onClick={() => {
                  setIsStarted(true);
                  startSession();
                }}
              >
                Continue
              </Button>
            }
          />
        ) : (
          <>
            <NoteDisplay isStarted={isStarted} setIsStarted={setIsStarted} />
            <a> {isEnded ? "Beendet" : formatCountdown()}</a>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
