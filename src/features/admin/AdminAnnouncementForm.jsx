import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import toast from 'react-hot-toast'
import Button from '../../components/ui/Button'
import ImageUpload from '../../components/ui/ImageUpload'
import { supabase } from '../../services/supabase'

export default function AdminAnnouncementForm() {
  const { id } = useParams()
  const isEdit = !!id
  const navigate = useNavigate()

  const [form, setForm] = useState({
    title: '',
    description: '',
    image_url: '',
    is_published: true,
  })
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(isEdit)

  useEffect(() => {
    if (!isEdit) return
    async function load() {
      const { data, error } = await supabase
        .from('announcements')
        .select('*')
        .eq('id', id)
        .single()
      if (error) {
        toast.error('Announcement not found')
        navigate('/admin/announcements')
        return
      }
      setForm({
        title: data.title,
        description: data.description,
        image_url: data.image_url ?? '',
        is_published: data.is_published,
      })
      setFetching(false)
    }
    load()
  }, [id])

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.title.trim()) {
      toast.error('Title is required')
      return
    }
    setLoading(true)

    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      image_url: form.image_url.trim() || null,
      is_published: form.is_published,
      posted_at: isEdit ? undefined : new Date().toISOString(),
    }

    if (isEdit) {
      const { error } = await supabase
        .from('announcements')
        .update(payload)
        .eq('id', id)
      if (error) {
        toast.error('Failed to update')
      } else {
        toast.success('Announcement updated')
        navigate('/admin/announcements')
      }
    } else {
      const { error } = await supabase.from('announcements').insert([payload])
      if (error) {
        toast.error('Failed to create')
      } else {
        toast.success('Announcement created')
        navigate('/admin/announcements')
      }
    }
    setLoading(false)
  }

  if (fetching) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
      </div>
    )
  }

  return (
    <div>
      <button
        onClick={() => navigate('/admin/announcements')}
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-slate transition-colors hover:text-charcoal"
      >
        <ArrowLeft size={16} />
        Back to Announcements
      </button>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
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
            rows={5}
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

        <div className="flex items-center gap-3">
          <Button type="submit" loading={loading}>
            {isEdit ? 'Update Announcement' : 'Create Announcement'}
          </Button>
          <button
            type="button"
            onClick={() => navigate('/admin/announcements')}
            className="px-6 py-2.5 text-sm font-medium text-slate transition hover:text-charcoal"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
