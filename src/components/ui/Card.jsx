export default function Card({ children, className = '', ...props }) {
  return (
    <div
      className={`group rounded-lg border border-divider p-6 transition-all duration-200 hover:-translate-y-1 hover:border-accent/30 hover:shadow-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
