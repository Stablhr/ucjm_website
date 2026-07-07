import { Search, X } from 'lucide-react'

const categories = [
  { value: '', label: 'All' },
  { value: 'topical', label: 'Topical' },
  { value: 'character', label: 'Character' },
  { value: 'spiritual-disciplines', label: 'Disciplines' },
]

export default function GuidePlanFilter({ value, onChange, category, onCategoryChange }) {
  return (
    <div className="mb-8">
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate/40" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search plans..."
          aria-label="Search reading plans"
          className="w-full rounded-lg border border-divider bg-surface py-2.5 pl-10 pr-9 text-sm text-charcoal placeholder:text-slate/40 transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30"
        />
        {value && (
          <button
            onClick={() => onChange('')}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate/40 transition-colors hover:text-charcoal"
          >
            <X size={16} />
          </button>
        )}
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => onCategoryChange(cat.value)}
            className={`rounded-full px-3 py-1.5 font-mono text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 ${
              category === cat.value
                ? 'bg-accent text-white'
                : 'bg-slate/10 text-slate/60 hover:bg-slate/20 hover:text-charcoal'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  )
}
