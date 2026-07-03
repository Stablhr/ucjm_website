export default function Card({ children, variant = 'interactive', className = '', ...props }) {
  const variants = {
    bordered: 'rounded-lg border border-divider p-6',
    elevated: 'rounded-lg border border-divider p-6 shadow-sm',
    interactive:
      'group rounded-lg border border-divider p-6 transition-all duration-200 hover:-translate-y-1 hover:border-accent/30 hover:shadow-sm',
  }

  return (
    <div className={`${variants[variant]} ${className}`} {...props}>
      {children}
    </div>
  )
}
