import { useEffect, useState } from 'react'
import { Plus, Edit3, Trash2, Search, Music, Heart } from 'lucide-react'
import toast from 'react-hot-toast'
import { Skeleton } from '../../components/ui/Skeleton'
import ConfirmModal from '../../components/ui/ConfirmModal'
import AddSongModal from '../songs/AddSongModal'
import EditSongModal from '../songs/EditSongModal'
import useSongsStore from '../songs/songsStore'
import { supabase } from '../../services/supabase'

const CATEGORY_COLORS = {
  Praise: 'bg-amber-400',
  Worship: 'bg-emerald-500',
  Hymn: 'bg-violet-500',
}

export default function AdminSongs() {
  const [searchQuery, setSearchQuery] = useState('')
  const [editing, setEditing] = useState(null)
  const [showAdd, setShowAdd] = useState(false)

  const [confirmOpen, setConfirmOpen] = useState(false)
  const [confirmSong, setConfirmSong] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const [favCounts, setFavCounts] = useState({})

  const songs = useSongsStore((s) => s.songs)
  const loading = useSongsStore((s) => s.loading)
  const fetchSongs = useSongsStore((s) => s.fetchSongs)
  const deleteSong = useSongsStore((s) => s.deleteSong)

  useEffect(() => {
    fetchSongs(true)
  }, [fetchSongs])

  useEffect(() => {
    async function loadFavCounts() {
      if (songs.length === 0) return
      const { data, error } = await supabase
        .from('song_favorites')
        .select('song_id')
        .in('song_id', songs.map((s) => s.id))
      if (error) return
      const counts = {}
      for (const f of data || []) {
        counts[f.song_id] = (counts[f.song_id] || 0) + 1
      }
      setFavCounts(counts)
    }
    loadFavCounts()
  }, [songs])

  const filtered = songs.filter((s) => {
    if (!searchQuery.trim()) return true
    const q = searchQuery.toLowerCase()
    return (
      s.title.toLowerCase().includes(q) ||
      s.artist.toLowerCase().includes(q) ||
      (s.album || '').toLowerCase().includes(q)
    )
  })

  async function handleConfirmDelete() {
    setDeleting(true)
    try {
      await deleteSong(confirmSong)
      toast.success('Song deleted')
      setConfirmOpen(false)
      setConfirmSong(null)
    } catch (err) {
      toast.error(err.message || 'Failed to delete song')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate">
          {filtered.length} song{filtered.length !== 1 ? 's' : ''}
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search songs..."
              className="w-full rounded-lg border border-divider py-2 pl-9 pr-3 text-sm text-charcoal outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 sm:w-56"
            />
          </div>
          <button
            onClick={() => setShowAdd(true)}
            className="inline-flex items-center justify-center gap-2 bg-accent px-4 py-2 text-sm font-medium text-white transition hover:bg-accent/90"
          >
            <Plus size={16} />
            New Song
          </button>
        </div>
      </div>

      {loading && songs.length === 0 ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-16" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-20 text-center">
          <div className="rounded-full bg-accent/5 p-4">
            <Music size={32} className="text-accent/40" />
          </div>
          <p className="font-display text-xl font-bold text-charcoal">
            {searchQuery ? 'No songs found' : 'No songs yet'}
          </p>
          <p className="max-w-sm text-sm text-slate">
            {searchQuery
              ? `No results for "${searchQuery}".`
              : 'Add worship songs so the community can sing along.'}
          </p>
          {!searchQuery && (
            <button
              onClick={() => setShowAdd(true)}
              className="mt-2 inline-flex items-center gap-2 bg-accent px-6 py-2.5 text-sm font-medium text-white transition hover:bg-accent/90"
            >
              <Plus size={16} />
              Add Song
            </button>
          )}
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-divider">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-divider bg-ivory">
              <tr>
                <th className="px-4 py-3 font-medium text-slate">Song</th>
                <th className="hidden px-4 py-3 font-medium text-slate md:table-cell">Category</th>
                <th className="hidden px-4 py-3 font-medium text-slate sm:table-cell">Key</th>
                <th className="px-4 py-3 font-medium text-slate">
                  <span className="inline-flex items-center gap-1">
                    <Heart size={12} fill="currentColor" /> Favorites
                  </span>
                </th>
                <th className="px-4 py-3 text-right font-medium text-slate">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-divider">
              {filtered.map((s) => (
                <tr key={s.id} className="bg-surface transition-colors hover:bg-ivory/50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span
                        className={`h-2.5 w-2.5 shrink-0 rounded-full ${
                          CATEGORY_COLORS[s.category] || 'bg-accent'
                        }`}
                      />
                      <div className="min-w-0">
                        <p className="truncate font-medium text-charcoal">{s.title}</p>
                        <p className="truncate text-xs text-slate">{s.artist}</p>
                      </div>
                    </div>
                  </td>
                  <td className="hidden px-4 py-3 text-slate md:table-cell">{s.category}</td>
                  <td className="hidden px-4 py-3 sm:table-cell">
                    <span className="rounded-lg bg-accent/10 px-2 py-0.5 font-mono text-xs text-accent">
                      {s.key}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-mono text-sm text-charcoal">
                      {favCounts[s.id] || 0}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setEditing(s)}
                        className="rounded-lg p-1.5 text-slate transition-colors hover:bg-accent/5 hover:text-accent"
                      >
                        <Edit3 size={15} />
                      </button>
                      <button
                        onClick={() => { setConfirmSong(s); setConfirmOpen(true) }}
                        disabled={deleting}
                        className="rounded-lg p-1.5 text-slate transition-colors hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showAdd && <AddSongModal onClose={() => setShowAdd(false)} />}

      {editing && (
        <EditSongModal
          song={editing}
          onClose={() => setEditing(null)}
          onSaved={() => fetchSongs(true)}
        />
      )}

      <ConfirmModal
        open={confirmOpen}
        onClose={() => { setConfirmOpen(false); setConfirmSong(null) }}
        onConfirm={handleConfirmDelete}
        title="Delete Song"
        message={`Are you sure you want to delete "${confirmSong?.title}"? This action cannot be undone.`}
        loading={deleting}
      />
    </div>
  )
}
