 
export class Duration {

  /**
   *  A duration represents a length of time.
   * 
   * @param milliseconds The duration in milliseconds (default: 500ms, 120bpm).
   */
  constructor(public readonly milliseconds: number = 500) { }

  /**
   * Returns a new Duration instance with the specified number of milliseconds.
   * 
   * The expression `60000 / bpm` is used to convert beats per minute to milliseconds per beat.
   * This is because there are 60,000 milliseconds in a minute, so dividing 60,000 by the number
   * of beats per minute gives the number of milliseconds per beat.
   *  
   * @param bpm 
   * @returns 
   */
  static fromBPM(bpm: number): Duration {
    return new Duration(60000 / bpm);
  }
}

