import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, Cross, BookOpen, Music, Compass, User } from 'lucide-react'

const iconMap = {
  Home: Cross,
  Bible: BookOpen,
  Songs: Music,
  Guide: Compass,
  Login: User,
}

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/bible', label: 'Bible' },
  { to: '/songs', label: 'Songs' },
  { to: '/guide', label: 'Guide' },
  { to: '/login', label: 'Login' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 border-b border-divider bg-ivory/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/images/logo.jpg"
            alt="UCJM Church"
            className="h-10 w-auto"
          />
        </Link>

        <button
          className="lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const Icon = iconMap[link.label]
            return (
              <Link
                key={link.to}
                to={link.to}
                className="group relative flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate transition-colors hover:text-accent"
              >
                <Icon size={16} className="transition-transform group-hover:scale-110" />
                {link.label}
                <span className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-accent transition-all duration-300 group-hover:w-full" />
              </Link>
            )
          })}
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-divider px-4 pb-4 lg:hidden">
          <div className="flex flex-col gap-4 pt-4">
            {navLinks.map((link) => {
              const Icon = iconMap[link.label]
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className="flex items-center gap-2 text-sm font-medium text-charcoal transition-colors hover:text-accent"
                  onClick={() => setIsOpen(false)}
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
