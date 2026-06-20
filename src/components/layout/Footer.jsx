import { Link } from 'react-router-dom'
import { Cross, BookOpen, Music, Compass, User } from 'lucide-react'

const iconMap = {
  Home: Cross,
  Bible: BookOpen,
  Songs: Music,
  'Reading Guide': Compass,
  Login: User,
}

const quickLinks = [
  { to: '/', label: 'Home' },
  { to: '/bible', label: 'Bible' },
  { to: '/songs', label: 'Songs' },
  { to: '/guide', label: 'Reading Guide' },
  { to: '/login', label: 'Login' },
]

export default function Footer() {
  return (
    <footer className="border-t border-divider bg-ivory">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-12 md:flex-row md:justify-between">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <img
                src="/images/logo.jpg"
                alt="UCJM Church"
                className="h-10 w-auto"
              />
            </Link>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-charcoal">Quick Links</h3>
            <div className="flex flex-col gap-2">
              {quickLinks.map((link) => {
                const Icon = iconMap[link.label]
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="flex items-center gap-2 text-sm text-slate transition-all hover:translate-x-1 hover:text-accent"
                  >
                    <Icon size={14} />
                    {link.label}
                  </Link>
                )
              })}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-divider pt-8 text-center text-sm text-slate">
          &copy; {new Date().getFullYear()} UCJM Church. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
