import { Note, NoteName } from "./Note";
import { Tonality, TonalityType } from "./Tonality";

/**
 * Represents a musical scale derived from a specified tonality.
 */
export class Scale {
  public readonly accidental: string;

  constructor(public readonly tonality: Tonality, public readonly notes: Note[]) {
    this.accidental = notes.some(note => note.accidentals.includes("♭")) ? "♭" : "#";
  };

  /**
   * Generates a scale based on the provided tonality.
   * @param tonality The base tonality to derive the scale from.
   * @returns A new Scale object consisting of ordered notes.
   */
  static fromTonality(tonality: Tonality): Scale {
    const intervals = tonality.type === TonalityType.Major ? [2, 2, 1, 2, 2, 2] : [2, 1, 2, 2, 1, 2];
    
    const scaleNotes: Note[] = [];

    let currentNoteIndex = Object.values(NoteName).indexOf(tonality.tonalCenter as NoteName); 
    let currentFrequency =  tonality.frequency;

  let previousNote = new Note(tonality.tonalCenter,  tonality.accidentals, currentFrequency, tonality.octave, 0, tonality);
     scaleNotes.push(previousNote);

    intervals.forEach((interval) => {
        currentFrequency *= Math.pow(2, interval / 12);
        currentNoteIndex = (currentNoteIndex + 1) % 7; // Ensure looping through noteNames
        const noteName = Object.values(NoteName)[currentNoteIndex]; 
        const accidentalsCount = previousNote.accidentals.length  - (["B", "E"].includes(previousNote.name) ? 1 : 2) + interval  
        const accidentalsType = (accidentalsCount < 0) ? "♭" : "#"; 
        const accidentals = Array(accidentalsCount).fill(accidentalsType); 
        const note = new Note(noteName, accidentals , currentFrequency, tonality.octave, 0, tonality);
        scaleNotes.push(note);
        previousNote = {...note};
    });


    const scale= new Scale(tonality, scaleNotes);


    return scale;
}
    
}
