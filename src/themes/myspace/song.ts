/**
 * "Give My Regards to Broadway", George M. Cohan, 1904 (public domain), from
 * the musical play Little Johnny Jones. Melody and chords follow the John
 * Chambers ABC transcription (key of G, 2/4); this 8-bit arrangement (square
 * lead, triangle oom-pah bass) is original to this site.
 *
 * Synthesized live with Web Audio: no audio files, and nothing plays until
 * the visitor presses Play.
 */

type Note = [pitch: string | null, sixteenths: number]

// Melody in sixteenths. null is a rest. Bars are 8 sixteenths (2/4).
const verse: Note[] = [
  ['D4', 1], ['E4', 2], ['F#4', 1], ['G4', 2], ['A4', 2], // Give my regards to Broadway
  ['G4', 4], ['F#4', 3], ['D4', 1], //                       remember me
  ['E4', 1], ['E4', 1], ['E4', 1], ['E4', 1], ['F#4', 2], ['F#4', 2], // to Herald Square
  ['D4', 8],
]
const ending1: Note[] = [
  ['D4', 1], ['E4', 2], ['F#4', 1], ['G4', 2], ['E4', 2],
  ['F#4', 2], ['G4', 2], ['A4', 1], ['F#4', 1], ['E4', 1], ['D4', 1],
  ['G4', 2], ['E4', 2], ['F#4', 2], ['G4', 2],
  ['A4', 5], [null, 3],
]
const ending2: Note[] = [
  ['B4', 1], ['G#4', 2], ['E4', 1], ['C5', 2], ['B4', 2],
  ['A4', 2], ['G#4', 2], ['A4', 1], ['G4', 1], ['A4', 1], ['G4', 1],
  ['B4', 3], ['G4', 1], ['G4', 2], ['A4', 2],
  ['G4', 6], [null, 2],
]
const melody: Note[] = [...verse, ...ending1, ...verse, ...ending2]

// One chord root per half bar (a beat in 2/4), from the transcription's chord symbols.
const roots = [
  ...['G2', 'G2', 'A2', 'D2', 'C3', 'D2', 'G2', 'G2'], // verse
  ...['G2', 'G2', 'D2', 'D2', 'A2', 'A2', 'D2', 'D2'], // first ending
  ...['G2', 'G2', 'A2', 'D2', 'C3', 'D2', 'G2', 'G2'], // verse
  ...['E2', 'E2', 'A2', 'A2', 'G2', 'D2', 'G2', 'G2'], // second ending
]

const SIXTEENTH = 0.13 // seconds; a brisk march

const NOTE_INDEX: Record<string, number> = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 }

function freq(pitch: string): number {
  const m = /^([A-G])(#?)(\d)$/.exec(pitch)!
  const midi = 12 * (Number(m[3]) + 1) + NOTE_INDEX[m[1]] + (m[2] ? 1 : 0)
  return 440 * 2 ** ((midi - 69) / 12)
}

function blip(ctx: AudioContext, out: AudioNode, type: OscillatorType, hz: number, start: number, length: number, level: number) {
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = type
  osc.frequency.value = hz
  // A short attack and release so notes don't click
  gain.gain.setValueAtTime(0, start)
  gain.gain.linearRampToValueAtTime(level, start + 0.01)
  gain.gain.setValueAtTime(level, start + length * 0.8)
  gain.gain.linearRampToValueAtTime(0, start + length * 0.95)
  osc.connect(gain).connect(out)
  osc.start(start)
  osc.stop(start + length)
}

export const SONG_SECONDS = melody.reduce((t, [, n]) => t + n, 0) * SIXTEENTH

/** Plays the song once. Returns a stop function. */
export function playSong(onEnd: () => void): () => void {
  const AudioCtx = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
  const ctx = new AudioCtx()
  const master = ctx.createGain()
  master.gain.value = 0.5
  master.connect(ctx.destination)

  const t0 = ctx.currentTime + 0.05
  let t = t0
  for (const [pitch, n] of melody) {
    if (pitch) blip(ctx, master, 'square', freq(pitch), t, n * SIXTEENTH, 0.09)
    t += n * SIXTEENTH
  }
  // Oom-pah: root on the beat, an octave up on the off-beat
  roots.forEach((root, beat) => {
    const start = t0 + beat * 4 * SIXTEENTH
    blip(ctx, master, 'triangle', freq(root), start, 2 * SIXTEENTH, 0.22)
    blip(ctx, master, 'triangle', freq(root) * 2, start + 2 * SIXTEENTH, 2 * SIXTEENTH, 0.14)
  })

  const timer = window.setTimeout(() => {
    void ctx.close()
    onEnd()
  }, (t - t0 + 0.3) * 1000)

  return () => {
    window.clearTimeout(timer)
    void ctx.close()
  }
}
