import { useState } from 'react'
import { X } from 'lucide-react'
import toast from 'react-hot-toast'
import useSongsStore from './songsStore'

const KEYS = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
const CATEGORIES = ['Praise', 'Worship', 'Hymn']
const LANGUAGES = ['English', 'Filipino', 'Both']

export default function AddSongModal({ onClose }) {
  const [title, setTitle] = useState('')
  const [artist, setArtist] = useState('')
  const [key, setKey] = useState('G')
  const [category, setCategory] = useState('Worship')
  const [language, setLanguage] = useState('English')
  const [lyrics, setLyrics] = useState('')
  const [saving, setSaving] = useState(false)

  const addSong = useSongsStore((s) => s.addSong)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim()) {
      toast.error('Song title is required')
      return
    }
    if (!lyrics.trim()) {
      toast.error('Lyrics are required')
      return
    }

    setSaving(true)
    try {
      await addSong({
        title: title.trim(),
        artist: artist.trim() || 'Unknown',
        key,
        category,
        language,
        lyrics_with_chords: lyrics.trim(),
      })
      toast.success('Song added!')
      onClose()
    } catch (err) {
      toast.error(err.message || 'Failed to add song')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-charcoal/30 p-4 pt-12">
      <div className="w-full max-w-2xl animate-fade-up rounded-sm border border-divider bg-ivory p-6">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-display text-xl font-bold text-charcoal">
            Add New Song
          </h2>
          <button
            onClick={onClose}
            className="text-slate transition-colors hover:text-charcoal"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title & Artist */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block font-mono text-xs text-slate">
                Title <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Amazing Grace"
                className="w-full rounded-sm border border-divider px-3 py-2.5 text-sm text-charcoal outline-none placeholder:text-slate/50 focus:border-accent focus:ring-1 focus:ring-accent/20"
              />
            </div>
            <div>
              <label className="mb-1 block font-mono text-xs text-slate">
                Artist
              </label>
              <input
                type="text"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                placeholder="e.g. John Newton"
                className="w-full rounded-sm border border-divider px-3 py-2.5 text-sm text-charcoal outline-none placeholder:text-slate/50 focus:border-accent focus:ring-1 focus:ring-accent/20"
              />
            </div>
          </div>

          {/* Key & Category & Language */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-1 block font-mono text-xs text-slate">
                Key
              </label>
              <select
                value={key}
                onChange={(e) => setKey(e.target.value)}
                className="w-full rounded-sm border border-divider px-3 py-2.5 text-sm text-charcoal outline-none focus:border-accent focus:ring-1 focus:ring-accent/20"
              >
                {KEYS.map((k) => (
                  <option key={k} value={k}>
                    {k}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block font-mono text-xs text-slate">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-sm border border-divider px-3 py-2.5 text-sm text-charcoal outline-none focus:border-accent focus:ring-1 focus:ring-accent/20"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block font-mono text-xs text-slate">
                Language
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full rounded-sm border border-divider px-3 py-2.5 text-sm text-charcoal outline-none focus:border-accent focus:ring-1 focus:ring-accent/20"
              >
                {LANGUAGES.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Lyrics */}
          <div>
            <label className="mb-1 block font-mono text-xs text-slate">
              Lyrics with Chords <span className="text-red-400">*</span>
            </label>
            <p className="mb-2 text-xs text-slate/60">
              Use{' '}
              <code className="rounded-sm bg-accent/5 px-1 font-mono text-accent">
                [G]
              </code>{' '}
              for chords. Separate verses with blank lines.
            </p>
            <textarea
              value={lyrics}
              onChange={(e) => setLyrics(e.target.value)}
              rows={14}
              placeholder={`[G]Amazing [C]grace how [G]sweet the [D]sound
[G]That saved a [C]wretch like [G]me

[G]I once was [C]lost but [G]now am [D]found
[G]Was blind but [C]now I [G]see`}
              className="w-full rounded-sm border border-divider px-3 py-2.5 font-mono text-sm leading-relaxed text-charcoal outline-none placeholder:text-slate/50 focus:border-accent focus:ring-1 focus:ring-accent/20"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 border-t border-divider pt-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-sm border border-divider px-4 py-2.5 text-sm text-slate transition-colors hover:border-accent/30 hover:text-charcoal"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded-sm bg-accent px-6 py-2.5 text-sm font-medium text-white transition hover:bg-accent/90 disabled:opacity-60"
            >
              {saving ? 'Saving...' : 'Add Song'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}