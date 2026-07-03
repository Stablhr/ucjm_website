import { useEffect, useState } from 'react'
import { Plus, Edit3, Trash2, GripVertical } from 'lucide-react'
import toast from 'react-hot-toast'
import { Skeleton } from '../../components/ui/Skeleton'
import ImageUpload from '../../components/ui/ImageUpload'
import { supabase } from '../../services/supabase'

export default function AdminPhotos() {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ image_url: '', alt_text: '' })
  const [saving, setSaving] = useState(false)

  useEffect(() => { load() }, [])

  async function load() {
    setLoading(true)
    const { data, error } = await supabase
      .from('photos')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false })
    if (!error) setPhotos(data ?? [])
    setLoading(false)
  }

  function resetForm() {
    setForm({ image_url: '', alt_text: '' })
    setEditing(null)
    setShowForm(false)
  }

  async function handleSave(e) {
    e.preventDefault()
    if (!form.image_url.trim()) {
      toast.error('Image URL is required')
      return
    }
    setSaving(true)

    if (editing) {
      const { error } = await supabase
        .from('photos')
        .update({ image_url: form.image_url.trim(), alt_text: form.alt_text.trim() })
        .eq('id', editing.id)
      if (error) {
        toast.error('Failed to update')
      } else {
        toast.success('Photo updated')
        load()
        resetForm()
      }
    } else {
      const { error } = await supabase
        .from('photos')
        .insert([{ image_url: form.image_url.trim(), alt_text: form.alt_text.trim(), sort_order: photos.length }])
      if (error) {
        toast.error('Failed to create')
      } else {
        toast.success('Photo added')
        load()
        resetForm()
      }
    }
    setSaving(false)
  }

  function handleEdit(photo) {
    setEditing(photo)
    setForm({ image_url: photo.image_url, alt_text: photo.alt_text || '' })
    setShowForm(true)
  }

  async function handleDelete(id) {
    if (!confirm('Delete this photo?')) return
    setDeleting(id)
    const { error } = await supabase.from('photos').delete().eq('id', id)
    if (error) {
      toast.error('Failed to delete')
    } else {
      toast.success('Photo deleted')
      setPhotos((prev) => prev.filter((p) => p.id !== id))
    }
    setDeleting(null)
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-slate">{photos.length} photo{photos.length !== 1 ? 's' : ''}</p>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 bg-accent px-4 py-2 text-sm font-medium text-white transition hover:bg-accent/90"
          >
            <Plus size={16} />
            Add Photo
          </button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleSave} className="mb-8 max-w-lg rounded-lg border border-divider bg-white p-4">
          <h3 className="mb-4 font-display text-lg font-bold text-charcoal">
            {editing ? 'Edit Photo' : 'Add Photo'}
          </h3>

          <div className="space-y-4">
            <ImageUpload
              value={form.image_url}
              onChange={(val) => setForm((p) => ({ ...p, image_url: val }))}
              label="Photo"
            />

            <div>
              <label className="mb-1.5 block text-sm font-medium text-charcoal">Alt Text</label>
              <input
                type="text"
                value={form.alt_text}
                onChange={(e) => setForm((p) => ({ ...p, alt_text: e.target.value }))}
                placeholder="Describe the image"
                className="w-full rounded-lg border border-divider px-4 py-2.5 text-sm text-charcoal outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent/20"
              />
            </div>
          </div>

          <div className="mt-5 flex items-center gap-3">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition hover:bg-accent/90 disabled:opacity-50"
            >
              {saving ? 'Saving...' : editing ? 'Update' : 'Add'}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 text-sm font-medium text-slate transition hover:text-charcoal"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="aspect-[4/3]" />
          ))}
        </div>
      ) : photos.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-20 text-center">
          <div className="rounded-full bg-accent/5 p-4">
            <Plus size={32} className="text-accent/40" />
          </div>
          <p className="font-display text-xl font-bold text-charcoal">No photos yet</p>
          <p className="max-w-sm text-sm text-slate">
            Add photos to display them in the homepage gallery.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {photos.map((photo) => (
            <div key={photo.id} className="group relative overflow-hidden rounded-lg border border-divider bg-white">
              <img
                src={photo.image_url}
                alt={photo.alt_text || ''}
                className="aspect-[4/3] w-full object-cover"
                onError={(e) => {
                  e.target.src = ''
                  e.target.className = 'aspect-[4/3] w-full bg-ivory flex items-center justify-center text-slate/30 text-xs'
                  e.target.alt = 'Failed to load'
                }}
              />
              <div className="absolute inset-0 flex items-end justify-end gap-1 bg-gradient-to-t from-black/50 to-transparent p-2 opacity-0 transition-opacity group-hover:opacity-100">
                <button
                  onClick={() => handleEdit(photo)}
                  className="rounded-lg bg-white/90 p-1.5 text-slate shadow-sm backdrop-blur-sm transition-colors hover:bg-white hover:text-accent"
                >
                  <Edit3 size={14} />
                </button>
                <button
                  onClick={() => handleDelete(photo.id)}
                  disabled={deleting === photo.id}
                  className="rounded-lg bg-white/90 p-1.5 text-slate shadow-sm backdrop-blur-sm transition-colors hover:bg-white hover:text-red-500 disabled:opacity-50"
                >
                  <Trash2 size={14} />
                </button>
              </div>
              {photo.alt_text && (
                <div className="border-t border-divider px-3 py-2">
                  <p className="truncate text-xs text-slate">{photo.alt_text}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
