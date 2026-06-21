import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Edit3, Trash2, ExternalLink } from 'lucide-react'
import toast from 'react-hot-toast'
import { supabase } from '../../services/supabase'

export default function AdminAnnouncements() {
  const [announcements, setAnnouncements] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(null)

  useEffect(() => {
    load()
  }, [])

  async function load() {
    setLoading(true)
    const { data, error } = await supabase
      .from('announcements')
      .select('*')
      .order('posted_at', { ascending: false })
    if (!error) setAnnouncements(data ?? [])
    setLoading(false)
  }

  async function handleDelete(id) {
    if (!confirm('Delete this announcement?')) return
    setDeleting(id)
    const { error } = await supabase.from('announcements').delete().eq('id', id)
    if (error) {
      toast.error('Failed to delete')
    } else {
      toast.success('Announcement deleted')
      setAnnouncements((prev) => prev.filter((a) => a.id !== id))
    }
    setDeleting(null)
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-slate">
          {announcements.length} announcement{announcements.length !== 1 ? 's' : ''}
        </p>
        <Link
          to="/admin/announcements/new"
          className="inline-flex items-center gap-2 bg-accent px-4 py-2 text-sm font-medium text-white transition hover:bg-accent/90"
        >
          <Plus size={16} />
          New Announcement
        </Link>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 animate-pulse rounded-lg bg-divider" />
          ))}
        </div>
      ) : announcements.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-20 text-center">
          <div className="rounded-full bg-accent/5 p-4">
            <Plus size={32} className="text-accent/40" />
          </div>
          <p className="font-display text-xl font-bold text-charcoal">No announcements yet</p>
          <p className="max-w-sm text-sm text-slate">
            Create your first announcement to keep the church community informed.
          </p>
          <Link
            to="/admin/announcements/new"
            className="mt-2 inline-flex items-center gap-2 bg-accent px-6 py-2.5 text-sm font-medium text-white transition hover:bg-accent/90"
          >
            <Plus size={16} />
            Create Announcement
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-divider">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-divider bg-ivory">
              <tr>
                <th className="px-4 py-3 font-medium text-slate">Title</th>
                <th className="hidden px-4 py-3 font-medium text-slate md:table-cell">Date</th>
                <th className="hidden px-4 py-3 font-medium text-slate sm:table-cell">Status</th>
                <th className="px-4 py-3 text-right font-medium text-slate">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-divider">
              {announcements.map((a) => (
                <tr key={a.id} className="bg-white transition-colors hover:bg-ivory/50">
                  <td className="px-4 py-3 font-medium text-charcoal">{a.title}</td>
                  <td className="hidden px-4 py-3 text-slate md:table-cell">
                    {new Date(a.posted_at).toLocaleDateString()}
                  </td>
                  <td className="hidden px-4 py-3 sm:table-cell">
                    <span
                      className={`inline-block rounded-lg px-2 py-0.5 text-xs font-medium ${
                        a.is_published
                          ? 'bg-green-50 text-green-700'
                          : 'bg-divider text-slate'
                      }`}
                    >
                      {a.is_published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to={`/admin/announcements/${a.id}/edit`}
                        className="rounded-lg p-1.5 text-slate transition-colors hover:bg-accent/5 hover:text-accent"
                      >
                        <Edit3 size={15} />
                      </Link>
                      <button
                        onClick={() => handleDelete(a.id)}
                        disabled={deleting === a.id}
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
    </div>
  )
}
