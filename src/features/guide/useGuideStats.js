import { useMemo } from 'react'
import useGuideStore from './guideStore'
import useAuthStore from '../../store/authStore'
import plans from './plans'

export default function useGuideStats() {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn)
  const progress = useGuideStore((s) => s.progress)
  const streak = useGuideStore((s) => s.streak)
  const longestStreak = useGuideStore((s) => s.longestStreak)
  const lastReadPlan = useGuideStore((s) => s.lastReadPlan)
  const lastReadDay = useGuideStore((s) => s.lastReadDay)

  return useMemo(() => {
    if (!isLoggedIn) return null

    let totalCompleted = 0
    let totalDays = 0
    let plansCompleted = 0
    let favoritePlan = null
    let maxCompletedInPlan = 0
    const completionsByDate = {}

    plans.forEach((plan) => {
      totalDays += plan.days.length
      let planCompleted = 0
      plan.days.forEach((d) => {
        const entry = progress[`${plan.id}-${d.day}`]
        if (entry?.completed) {
          planCompleted++
          const dateKey = entry.date || 'unknown'
          completionsByDate[dateKey] =
            (completionsByDate[dateKey] || 0) + 1
        }
      })
      totalCompleted += planCompleted
      if (planCompleted === plan.days.length) plansCompleted++
      if (planCompleted > maxCompletedInPlan) {
        maxCompletedInPlan = planCompleted
        favoritePlan = plan.title
      }
    })

    const sortedDates = Object.keys(completionsByDate).sort().reverse()
    const recentCompletions = sortedDates.slice(0, 7).map((date) => ({
      date,
      count: completionsByDate[date],
    }))

    const lastPlan = lastReadPlan
      ? plans.find((p) => p.id === lastReadPlan)
      : null

    return {
      totalCompleted,
      totalDays,
      plansCompleted,
      totalPlans: plans.length,
      pct: totalDays > 0 ? Math.round((totalCompleted / totalDays) * 100) : 0,
      streak,
      longestStreak,
      favoritePlan,
      recentCompletions,
      lastReadPlan: lastPlan
        ? { id: lastPlan.id, title: lastPlan.title, day: lastReadDay }
        : null,
    }
  }, [isLoggedIn, progress, streak, longestStreak, lastReadPlan, lastReadDay])
}
