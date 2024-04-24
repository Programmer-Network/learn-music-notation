  export enum IntervalName {
    Unison = 0,
    MinorSecond = 1,
    MajorSecond = 2,
    MinorThird = 3,
    MajorThird = 4,
    PerfectFourth = 5,
    Tritone = 6,
    PerfectFifth = 7,
    MinorSixth = 8,
    MajorSixth = 9,
    MinorSeventh = 10,
    MajorSeventh = 11,
    Octave = 12,
  }

  /**
   * Represents a musical interval with functionality to determine interval properties and effects.
   */
  export class Interval {
    /**
     * Constructs an Interval instance.
     * @param interval The named interval.
     */
    constructor(
      public readonly kind: IntervalName,
    ) {}

    static fromName(kind: IntervalName): Interval {
      return new Interval( kind);
    }

    /**
     * Returns the semitone count for the interval.
     * @returns The number of semitones in the interval.
     */
    getSemitones(): number {
      return this.kind;
    }

    /**
     * Calculates the frequency multiplier for the interval, assuming equal temperament.
     * @returns The frequency multiplier corresponding to the interval.
     */
    calculateFrequencyMultiplier(): number {
      return Math.pow(2, this.kind  / 12);
    }

    /**
     * Returns a descriptive name for the interval.
     * @returns The string representation of the interval name.
     */
    getIntervalName(): string {
      return IntervalName[this.kind];
    }
  }