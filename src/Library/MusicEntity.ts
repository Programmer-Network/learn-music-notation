
import { Chord } from "./Chord";
import { Duration } from "./Duration";
import { Note } from "./Note";
import { Pause } from "./Pause";
import { Sequence } from "./Sequence";

type IMusicEntity = Note | Pause | Chord | Sequence;

class MusicEntity<T extends IMusicEntity> {
  constructor(
    private readonly entity: T,
    private readonly duration: Duration
  ) {
    throw Error("Not implemented");
  }
}