export interface INote {
  note: string;
  frequency: number;
}

export interface AudioProcessorReturn {
  playedNote: INote;
  deviation: number;
  initAudio: () => void;
}
