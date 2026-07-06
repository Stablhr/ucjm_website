import { useState, useEffect } from 'react'
import { BibleReader } from '@youversion/platform-react-ui'
import { BookOpen, Minus, Plus, Sun, Moon, Compass } from 'lucide-react'
import { Link } from 'react-router-dom'
import SEO from '../components/ui/SEO'

const fontSizes = [
  { label: 'Small', value: 16 },
  { label: 'Normal', value: 20 },
  { label: 'Large', value: 26 },
]

export default function Bible() {
  const [fontSize, setFontSize] = useState(20)
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('bible-dark-mode') === 'true'
    }
    return false
  })

  useEffect(() => {
    localStorage.setItem('bible-dark-mode', darkMode)
  }, [darkMode])

  return (
    <>
      <SEO title="Bible" />
      <div className={`flex min-h-[calc(100vh-5rem)] flex-col transition-colors duration-300 ${darkMode ? 'bg-charcoal' : 'bg-ivory'}`}>
        {/* Sticky glass header */}
        <div className={`sticky top-0 z-30 flex flex-wrap items-center justify-between gap-y-2 border-b px-4 py-3 backdrop-blur-md transition-colors duration-300 sm:px-6 lg:px-8 ${
          darkMode ? 'border-white/10 bg-charcoal/90' : 'border-divider bg-ivory/90'
        }`}>
          <div className="flex items-center gap-2 text-accent">
            <BookOpen size={20} />
            <h1 className={`font-display text-xl font-bold transition-colors duration-300 ${darkMode ? 'text-white' : 'text-charcoal'}`}>
              Bible
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {/* Today's Reading */}
            <Link
              to="/guide"
              className={`hidden items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition sm:inline-flex ${
                darkMode
                  ? 'text-accent-warm hover:bg-accent-warm/10'
                  : 'text-accent-warm hover:bg-accent-warm/10'
              }`}
            >
              <Compass size={14} />
              Today's Reading
            </Link>

            {/* Font size presets */}
            <div className={`flex items-center gap-0.5 rounded-lg border p-0.5 transition-colors duration-300 ${
              darkMode ? 'border-white/10' : 'border-divider'
            }`}>
              {fontSizes.map((preset) => (
                <button
                  key={preset.value}
                  onClick={() => setFontSize(preset.value)}
                  className={`rounded-md px-2 py-1 text-xs font-medium transition ${
                    fontSize === preset.value
                      ? darkMode
                        ? 'bg-accent text-white'
                        : 'bg-accent text-white'
                      : darkMode
                        ? 'text-white/50 hover:text-white'
                        : 'text-slate hover:text-charcoal'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
              <span className="mx-1 h-4 w-px bg-divider" />
              <button
                onClick={() => setFontSize((s) => Math.max(12, s - 2))}
                className={`rounded-md p-1 transition ${
                  darkMode ? 'text-white/50 hover:text-white' : 'text-slate hover:text-charcoal'
                }`}
                aria-label="Decrease font size"
              >
                <Minus size={13} />
              </button>
              <span className={`min-w-[2.5ch] text-center font-mono text-xs transition-colors duration-300 ${darkMode ? 'text-white/60' : 'text-slate'}`}>
                {fontSize}
              </span>
              <button
                onClick={() => setFontSize((s) => Math.min(32, s + 2))}
                className={`rounded-md p-1 transition ${
                  darkMode ? 'text-white/50 hover:text-white' : 'text-slate hover:text-charcoal'
                }`}
                aria-label="Increase font size"
              >
                <Plus size={13} />
              </button>
            </div>

            {/* Dark mode toggle */}
            <button
              onClick={() => setDarkMode((d) => !d)}
              className={`rounded-lg p-2 transition-colors duration-200 ${
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
        <div className={`flex-1 overflow-auto transition-colors duration-300 ${darkMode ? 'bg-charcoal' : ''}`}>
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
            <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
              <BibleReader.Toolbar border="bottom" />
              <div className="mt-6">
                <BibleReader.Content />
              </div>
            </div>
          </BibleReader.Root>
        </div>

        {/* Mobile Today's Reading bar */}
        <div className={`sticky bottom-0 border-t px-4 py-3 sm:hidden transition-colors duration-300 ${
          darkMode ? 'border-white/10 bg-charcoal/95' : 'border-divider bg-ivory/95 backdrop-blur-md'
        }`}>
          <Link
            to="/guide"
            className={`flex items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium transition ${
              darkMode
                ? 'bg-accent-warm/20 text-accent-warm'
                : 'bg-accent-warm/10 text-accent-warm'
            }`}
          >
            <Compass size={16} />
            Today's Reading
          </Link>
        </div>
      </div>
    </>
  )
}
