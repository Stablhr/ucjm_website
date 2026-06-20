import { create } from 'zustand'
import { supabase } from '../../services/supabase'
import useAuthStore from '../../store/authStore'

const useGuideStore = create((set, get) => ({
  activePlanId: null,
  currentDay: null,
  progress: {},
  streak: 0,
  longestStreak: 0,
  loading: false,

  setActivePlan: (planId) => set({ activePlanId: planId, currentDay: null }),

  setCurrentDay: (day) => set({ currentDay: day }),

  loadProgress: async () => {
    const user = useAuthStore.getState().user
    if (!user) return

    set({ loading: true })
    const { data, error } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', user.id)
      .single()

    if (!error && data) {
      set({
        progress: data.progress || {},
        streak: data.streak || 0,
        longestStreak: data.longest_streak || 0,
      })
    }
    set({ loading: false })
  },

  markDayComplete: async (planId, day) => {
    const user = useAuthStore.getState().user
    if (!user) return

    const { progress, streak, longestStreak } = get()
    const today = new Date().toDateString()

    const updatedProgress = {
      ...progress,
      [`${planId}-${day}`]: { completed: true, date: today },
    }

    let newStreak = streak
    const lastCompletion = progress[`${planId}-${day - 1}`]
    if (day === 1 || lastCompletion) {
      if (lastCompletion && lastCompletion.date === today) {
        newStreak = streak
      } else {
        newStreak = streak + 1
      }
    } else {
      newStreak = 1
    }

    const newLongest = Math.max(longestStreak, newStreak)

    set({
      progress: updatedProgress,
      streak: newStreak,
      longestStreak: newLongest,
    })

    const { error } = await supabase.from('user_progress').upsert(
      {
        user_id: user.id,
        progress: updatedProgress,
        streak: newStreak,
        longest_streak: newLongest,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id' }
    )

    if (error) console.error('Failed to save progress:', error)
  },

  isDayComplete: (planId, day) => {
    const { progress } = get()
    return !!progress[`${planId}-${day}`]?.completed
  },

  reset: () =>
    set({
      activePlanId: null,
      currentDay: null,
      progress: {},
      streak: 0,
      longestStreak: 0,
    }),
}))

export default useGuideStore
