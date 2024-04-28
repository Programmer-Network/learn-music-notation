export enum EDifficulty {
  easy = "easy",
  medium = "medium",
  hard = "hard",
}

export interface INote {
  note: string;
  abcNote: string;
  frequency: number;
  difficulty: EDifficulty;
}

export interface AudioProcessorReturn {
  playedNote: INote;
  deviation: number;
  initAudio: () => void;
}
