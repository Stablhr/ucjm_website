import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import ScrollToTop from '../ui/ScrollToTop'
import useAuthStore from '../../store/authStore'

export default function Layout() {
  const location = useLocation()
  const loading = useAuthStore((s) => s.loading)
  const refreshProfile = useAuthStore((s) => s.refreshProfile)
  const user = useAuthStore((s) => s.user)

  useEffect(() => {
    if (user) refreshProfile()
  }, [location.pathname, user, refreshProfile])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ivory">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
          <p className="text-sm text-slate">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pt-20">
        <Outlet />
      </main>
      {location.pathname !== '/login' && location.pathname !== '/bible' && <Footer />}
      <ScrollToTop />
    </div>
  )
}
