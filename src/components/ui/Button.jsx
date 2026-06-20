export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const base = 'inline-flex items-center gap-2 px-8 py-3 text-sm font-medium transition-all duration-200 active:scale-[0.97]'
  const variants = {
    primary: 'bg-accent text-white hover:bg-accent/90',
    outline: 'border border-accent text-accent hover:bg-accent hover:text-white',
  }

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}
