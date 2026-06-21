import { useState, useEffect } from 'react'
import { X, Plus, Check } from 'lucide-react'
import toast from 'react-hot-toast'
import { supabase } from '../../services/supabase'
import usePlaylistStore from './playlistStore'

export default function AddToPlaylistModal({ song, onClose }) {
  const [view, setView] = useState('select')
  const [newTitle, setNewTitle] = useState('')
  const [newDate, setNewDate] = useState('')
  const [newCreator, setNewCreator] = useState('')
  const [loading, setLoading] = useState(false)
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null)

  const playlists = usePlaylistStore((s) => s.playlists)
  const fetchPlaylists = usePlaylistStore((s) => s.fetchPlaylists)
  const createPlaylist = usePlaylistStore((s) => s.createPlaylist)
  const addSongToPlaylist = usePlaylistStore((s) => s.addSongToPlaylist)
  const getPlaylistSongs = usePlaylistStore((s) => s.getPlaylistSongs)
  const removeSongFromPlaylist = usePlaylistStore((s) => s.removeSongFromPlaylist)

  useEffect(() => {
    fetchPlaylists()
  }, [fetchPlaylists])

  const resolveSongId = async () => {
    if (song._source !== 'builtin') return song.id

    const { data: existing } = await supabase
      .from('songs')
      .select('id')
      .eq('title', song.title)
      .eq('artist', song.artist)
      .maybeSingle()

    if (existing) return existing.id

    const { data: inserted, error } = await supabase
      .from('songs')
      .insert({
        title: song.title,
        artist: song.artist || '',
        key: song.key || 'G',
        category: song.category || 'Worship',
        language: song.language || 'English',
        lyrics_with_chords: song.lyrics_with_chords || '',
      })
      .select('id')
      .single()

    if (error) throw error
    return inserted.id
  }

  const handleAdd = async (playlistId) => {
    setLoading(true)
    try {
      const songId = await resolveSongId()
      const existingSongs = await getPlaylistSongs(playlistId)
      const nextPos = existingSongs.length
      await addSongToPlaylist(playlistId, songId, nextPos, '')
      toast.success(`Added to playlist`)
      setSelectedPlaylistId(playlistId)
    } catch (err) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateAndAdd = async () => {
    if (!newTitle.trim()) {
      toast.error('Please enter a playlist title')
      return
    }
    setLoading(true)
    try {
      const playlist = await createPlaylist({
        title: newTitle.trim(),
        serviceDate: newDate || null,
        creatorName: newCreator.trim() || 'Anonymous',
      })
      await handleAdd(playlist.id)
      setView('select')
      toast.success('Playlist created and song added')
    } catch (err) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/30 p-4">
      <div className="w-full max-w-md animate-fade-up rounded-lg border border-divider bg-ivory p-6">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-lg font-bold text-charcoal">
            {view === 'select' ? 'Add to Playlist' : 'New Playlist'}
          </h3>
          <button
            onClick={onClose}
            className="text-slate transition-colors hover:text-charcoal"
          >
            <X size={18} />
          </button>
        </div>

        <p className="mb-4 text-sm text-slate">
          Adding: <span className="font-medium text-charcoal">{song.title}</span>
        </p>

        {view === 'select' ? (
          <>
            <div className="max-h-60 space-y-1 overflow-y-auto">
              {playlists.length === 0 ? (
                <p className="py-4 text-center text-sm text-slate/60">
                  No playlists yet. Create one!
                </p>
              ) : (
                playlists.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handleAdd(p.id)}
                    disabled={loading}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors hover:bg-accent/5 disabled:opacity-60"
                  >
                    <div>
                      <span className="text-charcoal">{p.title}</span>
                      {p.service_date && (
                        <span className="ml-2 font-mono text-xs text-slate/50">
                          {p.service_date}
                        </span>
                      )}
                    </div>
                    {selectedPlaylistId === p.id ? (
                      <Check size={16} className="text-accent" />
                    ) : (
                      <Plus size={16} className="text-slate/30" />
                    )}
                  </button>
                ))
              )}
            </div>

            <button
              onClick={() => setView('create')}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-divider py-2.5 text-sm text-slate transition-colors hover:border-accent/30 hover:text-accent"
            >
              <Plus size={16} />
              New Playlist
            </button>
          </>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="mb-1 block font-mono text-xs text-slate">
                Title
              </label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Sunday June 28"
                className="w-full rounded-lg border border-divider px-3 py-2.5 text-sm text-charcoal outline-none placeholder:text-slate/50 focus:border-accent focus:ring-1 focus:ring-accent/20"
              />
            </div>
            <div>
              <label className="mb-1 block font-mono text-xs text-slate">
                Service Date (optional)
              </label>
              <input
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="w-full rounded-lg border border-divider px-3 py-2.5 text-sm text-charcoal outline-none focus:border-accent focus:ring-1 focus:ring-accent/20"
              />
            </div>
            <div>
              <label className="mb-1 block font-mono text-xs text-slate">
                Your Name (optional)
              </label>
              <input
                type="text"
                value={newCreator}
                onChange={(e) => setNewCreator(e.target.value)}
                placeholder="Anonymous"
                className="w-full rounded-lg border border-divider px-3 py-2.5 text-sm text-charcoal outline-none placeholder:text-slate/50 focus:border-accent focus:ring-1 focus:ring-accent/20"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setView('select')}
                className="flex-1 rounded-lg border border-divider py-2.5 text-sm text-slate transition-colors hover:border-accent/30 hover:text-charcoal"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateAndAdd}
                disabled={loading}
                className="flex-1 rounded-lg bg-accent py-2.5 text-sm font-medium text-white transition hover:bg-accent/90 disabled:opacity-60"
              >
                {loading ? 'Creating...' : 'Create & Add'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
