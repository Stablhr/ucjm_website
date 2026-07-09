import { useEffect, useRef, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import ScrollToTop from '../ui/ScrollToTop'
import ErrorBoundary from '../ui/ErrorBoundary'
import Loader from '../ui/Loader'
import useAuthStore from '../../store/authStore'

export default function Layout() {
  const location = useLocation()
  const loading = useAuthStore((s) => s.loading)
  const refreshProfile = useAuthStore((s) => s.refreshProfile)
  const user = useAuthStore((s) => s.user)
  const prevPath = useRef(location.pathname)
  const [transitioning, setTransitioning] = useState(false)

  useEffect(() => {
    if (prevPath.current !== location.pathname) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      prevPath.current = location.pathname
      setTransitioning(true)
      const t = setTimeout(() => setTransitioning(false), 300)
      return () => clearTimeout(t)
    }
  }, [location.pathname])

  useEffect(() => {
    if (user) refreshProfile()
  }, [location.pathname, user, refreshProfile])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ivory">
        <div className="flex flex-col items-center gap-4">
          <Loader size={45} speed={2} />
          <p className="text-sm text-slate">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main-content" className="flex-1 pt-20 overflow-x-hidden">
        <ErrorBoundary fallbackTitle="Page Error" fallbackMessage="Something went wrong rendering this page. Try refreshing.">
          <div className={`transition-opacity duration-300 ${transitioning ? 'opacity-0' : 'opacity-100'}`}>
            <Outlet />
          </div>
        </ErrorBoundary>
      </main>
      {location.pathname !== '/login' && location.pathname !== '/bible' && <Footer />}
      <ScrollToTop />
    </div>
  )
}
