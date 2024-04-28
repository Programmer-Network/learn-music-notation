import { Scale } from "./Scale";
import { Tonality } from "./Tonality";
import { determineOctave, getRandomElement, normalizeFrequency } from "./utils";

export enum NoteName {
  "C" = "C",
  "D" = "D",
  "E" = "E",
  "F" = "F",
  "G" = "G",
  "A" = "A",
  "B" = "B",
}

/** The standard frequency reference of A4 in Hz. */
export const FrequencyOfA4 = 440;
export const OctaveOfA4 = 4;

/** Represents a musical note with defined properties relevant to its role in a scale. */
export class Note {
  /**
   * Constructs a Note instance.
   * 
   * @param name The name of the note (e.g., 'C', 'D').
   * @param accidentals accidentals affecting the note (e.g., '#', '♭').
   * @param frequency The frequency in Hz of the note.
   * @param octave The octave number of the note.
   * @param deviation Deviation in Hz from the standard frequency, if any.
   * @param tonality The tonality this note belongs to.
   */
  constructor(
    public readonly name: string,
    public readonly accidentals: string[],
    public readonly frequency: number,
    public readonly octave: number,
    public readonly deviation: number,
    public readonly tonality: Tonality
  ) { }

  /**
  * Creates a Note from a given frequency based on a specific tonality.
  * 
  * @param frequency The frequency of the note.
  * @param tonality The tonality context for the note.
  * @returns A new Note instance.
  */
  static fromFrequency(frequency: number, tonality: Tonality): Note {
    if (frequency <= 0) {
      throw new Error('Frequency must be a positive number.');
    }

    const { name, accidentals, deviation } = determineClosestNoteDetails(frequency, tonality);
    const normalizedFrequency = normalizeFrequency(frequency);
    const octave = determineOctave(normalizedFrequency);

    return new Note(name, accidentals, normalizedFrequency, octave, deviation, tonality);
  }

  static randomNoteFromRandomScale(): Note {
    const randomTonality = Tonality.getRandom();
    return this.randomNoteFromDefinedScale(randomTonality);
  }

  static randomNoteFromDefinedScale(tonality: Tonality): Note {
    const scale = Scale.fromTonality(tonality);
    return getRandomElement(scale.notes);
  } 
}

/**
 * Determines the closest note from a given frequency based on a scale derived from a tonality.
 * 
 * @param frequency The frequency to find the closest note for.
 * @param tonality The tonality to base the scale calculation on.
 * @returns An object containing the closest note's name, accidentals, and deviation from the given frequency.
 */
function determineClosestNoteDetails(frequency: number, tonality: Tonality): { name: string; accidentals: string[]; deviation: number } {
  const scale = Scale.fromTonality(tonality);
  let closestNote = scale.notes[0];
  let smallestDeviation = Math.abs(frequency - scale.notes[0].frequency);

  scale.notes.forEach(note => {
    const deviation = Math.abs(frequency - note.frequency);
    if (deviation < smallestDeviation) {
      smallestDeviation = deviation;
      closestNote = note;
    }
  });

  return {
    name: closestNote.name,
    accidentals: closestNote.accidentals,
    deviation: smallestDeviation
  };
}
