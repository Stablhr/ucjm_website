import { useState, useEffect, useRef, useCallback } from 'react'
import { BibleReader, BibleTextView } from '@youversion/platform-react-ui'
import { BookOpen, Minus, Plus, Sun, Moon, Compass, Trash2, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import SEO from '../components/ui/SEO'
import useBibleStore from '../store/bibleStore'

const HIGHLIGHT_COLORS = [
  { name: 'yellow', label: 'Yellow', bg: 'rgba(250,204,21,0.35)' },
  { name: 'green', label: 'Green', bg: 'rgba(74,222,128,0.35)' },
  { name: 'blue', label: 'Blue', bg: 'rgba(96,165,250,0.35)' },
  { name: 'pink', label: 'Pink', bg: 'rgba(244,114,182,0.35)' },
  { name: 'orange', label: 'Orange', bg: 'rgba(251,146,60,0.35)' },
]

const STORAGE_KEY = 'bible-highlights'

function loadHighlights() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
  } catch {
    return {}
  }
}

function saveHighlights(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

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
  const [book, setBook] = useState('JHN')
  const [chapter, setChapter] = useState('1')
  const versionId = useBibleStore((s) => s.bibleVersionId)
  const setVersionId = useBibleStore((s) => s.setBibleVersion)
  const [selectedVerses, setSelectedVerses] = useState([])
  const [highlights, setHighlights] = useState(loadHighlights)
  const [popupPos, setPopupPos] = useState({ x: 0, y: 0 })
  const contentRef = useRef(null)
  const popupRef = useRef(null)

  useEffect(() => {
    localStorage.setItem('bible-dark-mode', darkMode)
  }, [darkMode])

  const applyHighlights = useCallback(() => {
    const key = `${book}.${chapter}`
    const chapterHL = highlights[key] || {}
    const container = contentRef.current
    if (!container) return

    container.querySelectorAll('.yv-v[v]').forEach((el) => {
      const v = el.getAttribute('v')
      const colorIdx = chapterHL[v]
      if (colorIdx !== undefined) {
        el.style.backgroundColor = HIGHLIGHT_COLORS[colorIdx].bg
        el.setAttribute('data-highlight', colorIdx)
      } else {
        el.style.backgroundColor = ''
        el.removeAttribute('data-highlight')
      }
    })
  }, [book, chapter, highlights])

  // Apply highlights after SDK renders/re-renders
  useEffect(() => {
    const timer = setTimeout(applyHighlights, 0)

    const observer = new MutationObserver(() => {
      applyHighlights()
    })

    const node = contentRef.current
    if (node) {
      observer.observe(node, { childList: true, subtree: true })
    }

    return () => {
      clearTimeout(timer)
      observer.disconnect()
    }
  }, [applyHighlights])

  const handleVerseSelect = (verses) => {
    setSelectedVerses(verses)
    if (verses.length > 0) {
      const container = contentRef.current
      if (container) {
        const lastV = verses[verses.length - 1]
        const el = container.querySelector(`[v="${lastV}"]`)
        if (el) {
          const rect = el.getBoundingClientRect()
          setPopupPos({
            x: rect.left + rect.width / 2,
            y: Math.min(rect.bottom + 4, window.innerHeight - 80),
          })
          return
        }
      }
      const sel = window.getSelection()
      if (sel && sel.rangeCount > 0) {
        const rect = sel.getRangeAt(0).getBoundingClientRect()
        setPopupPos({
          x: rect.left + rect.width / 2,
          y: Math.min(rect.bottom + 4, window.innerHeight - 80),
        })
      }
    }
  }

  // Dismiss popup on click outside or Escape
  useEffect(() => {
    if (selectedVerses.length === 0) return
    const handleClick = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        if (e.target.closest('[v]')) return
        setSelectedVerses([])
      }
    }
    const handleKey = (e) => {
      if (e.key === 'Escape') setSelectedVerses([])
    }
    document.addEventListener('mousedown', handleClick)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('keydown', handleKey)
    }
  }, [selectedVerses])

  const handleHighlight = (colorIdx) => {
    if (selectedVerses.length === 0) return
    const key = `${book}.${chapter}`
    const updated = { ...highlights }
    if (!updated[key]) updated[key] = {}

    selectedVerses.forEach((v) => {
      updated[key][String(v)] = colorIdx
    })

    setHighlights(updated)
    saveHighlights(updated)
    setSelectedVerses([])
  }

  const handleRemoveHighlight = () => {
    if (selectedVerses.length === 0) return
    const key = `${book}.${chapter}`
    const updated = { ...highlights }
    if (!updated[key]) return

    selectedVerses.forEach((v) => {
      delete updated[key][String(v)]
    })

    if (Object.keys(updated[key]).length === 0) delete updated[key]

    setHighlights(updated)
    saveHighlights(updated)
    setSelectedVerses([])
  }

  const handleClearSelection = () => {
    setSelectedVerses([])
  }

  const highlightKey = `${book}.${chapter}`
  const chapterHighlights = highlights[highlightKey] || {}
  const highlightedVerses = Object.keys(chapterHighlights).reduce(
    (acc, v) => ({ ...acc, [v]: true }),
    {}
  )

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
            <h1 className={`font-display text-xl font-semibold transition-colors duration-300 ${darkMode ? 'text-white' : 'text-charcoal'}`}>
              Bible
            </h1>
          </div>

          <div className="flex items-center gap-3">
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

            <div className={`flex items-center gap-0.5 rounded-lg border p-0.5 transition-colors duration-300 ${
              darkMode ? 'border-white/10' : 'border-divider'
            }`}>
              {fontSizes.map((preset) => (
                <button
                  key={preset.value}
                  onClick={() => setFontSize(preset.value)}
                  className={`rounded-md px-2 py-1 text-xs font-medium transition ${
                    fontSize === preset.value
                      ? 'bg-accent text-white'
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
            book={book}
            onBookChange={setBook}
            chapter={chapter}
            onChapterChange={setChapter}
            versionId={versionId}
            onVersionChange={setVersionId}
            fontSize={fontSize}
            fontFamily="Playfair Display, serif"
            lineHeight={1.8}
            showVerseNumbers={true}
            background={darkMode ? 'dark' : 'light'}
          >
            <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
              <BibleReader.Toolbar border="bottom" />
              <div className="mt-6" ref={contentRef}>
                <BibleTextView
                  reference={`${book}.${chapter}`}
                  versionId={versionId}
                  fontSize={fontSize}
                  fontFamily="Playfair Display, serif"
                  lineHeight={1.8}
                  showVerseNumbers={true}
                  theme={darkMode ? 'dark' : 'light'}
                  selectedVerses={selectedVerses}
                  onVerseSelect={handleVerseSelect}
                  highlightedVerses={highlightedVerses}
                />
              </div>
            </div>
          </BibleReader.Root>
        </div>

        {/* Floating highlight popup */}
        {selectedVerses.length > 0 && (
          <div
            ref={popupRef}
            className={`fixed z-50 flex items-center gap-1 rounded-lg border px-2 py-1.5 shadow-lg backdrop-blur-md transition-colors ${
              darkMode
                ? 'border-white/10 bg-charcoal/95'
                : 'border-divider bg-ivory/95'
            }`}
            style={{
              left: popupPos.x,
              top: popupPos.y,
              transform: 'translateX(-50%)',
            }}
          >
            <span className={`mr-1 text-[11px] font-medium leading-none ${darkMode ? 'text-white/40' : 'text-slate/50'}`}>
              {selectedVerses.length}
            </span>
            {HIGHLIGHT_COLORS.map((color, idx) => (
              <button
                key={color.name}
                onClick={() => handleHighlight(idx)}
                className="h-6 w-6 rounded-md border border-white/20 transition hover:scale-110"
                style={{ backgroundColor: color.bg }}
                aria-label={`Highlight ${color.label}`}
                title={color.label}
              />
            ))}
            <span className={`mx-0.5 h-5 w-px ${darkMode ? 'bg-white/10' : 'bg-divider'}`} />
            <button
              onClick={handleRemoveHighlight}
              className="flex items-center justify-center rounded-md p-1 text-red-500 transition hover:bg-red-500/10"
              aria-label="Remove highlight"
              title="Remove highlight"
            >
              <Trash2 size={13} />
            </button>
            <button
              onClick={handleClearSelection}
              className={`flex items-center justify-center rounded-md p-1 transition ${
                darkMode ? 'text-white/40 hover:text-white' : 'text-slate/50 hover:text-charcoal'
              }`}
              aria-label="Clear selection"
            >
              <X size={13} />
            </button>
          </div>
        )}
      </div>
    </>
  )
}
