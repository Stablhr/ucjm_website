import {
  Heart,
  Cross,
  Weight,
  BookOpen,
  Sun,
  Feather,
  Zap,
  CheckCircle,
} from 'lucide-react'
import useGuideStore from './guideStore'

const iconMap = {
  Heart,
  Cross,
  Weight,
  BookOpen,
  Sun,
  Feather,
  Zap,
}

const colorMap = {
  rose: 'bg-rose-50 text-rose-600 border-rose-200 hover:border-rose-300',
  amber:
    'bg-amber-50 text-amber-600 border-amber-200 hover:border-amber-300',
  blue: 'bg-blue-50 text-blue-600 border-blue-200 hover:border-blue-300',
  emerald:
    'bg-emerald-50 text-emerald-600 border-emerald-200 hover:border-emerald-300',
  yellow:
    'bg-yellow-50 text-yellow-600 border-yellow-200 hover:border-yellow-300',
  purple:
    'bg-purple-50 text-purple-600 border-purple-200 hover:border-purple-300',
  orange:
    'bg-orange-50 text-orange-600 border-orange-200 hover:border-orange-300',
  teal: 'bg-teal-50 text-teal-600 border-teal-200 hover:border-teal-300',
}

export default function GuidePlanCard({ plan }) {
  const setActivePlan = useGuideStore((s) => s.setActivePlan)
  const progress = useGuideStore((s) => s.progress)

  const Icon = iconMap[plan.icon] || BookOpen
  const colorClass = colorMap[plan.color] || colorMap.blue

  const completedDays = plan.days.filter((d) =>
    progress[`${plan.id}-${d.day}`]?.completed
  ).length

  return (
    <button
      onClick={() => setActivePlan(plan.id)}
      className={`group relative flex flex-col items-start rounded-sm border p-6 text-left transition-all ${colorClass}`}
    >
      <div className="mb-3 flex items-center gap-3">
        <div className="rounded-full bg-white/80 p-2.5 shadow-sm">
          <Icon size={22} />
        </div>
        <span className="font-mono text-xs opacity-60">
          {plan.days.length} days
        </span>
      </div>

      <h3 className="font-display text-lg font-bold">{plan.title}</h3>
      <p className="mt-1 text-sm opacity-70">{plan.description}</p>

      <div className="mt-4 flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-1.5 flex-1 rounded-full bg-white/60"
            style={{ width: 120 }}
          >
            <div
              className="h-full rounded-full bg-current transition-all"
              style={{
                width: `${Math.round((completedDays / plan.days.length) * 100)}%`,
              }}
            />
          </div>
          <span className="font-mono text-xs opacity-60">
            {completedDays}/{plan.days.length}
          </span>
        </div>

        {completedDays === plan.days.length && (
          <CheckCircle size={16} className="shrink-0" />
        )}
      </div>
    </button>
  )
}
