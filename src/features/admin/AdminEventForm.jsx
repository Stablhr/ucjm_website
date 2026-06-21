import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import toast from 'react-hot-toast'
import { supabase } from '../../services/supabase'

export default function AdminEventForm() {
  const { id } = useParams()
  const isEdit = !!id
  const navigate = useNavigate()

  const [form, setForm] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    image_url: '',
    is_published: true,
  })
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(isEdit)

  useEffect(() => {
    if (!isEdit) return
    async function load() {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', id)
        .single()
      if (error) {
        toast.error('Event not found')
        navigate('/admin/events')
        return
      }
      setForm({
        title: data.title,
        description: data.description ?? '',
        date: data.date,
        time: data.time ?? '',
        location: data.location ?? '',
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
    if (!form.date) {
      toast.error('Date is required')
      return
    }
    setLoading(true)

    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      date: form.date,
      time: form.time.trim() || null,
      location: form.location.trim() || null,
      image_url: form.image_url.trim() || null,
      is_published: form.is_published,
    }

    if (isEdit) {
      const { error } = await supabase
        .from('events')
        .update(payload)
        .eq('id', id)
      if (error) {
        toast.error('Failed to update')
      } else {
        toast.success('Event updated')
        navigate('/admin/events')
      }
    } else {
      const { error } = await supabase.from('events').insert([payload])
      if (error) {
        toast.error('Failed to create')
      } else {
        toast.success('Event created')
        navigate('/admin/events')
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
        onClick={() => navigate('/admin/events')}
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-slate transition-colors hover:text-charcoal"
      >
        <ArrowLeft size={16} />
        Back to Events
      </button>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-charcoal">Title *</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="Youth Fellowship Night"
            required
            className="w-full rounded-lg border border-divider px-4 py-2.5 text-sm text-charcoal outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent/20"
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-charcoal">Date *</label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => handleChange('date', e.target.value)}
              required
              className="w-full rounded-lg border border-divider px-4 py-2.5 text-sm text-charcoal outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent/20"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-charcoal">Time</label>
            <input
              type="text"
              value={form.time}
              onChange={(e) => handleChange('time', e.target.value)}
              placeholder="9:00 AM"
              className="w-full rounded-lg border border-divider px-4 py-2.5 text-sm text-charcoal outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent/20"
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-charcoal">Location</label>
          <input
            type="text"
            value={form.location}
            onChange={(e) => handleChange('location', e.target.value)}
            placeholder="Church Main Hall"
            className="w-full rounded-lg border border-divider px-4 py-2.5 text-sm text-charcoal outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent/20"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-charcoal">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Event details..."
            rows={4}
            className="w-full resize-y rounded-lg border border-divider px-4 py-2.5 text-sm text-charcoal outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent/20"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-charcoal">Image URL</label>
          <input
            type="url"
            value={form.image_url}
            onChange={(e) => handleChange('image_url', e.target.value)}
            placeholder="https://example.com/event-photo.jpg"
            className="w-full rounded-lg border border-divider px-4 py-2.5 text-sm text-charcoal outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent/20"
          />
        </div>

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
          <button
            type="submit"
            disabled={loading}
            className="bg-accent px-6 py-2.5 text-sm font-medium text-white transition hover:bg-accent/90 disabled:opacity-60"
          >
            {loading ? 'Saving...' : isEdit ? 'Update Event' : 'Create Event'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/events')}
            className="px-6 py-2.5 text-sm font-medium text-slate transition hover:text-charcoal"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
