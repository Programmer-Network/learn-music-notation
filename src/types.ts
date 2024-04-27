export interface INote {
  note: string;
  abcNote: string;
  frequency: number;
  difficulty: "easy" | "medium" | "hard";
}

export interface AudioProcessorReturn {
  playedNote: INote;
  deviation: number;
  initAudio: () => void;
}
