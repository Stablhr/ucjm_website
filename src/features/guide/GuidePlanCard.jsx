import {
  Heart,
  Cross,
  Weight,
  BookOpen,
  Sun,
  Feather,
  Zap,
  CheckCircle,
  ArrowRight,
} from 'lucide-react'
import useAuthStore from '../../store/authStore'
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
  rose: {
    bg: 'from-rose-500 to-pink-600',
    light: 'bg-rose-50',
    text: 'text-rose-600',
    border: 'border-rose-200',
    hover: 'hover:border-rose-300',
    badge: 'bg-rose-100 text-rose-700',
    progress: 'bg-rose-500',
  },
  amber: {
    bg: 'from-amber-500 to-orange-600',
    light: 'bg-amber-50',
    text: 'text-amber-600',
    border: 'border-amber-200',
    hover: 'hover:border-amber-300',
    badge: 'bg-amber-100 text-amber-700',
    progress: 'bg-amber-500',
  },
  blue: {
    bg: 'from-blue-500 to-indigo-600',
    light: 'bg-blue-50',
    text: 'text-blue-600',
    border: 'border-blue-200',
    hover: 'hover:border-blue-300',
    badge: 'bg-blue-100 text-blue-700',
    progress: 'bg-blue-500',
  },
  emerald: {
    bg: 'from-emerald-500 to-teal-600',
    light: 'bg-emerald-50',
    text: 'text-emerald-600',
    border: 'border-emerald-200',
    hover: 'hover:border-emerald-300',
    badge: 'bg-emerald-100 text-emerald-700',
    progress: 'bg-emerald-500',
  },
  yellow: {
    bg: 'from-yellow-500 to-amber-600',
    light: 'bg-yellow-50',
    text: 'text-yellow-600',
    border: 'border-yellow-200',
    hover: 'hover:border-yellow-300',
    badge: 'bg-yellow-100 text-yellow-700',
    progress: 'bg-yellow-500',
  },
  purple: {
    bg: 'from-purple-500 to-violet-600',
    light: 'bg-purple-50',
    text: 'text-purple-600',
    border: 'border-purple-200',
    hover: 'hover:border-purple-300',
    badge: 'bg-purple-100 text-purple-700',
    progress: 'bg-purple-500',
  },
  orange: {
    bg: 'from-orange-500 to-red-600',
    light: 'bg-orange-50',
    text: 'text-orange-600',
    border: 'border-orange-200',
    hover: 'hover:border-orange-300',
    badge: 'bg-orange-100 text-orange-700',
    progress: 'bg-orange-500',
  },
  teal: {
    bg: 'from-teal-500 to-cyan-600',
    light: 'bg-teal-50',
    text: 'text-teal-600',
    border: 'border-teal-200',
    hover: 'hover:border-teal-300',
    badge: 'bg-teal-100 text-teal-700',
    progress: 'bg-teal-500',
  },
}

export default function GuidePlanCard({ plan }) {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn)
  const setActivePlan = useGuideStore((s) => s.setActivePlan)
  const progress = useGuideStore((s) => s.progress)

  const Icon = iconMap[plan.icon] || BookOpen
  const colors = colorMap[plan.color] || colorMap.blue

  const completedDays = plan.days.filter((d) =>
    progress[`${plan.id}-${d.day}`]?.completed
  ).length

  const hasStarted = completedDays > 0
  const isComplete = completedDays === plan.days.length
  const pct = Math.round((completedDays / plan.days.length) * 100)

  return (
    <button
      onClick={() => setActivePlan(plan.id)}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-divider bg-surface text-left transition-all hover:-translate-y-1 hover:shadow-lg"
    >
      <div className={`relative bg-gradient-to-br ${colors.bg} px-6 pb-12 pt-8`}>
        <div className="absolute right-3 top-3">
          <span className={`inline-block rounded-full ${colors.badge} px-2.5 py-0.5 font-mono text-[11px] font-bold`}>
            {plan.days.length} {plan.days.length === 1 ? 'day' : 'days'}
          </span>
        </div>

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-surface/20 backdrop-blur-sm">
          <Icon size={28} className="text-white" />
        </div>

        <h3 className="mt-4 font-display text-xl font-bold text-white">
          {plan.title}
        </h3>
        <p className="mt-1 text-sm text-white/80">
          {plan.description}
        </p>
      </div>

      <div className="relative z-10 -mt-4 rounded-t-2xl bg-surface px-6 pb-6 pt-4">
        {isLoggedIn && (
          <div className="mb-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex h-2 flex-1 overflow-hidden rounded-full bg-slate/10">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${colors.progress}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="shrink-0 font-mono text-xs text-slate/60">
                {completedDays}/{plan.days.length}
              </span>
            </div>
          </div>
        )}

        <p className="text-sm italic text-slate/60">
          {isComplete
            ? 'All days completed!'
            : `Start with "${plan.days[0].title}"`}
        </p>

        {!isLoggedIn && (
          <p className="mt-2 text-xs text-slate/40">
            Sign in to track your progress
          </p>
        )}

        <div className="mt-4 flex items-center justify-end gap-1.5 text-sm font-medium text-accent opacity-0 transition-opacity group-hover:opacity-100">
          {isComplete ? 'Review Plan' : hasStarted ? 'Continue' : 'Start Plan'}
          <ArrowRight size={16} />
        </div>

        {isComplete && (
          <div className="absolute bottom-6 right-6">
            <CheckCircle size={20} className="text-emerald-500" />
          </div>
        )}
      </div>
    </button>
  )
}
