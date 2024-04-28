
# Music Theory TypeScript Library

This TypeScript library is designed for developers building applications that integrate music theory elements. It offers a robust set of tools for creating, analyzing, and manipulating musical intervals, notes, scales, and tonalities.
 
## Underconstruction
* missing tests
* playground before moving here: https://tinyurl.com/pn-musicology

## Features

- **Intervals**: Enumerate musical intervals with properties like semitone count and frequency multiplier calculation.
- **Notes**: Manage musical notes including their creation from frequencies, and properties such as note name, frequency, octave, and accidentals.
- **Scales**: Generate musical scales from specified tonalities.
- **Tonality**: Define and manage musical tonalities with full support for major and minor types.
- **Utilities**: Random element selection from arrays, aiding in generating random musical data for testing or creative purposes. 

## Examples

### Creating a Note from a Frequency

The `fromFrequency` method allows for the creation of a note based on a specified frequency and tonality. This is particularly useful when dealing with audio processing where the frequency of a sound is known and you wish to identify the closest musical note.

```typescript
import { Note, Tonality, TonalityType } from './Note';

// Define a tonality, for example, A Major
const aMajor = new Tonality('A', [], 440, 4, TonalityType.Major);

// Assume a frequency of 466.16 Hz, which is close to A#4/Bb4 in the 12-tone equal temperament
const frequency = 466.16;

// Create a note from this frequency within the context of A Major tonality
const noteFromFrequency = Note.fromFrequency(frequency, aMajor);

// Output the details of the generated note
console.log(`Generated Note: ${noteFromFrequency.name}${noteFromFrequency.accidentals.join('')}`);
console.log(`Frequency: ${noteFromFrequency.frequency} Hz`);
console.log(`Octave: ${noteFromFrequency.octave}`);
```

### Generating a Scale from a Tonality
This example shows how to create a musical scale based on a given tonality. It will generate the notes in the scale and print their properties, such as name, frequency, and octave.

```typescript
import { Scale, Tonality, TonalityType } from './Scale';

// Define a tonality, for example, G Major
const gMajor = new Tonality('G', [], 392, 4, TonalityType.Major);

// Generate a scale from the defined tonality
const gMajorScale = Scale.fromTonality(gMajor);

// Output the details of the scale
console.log(`Scale generated from G Major tonality:`);
gMajorScale.notes.forEach(note => {
    console.log(`${note.name}${note.accidentals.join('')} - Frequency: ${note.frequency} Hz, Octave: ${note.octave}`);
});
```
 
### Creating and Analyzing Notes

```typescript
import { Note, Tonality, TonalityType } from './Note';

// Define a C Major tonality
const cMajor = new Tonality('C', [], 261.63, 4, TonalityType.Major);

// Create a note 'C' in the context of C Major tonality
const noteC = new Note('C', [], 261.63, 4, 0, cMajor);

// Print the properties of the note
console.log(`Note: ${noteC.name}, Frequency: ${noteC.frequency}Hz, Octave: ${noteC.octave}`);
```

### Generating a Random Note from a Random Scale
This example demonstrates how to use the library to generate a random note from a random scale, which can be useful for music education tools, composition experiments, or simply as a fun utility.
```typescript
import { Note } from './Note';

// Generate a random note from a random scale
const randomNote = Note.randomNoteFromRandomScale();

// Output the properties of the random note
console.log(`Random Note: ${randomNote.name}${randomNote.accidentals.join('')}`);
console.log(`Frequency: ${randomNote.frequency} Hz`);
console.log(`Octave: ${randomNote.octave}`);
```

### Generating a Random Tonality
To further explore musical diversity, you can generate random tonalities, each with their own unique characteristics.
```typescript
import { Tonality } from './Tonality';

// Generate a random tonality
const randomTonality = Tonality.getRandom();

// Output the details of the random tonality
console.log(`Random Tonality: ${randomTonality.tonalCenter}${randomTonality.accidentals.join('')} ${randomTonality.type}`);
console.log(`Frequency: ${randomTonality.frequency} Hz`);
console.log(`Octave: ${randomTonality.octave}`);
```

## License 

MIT License

Copyright (c) [year] [full name]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.