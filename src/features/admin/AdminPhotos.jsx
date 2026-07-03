import { useEffect, useRef, useState } from 'react'
import { Plus, Edit3, Trash2, Upload } from 'lucide-react'
import toast from 'react-hot-toast'
import { Skeleton } from '../../components/ui/Skeleton'
import Modal from '../../components/ui/Modal'
import ImageUpload from '../../components/ui/ImageUpload'
import { supabase } from '../../services/supabase'

export default function AdminPhotos() {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(null)

  const [addOpen, setAddOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [editForm, setEditForm] = useState({ image_url: '', alt_text: '' })

  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState('')
  const fileInputRef = useRef(null)

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

  async function handleUploadFiles(e) {
    const files = Array.from(e.target.files || [])
    if (!files.length) return

    const valid = files.filter((f) => f.type.startsWith('image/'))
    if (valid.length !== files.length) {
      toast.error('Some files were skipped (images only)')
    }
    if (!valid.length) return

    setUploading(true)
    setUploadProgress(`Uploading 0 / ${valid.length}...`)
    let uploaded = 0

    for (const file of valid) {
      try {
        const ext = file.name.split('.').pop()
        const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
        const { error: uploadError } = await supabase.storage
          .from('admin-images')
          .upload(fileName, file)
        if (uploadError) throw uploadError

        const { data: { publicUrl } } = supabase.storage
          .from('admin-images')
          .getPublicUrl(fileName)

        const { error: insertError } = await supabase
          .from('photos')
          .insert([{ image_url: publicUrl, alt_text: '', sort_order: photos.length + uploaded }])
        if (insertError) throw insertError

        uploaded++
        setUploadProgress(`Uploading ${uploaded} / ${valid.length}...`)
      } catch (err) {
        toast.error(`Failed: ${file.name} — ${err.message}`)
      }
    }

    setUploading(false)
    setUploadProgress('')
    if (uploaded > 0) {
      toast.success(`${uploaded} photo${uploaded !== 1 ? 's' : ''} added`)
      load()
      setAddOpen(false)
    }
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  function openEdit(photo) {
    setEditing(photo)
    setEditForm({ image_url: photo.image_url, alt_text: photo.alt_text || '' })
    setEditOpen(true)
  }

  async function handleEditSave(e) {
    e.preventDefault()
    if (!editForm.image_url.trim()) { toast.error('Image URL is required'); return }
    const { error } = await supabase
      .from('photos')
      .update({ image_url: editForm.image_url.trim(), alt_text: editForm.alt_text.trim() })
      .eq('id', editing.id)
    if (error) { toast.error('Failed to update') }
    else { toast.success('Photo updated'); load(); setEditOpen(false) }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this photo?')) return
    setDeleting(id)
    const { error } = await supabase.from('photos').delete().eq('id', id)
    if (error) { toast.error('Failed to delete') }
    else { toast.success('Photo deleted'); setPhotos((prev) => prev.filter((p) => p.id !== id)) }
    setDeleting(null)
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-slate">{photos.length} photo{photos.length !== 1 ? 's' : ''}</p>
        <button
          onClick={() => setAddOpen(true)}
          className="inline-flex items-center gap-2 bg-accent px-4 py-2 text-sm font-medium text-white transition hover:bg-accent/90"
        >
          <Plus size={16} />
          Add Photos
        </button>
      </div>

      {/* Add photos modal */}
      <Modal open={addOpen} onClose={() => { if (!uploading) setAddOpen(false) }} title="Add Photos">
        <div className="space-y-4">
          <div
            onClick={() => !uploading && fileInputRef.current?.click()}
            className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-divider bg-ivory/50 py-12 transition-colors hover:border-accent/30 hover:bg-accent/5"
          >
            {uploading ? (
              <div className="flex flex-col items-center gap-2 text-sm text-slate">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-accent border-t-transparent" />
                {uploadProgress}
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 text-sm text-slate">
                <Upload size={28} className="text-slate/40" />
                <span className="font-medium text-charcoal">Click to select photos</span>
                <span className="text-xs text-slate/60">Supports multiple files (PNG, JPEG, WebP)</span>
              </div>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleUploadFiles}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => setAddOpen(false)}
            disabled={uploading}
            className="w-full rounded-lg px-4 py-2.5 text-sm font-medium text-slate transition hover:text-charcoal disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </Modal>

      {/* Edit photo modal */}
      <Modal open={editOpen} onClose={() => setEditOpen(false)} title="Edit Photo">
        <form onSubmit={handleEditSave} className="space-y-4">
          <ImageUpload
            value={editForm.image_url}
            onChange={(val) => setEditForm((p) => ({ ...p, image_url: val }))}
            label="Photo"
          />
          <div>
            <label className="mb-1.5 block text-sm font-medium text-charcoal">Alt Text</label>
            <input
              type="text"
              value={editForm.alt_text}
              onChange={(e) => setEditForm((p) => ({ ...p, alt_text: e.target.value }))}
              placeholder="Describe the image"
              className="w-full rounded-lg border border-divider px-4 py-2.5 text-sm text-charcoal outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent/20"
            />
          </div>
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition hover:bg-accent/90"
            >
              Update
            </button>
            <button
              type="button"
              onClick={() => setEditOpen(false)}
              className="px-4 py-2 text-sm font-medium text-slate transition hover:text-charcoal"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>

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
          <button
            onClick={() => setAddOpen(true)}
            className="mt-2 inline-flex items-center gap-2 bg-accent px-6 py-2.5 text-sm font-medium text-white transition hover:bg-accent/90"
          >
            <Plus size={16} />
            Add Photos
          </button>
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
                  e.target.style.display = 'none'
                }}
              />
              <div className="absolute inset-0 flex items-end justify-end gap-1 bg-gradient-to-t from-black/50 to-transparent p-2 opacity-0 transition-opacity group-hover:opacity-100">
                <button
                  onClick={() => openEdit(photo)}
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
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
