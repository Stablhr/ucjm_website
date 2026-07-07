import { useMemo } from 'react'
import useGuideStore from './guideStore'
import useAuthStore from '../../store/authStore'
import plans from './plans'

export default function useGuideStats() {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn)
  const progress = useGuideStore((s) => s.progress)
  const streak = useGuideStore((s) => s.streak)

  return useMemo(() => {
    if (!isLoggedIn) return null

    let totalCompleted = 0
    let totalDays = 0
    let plansCompleted = 0

    plans.forEach((plan) => {
      totalDays += plan.days.length
      const planCompleted = plan.days.filter((d) =>
        progress[`${plan.id}-${d.day}`]?.completed
      ).length
      totalCompleted += planCompleted
      if (planCompleted === plan.days.length) plansCompleted++
    })

    return {
      totalCompleted,
      totalDays,
      plansCompleted,
      totalPlans: plans.length,
      pct: totalDays > 0 ? Math.round((totalCompleted / totalDays) * 100) : 0,
      streak,
    }
  }, [isLoggedIn, progress, streak])
}
