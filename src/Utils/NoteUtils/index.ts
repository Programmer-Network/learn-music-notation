class NoteUtils {
  static notes: string[] = ["C", "D", "E", "F", "G", "A", "B"];

  /**
   * Get a random note from the notes array
   * @returns string
   */
  public static getRandomNote(): string {
    return this.notes[Math.floor(Math.random() * this.notes.length)] + "4"; // Append '4' for the octave
  }
}

export default NoteUtils;
