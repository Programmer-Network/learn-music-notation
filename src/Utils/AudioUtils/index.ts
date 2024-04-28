import { EDifficulty, INote } from "../../types";

export class AudioUtils {
  /**
   * Initialize the audio stream and return the AudioContext and AnalyserNode
   * @returns Promise<{ audioContext: AudioContext, analyser: AnalyserNode }>
   */
  public static async initAudio(): Promise<{
    audioContext: AudioContext;
    analyser: AnalyserNode;
  }> {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const audioContext = new (window.AudioContext || window.AudioContext)();
    const analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaStreamSource(stream);
    source.connect(analyser);
    return { audioContext, analyser };
  }

  public static async stopAudio() {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      stream.getTracks().forEach((track) => track.stop());
    });
  }

  /**
   * Find the closest note to a given frequency using an array of notes
   * @param frequency The frequency to find the closest note for
   * @param notes An array of notes with their respective frequencies
   * @returns { note: string; frequency: number; deviation: number; }
   */
  public static findClosestNote(
    frequency: number,
    notes: INote[]
  ): { note: string; frequency: number; deviation: number } {
    const closest = notes.reduce((prev, curr) =>
      Math.abs(curr.frequency - frequency) <
      Math.abs(prev.frequency - frequency)
        ? curr
        : prev
    );

    const frequencyDeviation =
      (frequency - closest.frequency) / closest.frequency;

    return {
      note: closest.note,
      frequency: closest.frequency,
      deviation: frequencyDeviation * 100,
    };
  }

  /**
   * Calculate the dominant frequency from the audio input and find the closest note.
   * @param analyser The AnalyserNode used for the audio data.
   * @param notes The array of possible notes.
   * @param sampleRate The sample rate of the audio context.
   * @param volumeThreshold The threshold above which a frequency will be considered dominant.
   * @param callback A function to call with the closest note and deviation.
   */
  public static calculateFrequency(
    analyser: AnalyserNode,
    notes: INote[],
    sampleRate: number,
    volumeThreshold: number,
    callback: (note: INote, deviation: number) => void
  ): void {
    const bufferLength = analyser.fftSize;
    const dataArray = new Uint8Array(bufferLength);
    analyser.getByteFrequencyData(dataArray);

    let maxIndex = 0;
    let maxValue = 0;
    let totalVolume = 0;

    for (let i = 0; i < bufferLength; i++) {
      if (dataArray[i] > maxValue) {
        maxValue = dataArray[i];
        maxIndex = i;
      }
      totalVolume += dataArray[i];
    }

    const averageVolume = totalVolume / bufferLength;

    if (averageVolume > volumeThreshold) {
      const frequency = ((maxIndex * sampleRate) / bufferLength) * 2; // Adjust for Nyquist frequency
      const {
        note,
        frequency: noteFrequency,
        deviation: freqDeviation,
      } = this.findClosestNote(frequency, notes);
      callback(
        {
          note: note,
          frequency: noteFrequency,
          abcNote: "",
          difficulty: EDifficulty.easy,
        },
        freqDeviation
      );
    }

    requestAnimationFrame(() =>
      this.calculateFrequency(
        analyser,
        notes,
        sampleRate,
        volumeThreshold,
        callback
      )
    );
  }
}
