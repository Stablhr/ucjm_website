import { useEffect, useState, useRef } from 'react'
import { ArrowLeft, Trash2, Music, Calendar, User, X, Search, GripVertical, ChevronUp, ChevronDown } from 'lucide-react'
import toast from 'react-hot-toast'
import usePlaylistStore from './playlistStore'

export default function PlaylistDetail({ playlist, onBack }) {
  const [songs, setSongs] = useState([])
  const [loading, setLoading] = useState(true)
  const [removingId, setRemovingId] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [dragIndex, setDragIndex] = useState(null)
  const dragNode = useRef(null)

  const filteredSongs = searchQuery.trim()
    ? songs.filter((entry) => {
        const q = searchQuery.toLowerCase()
        const title = (entry.songs?.title || '').toLowerCase()
        const artist = (entry.songs?.artist || '').toLowerCase()
        return title.includes(q) || artist.includes(q)
      })
    : songs

  const getPlaylistSongs = usePlaylistStore((s) => s.getPlaylistSongs)
  const removeSongFromPlaylist = usePlaylistStore((s) => s.removeSongFromPlaylist)
  const reorderSongs = usePlaylistStore((s) => s.reorderSongs)

  useEffect(() => {
    loadSongs()
  }, [playlist.id])

  const loadSongs = async () => {
    setLoading(true)
    try {
      const data = await getPlaylistSongs(playlist.id)
      setSongs(data)
    } catch (err) {
      toast.error('Failed to load songs')
    } finally {
      setLoading(false)
    }
  }

  const handleRemove = async (songId) => {
    try {
      await removeSongFromPlaylist(playlist.id, songId)
      setSongs((prev) => prev.filter((s) => s.song_id !== songId))
      setRemovingId(null)
      toast.success('Song removed')
    } catch (err) {
      toast.error(err.message)
    }
  }

  const persistOrder = async (orderedSongs) => {
    try {
      const songIds = orderedSongs.map((s) => s.song_id)
      await reorderSongs(playlist.id, songIds)
    } catch {
      toast.error('Failed to save order')
    }
  }

  const moveSong = (fromIdx) => {
    if (fromIdx <= 0) return
    const updated = [...songs]
    const [moved] = updated.splice(fromIdx, 1)
    updated.splice(fromIdx - 1, 0, moved)
    setSongs(updated)
    persistOrder(updated)
  }

  const moveSongDown = (fromIdx) => {
    if (fromIdx >= songs.length - 1) return
    const updated = [...songs]
    const [moved] = updated.splice(fromIdx, 1)
    updated.splice(fromIdx + 1, 0, moved)
    setSongs(updated)
    persistOrder(updated)
  }

  const handleDragStart = (e, idx) => {
    setDragIndex(idx)
    dragNode.current = e.target
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', idx)
  }

  const handleDragOver = (e, idx) => {
    e.preventDefault()
    if (idx === dragIndex || searchQuery) return
    const updated = [...songs]
    const [moved] = updated.splice(dragIndex, 1)
    updated.splice(idx, 0, moved)
    setDragIndex(idx)
    setSongs(updated)
  }

  const handleDragEnd = () => {
    if (dragIndex !== null) {
      persistOrder(songs)
    }
    setDragIndex(null)
    dragNode.current = null
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={onBack}
          className="mb-4 inline-flex items-center gap-1.5 text-sm text-slate transition-colors hover:text-charcoal"
        >
          <ArrowLeft size={16} />
          All Playlists
        </button>

        <h1 className="font-display text-2xl font-bold text-charcoal">
          {playlist.title}
        </h1>

        <div className="mt-2 flex items-center gap-4 text-xs text-slate/60">
          {playlist.creator_name && (
            <span className="flex items-center gap-1">
              <User size={12} />
              {playlist.creator_name}
            </span>
          )}
          {playlist.service_date && (
            <span className="flex items-center gap-1">
              <Calendar size={12} />
              {playlist.service_date}
            </span>
          )}
          {playlist.notes && (
            <span className="italic">{playlist.notes}</span>
          )}
        </div>
      </div>

      {/* Search */}
      {songs.length > 0 && (
        <div className="group relative mb-4">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate/40 transition-colors group-focus-within:text-accent"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search songs in this playlist..."
            className="w-full rounded-lg border border-divider py-2.5 pl-9 pr-3 text-sm text-charcoal outline-none placeholder:text-slate/50 transition-colors focus:border-accent focus:ring-1 focus:ring-accent/20"
          />
        </div>
      )}

      {/* Songs */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-16 animate-pulse rounded-lg bg-slate/5"
            />
          ))}
        </div>
      ) : songs.length === 0 ? (
        <div className="flex flex-col items-center py-16 text-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-accent/5">
            <Music size={22} className="text-slate/40" />
          </div>
          <p className="text-sm text-slate">No songs in this playlist</p>
          <p className="mt-1 text-xs text-slate/60">
            Browse songs and add them from the song view
          </p>
        </div>
      ) : filteredSongs.length === 0 ? (
        <div className="flex flex-col items-center py-16 text-center">
          <Music size={22} className="mb-3 text-slate/30" />
          <p className="text-sm text-slate">No songs match your search</p>
          <p className="mt-1 text-xs text-slate/60">
            Try a different search term
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {filteredSongs.map((entry, idx) => {
            const origIdx = songs.indexOf(entry)
            return (
              <div
                key={entry.id}
                draggable={!searchQuery}
                onDragStart={(e) => handleDragStart(e, origIdx)}
                onDragOver={(e) => handleDragOver(e, origIdx)}
                onDragEnd={handleDragEnd}
                className={`flex items-center gap-3 rounded-lg border bg-white px-3 py-3 transition-all ${
                  dragIndex === origIdx
                    ? 'border-accent opacity-50 shadow-sm'
                    : 'border-divider hover:border-accent/20'
                }`}
              >
                {/* Drag handle + number */}
                <div className="flex shrink-0 items-center gap-1">
                  {!searchQuery && (
                    <GripVertical
                      size={14}
                      className="cursor-grab text-slate/20 transition-colors hover:text-slate/40 active:cursor-grabbing"
                    />
                  )}
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/10 font-mono text-xs font-bold text-accent">
                    {idx + 1}
                  </span>
                </div>

                {/* Move up/down */}
                <div className="flex shrink-0 flex-col gap-0.5">
                  <button
                    onClick={() => moveSong(origIdx)}
                    disabled={origIdx === 0 || searchQuery}
                    className="rounded p-0.5 text-slate/20 transition-colors hover:text-slate/50 disabled:opacity-0"
                  >
                    <ChevronUp size={12} />
                  </button>
                  <button
                    onClick={() => moveSongDown(origIdx)}
                    disabled={origIdx === songs.length - 1 || searchQuery}
                    className="rounded p-0.5 text-slate/20 transition-colors hover:text-slate/50 disabled:opacity-0"
                  >
                    <ChevronDown size={12} />
                  </button>
                </div>

                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-medium text-charcoal">
                    {entry.songs?.title || 'Unknown Song'}
                  </h4>
                  <p className="text-xs text-slate/60">
                    {entry.songs?.artist || ''}
                    {entry.key_override && (
                      <span className="ml-2 font-mono text-accent">
                        Key: {entry.key_override}
                      </span>
                    )}
                  </p>
                </div>

                <span className="rounded-lg bg-accent/10 px-2 py-0.5 font-mono text-xs text-accent">
                  {entry.songs?.key || '?'}
                </span>

                {removingId === entry.song_id ? (
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleRemove(entry.song_id)}
                      className="rounded-lg bg-red-500 px-2 py-1 text-xs font-medium text-white transition hover:bg-red-600"
                    >
                      Remove
                    </button>
                    <button
                      onClick={() => setRemovingId(null)}
                      className="rounded-lg p-1 text-slate/30 transition-colors hover:text-slate"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setRemovingId(entry.song_id)}
                    className="rounded-lg p-1.5 text-slate/30 transition-colors hover:bg-red-50 hover:text-red-500"
                    title="Remove from playlist"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
