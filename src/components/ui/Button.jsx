import { Loader2 } from 'lucide-react'

export default function Button({
  children,
  variant = 'primary',
  loading = false,
  className = '',
  disabled,
  ...props
}) {
  const base = 'inline-flex items-center gap-2 px-8 py-3 text-sm font-medium transition-all duration-200 active:scale-[0.97]'
  const variants = {
    primary: 'bg-accent text-white hover:bg-accent/90 disabled:opacity-60',
    outline: 'border border-accent text-accent hover:bg-accent hover:text-white disabled:opacity-50',
  }

  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 size={16} className="animate-spin" />}
      {children}
    </button>
  )
}
