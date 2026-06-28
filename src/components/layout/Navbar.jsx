import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, Cross, BookOpen, Music, Compass, LogIn, Shield, User } from 'lucide-react'
import useAuthStore from '../../store/authStore'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const user = useAuthStore((s) => s.user)
  const profile = useAuthStore((s) => s.profile)
  const refreshProfile = useAuthStore((s) => s.refreshProfile)
  const isAdmin = profile?.role === 'admin'
  const firstName = profile?.full_name
    ? profile.full_name.split(' ')[0]
    : user?.email?.split('@')[0] || 'Profile'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (user) refreshProfile()
  }, [user, refreshProfile])

  const navLinks = [
    { to: '/', label: 'Home', icon: Cross },
    { to: '/bible', label: 'Bible', icon: BookOpen },
    { to: '/songs', label: 'Songs', icon: Music },
    { to: '/guide', label: 'Guide', icon: Compass },
    ...(isAdmin ? [{ to: '/admin', label: 'Admin', icon: Shield }] : []),
    ...(user
      ? [{ to: '/profile', label: firstName, icon: User }]
      : [{ to: '/login', label: 'Sign In', icon: LogIn }]),
  ]

  return (
    <nav
      className={`fixed top-0 z-50 w-full animate-slide-down transition-all duration-500 ${
        scrolled
          ? 'border-b border-white/20 bg-white/50 shadow-sm shadow-black/5 backdrop-blur-xl'
          : 'border-b border-divider bg-white/80'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/images/logo.jpg"
            alt="UNITY IN CHRIST JESUS MINISTRIES"
            className="h-10 w-auto"
          />
          <span className="hidden text-lg font-semibold sm:inline" style={{ color: '#0a1db0' }}>
            UCJM
          </span>
        </Link>

        <button
          className="text-charcoal lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const Icon = link.icon
            return (
              <Link
                key={link.label}
                to={link.to}
                onClick={link.action}
                className="group relative flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate transition-colors hover:text-[#0a1db0]"
              >
                <Icon size={16} className="transition-transform group-hover:scale-110" />
                {link.label}
                <span className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-[#0a1db0] transition-all duration-300 group-hover:w-full" />
              </Link>
            )
          })}
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-divider bg-white px-4 pb-4">
          <div className="flex flex-col gap-4 pt-4">
            {user && (
              <div className="border-b border-divider pb-3 text-sm text-slate">
                {profile?.full_name || user.email}
              </div>
            )}
            {navLinks.map((link) => {
              const Icon = link.icon
              return (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={() => {
                    if (link.action) link.action()
                    setIsOpen(false)
                  }}
                  className="flex items-center gap-2 text-sm font-medium text-charcoal transition-colors hover:text-[#0a1db0]"
                >
                  <Icon size={16} />
                  {link.label}
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </nav>
  )
}
