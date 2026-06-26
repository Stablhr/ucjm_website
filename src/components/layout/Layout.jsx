import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import ScrollToTop from '../ui/ScrollToTop'
import useAuthStore from '../../store/authStore'

export default function Layout() {
  const location = useLocation()
  const refreshProfile = useAuthStore((s) => s.refreshProfile)
  const user = useAuthStore((s) => s.user)

  useEffect(() => {
    if (user) refreshProfile()
  }, [location.pathname, user, refreshProfile])

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
