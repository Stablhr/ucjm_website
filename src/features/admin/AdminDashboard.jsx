import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Megaphone, Calendar, ArrowRight } from 'lucide-react'
import { supabase } from '../../services/supabase'

export default function AdminDashboard() {
  const [stats, setStats] = useState({ announcements: 0, events: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadStats() {
      const [announcementsRes, eventsRes] = await Promise.all([
        supabase.from('announcements').select('id', { count: 'exact', head: true }),
        supabase.from('events').select('id', { count: 'exact', head: true }),
      ])
      setStats({
        announcements: announcementsRes.count ?? 0,
        events: eventsRes.count ?? 0,
      })
      setLoading(false)
    }
    loadStats()
  }, [])

  const cards = [
    {
      label: 'Announcements',
      count: stats.announcements,
      icon: Megaphone,
      href: '/admin/announcements',
      color: 'text-accent',
      bg: 'bg-accent/5',
    },
    {
      label: 'Events',
      count: stats.events,
      icon: Calendar,
      href: '/admin/events',
      color: 'text-accent-warm',
      bg: 'bg-accent-warm/5',
    },
  ]

  return (
    <div>
      <p className="mb-8 text-sm text-slate">
        Welcome back! Here is an overview of your church site content.
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        {cards.map((card) => {
          const Icon = card.icon
          return (
            <Link
              key={card.label}
              to={card.href}
              className="group rounded-lg border border-divider bg-surface p-6 transition-all hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className={`rounded-lg p-3 ${card.bg}`}>
                  <Icon size={24} className={card.color} />
                </div>
                <ArrowRight
                  size={18}
                  className="text-slate opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100"
                />
              </div>
              <p className="mt-4 font-display text-3xl font-bold text-charcoal">
                {loading ? '...' : card.count}
              </p>
              <p className="mt-1 text-sm text-slate">{card.label}</p>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
