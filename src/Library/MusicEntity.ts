import { Chord } from "./Chord";
import { Duration } from "./Duration";
import { Note } from "./Note";
import { Pause } from "./Pause";
import { Sequence } from "./Sequence";

type IMusicEntity = Note | Pause | Chord | Sequence;

export default class MusicEntity<T extends IMusicEntity> {
  // @ts-expect-error - Not Implemented
  constructor(private readonly entity: T, private readonly duration: Duration) {
    throw Error("Not implemented");
  }
}
