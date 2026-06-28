import { useState, useRef } from 'react'
import { X, Upload } from 'lucide-react'
import toast from 'react-hot-toast'
import { supabase } from '../../services/supabase'
import useSongsStore from './songsStore'

const KEYS = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
const CATEGORIES = ['Praise', 'Worship', 'Hymn']
const LANGUAGES = ['English', 'Filipino', 'Both']

const GRADIENT_PRESETS = [
  { label: 'Emerald', value: 'from-emerald-500 to-teal-600' },
  { label: 'Sky', value: 'from-sky-500 to-indigo-600' },
  { label: 'Amber', value: 'from-amber-400 to-orange-500' },
  { label: 'Rose', value: 'from-rose-500 to-purple-600' },
  { label: 'Violet', value: 'from-violet-500 to-purple-700' },
  { label: 'Teal', value: 'from-teal-500 to-cyan-600' },
]

export default function EditSongModal({ song, onClose, onSaved }) {
  const [title, setTitle] = useState(song.title || '')
  const [artist, setArtist] = useState(song.artist || '')
  const [key, setKey] = useState(song.key || 'G')
  const [category, setCategory] = useState(song.category || 'Worship')
  const [language, setLanguage] = useState(song.language || 'English')
  const [album, setAlbum] = useState(song.album || '')
  const [albumYear, setAlbumYear] = useState(song.album_year ? String(song.album_year) : '')
  const [youtubeUrl, setYoutubeUrl] = useState(song.youtube_url || '')
  const [lyrics, setLyrics] = useState(song.lyrics_with_chords || '')
  const [imageUrl, setImageUrl] = useState(song.image_url || '')
  const [imageColor, setImageColor] = useState(song.image_color || 'from-emerald-500 to-teal-600')
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const fileInputRef = useRef(null)

  const updateSong = useSongsStore((s) => s.updateSong)

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be under 5MB')
      return
    }

    setUploading(true)
    try {
      const ext = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
      const filePath = `public/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('song-images')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('song-images')
        .getPublicUrl(filePath)

      setImageUrl(publicUrl)
      toast.success('Image uploaded')
    } catch (err) {
      toast.error(err.message || 'Failed to upload image')
    } finally {
      setUploading(false)
    }
  }

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
      await updateSong(song, {
        title: title.trim(),
        artist: artist.trim() || 'Unknown',
        key,
        category,
        language,
        youtube_url: youtubeUrl.trim() || '',
        album: album.trim() || '',
        album_year: albumYear ? parseInt(albumYear, 10) : null,
        image_url: imageUrl,
        image_color: imageUrl ? '' : imageColor,
        lyrics_with_chords: lyrics.trim(),
      })
      toast.success('Song updated!')
      onSaved?.()
      onClose()
    } catch (err) {
      toast.error(err.message || 'Failed to update song')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-charcoal/30 p-4 pt-8">
      <div className="w-full max-w-2xl animate-fade-up rounded-lg border border-divider bg-ivory p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-display text-xl font-bold text-charcoal">
            Edit Song
          </h2>
          <button
            onClick={onClose}
            className="text-slate transition-colors hover:text-charcoal"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-1 block font-mono text-xs text-slate">
              Song Image
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <div
              onClick={() => fileInputRef.current?.click()}
              className="group relative flex h-32 cursor-pointer items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-divider bg-ivory transition-colors hover:border-accent/30"
            >
              {uploading ? (
                <div className="flex flex-col items-center gap-2 text-sm text-slate">
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-accent border-t-transparent" />
                  Uploading...
                </div>
              ) : imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Song cover"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center gap-2 text-sm text-slate/60">
                  <Upload size={20} />
                  Click to upload cover image
                </div>
              )}
              {imageUrl && (
                <div className="absolute inset-0 flex items-center justify-center bg-charcoal/40 opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="rounded-lg bg-white px-3 py-1 text-xs font-medium text-charcoal shadow-sm">
                    Change Image
                  </span>
                </div>
              )}
            </div>
          </div>

          {!imageUrl && (
            <div>
              <label className="mb-1 block font-mono text-xs text-slate">
                Fallback Color
              </label>
              <div className="flex flex-wrap gap-2">
                {GRADIENT_PRESETS.map((g) => (
                  <button
                    key={g.value}
                    type="button"
                    onClick={() => setImageColor(g.value)}
                    className={`h-8 w-8 rounded-lg bg-gradient-to-br ${g.value} ${
                      imageColor === g.value
                        ? 'ring-2 ring-accent ring-offset-1'
                        : ''
                    }`}
                    title={g.label}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block font-mono text-xs text-slate">
                Title <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-lg border border-divider px-3 py-2.5 text-sm text-charcoal outline-none placeholder:text-slate/50 focus:border-accent focus:ring-1 focus:ring-accent/20"
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
                className="w-full rounded-lg border border-divider px-3 py-2.5 text-sm text-charcoal outline-none placeholder:text-slate/50 focus:border-accent focus:ring-1 focus:ring-accent/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block font-mono text-xs text-slate">
                Album
              </label>
              <input
                type="text"
                value={album}
                onChange={(e) => setAlbum(e.target.value)}
                className="w-full rounded-lg border border-divider px-3 py-2.5 text-sm text-charcoal outline-none placeholder:text-slate/50 focus:border-accent focus:ring-1 focus:ring-accent/20"
              />
            </div>
            <div>
              <label className="mb-1 block font-mono text-xs text-slate">
                Year
              </label>
              <input
                type="number"
                value={albumYear}
                onChange={(e) => setAlbumYear(e.target.value)}
                min={1000}
                max={2100}
                className="w-full rounded-lg border border-divider px-3 py-2.5 text-sm text-charcoal outline-none placeholder:text-slate/50 focus:border-accent focus:ring-1 focus:ring-accent/20"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block font-mono text-xs text-slate">
              YouTube URL <span className="text-slate/40">(optional)</span>
            </label>
            <input
              type="url"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              className="w-full rounded-lg border border-divider px-3 py-2.5 text-sm text-charcoal outline-none placeholder:text-slate/50 focus:border-accent focus:ring-1 focus:ring-accent/20"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-1 block font-mono text-xs text-slate">
                Key
              </label>
              <select
                value={key}
                onChange={(e) => setKey(e.target.value)}
                className="w-full rounded-lg border border-divider px-3 py-2.5 text-sm text-charcoal outline-none focus:border-accent focus:ring-1 focus:ring-accent/20"
              >
                {KEYS.map((k) => (
                  <option key={k} value={k}>{k}</option>
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
                className="w-full rounded-lg border border-divider px-3 py-2.5 text-sm text-charcoal outline-none focus:border-accent focus:ring-1 focus:ring-accent/20"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
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
                className="w-full rounded-lg border border-divider px-3 py-2.5 text-sm text-charcoal outline-none focus:border-accent focus:ring-1 focus:ring-accent/20"
              >
                {LANGUAGES.map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1 block font-mono text-xs text-slate">
              Lyrics with Chords <span className="text-red-400">*</span>
            </label>
            <p className="mb-2 text-xs text-slate/60">
              Use{' '}
              <code className="rounded-lg bg-accent/5 px-1 font-mono text-accent">
                [G]
              </code>{' '}
              for chords. Use{' '}
              <code className="rounded-lg bg-accent/5 px-1 font-mono text-accent">
                [VERSE]
              </code>
              ,{' '}
              <code className="rounded-lg bg-accent/5 px-1 font-mono text-accent">
                [CHORUS]
              </code>
              ,{' '}
              <code className="rounded-lg bg-accent/5 px-1 font-mono text-accent">
                [BRIDGE]
              </code>{' '}
              etc. to label sections.
            </p>
            <textarea
              value={lyrics}
              onChange={(e) => setLyrics(e.target.value)}
              rows={14}
              className="w-full rounded-lg border border-divider px-3 py-2.5 font-mono text-sm leading-relaxed text-charcoal outline-none placeholder:text-slate/50 focus:border-accent focus:ring-1 focus:ring-accent/20"
            />
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-divider pt-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-divider px-4 py-2.5 text-sm text-slate transition-colors hover:border-accent/30 hover:text-charcoal"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-accent px-6 py-2.5 text-sm font-medium text-white transition hover:bg-accent/90 disabled:opacity-60"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}