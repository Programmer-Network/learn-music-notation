import { FrequencyOfA4, NoteName, OctaveOfA4 } from "./Note";
import {
  calculateFrequency,
  determineWrittenNoteOctave,
  getRandomElement,
} from "./utils";

export enum TonalityType {
  Major = "major",
  Minor = "minor",
}

/**
 * Represents a musical tonality with specific characteristics like root note and scale type.
 * Throws errors if invalid values are provided.
 */
export class Tonality {
  /**
   * Constructs a Tonality instance.
   * @param tonalCenter The root note of the tonality (e.g., 'C', 'D').
   * @param accidentals Array of accidentals (e.g., '#', '♭') affecting the tonal center.
   * @param frequency The frequency in Hz of the tonal center note.
   * @param octave The octave number of the tonal center.
   * @param type The type of the tonality (Major or Minor).
   */
  constructor(
    public readonly tonalCenter: string,
    public readonly accidentals: string[],
    public readonly frequency: number,
    public readonly octave: number,
    public readonly type: TonalityType
  ) {
    // Validate tonal center to be a valid note name
    if (!Object.values(NoteName).includes(tonalCenter as NoteName)) {
      throw new Error("Invalid tonal center: Must be a valid note name.");
    }

    // Validate frequency to be a positive number
    if (frequency <= 0) {
      throw new Error("Frequency must be a positive number.");
    }

    // Validate octave to be within a reasonable range
    if (octave < 0 || octave > 8) {
      throw new Error("Octave must be between 0 and 8.");
    }

    // Validate type to be either Major or Minor
    if (!Object.values(TonalityType).includes(type)) {
      throw new Error("Invalid tonality type: Must be Major or Minor.");
    }
  }

  static getRandom(): Tonality {
    const tonalCenters = Object.values(NoteName);
    const types = [TonalityType.Major, TonalityType.Minor];
    const center = getRandomElement(tonalCenters);
    const type = getRandomElement(types);
    const frequency = FrequencyOfA4; // Using A4 as a reference for simplicity, adjust if needed
    const octave = OctaveOfA4; // Defaulting to the middle octave for simplicity

    return new Tonality(center, [], frequency, octave, type);
  }

  /**
   * Parses a simplified string to create a Tonality object with dynamic frequency calculation.
   * Expected format: "Note[accidental][type]"
   * Example: "C#m" for C sharp minor
   *
   * @param written The string representation of the tonality.
   * @returns A new Tonality instance.
   */
  static from(written: string): Tonality {
    const regex = /^([A-G])(#|♭)?(m)?$/i;
    const match = written.match(regex);

    if (!match) {
      throw new Error("Invalid tonality format.");
    }

    const [, note, accidental, minorFlag] = match;
    const type = minorFlag ? TonalityType.Minor : TonalityType.Major;
    const accidentals = accidental ? [accidental] : [];

    // Determine frequency based on note and accidental
    const frequency = calculateFrequency(note, accidental);
    const octave = determineWrittenNoteOctave(note, accidental);

    return new Tonality(note, accidentals, frequency, octave, type);
  }
}
