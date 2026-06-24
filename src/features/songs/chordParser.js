const CHORD_REGEX = /\[([A-G][#b]?(?:m|dim|aug|sus[24]|add[0-9]|[0-9])?(?:\/[A-G][#b]?)?)\]/g

const CHROMATIC = [
  'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B',
]

const FLAT_MAP = {
  Db: 'C#', Eb: 'D#', Gb: 'F#', Ab: 'G#', Bb: 'A#',
}

export function parseChords(text) {
  const chords = []
  const lines = text.split('\n')

  lines.forEach((line) => {
    const matches = [...line.matchAll(CHORD_REGEX)]
    if (matches.length > 0) {
      chords.push({
        lineIndex: lines.indexOf(line),
        matches: matches.map((m) => ({
          chord: m[1],
          index: m.index,
        })),
      })
    }
  })

  return chords
}

export function transposeChord(chord, semitones) {
  let normalized = chord.replace(/^([A-G][#b]?)(.*)/, (_, root, rest) => {
    const normalizedRoot = FLAT_MAP[root] || root
    return normalizedRoot + rest
  })

  const rootMatch = normalized.match(/^([A-G][#b]?)(.*)/)
  if (!rootMatch) return chord

  const root = rootMatch[1]
  const suffix = rootMatch[2]

  const idx = CHROMATIC.indexOf(root)
  if (idx === -1) return chord

  const newIdx = (idx + semitones + 12) % 12
  return CHROMATIC[newIdx] + suffix
}

export function transposeLyrics(text, semitones) {
  return text.replace(CHORD_REGEX, (match, chord) => {
    return `[${transposeChord(chord, semitones)}]`
  })
}

export function stripChords(text) {
  return text.replace(CHORD_REGEX, '').trim()
}

export function renderChordLine(line, chords) {
  const parts = []
  let lastIndex = 0

  chords.forEach(({ chord, index }) => {
    if (index > lastIndex) {
      parts.push(line.slice(lastIndex, index))
    }
    parts.push({ chord, index })
    lastIndex = index + chord.length + 2
  })

  if (lastIndex < line.length) {
    parts.push(line.slice(lastIndex))
  }

  return parts
}
