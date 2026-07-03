import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Edit3, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { Skeleton } from '../../components/ui/Skeleton'
import { supabase } from '../../services/supabase'

export default function AdminEvents() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(null)

  useEffect(() => {
    load()
  }, [])

  async function load() {
    setLoading(true)
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: true })
    if (!error) setEvents(data ?? [])
    setLoading(false)
  }

  async function handleDelete(id) {
    if (!confirm('Delete this event?')) return
    setDeleting(id)
    const { error } = await supabase.from('events').delete().eq('id', id)
    if (error) {
      toast.error('Failed to delete')
    } else {
      toast.success('Event deleted')
      setEvents((prev) => prev.filter((e) => e.id !== id))
    }
    setDeleting(null)
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-slate">
          {events.length} event{events.length !== 1 ? 's' : ''}
        </p>
        <Link
          to="/admin/events/new"
          className="inline-flex items-center gap-2 bg-accent px-4 py-2 text-sm font-medium text-white transition hover:bg-accent/90"
        >
          <Plus size={16} />
          New Event
        </Link>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-16" />
          ))}
        </div>
      ) : events.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-20 text-center">
          <div className="rounded-full bg-accent/5 p-4">
            <Plus size={32} className="text-accent/40" />
          </div>
          <p className="font-display text-xl font-bold text-charcoal">No events yet</p>
          <p className="max-w-sm text-sm text-slate">
            Add upcoming church events so the community stays informed.
          </p>
          <Link
            to="/admin/events/new"
            className="mt-2 inline-flex items-center gap-2 bg-accent px-6 py-2.5 text-sm font-medium text-white transition hover:bg-accent/90"
          >
            <Plus size={16} />
            Create Event
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
              {events.map((e) => (
                <tr key={e.id} className="bg-white transition-colors hover:bg-ivory/50">
                  <td className="px-4 py-3 font-medium text-charcoal">{e.title}</td>
                  <td className="hidden px-4 py-3 text-slate md:table-cell">
                    {new Date(e.date).toLocaleDateString()}
                  </td>
                  <td className="hidden px-4 py-3 sm:table-cell">
                    <span
                      className={`inline-block rounded-lg px-2 py-0.5 text-xs font-medium ${
                        e.is_published
                          ? 'bg-green-50 text-green-700'
                          : 'bg-divider text-slate'
                      }`}
                    >
                      {e.is_published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to={`/admin/events/${e.id}/edit`}
                        className="rounded-lg p-1.5 text-slate transition-colors hover:bg-accent/5 hover:text-accent"
                      >
                        <Edit3 size={15} />
                      </Link>
                      <button
                        onClick={() => handleDelete(e.id)}
                        disabled={deleting === e.id}
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
