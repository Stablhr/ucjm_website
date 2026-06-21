import { useState } from 'react'
import { BibleReader } from '@youversion/platform-react-ui'
import { BookOpen, Minus, Plus, Sun, Moon } from 'lucide-react'

const fontSizes = [
  { label: 'Small', value: 16 },
  { label: 'Normal', value: 20 },
  { label: 'Large', value: 26 },
]

export default function Bible() {
  const [fontSize, setFontSize] = useState(20)
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div className={`flex min-h-[calc(100vh-5rem)] flex-col ${darkMode ? 'bg-charcoal' : ''}`}>
      {/* Top bar */}
      <div className={`flex items-center justify-between border-b px-4 py-3 sm:px-6 lg:px-8 ${
        darkMode ? 'border-white/10 bg-charcoal' : 'border-divider bg-ivory'
      }`}>
        <div className="flex items-center gap-2 text-accent">
          <BookOpen size={20} />
          <h1 className={`font-display text-xl font-bold ${darkMode ? 'text-white' : 'text-charcoal'}`}>
            Bible
          </h1>
        </div>

        <div className="flex items-center gap-3">
          {/* Font size controls */}
          <div className={`flex items-center gap-1 rounded-lg border px-2 py-1 ${
            darkMode ? 'border-white/10' : 'border-divider'
          }`}>
            <button
              onClick={() => setFontSize((s) => Math.max(12, s - 2))}
              className="rounded-lg p-1 text-slate transition hover:bg-accent/10 hover:text-accent"
              aria-label="Decrease font size"
            >
              <Minus size={14} />
            </button>
            <span className={`min-w-[3ch] text-center font-mono text-xs ${darkMode ? 'text-white/60' : 'text-slate'}`}>
              {fontSize}
            </span>
            <button
              onClick={() => setFontSize((s) => Math.min(32, s + 2))}
              className="rounded-lg p-1 text-slate transition hover:bg-accent/10 hover:text-accent"
              aria-label="Increase font size"
            >
              <Plus size={14} />
            </button>
          </div>

          {/* Dark mode toggle */}
          <button
            onClick={() => setDarkMode((d) => !d)}
            className={`rounded-lg p-2 transition ${
              darkMode
                ? 'bg-accent text-white'
                : 'text-slate hover:bg-accent/10 hover:text-accent'
            }`}
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </div>

      {/* Bible Reader */}
      <div className={`flex-1 overflow-auto ${darkMode ? 'bg-charcoal' : ''}`}>
        <BibleReader.Root
          defaultBook="JHN"
          defaultChapter="1"
          defaultVersionId={3034}
          fontSize={fontSize}
          fontFamily="Playfair Display, serif"
          lineHeight={1.8}
          showVerseNumbers={true}
          background={darkMode ? 'dark' : 'light'}
        >
          <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
            <BibleReader.Toolbar border="bottom" />
            <div className="mt-6">
              <BibleReader.Content />
            </div>
          </div>
        </BibleReader.Root>
      </div>
    </div>
  )
}
