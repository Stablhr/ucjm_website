import { useState, useEffect, useCallback, useRef } from 'react'
import { BookOpen } from 'lucide-react'
import useGuideStore from './guideStore'

export default function GuideNotes({ planId, dayNumber }) {
  const updateNote = useGuideStore((s) => s.updateNote)
  const getNote = useGuideStore((s) => s.getNote)
  const [note, setNote] = useState('')
  const timerRef = useRef(null)

  useEffect(() => {
    setNote(getNote(planId, dayNumber))
  }, [planId, dayNumber, getNote])

  const debouncedSave = useCallback(
    (value) => {
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => {
        updateNote(planId, dayNumber, value)
      }, 600)
    },
    [planId, dayNumber, updateNote]
  )

  const handleChange = (e) => {
    const value = e.target.value
    setNote(value)
    debouncedSave(value)
  }

  return (
    <div className="mb-8 overflow-hidden rounded-lg border border-divider bg-surface">
      <div className="border-b border-divider bg-gradient-to-r from-accent/5 to-transparent px-6 py-3">
        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-accent">
          <BookOpen size={14} />
          My Notes
        </div>
      </div>
      <div className="px-6 py-5">
        <textarea
          value={note}
          onChange={handleChange}
          placeholder="Write your thoughts, reflections, or prayer requests..."
          rows={4}
          aria-label="Personal notes for this day"
          className="w-full resize-y rounded-md border border-divider bg-ivory p-3 text-sm leading-relaxed text-charcoal placeholder:text-slate/40 transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30"
        />
        <p className="mt-2 text-right font-mono text-[10px] text-slate/40">
          Auto-saved
        </p>
      </div>
    </div>
  )
}
