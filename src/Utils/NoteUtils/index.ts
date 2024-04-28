import { EDifficulty, INote } from "../../types";

export const notes: INote[] = [
  {
    note: "Low B♭",
    abcNote: "B,,",
    frequency: 138.59,
    difficulty: EDifficulty.medium,
  },
  {
    note: "Low B",
    abcNote: "B,",
    frequency: 146.83,
    difficulty: EDifficulty.medium,
  },
  {
    note: "Low C",
    abcNote: "C,",
    frequency: 155.56,
    difficulty: EDifficulty.medium,
  },
  {
    note: "Low C♯/D♭",
    abcNote: "^C,",
    frequency: 164.81,
    difficulty: EDifficulty.medium,
  },
  {
    note: "Low D",
    abcNote: "D,",
    frequency: 174.61,
    difficulty: EDifficulty.medium,
  },
  {
    note: "Low D♯/E♭",
    abcNote: "^D,",
    frequency: 184.99,
    difficulty: EDifficulty.medium,
  },
  {
    note: "Low E",
    abcNote: "E,",
    frequency: 195.99,
    difficulty: EDifficulty.medium,
  },
  {
    note: "Low F",
    abcNote: "F,",
    frequency: 207.65,
    difficulty: EDifficulty.medium,
  },
  {
    note: "Low F♯/G♭",
    abcNote: "^F,",
    frequency: 220.0,
    difficulty: EDifficulty.medium,
  },
  {
    note: "Low G",
    abcNote: "G,",
    frequency: 233.08,
    difficulty: EDifficulty.medium,
  },
  {
    note: "Low G♯/A♭",
    abcNote: "^G,",
    frequency: 246.94,
    difficulty: EDifficulty.medium,
  },
  {
    note: "Low A",
    abcNote: "A,",
    frequency: 261.63,
    difficulty: EDifficulty.medium,
  },
  {
    note: "Low A♯/B♭",
    abcNote: "^A,",
    frequency: 277.18,
    difficulty: EDifficulty.medium,
  },
  {
    note: "Middle B",
    abcNote: "B",
    frequency: 293.66,
    difficulty: EDifficulty.easy,
  },
  {
    note: "Middle C",
    abcNote: "C",
    frequency: 311.13,
    difficulty: EDifficulty.easy,
  },
  {
    note: "Middle C♯/D♭",
    abcNote: "^C",
    frequency: 329.63,
    difficulty: EDifficulty.medium,
  },
  {
    note: "Middle D",
    abcNote: "D",
    frequency: 349.23,
    difficulty: EDifficulty.easy,
  },
  {
    note: "Middle D♯/E♭",
    abcNote: "^D",
    frequency: 369.99,
    difficulty: EDifficulty.easy,
  },
  {
    note: "Middle E",
    abcNote: "E",
    frequency: 392.0,
    difficulty: EDifficulty.easy,
  },
  {
    note: "Middle F",
    abcNote: "F",
    frequency: 415.3,
    difficulty: EDifficulty.easy,
  },
  {
    note: "Middle F♯/G♭",
    abcNote: "^F",
    frequency: 440.0,
    difficulty: EDifficulty.easy,
  },
  {
    note: "Middle G",
    abcNote: "G",
    frequency: 466.16,
    difficulty: EDifficulty.easy,
  },
  {
    note: "Middle G♯/A♭",
    abcNote: "^G",
    frequency: 493.88,
    difficulty: EDifficulty.medium,
  },
  {
    note: "Middle A",
    abcNote: "A",
    frequency: 523.25,
    difficulty: EDifficulty.easy,
  },
  {
    note: "Middle A♯/B♭",
    abcNote: "^A",
    frequency: 554.37,
    difficulty: EDifficulty.medium,
  },
  {
    note: "High B",
    abcNote: "b",
    frequency: 587.33,
    difficulty: EDifficulty.hard,
  },
  {
    note: "High C",
    abcNote: "c'",
    frequency: 622.25,
    difficulty: EDifficulty.hard,
  },
  {
    note: "High C♯/D♭",
    abcNote: "^c'",
    frequency: 659.25,
    difficulty: EDifficulty.hard,
  },
  {
    note: "High D",
    abcNote: "d'",
    frequency: 698.46,
    difficulty: EDifficulty.hard,
  },
  {
    note: "High D♯/E♭",
    abcNote: "^d'",
    frequency: 739.99,
    difficulty: EDifficulty.hard,
  },
  {
    note: "High E",
    abcNote: "e'",
    frequency: 783.99,
    difficulty: EDifficulty.hard,
  },
  {
    note: "High F",
    abcNote: "f'",
    frequency: 830.61,
    difficulty: EDifficulty.hard,
  },
  {
    note: "High F♯",
    abcNote: "^f'",
    frequency: 880.0,
    difficulty: EDifficulty.hard,
  },
];

class NoteUtils {
  /**
   * Get a random note from the notes array filtered by difficulty.
   * @param difficulty The difficulty level to filter by.
   * @returns INote
   */
  public static getRandomNote(difficulty: string): INote {
    const filteredNotes = notes.filter(
      (note) => note.difficulty === difficulty
    );
    const randomIndex = Math.floor(Math.random() * filteredNotes.length);
    return filteredNotes[randomIndex];
  }

  /**
   * Generate the ABC notation for displaying a single note.
   * @param note The note object.
   * @returns string ABC notation string.
   */
  public static generateAbcNotation(note: INote): string {
    return `X:1\nL:1/4\nK:C clef=treble\n${note.abcNote}`;
  }
}

export default NoteUtils;
