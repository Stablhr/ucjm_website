import { useEffect, useState } from 'react'
import { Plus, Edit3, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { Skeleton } from '../../components/ui/Skeleton'
import Modal from '../../components/ui/Modal'
import Button from '../../components/ui/Button'
import ImageUpload from '../../components/ui/ImageUpload'
import { supabase } from '../../services/supabase'

export default function AdminAnnouncements() {
  const [announcements, setAnnouncements] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(null)

  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ title: '', description: '', image_url: '', is_published: true })
  const [saving, setSaving] = useState(false)

  useEffect(() => { load() }, [])

  async function load() {
    setLoading(true)
    const { data, error } = await supabase
      .from('announcements')
      .select('*')
      .order('posted_at', { ascending: false })
    if (!error) setAnnouncements(data ?? [])
    setLoading(false)
  }

  function openNew() {
    setEditing(null)
    setForm({ title: '', description: '', image_url: '', is_published: true })
    setModalOpen(true)
  }

  async function openEdit(announcement) {
    setEditing(announcement)
    setForm({
      title: announcement.title,
      description: announcement.description || '',
      image_url: announcement.image_url || '',
      is_published: announcement.is_published,
    })
    setModalOpen(true)
  }

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.title.trim()) { toast.error('Title is required'); return }
    setSaving(true)

    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      image_url: form.image_url.trim() || null,
      is_published: form.is_published,
    }

    if (editing) {
      const { error } = await supabase.from('announcements').update(payload).eq('id', editing.id)
      if (error) { toast.error('Failed to update') }
      else { toast.success('Announcement updated'); load(); setModalOpen(false) }
    } else {
      const { error } = await supabase.from('announcements').insert([{ ...payload, posted_at: new Date().toISOString() }])
      if (error) { toast.error('Failed to create') }
      else { toast.success('Announcement created'); load(); setModalOpen(false) }
    }
    setSaving(false)
  }

  async function handleDelete(id) {
    if (!confirm('Delete this announcement?')) return
    setDeleting(id)
    const { error } = await supabase.from('announcements').delete().eq('id', id)
    if (error) { toast.error('Failed to delete') }
    else { toast.success('Announcement deleted'); setAnnouncements((prev) => prev.filter((a) => a.id !== id)) }
    setDeleting(null)
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-slate">
          {announcements.length} announcement{announcements.length !== 1 ? 's' : ''}
        </p>
        <button
          onClick={openNew}
          className="inline-flex items-center gap-2 bg-accent px-4 py-2 text-sm font-medium text-white transition hover:bg-accent/90"
        >
          <Plus size={16} />
          New Announcement
        </button>
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Announcement' : 'New Announcement'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-charcoal">Title *</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="Sunday Service — June 22"
              required
              className="w-full rounded-lg border border-divider px-4 py-2.5 text-sm text-charcoal outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent/20"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-charcoal">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Join us this Sunday at 9AM for worship..."
              rows={4}
              className="w-full resize-y rounded-lg border border-divider px-4 py-2.5 text-sm text-charcoal outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent/20"
            />
          </div>

          <ImageUpload
            value={form.image_url}
            onChange={(val) => handleChange('image_url', val)}
          />

          <div className="flex items-center gap-3">
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                checked={form.is_published}
                onChange={(e) => handleChange('is_published', e.target.checked)}
                className="peer sr-only"
              />
              <div className="h-5 w-9 rounded-full bg-divider after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:bg-white after:shadow-sm after:transition-all peer-checked:bg-accent peer-checked:after:translate-x-full" />
            </label>
            <span className="text-sm text-slate">Published</span>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <Button type="submit" loading={saving}>
              {editing ? 'Update' : 'Create'}
            </Button>
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="px-6 py-2.5 text-sm font-medium text-slate transition hover:text-charcoal"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-16" />
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
          <button
            onClick={openNew}
            className="mt-2 inline-flex items-center gap-2 bg-accent px-6 py-2.5 text-sm font-medium text-white transition hover:bg-accent/90"
          >
            <Plus size={16} />
            Create Announcement
          </button>
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
                    <span className={`inline-block rounded-lg px-2 py-0.5 text-xs font-medium ${a.is_published ? 'bg-green-50 text-green-700' : 'bg-divider text-slate'}`}>
                      {a.is_published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEdit(a)}
                        className="rounded-lg p-1.5 text-slate transition-colors hover:bg-accent/5 hover:text-accent"
                      >
                        <Edit3 size={15} />
                      </button>
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
