import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function GuideBreadcrumb({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="inline-flex items-center gap-2 rounded-lg bg-ivory px-4 py-2 text-xs text-slate ">
        {items.map((item, i) => {
          const isLast = i === items.length - 1
          return (
            <li key={i} className="flex items-center gap-2">
              {i > 0 && <ChevronRight size={12} className="text-slate/30" />}
              {isLast ? (
                <span className="font-medium text-accent" aria-current="page">
                  {item.label}
                </span>
              ) : item.to ? (
                <Link
                  to={item.to}
                  className="transition-colors hover:text-charcoal"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="transition-colors hover:text-charcoal">
                  {item.label}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
