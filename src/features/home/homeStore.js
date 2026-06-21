import { create } from 'zustand'
import { supabase } from '../../services/supabase'

const useHomeStore = create((set) => ({
  announcements: [],
  events: [],
  photos: [],
  loading: true,

  fetchAll: async () => {
    set({ loading: true })
    const [announcementsRes, eventsRes, photosRes] = await Promise.all([
      supabase
        .from('announcements')
        .select('*')
        .eq('is_published', true)
        .order('posted_at', { ascending: false }),
      supabase
        .from('events')
        .select('*')
        .eq('is_published', true)
        .gte('date', new Date().toISOString().split('T')[0])
        .order('date', { ascending: true })
        .limit(6),
      supabase
        .from('photos')
        .select('*')
        .order('sort_order', { ascending: true }),
    ])

    set({
      announcements: announcementsRes.data ?? [],
      events: eventsRes.data ?? [],
      photos: photosRes.data ?? [],
      loading: false,
    })
  },
}))

export default useHomeStore
