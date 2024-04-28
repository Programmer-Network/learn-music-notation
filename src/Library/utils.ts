import { FrequencyOfA4, OctaveOfA4 } from "./Note";

/**
 * Returns a random element from the given array.
 *
 * @param array The array to select a random element from.
 * @returns A random element from the array.
 */
export function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Normalizes the given frequency to two decimal places.
 *
 * @param frequency The frequency to normalize.
 * @returns The normalized frequency.
 */
export function normalizeFrequency(frequency: number): number {
  return Math.round(frequency * 100) / 100;
}

/**
 * Determines the octave of a note based on its frequency, using A4 (440 Hz) as the reference.
 *
 * @param frequency The frequency of the note.
 * @returns The calculated octave number.
 */
export function determineOctave(frequency: number): number {
  return Math.round(Math.log2(frequency / FrequencyOfA4)) + OctaveOfA4;
}

export function determineWrittenNoteOctave(
  note: string,
  accidental: string
): number {
  throw Error("Not implemented");
}

export function calculateFrequency(note: string, accidental: string): number {
  throw Error("Not implemented");
}
