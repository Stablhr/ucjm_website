import { useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { LayoutDashboard, Megaphone, Calendar, Menu, X, LogOut, Cross } from 'lucide-react'
import useAuthStore from '../../store/authStore'

const adminLinks = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/announcements', label: 'Announcements', icon: Megaphone },
  { to: '/admin/events', label: 'Events', icon: Calendar },
]

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const signOut = useAuthStore((s) => s.signOut)
  const profile = useAuthStore((s) => s.profile)

  return (
    <div className="min-h-screen bg-ivory">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform border-r border-divider bg-white transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-divider px-6">
          <Link to="/" className="flex items-center gap-2">
            <Cross size={20} className="text-accent" />
            <span className="font-display text-lg font-bold text-charcoal">UCJM Admin</span>
          </Link>
          <button
            className="text-slate hover:text-charcoal lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex flex-col gap-1 px-3 py-6">
          {adminLinks.map((link) => {
            const Icon = link.icon
            const isActive = location.pathname === link.to
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-accent/10 text-accent'
                    : 'text-slate hover:bg-accent/5 hover:text-charcoal'
                }`}
              >
                <Icon size={18} />
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 border-t border-divider p-4">
          <div className="mb-2 px-4 text-xs text-slate">
            {profile?.full_name || 'Admin'}
          </div>
          <button
            onClick={signOut}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-slate transition-colors hover:bg-red-50 hover:text-red-600"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main area */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-divider bg-white/80 px-6 backdrop-blur-xl">
          <button
            className="text-slate hover:text-charcoal lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={22} />
          </button>
          <h1 className="font-display text-xl font-bold text-charcoal">
            {adminLinks.find((l) => l.to === location.pathname)?.label || 'Admin'}
          </h1>
        </header>

        {/* Page content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
