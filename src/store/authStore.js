import { create } from 'zustand'

const useAuthStore = create((set) => ({
  user: null,
  isLoggedIn: false,
  setUser: (user) => set({ user, isLoggedIn: !!user }),
  clearUser: () => set({ user: null, isLoggedIn: false }),
}))

export default useAuthStore
