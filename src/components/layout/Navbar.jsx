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

  const hasAvatar = !!profile?.avatar_url

  const navLinks = [
    { to: '/', label: 'Home', icon: Cross },
    { to: '/bible', label: 'Bible', icon: BookOpen },
    { to: '/songs', label: 'Songs', icon: Music },
    { to: '/guide', label: 'Guide', icon: Compass },
    ...(isAdmin ? [{ to: '/admin', label: 'Admin', icon: Shield }] : []),
    ...(user
      ? [{ to: '/profile', label: firstName, icon: User, isProfile: true }]
      : [{ to: '/login', label: 'Sign In', icon: LogIn }]),
  ]

  return (
    <nav
      className={`fixed top-0 z-50 w-full animate-slide-down transition-all duration-500 ${
        scrolled
          ? 'border-b border-white/20 bg-surface/50 backdrop-blur-xl'
          : 'border-b border-divider bg-surface/80'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/images/logo.jpg"
            alt="UNITY IN CHRIST JESUS MINISTRIES"
            className="h-10 w-auto"
          />
          <span className="text-xs font-semibold sm:text-lg text-accent">
            <span className="sm:hidden">UCJM</span>
            <span className="hidden sm:inline">UNITY IN CHRIST JESUS MINISTRIES</span>
          </span>
        </Link>

        <button
          className="rounded-lg p-3 text-charcoal transition-colors hover:bg-accent/5 lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const Icon = link.icon
            if (link.isProfile && hasAvatar) {
              return (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={link.action}
                  className="group relative flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:rounded"
                  title={profile?.full_name || firstName}
                >
                  <img
                    src={profile.avatar_url}
                    alt={firstName}
                    className="h-7 w-7 rounded-full object-cover ring-2 ring-transparent transition-all group-hover:ring-accent/30"
                  />
                  <span className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-accent transition-all duration-300 group-hover:w-full" />
                </Link>
              )
            }
            return (
              <Link
                key={link.label}
                to={link.to}
                onClick={link.action}
                className="group relative flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:rounded"
              >
                <Icon size={16} className="transition-transform group-hover:scale-110" />
                {link.label}
                <span className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-accent transition-all duration-300 group-hover:w-full" />
              </Link>
            )
          })}
        </div>
      </div>

      {/* Mobile menu with slide animation */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } border-t border-divider bg-surface`}
      >
        <div className="px-4 pb-4">
          <div className="flex flex-col gap-4 pt-4">
            {user && (
              <div className="flex items-center gap-2 border-b border-divider pb-3 text-sm text-slate">
                {hasAvatar ? (
                  <img
                    src={profile.avatar_url}
                    alt=""
                    className="h-6 w-6 rounded-full object-cover"
                  />
                ) : (
                  <User size={14} className="text-slate/50" />
                )}
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
                  className="flex items-center gap-2 text-sm font-medium text-charcoal transition-colors hover:text-accent"
                >
                  {link.isProfile && hasAvatar ? (
                    <img
                      src={profile.avatar_url}
                      alt=""
                      className="h-5 w-5 rounded-full object-cover"
                    />
                  ) : (
                    <Icon size={16} />
                  )}
                  {link.label}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
