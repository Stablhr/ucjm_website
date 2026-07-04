import { useEffect, useState } from 'react'
import {
  ListMusic,
  Plus,
  Trash2,
  Calendar,
  User,
  ChevronRight,
} from 'lucide-react'
import toast from 'react-hot-toast'
import { Skeleton } from '../../components/ui/Skeleton'
import ConfirmModal from '../../components/ui/ConfirmModal'
import usePlaylistStore from './playlistStore'

export default function PlaylistManager({ onSelectPlaylist }) {
  const [showCreate, setShowCreate] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newDate, setNewDate] = useState('')
  const [newCreator, setNewCreator] = useState('')
  const [creating, setCreating] = useState(false)

  const [confirmOpen, setConfirmOpen] = useState(false)
  const [confirmId, setConfirmId] = useState(null)
  const [confirmTitle, setConfirmTitle] = useState('')

  const playlists = usePlaylistStore((s) => s.playlists)
  const loading = usePlaylistStore((s) => s.loading)
  const fetchPlaylists = usePlaylistStore((s) => s.fetchPlaylists)
  const createPlaylist = usePlaylistStore((s) => s.createPlaylist)
  const deletePlaylist = usePlaylistStore((s) => s.deletePlaylist)

  useEffect(() => {
    fetchPlaylists()
  }, [fetchPlaylists])

  const handleCreate = async (e) => {
    e.preventDefault()
    if (!newTitle.trim()) return
    setCreating(true)
    try {
      await createPlaylist({
        title: newTitle.trim(),
        serviceDate: newDate || null,
        creatorName: newCreator.trim() || 'Anonymous',
      })
      setShowCreate(false)
      setNewTitle('')
      setNewDate('')
      setNewCreator('')
      toast.success('Playlist created!')
    } catch (err) {
      toast.error(err.message)
    } finally {
      setCreating(false)
    }
  }

  const handleDelete = (id, title) => {
    setConfirmId(id)
    setConfirmTitle(title)
    setConfirmOpen(true)
  }

  const handleConfirmDelete = async () => {
    try {
      await deletePlaylist(confirmId)
      toast.success('Playlist deleted')
    } catch (err) {
      toast.error(err.message)
    }
    setConfirmOpen(false)
    setConfirmId(null)
    setConfirmTitle('')
  }

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-20" />
        ))}
      </div>
    )
  }

  return (
    <div>
      {!showCreate ? (
        <button
          onClick={() => setShowCreate(true)}
          className="mb-5 flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-divider py-3 text-sm text-slate transition-colors hover:border-accent/30 hover:text-accent"
        >
          <Plus size={16} />
          New Playlist
        </button>
      ) : (
        <form
          onSubmit={handleCreate}
          className="mb-5 rounded-lg border border-divider bg-surface p-4"
        >
          <h4 className="mb-3 font-display text-sm font-bold text-charcoal">
            New Playlist
          </h4>
          <div className="space-y-3">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Title (e.g. Sunday June 28)"
              required
              className="w-full rounded-lg border border-divider px-3 py-2 text-sm text-charcoal outline-none placeholder:text-slate/50 focus:border-accent focus:ring-1 focus:ring-accent/20"
            />
            <input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="w-full rounded-lg border border-divider px-3 py-2 text-sm text-charcoal outline-none focus:border-accent focus:ring-1 focus:ring-accent/20"
            />
            <input
              type="text"
              value={newCreator}
              onChange={(e) => setNewCreator(e.target.value)}
              placeholder="Your name (optional)"
              className="w-full rounded-lg border border-divider px-3 py-2 text-sm text-charcoal outline-none placeholder:text-slate/50 focus:border-accent focus:ring-1 focus:ring-accent/20"
            />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowCreate(false)}
                className="flex-1 rounded-lg border border-divider py-2 text-sm text-slate transition-colors hover:border-accent/30"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={creating}
                className="flex-1 rounded-lg bg-accent py-2 text-sm font-medium text-white transition hover:bg-accent/90 disabled:opacity-60"
              >
                {creating ? 'Creating...' : 'Create'}
              </button>
            </div>
          </div>
        </form>
      )}

      {playlists.length === 0 ? (
        <div className="flex flex-col items-center py-16 text-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-accent/5">
            <ListMusic size={22} className="text-slate/40" />
          </div>
          <p className="text-sm text-slate">No playlists yet</p>
          <p className="mt-1 text-xs text-slate/60">
            Create a playlist for Sunday service
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {playlists.map((p) => (
            <div
              key={p.id}
              className="group flex items-center gap-4 rounded-lg border border-divider bg-surface p-4 transition-all hover:border-accent/30"
            >
              <button
                onClick={() => onSelectPlaylist(p)}
                className="flex min-w-0 flex-1 items-center gap-4 text-left"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/10">
                  <ListMusic size={16} className="text-accent" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-medium text-charcoal">
                    {p.title}
                  </h4>
                  <div className="mt-0.5 flex items-center gap-3 text-xs text-slate/60">
                    {p.creator_name && (
                      <span className="flex items-center gap-1">
                        <User size={11} />
                        {p.creator_name}
                      </span>
                    )}
                    {p.service_date && (
                      <span className="flex items-center gap-1">
                        <Calendar size={11} />
                        {p.service_date}
                      </span>
                    )}
                  </div>
                </div>
                <ChevronRight
                  size={16}
                  className="shrink-0 text-slate/20 transition-colors group-hover:text-accent/50"
                />
              </button>

              <button
                onClick={() => handleDelete(p.id, p.title)}
                className="shrink-0 rounded-lg p-1.5 text-slate/30 transition-colors hover:bg-red-50 hover:text-red-500"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      <ConfirmModal
        open={confirmOpen}
        onClose={() => { setConfirmOpen(false); setConfirmId(null); setConfirmTitle('') }}
        onConfirm={handleConfirmDelete}
        title="Delete Playlist"
        message={`Are you sure you want to delete "${confirmTitle}"? This action cannot be undone.`}
      />
    </div>
  )
}
