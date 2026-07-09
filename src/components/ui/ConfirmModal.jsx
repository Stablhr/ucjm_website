import { AlertTriangle } from 'lucide-react'

export default function ConfirmModal({ open, onClose, onConfirm, title, message, confirmLabel = 'Delete', loading = false, imageUrl }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-sm animate-fade-up rounded-xl border border-divider bg-surface p-6">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
            <AlertTriangle size={24} className="text-red-500" />
          </div>
          <h3 className="font-display text-lg font-bold text-charcoal">{title}</h3>
          <p className="text-sm text-slate">{message}</p>
          {imageUrl && (
            <img
              src={imageUrl}
              alt=""
              className="mt-1 max-h-32 w-full rounded-lg border border-divider object-cover"
            />
          )}
          <div className="mt-2 flex items-center gap-3">
            <button
              onClick={onClose}
              disabled={loading}
              className="rounded-lg border border-divider px-5 py-2 text-sm font-medium text-slate transition hover:bg-ivory disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-red-700 active:scale-[0.97] disabled:opacity-60"
            >
              {loading && <l-ring size="16" color="currentColor" stroke="3" speed="1.5"></l-ring>}
              {confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
