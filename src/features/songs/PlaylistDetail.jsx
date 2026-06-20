import { useEffect, useState } from 'react'
import { ArrowLeft, Trash2, Music, Calendar, User } from 'lucide-react'
import toast from 'react-hot-toast'
import usePlaylistStore from './playlistStore'

export default function PlaylistDetail({ playlist, onBack }) {
  const [songs, setSongs] = useState([])
  const [loading, setLoading] = useState(true)

  const getPlaylistSongs = usePlaylistStore((s) => s.getPlaylistSongs)
  const removeSongFromPlaylist = usePlaylistStore((s) => s.removeSongFromPlaylist)

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
      toast.success('Song removed')
    } catch (err) {
      toast.error(err.message)
    }
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

      {/* Songs */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-16 animate-pulse rounded-sm bg-slate/5"
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
      ) : (
        <div className="space-y-2">
          {songs.map((entry, idx) => (
            <div
              key={entry.id}
              className="flex items-center gap-4 rounded-sm border border-divider bg-white px-4 py-3 transition-all hover:border-accent/20"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/10 font-mono text-xs font-bold text-accent">
                {idx + 1}
              </span>

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

              <span className="rounded-sm bg-accent/10 px-2 py-0.5 font-mono text-xs text-accent">
                {entry.songs?.key || '?'}
              </span>

              <button
                onClick={() => handleRemove(entry.song_id)}
                className="rounded-sm p-1.5 text-slate/30 transition-colors hover:bg-red-50 hover:text-red-500"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
