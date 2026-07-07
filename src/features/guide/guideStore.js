import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { supabase } from '../../services/supabase'
import useAuthStore from '../../store/authStore'

const useGuideStore = create(
  persist(
    (set, get) => ({
      progress: {},
      streak: 0,
      longestStreak: 0,
      lastActiveDate: null,
      lastReadPlan: null,
      lastReadDay: null,
      loading: false,

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
          const current = get()

          const mergedProgress = { ...current.progress }
          Object.entries(data.progress || {}).forEach(([key, value]) => {
            const existing = mergedProgress[key]
            if (!existing || new Date(value.date) > new Date(existing.date)) {
              mergedProgress[key] = value
            }
          })

          set({
            progress: mergedProgress,
            streak: Math.max(current.streak, data.streak || 0),
            longestStreak: Math.max(
              current.longestStreak,
              data.longest_streak || 0
            ),
          })
        }

        set({ loading: false })
      },

      setLastRead: (planId, day) => {
        set({ lastReadPlan: planId, lastReadDay: day })
      },

      markDayComplete: async (planId, day) => {
        const user = useAuthStore.getState().user
        if (!user) return

        const { progress, streak, longestStreak, lastActiveDate } = get()
        const today = new Date().toISOString().split('T')[0]
        const yesterday = new Date(Date.now() - 86400000)
          .toISOString()
          .split('T')[0]

        const updatedProgress = {
          ...progress,
          [`${planId}-${day}`]: { completed: true, date: today },
        }

        let newStreak = streak
        if (lastActiveDate === yesterday) {
          newStreak = streak + 1
        } else if (lastActiveDate === today) {
          newStreak = streak
        } else {
          newStreak = 1
        }

        const newLongest = Math.max(longestStreak, newStreak)

        set({
          progress: updatedProgress,
          streak: newStreak,
          longestStreak: newLongest,
          lastActiveDate: today,
          lastReadPlan: planId,
          lastReadDay: day,
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

      updateNote: (planId, day, note) => {
        const { progress } = get()
        const key = `${planId}-${day}`
        set({
          progress: {
            ...progress,
            [key]: {
              ...progress[key],
              completed: progress[key]?.completed || false,
              date: progress[key]?.date || null,
              note,
            },
          },
        })
      },

      getNote: (planId, day) => {
        const { progress } = get()
        return progress[`${planId}-${day}`]?.note || ''
      },

      isDayComplete: (planId, day) => {
        const { progress } = get()
        return !!progress[`${planId}-${day}`]?.completed
      },

      reset: () =>
        set({
          progress: {},
          streak: 0,
          longestStreak: 0,
          lastActiveDate: null,
          lastReadPlan: null,
          lastReadDay: null,
        }),
    }),
    {
      name: 'ucjm-guide-progress',
      partialize: (state) => ({
        progress: state.progress,
        streak: state.streak,
        longestStreak: state.longestStreak,
        lastActiveDate: state.lastActiveDate,
        lastReadPlan: state.lastReadPlan,
        lastReadDay: state.lastReadDay,
      }),
    }
  )
)

export default useGuideStore
