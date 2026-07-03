import { useRef, useState } from 'react'
import { Upload, X, Image as ImageIcon } from 'lucide-react'
import toast from 'react-hot-toast'
import { supabase } from '../../services/supabase'

export default function ImageUpload({ value, onChange, bucket = 'admin-images', label = 'Image' }) {
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef(null)

  async function handleFile(e) {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be under 5MB')
      return
    }

    setUploading(true)
    try {
      const ext = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(fileName, file)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(fileName)

      onChange(publicUrl)
    } catch (err) {
      toast.error(err.message || 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  function handleRemove() {
    onChange('')
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-charcoal">{label}</label>

      {value ? (
        <div className="relative mb-2 overflow-hidden rounded-lg border border-divider">
          <img
            src={value}
            alt="Preview"
            className="h-40 w-full object-cover"
            onError={(e) => { e.target.style.display = 'none' }}
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white/80 text-slate shadow-sm backdrop-blur-sm transition-colors hover:bg-white hover:text-red-500"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <div className="mb-2">
          <div
            onClick={() => fileInputRef.current?.click()}
            className="flex h-32 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-divider bg-ivory/50 transition-colors hover:border-accent/30 hover:bg-accent/5"
          >
            {uploading ? (
              <div className="flex items-center gap-2 text-sm text-slate">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-accent border-t-transparent" />
                Uploading...
              </div>
            ) : (
              <div className="flex flex-col items-center gap-1.5 text-sm text-slate">
                <Upload size={20} className="text-slate/50" />
                <span>Click to upload</span>
              </div>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="hidden"
          />
        </div>
      )}

      <div className="relative">
        <ImageIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate" />
        <input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://example.com/image.jpg"
          className="w-full rounded-lg border border-divider px-4 py-2 pl-8 text-sm text-charcoal outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent/20"
        />
      </div>
    </div>
  )
}
