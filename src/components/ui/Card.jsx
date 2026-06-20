export default function Card({ children, className = '', ...props }) {
  return (
    <div
      className={`rounded-sm border border-divider p-6 transition hover:-translate-y-1 ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
