import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useBibleStore = create(
  persist(
    (set) => ({
      bibleVersionId: 3034,
      setBibleVersion: (id) => set({ bibleVersionId: id }),
    }),
    { name: 'ucjm-bible-version' }
  )
)

export default useBibleStore
